import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface FileUploadedFile {
  id?: string;
  name: string;
  size: number;
  type?: string;
  status?: 'idle' | 'uploading' | 'success' | 'error';
  progress?: number;
  errorMessage?: string;
}

export interface FileUploaderHost {
  value: (File | FileUploadedFile)[];
  accept: string | null;
  multiple: boolean;
  maxSize: number | null;
  maxCount: number | null;
  autoUpload: boolean;
  disabled: boolean;
  readonly: boolean;
  error: boolean;
  variant: 'button' | 'dropzone' | 'compact';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  isDragOver: boolean;
  isUploading: boolean;
  errorMessage: string;
  handleFileInputChange: (e: Event) => void;
  handleDragOver: (e: DragEvent) => void;
  handleDragLeave: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  handleTriggerClick: () => void;
  handleFileRemove: (file: File | FileUploadedFile, index: number) => void;
  renderFileInput: () => unknown;
}

export const FileUploaderTemplate = (host: FileUploaderHost) => {
  const isDropzone = host.variant === 'dropzone';
  const isCompact = host.variant === 'compact';
  const isButton = host.variant === 'button';

  return html`
    <div
      class=${classMap({
        'biz-file-uploader': true,
        [`biz-file-uploader--${host.size}`]: true,
        [`biz-file-uploader--${host.variant}`]: true,
        'biz-file-uploader--disabled': host.disabled,
        'biz-file-uploader--readonly': host.readonly,
        'biz-file-uploader--error': host.error || Boolean(host.errorMessage),
        'biz-file-uploader--dragover': host.isDragOver,
        'biz-file-uploader--uploading': host.isUploading,
        'biz-file-uploader--full-width': host.fullWidth,
      })}
    >
      ${host.renderFileInput()}

      <div class="biz-file-uploader__label-area">
        <slot name="label-slot"></slot>
      </div>

      ${isDropzone
        ? html`
            <div
              class="biz-file-uploader__dropzone"
              role="button"
              tabindex=${host.disabled ? '-1' : '0'}
              aria-dropeffect="copy"
              aria-disabled=${host.disabled}
              aria-readonly=${host.readonly}
              aria-invalid=${host.error || Boolean(host.errorMessage)}
              @click=${host.handleTriggerClick}
              @dragover=${host.handleDragOver}
              @dragleave=${host.handleDragLeave}
              @drop=${host.handleDrop}
            >
              <slot name="drop-zone-content-slot">
                <div class="biz-file-uploader__dropzone-default">
                  <svg class="biz-file-uploader__upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="biz-file-uploader__dropzone-text">
                    drag and drop files here or <span class="biz-file-uploader__browse-text">browse</span>
                  </p>
                </div>
              </slot>
            </div>
          `
        : isCompact
        ? html`
            <div
              class="biz-file-uploader__compact"
              role="button"
              tabindex=${host.disabled ? '-1' : '0'}
              aria-disabled=${host.disabled}
              aria-readonly=${host.readonly}
              aria-invalid=${host.error || Boolean(host.errorMessage)}
              @click=${host.handleTriggerClick}
              @dragover=${host.handleDragOver}
              @dragleave=${host.handleDragLeave}
              @drop=${host.handleDrop}
            >
              <slot name="drop-zone-content-slot">
                <div class="biz-file-uploader__compact-default">
                  <svg class="biz-file-uploader__compact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </slot>
            </div>
          `
        : html`
            <div class="biz-file-uploader__button-wrapper">
              <slot name="upload-button-slot">
                <button
                  type="button"
                  class="biz-file-uploader__button"
                  ?disabled=${host.disabled || host.readonly}
                  @click=${host.handleTriggerClick}
                >
                  Upload File
                </button>
              </slot>
            </div>
          `}

      <div class="biz-file-uploader__file-list" role="list">
        ${host.value.map((file, index) => {
          const fileName = 'name' in file ? file.name : '';
          const fileSize = 'size' in file ? file.size : 0;
          const status = 'status' in file ? file.status : 'idle';
          const progress = 'progress' in file ? file.progress : 0;

          return html`
            <div
              class="biz-file-uploader__file-item"
              role="listitem"
              aria-label="${fileName}, ${(fileSize / 1024).toFixed(1)} KB"
            >
              <slot name="file-item-slot">
                <div class="biz-file-uploader__file-item-inner">
                  <svg class="biz-file-uploader__file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div class="biz-file-uploader__file-info">
                    <span class="biz-file-uploader__file-name">${fileName}</span>
                    <span class="biz-file-uploader__file-size">${(fileSize / 1024).toFixed(1)} KB</span>
                  </div>
                  ${status === 'uploading'
                    ? html`
                        <div class="biz-file-uploader__progress">
                          <div class="biz-file-uploader__progress-bar" style="width: ${progress}%"></div>
                        </div>
                      `
                    : ''}
                  ${!host.readonly && !host.disabled
                    ? html`
                        <button
                          type="button"
                          class="biz-file-uploader__remove-btn"
                          aria-label="Remove ${fileName}"
                          @click=${() => host.handleFileRemove(file, index)}
                        >
                          &times;
                        </button>
                      `
                    : ''}
                </div>
              </slot>
            </div>
          `;
        })}
      </div>

      <div class="biz-file-uploader__helper-area">
        <slot name="helper-text-slot">
          ${host.errorMessage
            ? html`<span class="biz-file-uploader__error-text">${host.errorMessage}</span>`
            : ''}
        </slot>
      </div>

      <div class="biz-file-uploader__sr-only" aria-live="polite" aria-atomic="true">
        ${host.isDragOver ? 'File over dropzone' : ''}
        ${host.errorMessage ? host.errorMessage : ''}
      </div>
    </div>
  `;
};