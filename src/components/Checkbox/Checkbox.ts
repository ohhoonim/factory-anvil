import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface CheckboxHost {
  checked: boolean;
  value: string | number;
  indeterminate: boolean;
  labelPosition: 'right' | 'left';
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  size: 'small' | 'medium' | 'large';
  variant: 'standard' | 'button' | 'card';
  descriptionId: string;
  handleInputChange: (event: Event) => void;
  handleFocus: (event: FocusEvent) => void;
  handleBlur: (event: FocusEvent) => void;
}

export const CheckboxTemplate = (host: CheckboxHost) => html`
  <div
    class=${classMap({
      'biz-checkbox': true,
      'biz-checkbox--checked': host.checked,
      'biz-checkbox--indeterminate': host.indeterminate,
      'biz-checkbox--disabled': host.disabled,
      'biz-checkbox--readonly': host.readonly,
      'biz-checkbox--error': host.error,
      [`biz-checkbox--${host.size}`]: true,
      [`biz-checkbox--${host.variant}`]: true,
      [`biz-checkbox--label-${host.labelPosition}`]: true,
    })}
  >
    <label class="biz-checkbox__wrapper">
      ${host.labelPosition === 'left'
        ? html`
            <span class="biz-checkbox__label">
              <slot></slot>
            </span>
          `
        : ''}

      <span class="biz-checkbox__control">
        <input
          type="checkbox"
          class="biz-checkbox__input"
          .checked=${host.checked}
          .value=${String(host.value)}
          .disabled=${host.disabled}
          .readOnly=${host.readonly}
          .required=${host.required}
          role="checkbox"
          aria-checked=${host.indeterminate ? 'mixed' : host.checked ? 'true' : 'false'}
          aria-invalid=${host.error ? 'true' : 'false'}
          aria-required=${host.required ? 'true' : 'false'}
          aria-describedby=${host.descriptionId}
          @change=${host.handleInputChange}
          @focus=${host.handleFocus}
          @blur=${host.handleBlur}
        />
        <span class="biz-checkbox__box">
          <slot name="icon-slot">
            ${host.indeterminate
              ? html`
                  <svg class="biz-checkbox__icon" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 8H12"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                `
              : host.checked
              ? html`
                  <svg class="biz-checkbox__icon" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.5 8L6.5 11L12.5 5"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                `
              : ''}
          </slot>
        </span>
      </span>

      ${host.labelPosition === 'right'
        ? html`
            <span class="biz-checkbox__label">
              <slot></slot>
            </span>
          `
        : ''}
    </label>

    <div id=${host.descriptionId} class="biz-checkbox__description">
      <slot name="description-slot"></slot>
    </div>
  </div>
`;