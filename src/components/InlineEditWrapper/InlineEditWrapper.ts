import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface InlineEditWrapperHost {
  value: string;
  mode: 'view' | 'edit';
  variant: 'standard' | 'outlined' | 'ghost';
  size: 'small' | 'medium' | 'large';
  trigger: 'click' | 'dblclick' | 'focus';
  showActions: boolean;
  autoSave: boolean;
  disabled: boolean;
  error: boolean;
  loading: boolean;
  fullWidth: boolean;
  handleTrigger: (e: Event) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleSave: (e: Event) => void;
  handleCancel: (e: Event) => void;
  handleBlur: (e: FocusEvent) => void;
}

export const InlineEditWrapperTemplate = (host: InlineEditWrapperHost) => html`
  <div
    class=${classMap({
      'biz-inline-edit-wrapper': true,
      [`biz-inline-edit-wrapper--${host.variant}`]: true,
      [`biz-inline-edit-wrapper--${host.size}`]: true,
      'biz-inline-edit-wrapper--edit': host.mode === 'edit',
      'biz-inline-edit-wrapper--view': host.mode === 'view',
      'biz-inline-edit-wrapper--disabled': host.disabled,
      'biz-inline-edit-wrapper--error': host.error,
      'biz-inline-edit-wrapper--loading': host.loading,
      'biz-inline-edit-wrapper--full-width': host.fullWidth,
    })}
  >
    ${host.mode === 'view'
      ? html`
          <div
            class="biz-inline-edit-wrapper__view"
            role="button"
            tabindex=${host.disabled ? '-1' : '0'}
            aria-label=${`편집하려면 선택하세요: ${host.value}`}
            aria-expanded="false"
            aria-disabled=${host.disabled ? 'true' : 'false'}
            @click=${(e: Event) => host.trigger === 'click' && host.handleTrigger(e)}
            @dblclick=${(e: Event) => host.trigger === 'dblclick' && host.handleTrigger(e)}
            @focus=${(e: Event) => host.trigger === 'focus' && host.handleTrigger(e)}
            @keydown=${host.handleKeyDown}
          >
            <slot name="view-slot">
              <span class="biz-inline-edit-wrapper__value">
                ${host.value || html`<span class="biz-inline-edit-wrapper__placeholder">입력 없음</span>`}
              </span>
            </slot>
            <span class="biz-inline-edit-wrapper__edit-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </span>
          </div>
        `
      : html`
          <div
            class="biz-inline-edit-wrapper__edit"
            aria-expanded="true"
            @blur=${host.handleBlur}
            @keydown=${host.handleKeyDown}
          >
            <div class="biz-inline-edit-wrapper__control">
              <slot></slot>
            </div>
            ${host.showActions
              ? html`
                  <div class="biz-inline-edit-wrapper__actions">
                    <slot name="actions-slot">
                      <button
                        type="button"
                        class="biz-inline-edit-wrapper__btn biz-inline-edit-wrapper__btn--save"
                        ?disabled=${host.disabled || host.loading}
                        @click=${host.handleSave}
                        aria-label="저장"
                      >
                        ✓
                      </button>
                      <button
                        type="button"
                        class="biz-inline-edit-wrapper__btn biz-inline-edit-wrapper__btn--cancel"
                        ?disabled=${host.disabled || host.loading}
                        @click=${host.handleCancel}
                        aria-label="취소"
                      >
                        ✕
                      </button>
                    </slot>
                  </div>
                `
              : ''}
            ${host.loading
              ? html`
                  <div class="biz-inline-edit-wrapper__spinner" aria-label="저장 중"></div>
                `
              : ''}
          </div>
        `}
  </div>
`;