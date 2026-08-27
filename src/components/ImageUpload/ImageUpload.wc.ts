import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { imageUploadStyles } from './ImageUpload.css.js';
import { ImageUploadTemplate, type ImageUploadHost } from './ImageUpload';

export interface CropResult {
  file: File | Blob | string;
  url: string;
  cropData: {
    scale: number;
    offsetX: number;
    offsetY: number;
    aspectRatio: number | null;
    quality: number;
  };
}

@customElement('biz-image-upload')
export class BizImageUpload extends LitElement implements ImageUploadHost {
  static styles = imageUploadStyles;

  @property({ type: Object, attribute: false })
  value: string | File | Blob | null = null;

  @property({ type: String })
  accept = 'image/jpeg,image/png,image/webp';

  @property({ type: Number, attribute: 'max-size' })
  maxSize: number | null = null;

  @property({ type: Number, attribute: 'aspect-ratio' })
  aspectRatio: number | null = null;

  @property({ type: String })
  shape: 'square' | 'circle' = 'square';

  @property({ type: Boolean, attribute: 'enable-crop' })
  enableCrop = true;

  @property({ type: String, attribute: 'output-type' })
  outputType: 'blob' | 'file' | 'base64' = 'blob';

  @property({ type: Number, attribute: 'output-quality' })
  outputQuality = 0.92;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @state()
  isDragOver = false;

  @state()
  isCropping = false;

  @state()
  isProcessing = false;

  @state()
  previewUrl: string | null = null;

  @state()
  statusMessage = '';

  @state()
  cropScale = 1;

  @state()
  cropOffsetX = 0;

  @state()
  cropOffsetY = 0;

  @query('.biz-image-upload__input')
  private fileInput!: HTMLInputElement;

  @query('.biz-image-upload__dialog')
  private cropDialog!: HTMLDialogElement;

