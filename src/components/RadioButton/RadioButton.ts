import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface RadioButtonHost {
  checked: boolean;
  value: string | number | boolean;
  name: string;
  size: 'small' | 'medium' | 'large';
  variant: 'standard' | 'button' | 'card' | 'outlined' | 'filled';
  labelPosition: 'right' | 'left';
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  helperTextId: string;
  handleInputChange: (e: Event) => void;
  handleFocus: (e: FocusEvent) => void;
  handleBlur: (e: FocusEvent) => void;
}

export const RadioButtonTemplate = (host: RadioButtonHost) => html`
  <div
    class=${classMap({
      'biz-radio-button': true,
      'biz-radio-button--checked': host.checked,
      'biz-radio-button--disabled': host.disabled,
      'biz-radio-button--readonly': host.readonly,
      'biz-radio-button--error': host.error,
      [`biz-radio-button--${host.size}`]: Boolean(host.size),
      [`biz-radio-button--${host.variant}`]: Boolean(host.variant),
      [`biz-radio-button--label-${host.labelPosition}`]: Boolean(host.labelPosition),
    })}
  >
    <label class="biz-radio-button__container">
      <slot name="start-slot"></slot>

      <div class="biz-radio-button__wrapper">
        <input
          type="radio"
          class="biz-radio-button__input"
          .name=${host.name}
          .value=${String(host.value)}
          .checked=${host.checked}
          .disabled=${host.disabled}
          .readOnly=${host.readonly}
          aria-checked=${host.checked ? 'true' : 'false'}
          aria-invalid=${host.error ? 'true' : 'false'}
          aria-describedby=${host.helperTextId}
          @change=${host.handleInputChange}
          @focus=${host.handleFocus}
          @blur=${host.handleBlur}
        />
        <span class="biz-radio-button__control">
          <slot name="icon-slot">
            <span class="biz-radio-button__inner-dot"></span>
          </slot>
        </span>

        <span class="biz-radio-button__label">
          <slot name="label-slot">
            <slot></slot>
          </slot>
        </span>
      </div>

      <slot name="end-slot"></slot>
    </label>

    <div id=${host.helperTextId} class="biz-radio-button__description">
      <slot name="description-slot">
        <slot name="helper-text-slot"></slot>
      </slot>
    </div>
  </div>
`;