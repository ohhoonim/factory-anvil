import { html } from "lit";

export interface ImageUploadHost {
value: string | File | Blob | null;
accept: string;
maxSize: number | null;
aspectRatio: number | null;
shape: 'square' | 'circle';
enableCrop: boolean;
outputType: 'blob' | 'file' | 'base64';
outputQuality: number;
disabled: boolean;
readonly: boolean;
error: boolean;
isDragOver: boolean;
isCropping: boolean;
isProcessing: boolean;
previewUrl: string | null;
statusMessage: string;

cropScale: number;
cropOffsetX: number;
cropOffsetY: number;

handleFileSelect: (e: Event) => void;
handleDragOver: (e: DragEvent) => void;
handleDragLeave: (e: DragEvent) => void;
handleDrop: (e: DragEvent) => void;
handleTriggerFileSelect: () => void;
handleOpenCrop: () => void;
handleConfirmCrop: () => void;
handleCancelCrop: () => void;
handleRemove: () => void;
handleKeydown: (e: KeyboardEvent) => void;
handleCropMouseDown: (e: MouseEvent) => void;
handleCropZoom: (e: InputEvent) => void;
handleCropReset: () => void;
}

export const ImageUploadTemplate = (host: ImageUploadHost) => {
  return html`
    <div
    class="biz-image-upload__container ${host.isDragOver ? 'biz-image-upload__container--dragover' : ''}"
  >
    <input
      type="file"
      class="biz-image-upload__input"
      accept="${host.accept}"
      ?disabled="${host.disabled || host.readonly}"
      @change="${host.handleFileSelect}"
    />

    ${host.previewUrl
      ? html`
          <div class="biz-image-upload__preview-wrapper">
            <img
              src="${host.previewUrl}"
              alt="업로드된 이미지 미리보기"
              class="biz-image-upload__preview-img"
            />
            ${!host.readonly
              ? html`
                  <div class="biz-image-upload__overlay">
                    <slot name="preview-mask-slot">
                      ${host.enableCrop
                        ? html`
                            <button
                              type="button"
                              class="biz-image-upload__action-btn"
                              role="button"
                              aria-label="이미지 편집"
                              ?disabled="${host.disabled}"
                              @click="${host.handleOpenCrop}"
                            >
                              편집
                            </button>
                          `
                        : ''}
                      <button
                        type="button"
                        class="biz-image-upload__action-btn"
                        role="button"
                        aria-label="이미지 삭제"
                        ?disabled="${host.disabled}"
                        @click="${host.handleRemove}"
                      >
                        삭제
                      </button>
                    </slot>
                  </div>
                `
              : ''}
          </div>
        `
      : html`
          <div
            class="biz-image-upload__dropzone"
            role="button"
            tabindex="${host.disabled ? -1 : 0}"
            aria-label="이미지 업로드 영역"
            aria-describedby="biz-image-upload-helper"
            @click="${host.handleTriggerFileSelect}"
            @keydown="${host.handleKeydown}"
            @dragover="${host.handleDragOver}"
            @dragleave="${host.handleDragLeave}"
            @drop="${host.handleDrop}"
          >
            <slot name="drop-zone-slot">
              <div class="biz-image-upload__drop-content">
                <span>이미지 업로드</span>
              </div>
            </slot>
          </div>
        `}

    ${host.isProcessing
      ? html`
          <div class="biz-image-upload__spinner-overlay">
            <div class="biz-image-upload__spinner"></div>
          </div>
        `
      : ''}
  </div>

  <div class="biz-image-upload__helper-text" id="biz-image-upload-helper">
    <slot name="helper-text-slot"></slot>
  </div>

  <dialog
    class="biz-image-upload__dialog"
    role="dialog"
    aria-modal="true"
    aria-label="이미지 크롭 및 편집"
    ?open="${host.isCropping}"
  >
    <div class="biz-image-upload__crop-container">
      <div
        class="biz-image-upload__crop-canvas"
        @mousedown="${host.handleCropMouseDown}"
      >
        ${host.previewUrl
          ? html`
              <img
                src="${host.previewUrl}"
                alt="크롭 대상 이미지"
                class="biz-image-upload__crop-target"
                style="transform: translate(${host.cropOffsetX}px, ${host.cropOffsetY}px) scale(${host.cropScale});"
              />
            `
          : ''}
        <div
          class="biz-image-upload__crop-mask ${host.shape === 'circle' ? 'biz-image-upload__crop-mask--circle' : ''}"
          style="${host.aspectRatio ? `aspect-ratio: ${host.aspectRatio};` : ''}"
        >
          <div class="biz-image-upload__crop-grid"></div>
        </div>
      </div>

      <div class="biz-image-upload__crop-toolbar">
        <slot name="crop-toolbar-slot">
          <div class="biz-image-upload__crop-controls">
            <label for="biz-crop-zoom" class="biz-image-upload__crop-label">확대/축소</label>
            <input
              id="biz-crop-zoom"
              type="range"
              min="1"
              max="3"
              step="0.05"
              .value="${String(host.cropScale)}"
              @input="${host.handleCropZoom}"
            />
            <button
              type="button"
              class="biz-image-upload__action-btn"
              @click="${host.handleCropReset}"
            >
              초기화
            </button>
          </div>
        </slot>
      </div>

      <div class="biz-image-upload__crop-footer">
        <slot name="crop-footer-slot">
          <button
            type="button"
            class="biz-image-upload__action-btn"
            @click="${host.handleCancelCrop}"
          >
            취소
          </button>
          <button
            type="button"
            class="biz-image-upload__action-btn biz-image-upload__action-btn--primary"
            @click="${host.handleConfirmCrop}"
          >
            확인
          </button>
        </slot>
      </div>
    </div>
  </dialog>

  <div
    class="biz-image-upload__sr-only"
    aria-live="polite"
    aria-atomic="true"
  >
    ${host.statusMessage}
  </div>
</div>
  `;
};