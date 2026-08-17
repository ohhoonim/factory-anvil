import { html, type TemplateResult } from 'lit';

export interface CheckboxGroupTemplateProps {
  labelId: string;
  helperId: string;
  orientation?: 'vertical' | 'horizontal';
  size?: 'small' | 'medium' | 'large';
  variant?: 'standard' | 'card' | 'button';
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  onSlotChange?: (e: Event) => void;
}

export const CheckboxGroupTemplate = (props: CheckboxGroupTemplateProps): TemplateResult => {
  const {
    labelId,
    helperId,
    orientation = 'vertical',
    size = 'medium',
    variant = 'standard',
    fullWidth = false,
    required = false,
    disabled = false,
    readonly = false,
    error = false,
    onSlotChange
  } = props;

  const groupClasses = [
    'biz-checkbox-group',
    `biz-checkbox-group--${orientation}`,
    `biz-checkbox-group--${size}`,
    `biz-checkbox-group--${variant}`,
    fullWidth ? 'biz-checkbox-group--full-width' : '',
    disabled ? 'biz-checkbox-group--disabled' : '',
    readonly ? 'biz-checkbox-group--readonly' : '',
    error ? 'biz-checkbox-group--error' : ''
  ].filter(Boolean).join(' ');

  return html`
    <div
      class="${groupClasses}"
      role="group"
      aria-labelledby="${labelId}"
      aria-describedby="${helperId}"
      aria-invalid="${error ? 'true' : 'false'}"
      aria-required="${required ? 'true' : 'false'}"
      ?data-disabled="${disabled}"
      ?data-readonly="${readonly}"
    >
      <div id="${labelId}" class="biz-checkbox-group__label">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-checkbox-group__container">
        <slot @slotchange="${onSlotChange}"></slot>
      </div>

      <div id="${helperId}" class="biz-checkbox-group__helper-text">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};