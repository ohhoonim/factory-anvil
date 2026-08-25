import { html } from 'lit';
import { classMap } from "lit/directives/class-map.js";

export const PasswordInputTemplate = (host: any) => {
  const {
    value = '',
    placeholder = '',
    visible = false,
    required = false,
    readonly = false,
    disabled = false,
    error = false,
    clearable = false,
    variant = 'outlined',
    size = 'medium',
    fullWidth = false,
    handleInput,
    handleChange,
    handleToggleVisibility,
    handleClear,
    handleFocus,
    handleBlur,
  } = host;

  const inputType = visible ? 'text' : 'password';
  const toggleAriaLabel = visible ? '비밀번호 숨기기' : '비밀번호 표시';
  const toggleAriaPressed = visible ? 'true' : 'false';

  return html`
    <div
      class=${classMap({
        'biz-password-input': true,
        [`biz-password-input--${variant}`]: true,
        [`biz-password-input--${size}`]: true,
        'biz-password-input--full-width': fullWidth,
        'biz-password-input--disabled': disabled,
        'biz-password-input--readonly': readonly,
        'biz-password-input--error': error,
      })}
    >
      <div class="biz-password-input__label-container">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-password-input__control">
        <slot name="start-slot"></slot>

        <input
          id="input"
          class="biz-password-input__field"
          type=${inputType}
          .value=${value}
          placeholder=${placeholder}
          ?disabled=${disabled}
          ?readonly=${readonly}
          ?required=${required}
          aria-invalid=${error ? 'true' : 'false'}
          aria-required=${required ? 'true' : 'false'}
          aria-describedby="helper-text"
          @input=${handleInput}
          @change=${handleChange}
          @focus=${handleFocus}
          @blur=${handleBlur}
        />

        ${clearable && value && !disabled && !readonly
          ? html`
              <button
                type="button"
                class="biz-password-input__clear-button"
                aria-label="입력 내용 초기화"
                @click=${handleClear}
              >
                ✕
              </button>
            `
          : ''}

        <button
          type="button"
          class="biz-password-input__toggle-button"
          aria-label=${toggleAriaLabel}
          aria-pressed=${toggleAriaPressed}
          ?disabled=${disabled || readonly}
          @click=${handleToggleVisibility}
        >
          <slot name="toggle-icon-slot">
            ${visible
              ? html`<svg class="biz-password-input__icon" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`
              : html`<svg class="biz-password-input__icon" viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>`}
          </slot>
        </button>

        <slot name="end-slot"></slot>
      </div>

      <div id="helper-text" class="biz-password-input__helper-container">
        <slot name="helper-text-slot"></slot>
      </div>

      <span class="biz-password-input__sr-only" aria-live="polite">
        ${visible ? '비밀번호가 표시되었습니다.' : '비밀번호가 숨겨졌습니다.'}
      </span>
    </div>
  `;
};