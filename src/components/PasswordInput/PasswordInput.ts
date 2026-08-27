import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
export interface PasswordInputHost {
  value: string;
  placeholder: string;
  visible: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  clearable: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  
  // label-slot 주입 상태 및 이벤트 핸들러
  hasLabel: boolean;
  handleLabelSlotChange(event: Event): void;

  handleInput(event: InputEvent): void;
  handleChange(event: Event): void;
  handleToggleVisibility(event: MouseEvent): void;
  handleClear(event: MouseEvent): void;
  handleFocus(event: FocusEvent): void;
  handleBlur(event: FocusEvent): void;
  handleKeyDown(event: KeyboardEvent): void;
}

export const PasswordInputTemplate = (host: PasswordInputHost) => {
  const inputType = host.visible ? 'text' : 'password';
  const toggleLabel = host.visible ? '비밀번호 숨기기' : '비밀번호 표시';

  return html`
    <div
      class=${classMap({
        'biz-password-input': true,
        [`biz-password-input--${host.variant}`]: Boolean(host.variant),
        [`biz-password-input--${host.size}`]: Boolean(host.size),
        'biz-password-input--disabled': host.disabled,
        'biz-password-input--readonly': host.readonly,
        'biz-password-input--error': host.error,
        'biz-password-input--full-width': host.fullWidth,
      })}
    >
      ${host.hasLabel
        ? html`
            <div class="biz-password-input__label-area">
              <slot name="label-slot" @slotchange=${host.handleLabelSlotChange}></slot>
              ${host.required ? html`<span class="biz-password-input__required-asterisk" aria-hidden="true">*</span>` : ''}
            </div>
          `
        : html`
            <slot name="label-slot" style="display: none;" @slotchange=${host.handleLabelSlotChange}></slot>
          `}

      <div class="biz-password-input__control">
        <slot name="start-slot"></slot>

        <input
          id="password-input-control"
          class="biz-password-input__field"
          type=${inputType}
          .value=${host.value}
          placeholder=${host.placeholder}
          ?disabled=${host.disabled}
          ?readonly=${host.readonly}
          ?required=${host.required}
          aria-invalid=${host.error ? 'true' : 'false'}
          aria-required=${host.required ? 'true' : 'false'}
          aria-describedby="helper-text-slot-container"
          @input=${host.handleInput}
          @change=${host.handleChange}
          @focus=${host.handleFocus}
          @blur=${host.handleBlur}
          @keydown=${host.handleKeyDown}
        />

        ${host.clearable && host.value && !host.disabled && !host.readonly
          ? html`
              <button
                type="button"
                class="biz-password-input__clear-btn"
                aria-label="입력값 초기화"
                @click=${host.handleClear}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
            `
          : ''}

        <button
          type="button"
          class="biz-password-input__toggle-btn"
          aria-label=${toggleLabel}
          aria-pressed=${host.visible ? 'true' : 'false'}
          ?disabled=${host.disabled || host.readonly}
          @click=${host.handleToggleVisibility}
        >
          <slot name="toggle-icon-slot">
            ${host.visible
              ? html`
                  <svg class="biz-password-input__icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/>
                  </svg>
                `
              : html`
                  <svg class="biz-password-input__icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                `}
          </slot>
        </button>

        <slot name="end-slot"></slot>
      </div>

      <div id="helper-text-slot-container" class="biz-password-input__helper-area" aria-live="polite">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};