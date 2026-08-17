import { html, type TemplateResult } from 'lit';

export interface ImageUploadTemplateProps {
  rootClasses: string;
  value: any;
  accept: string;
  maxSize: number | null;
  aspectRatio: number | null;
  shape: string;
  enableCrop: boolean;
  outputType: string;
  outputQuality: number;
  disabled: boolean;
  readonly: boolean;
  error: boolean;
  isDragOver: boolean;
  isCropping: boolean;
  isProcessing: boolean;
  previewUrl: string | null;
  liveMessage: string;
  onTriggerFileInput: () => void;
  onFileChange: (e: Event) => void;
  onDragOver: (e: DragEvent) => void;
  onDragLeave: (e: DragEvent) => void;
  onDrop: (e: DragEvent) => void;
  onRemove: (e: Event) => void;
  onCropConfirm: () => void;
  onCropCancel: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

export const ImageUploadTemplate = (props: ImageUploadTemplateProps): TemplateResult => {
  return html`
    <div class="${props.rootClasses}">
      <!-- Label Slot -->
      <div class="biz-image-upload__label">
        <slot name="label-slot"></slot>
      </div>

      <!-- Main Container (Drop Zone / Preview) -->
      <div
        class="biz-image-upload__container"
        role="button"
        tabindex="${props.disabled ? -1 : 0}"
        aria-disabled="${props.disabled}"
        aria-invalid="${props.error}"
        @click=${props.onTriggerFileInput}
        @dragover=${props.onDragOver}
        @dragleave=${props.onDragLeave}
        @drop=${props.onDrop}
        @keydown=${props.onKeyDown}
      >
        <input
          type="file"
          class="biz-image-upload__input"
          accept="${props.accept}"
          ?disabled=${props.disabled || props.readonly}
          @change=${props.onFileChange}
        />

        ${props.previewUrl
          ? html`
              <img
                src="${props.previewUrl}"
                alt="업로드된 이미지 미리보기"
                class="biz-image-upload__preview-img"
              />
              <div class="biz-image-upload__overlay">
                <slot name="preview-mask-slot">
                  ${!props.readonly
                    ? html`
                        <button
                          type="button"
                          class="biz-image-upload__overlay-btn"
                          aria-label="이미지 삭제"
                          @click=${props.onRemove}
                        >
                          삭제
                        </button>
                      `
                    : ''}
                </slot>
              </div>
            `
          : html`
              <div class="biz-image-upload__drop-zone">
                <slot name="drop-zone-slot">
                  <span>이미지를 드래그하거나 클릭하여 업로드</span>
                </slot>
              </div>
            `}
      </div>

      <!-- Helper Text Slot -->
      <div class="biz-image-upload__helper-text">
        <slot name="helper-text-slot"></slot>
      </div>

      <!-- Screen Reader Live Region -->
      <div class="sr-only" aria-live="polite">${props.liveMessage}</div>

      <!-- Crop Modal -->
      ${props.isCropping
        ? html`
            <div class="biz-image-upload__modal-backdrop">
              <div
                class="biz-image-upload__modal"
                role="dialog"
                aria-modal="true"
                aria-label="이미지 자르기 편집"
              >
                <div class="biz-image-upload__crop-canvas">
                  <span>Crop Area</span>
                </div>
                <div class="biz-image-upload__crop-toolbar">
                  <slot name="crop-toolbar-slot"></slot>
                </div>
                <div class="biz-image-upload__crop-footer">
                  <slot name="crop-footer-slot">
                    <button
                      type="button"
                      class="biz-image-upload__btn"
                      @click=${props.onCropCancel}
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      class="biz-image-upload__btn biz-image-upload__btn--primary"
                      ?disabled=${props.isProcessing}
                      @click=${props.onCropConfirm}
                    >
                      확인
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          `
        : ''}
    </div>
  `;
};