  private rawFile: File | null = null;
  private isDragging = false;
  private startX = 0;
  private startY = 0;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this.syncPreviewFromValue();
    }
  }

  private syncPreviewFromValue(): void {
    if (!this.value) {
      this.previewUrl = null;
      return;
    }

    if (typeof this.value === 'string') {
      this.previewUrl = this.value;
    } else if (this.value instanceof File || this.value instanceof Blob) {
      if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(this.previewUrl);
      }
      this.previewUrl = URL.createObjectURL(this.value);
    }
  }

  private validateFile(file: File): boolean {
    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map((t) => t.trim().toLowerCase());
      const fileType = file.type.toLowerCase();
      const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;

      const isValidType = acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
          return fileExt === type;
        }
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.replace('/*', ''));
        }
        return fileType === type;
      });

      if (!isValidType) {
        this.error = true;
        this.statusMessage = '허용되지 않은 파일 형식입니다.';
        this.dispatchEvent(
          new CustomEvent('error', {
            bubbles: true,
            composed: true,
            detail: { type: 'extension', message: this.statusMessage },
          })
        );
        return false;
      }
    }

    if (this.maxSize !== null && file.size > this.maxSize) {
      this.error = true;
      this.statusMessage = '허용 용량을 초과한 파일입니다.';
      this.dispatchEvent(
        new CustomEvent('error', {
          bubbles: true,
          composed: true,
          detail: { type: 'size', message: this.statusMessage },
        })
      );
      return false;
    }

    this.error = false;
    return true;
  }

  private processFile(file: File): void {
    if (!this.validateFile(file)) return;

    this.rawFile = file;
    if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = URL.createObjectURL(file);

    if (this.enableCrop) {
      this.handleCropReset();
      this.isCropping = true;
      this.statusMessage = '이미지 크롭 모달이 열렸습니다.';
      this.dispatchEvent(
        new CustomEvent('crop-start', {
          bubbles: true,
          composed: true,
          detail: { rawFile: file },
        })
      );
      if (this.cropDialog && !this.cropDialog.open) {
        this.cropDialog.showModal();
      }
    } else {
      this.value = file;
      this.statusMessage = '이미지가 성공적으로 첨부되었습니다.';
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { file, url: this.previewUrl, cropData: {} },
        })
      );
    }
  }

  handleTriggerFileSelect = (): void => {
    if (this.disabled || this.readonly) return;
    this.fileInput?.click();
  };

  handleFileSelect = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.processFile(input.files[0]);
    }
  };

  handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.isDragOver = true;
  };

  handleDragLeave = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
  };

  handleDrop = (e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
    if (this.disabled || this.readonly) return;

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      this.processFile(e.dataTransfer.files[0]);
    }
  };

  handleOpenCrop = (): void => {
    if (this.disabled || this.readonly) return;
    this.handleCropReset();
    this.isCropping = true;
    this.statusMessage = '이미지 크롭 모달이 열렸습니다.';
    if (this.rawFile) {
      this.dispatchEvent(
        new CustomEvent('crop-start', {
          bubbles: true,
          composed: true,
          detail: { rawFile: this.rawFile },
        })
      );
    }
    if (this.cropDialog && !this.cropDialog.open) {
      this.cropDialog.showModal();
    }
  };

  handleCropMouseDown = (e: MouseEvent): void => {
    e.preventDefault();
    this.isDragging = true;
    this.startX = e.clientX - this.cropOffsetX;
    this.startY = e.clientY - this.cropOffsetY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!this.isDragging) return;
      this.cropOffsetX = moveEvent.clientX - this.startX;
      this.cropOffsetY = moveEvent.clientY - this.startY;
    };

    const handleMouseUp = () => {
      this.isDragging = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  handleCropZoom = (e: InputEvent): void => {
    const input = e.target as HTMLInputElement;
    this.cropScale = parseFloat(input.value);
  };

  handleCropReset = (): void => {
    this.cropScale = 1;
    this.cropOffsetX = 0;
    this.cropOffsetY = 0;
  };

  private async generateCroppedResult(): Promise<{ blob: Blob; url: string }> {
    return new Promise((resolve, reject) => {
      if (!this.previewUrl) {
        reject(new Error('미리보기 이미지가 존재하지 않습니다.'));
        return;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Canvas 2D context 생성 실패'));
          return;
        }

        const cropWidth = 300;
        const cropHeight = this.aspectRatio ? cropWidth / this.aspectRatio : 300;

        canvas.width = cropWidth;
        canvas.height = cropHeight;

        ctx.clearRect(0, 0, cropWidth, cropHeight);

        const imgCenterX = cropWidth / 2 + this.cropOffsetX;
        const imgCenterY = cropHeight / 2 + this.cropOffsetY;

        const scaledWidth = img.width * (cropWidth / img.width) * this.cropScale;
        const scaledHeight = img.height * (cropHeight / img.height) * this.cropScale;

        ctx.save();
        ctx.translate(imgCenterX, imgCenterY);
        ctx.drawImage(
          img,
          -scaledWidth / 2,
          -scaledHeight / 2,
          scaledWidth,
          scaledHeight
        );
        ctx.restore();

        const mimeType = this.rawFile ? this.rawFile.type : 'image/png';
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve({ blob, url });
            } else {
              reject(new Error('Canvas Blob 생성 실패'));
            }
          },
          mimeType,
          this.outputQuality
        );
      };
      img.onerror = (err) => reject(err);
      img.src = this.previewUrl;
    });
  }

  handleConfirmCrop = async (): Promise<void> => {
    this.isProcessing = true;
    try {
      const { blob, url } = await this.generateCroppedResult();

      let finalResult: File | Blob | string = blob;
      if (this.outputType === 'file' && this.rawFile) {
        finalResult = new File([blob], this.rawFile.name, { type: blob.type });
      } else if (this.outputType === 'base64') {
        finalResult = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const cropResult: CropResult = {
        file: finalResult,
        url,
        cropData: {
          scale: this.cropScale,
          offsetX: this.cropOffsetX,
          offsetY: this.cropOffsetY,
          aspectRatio: this.aspectRatio,
          quality: this.outputQuality,
        },
      };

      if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(this.previewUrl);
      }

      this.previewUrl = url;
      this.value = finalResult;
      this.isCropping = false;

      if (this.cropDialog?.open) {
        this.cropDialog.close();
      }

      this.statusMessage = '이미지 편집이 완료되었습니다.';

      this.dispatchEvent(
        new CustomEvent('crop-complete', {
          bubbles: true,
          composed: true,
          detail: { croppedResult: cropResult },
        })
      );

      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: cropResult,
        })
      );
    } catch (err) {
      this.error = true;
      this.statusMessage = '이미지 크롭 처리 중 오류가 발생했습니다.';
      this.dispatchEvent(
        new CustomEvent('error', {
          bubbles: true,
          composed: true,
          detail: { type: 'crop', message: this.statusMessage, originalError: err },
        })
      );
    } finally {
      this.isProcessing = false;
    }
  };

  handleCancelCrop = (): void => {
    this.isCropping = false;
    if (this.cropDialog?.open) {
      this.cropDialog.close();
    }
    this.statusMessage = '크롭 작업이 취소되었습니다.';
    this.dispatchEvent(
      new CustomEvent('crop-cancel', {
        bubbles: true,
        composed: true,
      })
    );
  };

  handleRemove = (): void => {
    if (this.disabled || this.readonly) return;

    if (this.previewUrl && this.previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.previewUrl);
    }

    this.value = null;
    this.rawFile = null;
    this.previewUrl = null;
    if (this.fileInput) {
      this.fileInput.value = '';
    }
    this.statusMessage = '이미지가 삭제되었습니다.';

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
  };

  handleKeydown = (e: KeyboardEvent): void => {
    if (this.disabled || this.readonly) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleTriggerFileSelect();
    } else if (e.key === 'Escape' && this.isCropping) {
      e.preventDefault();
      this.handleCancelCrop();
    }
  };

  render() {
    return ImageUploadTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-image-upload': BizImageUpload;
  }
}