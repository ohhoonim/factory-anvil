import { LitElement } from 'lit';
import { customElement, property, state, query } from "lit/decorators.js";
import { FileUploaderTemplate } from "./FileUploader";
import { fileUploaderStyles } from "./FileUploader.css";

/**
 * @element biz-file-uploader
 * 
 * @slot label-slot
 * @slot upload-button-slot
 * @slot drop-zone-content-slot
 * @slot upload-button-slot
 * @slot file-item-slot
 * @slot helper-text-slot
 */
@customElement('biz-file-uploader')
export class FileUploader extends LitElement {
  static styles = fileUploaderStyles;

  @property({ type: Array }) value: Array<File | any> = [];
  @property({ type: String }) accept: string | null = null;
  @property({ type: Boolean }) multiple = false;
  @property({ type: Number, attribute: 'max-size' }) maxSize: number | null = null;
  @property({ type: Number, attribute: 'max-count' }) maxCount: number | null = null;
  @property({ type: Boolean, attribute: 'auto-upload' }) autoUpload = true;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String }) variant: 'dropzone' | 'button' | 'compact' = 'dropzone';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  @state() private dragover = false;
  @state() private uploading = false;

  @query('.hidden-input') private fileInput!: HTMLInputElement;

  private handleTriggerClick() {
    if (this.disabled || this.readonly) return;
    this.fileInput?.click();
  }

  private handleDragOver(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.dragover = true;
  }

  private handleDragLeave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragover = false;
  }

  private handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.dragover = false;

    if (this.disabled || this.readonly) return;

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      this.processFiles(Array.from(files));
    }
  }

  private handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFiles(Array.from(input.files));
      input.value = '';
    }
  }

  private processFiles(incomingFiles: File[]) {
    let validFiles: File[] = [];

    for (const file of incomingFiles) {
      if (this.accept) {
        const acceptedTypes = this.accept.split(',').map((t) => t.trim().toLowerCase());
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
        const mimeType = file.type.toLowerCase();

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension === type;
          }
          if (type.endsWith('/*')) {
            return mimeType.startsWith(type.replace('/*', ''));
          }
          return mimeType === type;
        });

        if (!isAccepted) {
          this.dispatchEvent(
            new CustomEvent('error', {
              bubbles: true,
              composed: true,
              detail: { type: 'extension', message: `허용되지 않은 파일 형식입니다: ${file.name}` }
            })
          );
          continue;
        }
      }

      if (this.maxSize && file.size > this.maxSize) {
        this.dispatchEvent(
          new CustomEvent('error', {
            bubbles: true,
            composed: true,
            detail: { type: 'size', message: `파일 용량이 제한을 초과했습니다: ${file.name}` }
          })
        );
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    if (!this.multiple) {
      validFiles = [validFiles[0]];
    }

    if (this.maxCount && this.value.length + validFiles.length > this.maxCount) {
      this.dispatchEvent(
        new CustomEvent('error', {
          bubbles: true,
          composed: true,
          detail: { type: 'count', message: `최대 업로드 파일 개수(${this.maxCount}개)를 초과했습니다.` }
        })
      );
      return;
    }

    const updatedValue = this.multiple ? [...this.value, ...validFiles] : [...validFiles];
    this.value = updatedValue;

    this.dispatchEvent(
      new CustomEvent('file-add', {
        bubbles: true,
        composed: true,
        detail: { addedFiles: validFiles }
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { files: this.value }
      })
    );

    if (this.value.length === 0) {
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
          detail: {}
        })
      );
    }
  }

  private handleFileRemove(removedFile: File | any, index: number) {
    if (this.disabled || this.readonly) return;

    const updatedValue = this.value.filter((_, i) => i !== index);
    this.value = updatedValue;

    this.dispatchEvent(
      new CustomEvent('file-remove', {
        bubbles: true,
        composed: true,
        detail: { removedFile }
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { files: this.value }
      })
    );

    if (this.value.length === 0) {
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
          detail: {}
        })
      );
    }
  }

  render() {
    return FileUploaderTemplate(this);
  }
}