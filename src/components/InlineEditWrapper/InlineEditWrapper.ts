import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface InlineEditWrapperTemplateProps {
  value: string;
  mode: 'view' | 'edit';
  trigger: 'click' | 'dblclick' | 'focus';
  variant: 'standard' | 'outlined' | 'ghost';
  size: 'small' | 'medium' | 'large';
  showActions: boolean;
  autoSave: boolean;
  disabled: boolean;
  error: boolean;
  loading: boolean;
  onViewTrigger: (e: Event) => void;
  onViewKeyDown: (e: KeyboardEvent) => void;
  onEditKeyDown: (e: KeyboardEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onSave: (e: Event) => void;
  onCancel: (e: Event) => void;
}

export const InlineEditWrapperTemplate = (props: InlineEditWrapperTemplateProps) => {
  const isEdit = props.mode === 'edit';
  const ariaLabel = `편집하려면 선택하세요: ${props.value || '값 없음'}`;

  return html`
    <div
      class=${classMap({
        'biz-inline-edit-wrapper': true,
        [`biz-inline-edit-wrapper--${props.variant}`]: true,
        [`biz-inline-edit-wrapper--${props.size}`]: true,
        'biz-inline-edit-wrapper--edit': isEdit,
        'biz-inline-edit-wrapper--view': !isEdit,
        'biz-inline-edit-wrapper--disabled': props.disabled,
        'biz-inline-edit-wrapper--error': props.error,
        'biz-inline-edit-wrapper--loading': props.loading,
      })}
    >
      ${!isEdit
        ? html`
            <div
              class="biz-inline-edit-wrapper__view"
              role="button"
              tabindex=${props.disabled ? -1 : 0}
              aria-label=${ariaLabel}
              aria-expanded="false"
              aria-disabled=${props.disabled ? 'true' : 'false'}
              @click=${props.trigger === 'click' ? props.onViewTrigger : null}
              @dblclick=${props.trigger === 'dblclick' ? props.onViewTrigger : null}
              @focus=${props.trigger === 'focus' ? props.onViewTrigger : null}
              @keydown=${props.onViewKeyDown}
            >
              <slot name="view-slot">
                <span class="biz-inline-edit-wrapper__view-text">
                  ${props.value || html`<span class="biz-inline-edit-wrapper__placeholder">입력하세요</span>`}
                </span>
              </slot>
            </div>
          `
        : html`
            <div
              class="biz-inline-edit-wrapper__edit"
              aria-expanded="true"
              @keydown=${props.onEditKeyDown}
              @focusout=${props.autoSave ? props.onBlur : null}
            >
              <div class="biz-inline-edit-wrapper__control">
                <slot></slot>
              </div>

              ${props.showActions
                ? html`
                    <div class="biz-inline-edit-wrapper__actions">
                      <slot name="actions-slot">
                        <button
                          type="button"
                          class="biz-inline-edit-wrapper__btn biz-inline-edit-wrapper__btn--save"
                          ?disabled=${props.disabled || props.loading}
                          @click=${props.onSave}
                        >
                          저장
                        </button>
                        <button
                          type="button"
                          class="biz-inline-edit-wrapper__btn biz-inline-edit-wrapper__btn--cancel"
                          ?disabled=${props.disabled || props.loading}
                          @click=${props.onCancel}
                        >
                          취소
                        </button>
                      </slot>
                    </div>
                  `
                : ''}
            </div>
          `}
      ${props.loading
        ? html`
            <div class="biz-inline-edit-wrapper__spinner" aria-hidden="true">
              <span class="biz-inline-edit-wrapper__spinner-icon"></span>
            </div>
          `
        : ''}
    </div>
  `;
};