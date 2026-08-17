import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface CheckboxTemplateOptions {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  error: boolean;
  value: string | number;
  labelPosition: 'left' | 'right';
  variant: 'standard' | 'outlined' | 'filled';
  size: 'small' | 'medium' | 'large';
  descriptionId?: string;
  onInput: (event: Event) => void;
  onChange: (event: Event) => void;
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
}

export const CheckboxTemplate = (options: CheckboxTemplateOptions) => {
  const {
    checked,
    indeterminate,
    disabled,
    readonly,
    required,
    error,
    value,
    labelPosition,
    variant,
    size,
    descriptionId,
    onInput,
    onChange,
    onFocus,
    onBlur,
  } = options;

  const ariaCheckedValue = indeterminate ? 'mixed' : checked ? 'true' : 'false';

  return html`
    <div
      class="biz-checkbox biz-checkbox--${size} biz-checkbox--${variant} biz-checkbox--label-${labelPosition}"
      ?data-checked=${checked}
      ?data-indeterminate=${indeterminate}
      ?data-disabled=${disabled}
      ?data-readonly=${readonly}
      ?data-error=${error}
    >
      <label class="biz-checkbox__wrapper">
        <slot name="start-slot"></slot>
        <div class="biz-checkbox__control-container">
          <input
            type="checkbox"
            class="biz-checkbox__native"
            .checked=${checked}
            .value=${String(value)}
            ?disabled=${disabled}
            ?readonly=${readonly}
            ?required=${required}
            aria-checked=${ariaCheckedValue}
            aria-invalid=${error ? 'true' : 'false'}
            aria-required=${required ? 'true' : 'false'}
            aria-describedby=${ifDefined(descriptionId)}
            @input=${onInput}
            @change=${onChange}
            @focus=${onFocus}
            @blur=${onBlur}
          />
          <div class="biz-checkbox__control" aria-hidden="true">
            <slot name="icon-slot">
              ${indeterminate
                ? html`
                    <svg class="biz-checkbox__icon" viewBox="0 0 16 16" fill="none">
                      <rect x="3" y="7" width="10" height="2" rx="1" fill="currentColor" />
                    </svg>
                  `
                : checked
                ? html`
                    <svg class="biz-checkbox__icon" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13.5 4.5L6.5 11.5L3 8"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  `
                : nothing}
            </slot>
          </div>
        </div>
        <span class="biz-checkbox__label">
          <slot name="label-slot">
            <slot></slot>
          </slot>
        </span>
        <slot name="end-slot"></slot>
      </label>
      <div id=${ifDefined(descriptionId)} class="biz-checkbox__description">
        <slot name="description-slot">
          <slot name="helper-text-slot"></slot>
        </slot>
      </div>
    </div>
  `;
};