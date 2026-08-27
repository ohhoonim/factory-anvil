import { html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";

export interface MultilineTextInputHost {
  value: string;
  placeholder: string;
  rows: number;
  maxRows: number;
  maxlength?: number;
  showCount: boolean;
  autoResize: boolean;
  resize: 'none' | 'both' | 'horizontal' | 'vertical';
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  handleInput: (event: InputEvent) => void;
  handleChange: (event: Event) => void;
  handleFocus: (event: FocusEvent) => void;
  handleBlur: (event: FocusEvent) => void;
}

export const MultilineTextInputTemplate = (host: MultilineTextInputHost) => {
  const currentLength = host.value ? host.value.length : 0;
  const isOverLength = host.maxlength !== undefined && currentLength > host.maxlength;
  const isError = host.error || isOverLength;

  const helperId = 'helper-text';
  const counterId = 'char-counter';
  const describedBy = [
    host.showCount ? counterId : '',
    helperId
  ].filter(Boolean).join(' ') || undefined;

  return html`
    <div
      class=${classMap({
        'biz-multiline-text-input': true,
        [`biz-multiline-text-input--${host.variant}`]: true,
        [`biz-multiline-text-input--${host.size}`]: true,
        'biz-multiline-text-input--full-width': host.fullWidth,
        'biz-multiline-text-input--disabled': host.disabled,
        'biz-multiline-text-input--readonly': host.readonly,
        'biz-multiline-text-input--error': isError,
        'biz-multiline-text-input--auto-resize': host.autoResize,
      })}
    >
      <div class="biz-multiline-text-input__header">
        <slot name="label-slot" class="biz-multiline-text-input__label-slot"></slot>
        <slot name="header-extra-slot" class="biz-multiline-text-input__header-extra-slot"></slot>
      </div>

      <div class="biz-multiline-text-input__control">
        <textarea
          class="biz-multiline-text-input__textarea"
          .value=${host.value}
          placeholder=${host.placeholder}
          rows=${host.rows}
          style=${styleMap({
            resize: host.autoResize ? 'none' : host.resize,
          })}
          ?required=${host.required}
          ?readonly=${host.readonly}
          ?disabled=${host.disabled}
          aria-invalid=${isError ? 'true' : 'false'}
          aria-required=${host.required ? 'true' : 'false'}
          aria-multiline="true"
          aria-describedby=${ifDefined(describedBy)}
          @input=${host.handleInput}
          @change=${host.handleChange}
          @focus=${host.handleFocus}
          @blur=${host.handleBlur}
        ></textarea>
      </div>

      <div class="biz-multiline-text-input__footer">
        <div class="biz-multiline-text-input__footer-left">
          <slot name="helper-text-slot" id=${helperId} class="biz-multiline-text-input__helper-text-slot"></slot>
          <slot name="footer-extra-slot" class="biz-multiline-text-input__footer-extra-slot"></slot>
        </div>

        ${host.showCount
          ? html`
              <div
                id=${counterId}
                class=${classMap({
                  'biz-multiline-text-input__counter': true,
                  'biz-multiline-text-input__counter--error': isOverLength,
                })}
                aria-live="polite"
              >
                <span class="biz-multiline-text-input__counter-current">${currentLength}</span>
                ${host.maxlength !== undefined
                  ? html`<span class="biz-multiline-text-input__counter-max">/ ${host.maxlength}</span>`
                  : nothing}
              </div>
            `
          : nothing}
      </div>
    </div>
  `;
};