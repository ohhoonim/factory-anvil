import { html, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface RadioButtonProps {
  checked?: boolean;
  value?: string | number | boolean;
  name?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'standard' | 'button' | 'card';
  labelPosition?: 'right' | 'left';
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
  descriptionId?: string;
  onInput?: (e: Event) => void;
  onChange?: (e: Event) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export const RadioButtonTemplate = (props: RadioButtonProps): TemplateResult => {
  const {
    checked = false,
    value = '',
    name = '',
    size = 'medium',
    variant = 'standard',
    labelPosition = 'right',
    readonly = false,
    disabled = false,
    error = false,
    descriptionId,
    onInput,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const isInteractive = !disabled && !readonly;

  return html`
    <div
      class=${[
        'biz-radio-button',
        `biz-radio-button--${size}`,
        `biz-radio-button--${variant}`,
        `biz-radio-button--label-${labelPosition}`,
        checked ? 'biz-radio-button--checked' : '',
        disabled ? 'biz-radio-button--disabled' : '',
        readonly ? 'biz-radio-button--readonly' : '',
        error ? 'biz-radio-button--error' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <label class="biz-radio-button__label-container">
        <input
          type="radio"
          class="biz-radio-button__input"
          .checked=${checked}
          .value=${String(value)}
          name=${name}
          ?disabled=${disabled}
          ?readonly=${readonly}
          aria-checked=${checked ? 'true' : 'false'}
          aria-invalid=${error ? 'true' : 'false'}
          aria-describedby=${ifDefined(descriptionId || undefined)}
          @input=${isInteractive ? onInput : (e: Event) => e.preventDefault()}
          @change=${isInteractive ? onChange : (e: Event) => e.preventDefault()}
          @focus=${onFocus}
          @blur=${onBlur}
        />
        <span class="biz-radio-button__control" aria-hidden="true">
          <slot name="icon-slot">
            <span class="biz-radio-button__dot"></span>
          </slot>
        </span>
        <span class="biz-radio-button__label">
          <slot></slot>
        </span>
      </label>
      <div id=${descriptionId || ''} class="biz-radio-button__description">
        <slot name="description-slot"></slot>
      </div>
    </div>
  `;
};