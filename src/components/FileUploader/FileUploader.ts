import { html } from "lit";

export const FileUploaderTemplate = (host: any) => {
  const {
    variant = 'dropzone',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    readonly = false,
    error = false,
    dragover = false,
    uploading = false,
    value = [],
    accept,
    multiple = false,
    helperText,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    handleTriggerClick,
    handleFileRemove
  } = host;

  return html`
    <div
      class="biz-file-uploader variant-${variant} size-${size} ${fullWidth ? 'full-width' : ''} ${disabled ? 'is-disabled' : ''} ${readonly ? 'is-readonly' : ''} ${error ? 'is-error' : ''} ${dragover ? 'is-dragover' : ''} ${uploading ? 'is-uploading' : ''}"
    >
      <div class="label-container">
        <slot name="label-slot"></slot>
      </div>

      <input
        type="file"
        class="hidden-input"
        ?disabled="${disabled || readonly}"
        ?multiple="${multiple}"
        accept="${accept || ''}"
        tabindex="0"
        @change="${handleFileSelect}"
      />

      ${variant === 'button'
        ? html`
            <div class="trigger-button-wrapper">
              <slot name="upload-button-slot">
                <button
                  type="button"
                  class="upload-btn"
                  ?disabled="${disabled || readonly}"
                  @click="${handleTriggerClick}"
                >
                  파일 선택
                </button>
              </slot>
            </div>
          `
        : html`
            <div
              class="drop-zone"
              role="button"
              tabindex="${disabled ? -1 : 0}"
              aria-dropeffect="copy"
              aria-invalid="${error ? 'true' : 'false'}"
              @dragover="${handleDragOver}"
              @dragleave="${handleDragLeave}"
              @drop="${handleDrop}"
              @click="${handleTriggerClick}"
            >
              <slot name="drop-zone-content-slot">
                <div class="drop-zone-default-content">
                  <span class="drop-zone-icon">📁</span>
                  <span class="drop-zone-text">파일을 여기에 드롭하거나 클릭하여 업로드하세요</span>
                </div>
              </slot>

              <slot name="upload-button-slot"></slot>
            </div>
          `}

      ${value && value.length > 0
        ? html`
            <ul class="file-list" role="list">
              ${value.map(
                (file: any, index: number) => html`
                  <li class="file-item" aria-label="${file.name} ${file.size ? file.size + ' bytes' : ''}">
                    <slot name="file-item-slot">
                      <div class="file-item-info">
                        <span class="file-name">${file.name}</span>
                        <span class="file-size">${file.size ? `${Math.round(file.size / 1024)} KB` : ''}</span>
                      </div>
                      ${file.progress !== undefined && file.progress < 100
                        ? html`
                            <div class="progress-bar-container">
                              <div class="progress-bar" style="width: ${file.progress}%"></div>
                            </div>
                          `
                        : ''}
                      ${!readonly && !disabled
                        ? html`
                            <button
                              type="button"
                              class="remove-btn"
                              aria-label="삭제"
                              @click="${(e: Event) => {
                                e.stopPropagation();
                                handleFileRemove(file, index);
                              }}"
                            >
                              ✕
                            </button>
                          `
                        : ''}
                    </slot>
                  </li>
                `
              )}
            </ul>
          `
        : ''}

      <div class="helper-container">
        <slot name="helper-text-slot">
          ${helperText ? html`<span class="helper-text">${helperText}</span>` : ''}
        </slot>
      </div>
    </div>
  `;
};