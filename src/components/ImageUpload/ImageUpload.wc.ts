import { LitElement, html, type TemplateResult, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { imageUploadStyles } from './ImageUpload.css';
import { ImageUploadTemplate } from './ImageUpload';

export interface CropResult {
  file?: File | Blob;
  url: string;
  cropData?: {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
  };
}

export type ImageUploadOutputType = 'blob' | 'file' | 'base64';
export type ImageUploadShape = 'square' | 'circle';

@customElement('biz-image-upload')
export class ImageUpload extends LitElement {
  static styles = [imageUploadStyles];

  @property({ type: Object })
  value: string | File | CropResult | null = null;

  @property({ type: String })
  accept = 'image/jpeg,image/png,image/webp';

  @property({ type: Number, attribute: 'max-size' })
  maxSize: number | null = null;

  @property({ type: Number, attribute: 'aspect-ratio' })
  aspectRatio: number | null = null;

  @property({ type: String })
  shape: ImageUploadShape = 'square';

  @property({ type: Boolean, attribute: 'enable-crop' })
  enableCrop = true;

  @property({ type: String, attribute: 'output-type' })
  outputType: ImageUploadOutputType = 'blob';

  @property({ type: Number, attribute: 'output-quality' })
  outputQuality = 0.92;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @state()
  private isDragOver = false;

  @state()
  private isCropping = false;

  @state()
  private isProcessing = false;

  @state()
  private previewUrl: string | null = null;

  @state()
  private rawFile: File | null = null;

  @state()
  private liveMessage = '';

  @query('input[type="file"]')
  private fileInput!: HTMLInputElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.syncPreviewUrl();
  }

  willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('value')) {
      this.syncPreviewUrl();
    }
  }

  private syncPreviewUrl(): void {
    if (!this.value) {
      this.previewUrl = null;
      return;
    }
    if (typeof this.value === 'string') {
      this.previewUrl = this.value;
    } else if (this.value instanceof File || this.value instanceof Blob) {
      this.previewUrl = URL.createObjectURL(this.value);
    } else if (typeof this.value === 'object' && 'url' in this.value) {
      this.previewUrl = this.value.url;
    }
  }

  private triggerFileInput(): void {
    if (this.disabled || this.readonly) return;
    this.fileInput?.click();
  }

  private handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processSelectedFile(input.files[0]);
    }
    input.value = '';
  }

  private processSelectedFile(file: File): void {
    if (this.maxSize && file.size > this.maxSize) {
      this.error = true;
      this.liveMessage = '파일 용량이 초과되었습니다.';
      this.dispatchEvent(
        new CustomEvent('error', {
          detail: { type: 'size', message: 'File size exceeds maximum allowed limit.' },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    const acceptedTypes = this.accept.split(',').map((type) => type.trim());
    const isAccepted = acceptedTypes.some((type) => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', ''));
      }
      return file.type === type;
    });

    if (!isAccepted) {
      this.error = true;
      this.liveMessage = '지원하지 않는 파일 형식입니다.';
      this.dispatchEvent(
        new CustomEvent('error', {
          detail: { type: 'extension', message: 'File format is not supported.' },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    this.error = false;
    this.rawFile = file;

    if (this.enableCrop) {
      this.isCropping = true;
      this.liveMessage = '크롭 모달이 열렸습니다.';
      this.dispatchEvent(
        new CustomEvent('crop-start', {
          detail: { rawFile: file },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      const url = URL.createObjectURL(file);
      this.previewUrl = url;
      this.value = file;
      this.liveMessage = '이미지가 성공적으로 첨부되었습니다.';
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { file, url, cropData: null },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private handleDragOver(event: DragEvent): void {
    event.preventDefault();
    if (this.disabled || this.readonly) return;
    this.isDragOver = true;
  }

  private handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  private handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (this.disabled || this.readonly) return;

    if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
      this.processSelectedFile(event.dataTransfer.files[0]);
    }
  }

  private handleRemove(event?: Event): void {
    event?.stopPropagation();
    if (this.disabled || this.readonly) return;

    this.value = null;
    this.previewUrl = null;
    this.rawFile = null;
    this.error = false;
    this.liveMessage = '이미지가 삭제되었습니다.';

    this.dispatchEvent(
      new CustomEvent('remove', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleCropConfirm(): void {
    this.isProcessing = true;
    const cropResult: CropResult = {
      file: this.rawFile ?? undefined,
      url: this.rawFile ? URL.createObjectURL(this.rawFile) : '',
      cropData: { x: 0, y: 0, width: 100, height: 100, rotation: 0 },
    };

    this.isProcessing = false;
    this.isCropping = false;
    this.value = cropResult;
    this.previewUrl = cropResult.url;
    this.liveMessage = '이미지가 성공적으로 편집되어 저장되었습니다.';

    this.dispatchEvent(
      new CustomEvent('crop-complete', {
        detail: { croppedResult: cropResult },
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { file: cropResult.file, url: cropResult.url, cropData: cropResult.cropData },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleCropCancel(): void {
    this.isCropping = false;
    this.liveMessage = '크롭 편집이 취소되었습니다.';
    this.dispatchEvent(
      new CustomEvent('crop-cancel', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (this.isCropping) {
      if (event.key === 'Escape') {
        this.handleCropCancel();
      }
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.previewUrl) {
        this.triggerFileInput();
      }
    }
  }

  render(): TemplateResult {
    const rootClasses = [
      'biz-image-upload',
      this.shape === 'circle' ? 'biz-image-upload--circle' : '',
      this.isDragOver ? 'biz-image-upload--dragover' : '',
      this.disabled ? 'biz-image-upload--disabled' : '',
      this.readonly ? 'biz-image-upload--readonly' : '',
      this.error ? 'biz-image-upload--error' : '',
    ]
      .filter(Boolean)
      .join(' ');

    return ImageUploadTemplate({
      rootClasses,
      value: this.value,
      accept: this.accept,
      maxSize: this.maxSize,
      aspectRatio: this.aspectRatio,
      shape: this.shape,
      enableCrop: this.enableCrop,
      outputType: this.outputType,
      outputQuality: this.outputQuality,
      disabled: this.disabled,
      readonly: this.readonly,
      error: this.error,
      isDragOver: this.isDragOver,
      isCropping: this.isCropping,
      isProcessing: this.isProcessing,
      previewUrl: this.previewUrl,
      liveMessage: this.liveMessage,
      onTriggerFileInput: () => this.triggerFileInput(),
      onFileChange: (e: Event) => this.handleFileChange(e),
      onDragOver: (e: DragEvent) => this.handleDragOver(e),
      onDragLeave: (e: DragEvent) => this.handleDragLeave(e),
      onDrop: (e: DragEvent) => this.handleDrop(e),
      onRemove: (e: Event) => this.handleRemove(e),
      onCropConfirm: () => this.handleCropConfirm(),
      onCropCancel: () => this.handleCropCancel(),
      onKeyDown: (e: KeyboardEvent) => this.handleKeyDown(e),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-image-upload': ImageUpload;
  }
}