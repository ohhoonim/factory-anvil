import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { FileUploaderTemplate } from './FileUploader.js';
import { fileUploaderStyles } from './FileUploader.css.js';
import type { FileUploaderHost, FileUploadedFile } from './FileUploader.js';

@customElement('biz-file-uploader')
export class BizFileUploader extends LitElement implements FileUploaderHost {
  static override styles = fileUploaderStyles;

  @property({ type: Array })
  value: (File | FileUploadedFile)[] = [];

  @property({ type: String })
  accept: string | null = null;

  @property({ type: Boolean })
  multiple = false;

  @property({ type: Number, attribute: 'max-size' })
  maxSize: number | null = null;

  @property({ type: Number, attribute: 'max-count' })
  maxCount: number | null = null;

  @property({ type: Boolean, attribute: 'auto-upload' })
  autoUpload = true;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String })
  variant: 'button' | 'dropzone' | 'compact' = 'dropzone';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @state()
  isDragOver = false;

  @state()
  isUploading = false;

  @state()
  errorMessage = '';

  @query('input[type="file"]')
  private fileInput!: HTMLInputElement;

  renderFileInput() {
    return html`
      <input
        type="file"
        class="biz-file-uploader__sr-only"
        tabindex="-1"
        .accept=${this.accept ?? ''}
        ?multiple=${this.multiple}
        ?disabled=${this.disabled || this.readonly}
        @change=${this.handleFileInputChange}
      />
    `;
  }

  handleTriggerClick = () => {
    if (this.disabled || this.readonly) return;
    if (this.fileInput) {
      this.fileInput.click();
    }
  };

  handleFileInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      this.processFiles(Array.from(target.files));
    }
    target.value = '';
  };

  handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.isDragOver = true;
  };

  handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
  };

  handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;

    if (this.disabled || this.readonly) return;

    if (e.dataTransfer?.files) {
      this.processFiles(Array.from(e.dataTransfer.files));
    }
  };

  handleFileRemove = (file: File | FileUploadedFile, index: number) => {
    if (this.disabled || this.readonly) return;

    const newValue = [...this.value];
    const removedFile = newValue.splice(index, 1)[0];
    this.value = newValue;

    this.dispatchEvent(
      new CustomEvent('file-remove', {
        bubbles: true,
        composed: true,
        detail: { removedFile },
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { files: this.value },
      })
    );

    if (this.value.length === 0) {
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private validateFile(file: File): { valid: boolean; type?: 'size' | 'extension' | 'count'; message?: string } {
    if (this.maxSize && file.size > this.maxSize) {
      return {
        valid: false,
        type: 'size',
        message: `File size exceeds the limit (${(this.maxSize / 1024 / 1024).toFixed(1)}MB).`,
      };
    }

    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map((item) => item.trim());
      const fileName = file.name.toLowerCase();
      const fileType = file.type.toLowerCase();

      const isValid = acceptedTypes.some((type) => {
        if (type.startsWith('.')) {
          return fileName.endsWith(type.toLowerCase());
        }
        if (type.endsWith('/*')) {
          const baseType = type.replace('/*', '');
          return fileType.startsWith(baseType);
        }
        return fileType === type.toLowerCase();
      });

      if (!isValid) {
        return {
          valid: false,
          type: 'extension',
          message: 'Unsupported file format.',
        };
      }
    }

    return { valid: true };
  }

  private processFiles(incomingFiles: File[]) {
    this.errorMessage = '';

    if (!this.multiple && incomingFiles.length > 1) {
      incomingFiles = [incomingFiles[0]];
    }

    if (this.maxCount && this.value.length + incomingFiles.length > this.maxCount) {
      const errorDetail = {
        type: 'count' as const,
        message: `Maximum file count (${this.maxCount}) exceeded.`,
      };
      this.errorMessage = errorDetail.message;
      this.dispatchEvent(
        new CustomEvent('error', {
          bubbles: true,
          composed: true,
          detail: errorDetail,
        })
      );
      return;
    }

    const validFiles: File[] = [];

    for (const file of incomingFiles) {
      const validation = this.validateFile(file);
      if (!validation.valid) {
        const errorDetail = {
          type: validation.type!,
          message: validation.message!,
        };
        this.errorMessage = errorDetail.message;
        this.dispatchEvent(
          new CustomEvent('error', {
            bubbles: true,
            composed: true,
            detail: errorDetail,
          })
        );
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      this.value = this.multiple ? [...this.value, ...validFiles] : [...validFiles];

      this.dispatchEvent(
        new CustomEvent('file-add', {
          bubbles: true,
          composed: true,
          detail: { addedFiles: validFiles },
        })
      );

      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { files: this.value },
        })
      );
    }
  }

  protected override render() {
    return FileUploaderTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-file-uploader': BizFileUploader;
  }
}