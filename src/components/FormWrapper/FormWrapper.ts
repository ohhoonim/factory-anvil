import { html } from 'lit';
import { classMap } from "lit/directives/class-map.js";

export const FormWrapperTemplate = (host: any) => {
  const hasError = Boolean(host.errorMessage);
  const hasSuccess = Boolean(host.successMessage) && !hasError;
  
  const messageText = host.errorMessage || host.successMessage || host.helperText;

  return html`
    <div
      class=${classMap({
        'biz-form-wrapper': true,
        [`biz-form-wrapper--${host.layout}`]: Boolean(host.layout),
        'biz-form-wrapper--disabled': host.disabled,
        'biz-form-wrapper--focused': host.isFocused,
        'biz-form-wrapper--error': hasError,
        'biz-form-wrapper--success': hasSuccess,
        'biz-form-wrapper--full-width': host.fullWidth,
      })}
      style=${host.labelWidth ? `--ui-form-wrapper-label-width: ${host.labelWidth}` : ''}
      @focusin=${host.handleFocusIn}
      @focusout=${host.handleFocusOut}
      @keydown=${host.handleKeyDown}
    >
      <div class="biz-form-wrapper__label-area" @click=${host.handleLabelClick}>
        <slot name="label-slot">
          ${host.label
            ? html`
                <label class="biz-form-wrapper__label">
                  ${host.label}
                  ${host.required ? html`<span class="biz-form-wrapper__required" aria-hidden="true">*</span>` : ''}
                </label>
              `
            : ''}
        </slot>
        <slot name="extra-slot"></slot>
      </div>

      <div class="biz-form-wrapper__control-container">
        <div class="biz-form-wrapper__input-area">
          <slot @slotchange=${host.handleSlotChange}></slot>
        </div>

        ${messageText
          ? html`
              <div
                id=${host.helperTextId}
                class="biz-form-wrapper__message-area"
                role=${hasError ? 'alert' : 'status'}
              >
                <slot name="helper-text-slot">
                  <span class="biz-form-wrapper__message">${messageText}</span>
                </slot>
              </div>
            `
          : html`
              <div class="biz-form-wrapper__message-area">
                <slot name="helper-text-slot"></slot>
              </div>
            `}
      </div>
    </div>
  `;
};