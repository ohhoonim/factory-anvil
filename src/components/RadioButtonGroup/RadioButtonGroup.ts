import { html } from 'lit';

export interface RadioButtonGroupContext {
  value: string;
  name: string;
  orientation: 'vertical' | 'horizontal';
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  error: boolean;
  size: 'small' | 'medium' | 'large';
  variant: 'standard' | 'card' | 'button' | 'outlined' | 'filled';
  label?: string;
  helperText?: string;
  labelId?: string;
  helperTextId?: string;
  handleSlotChange?: (e: Event) => void;
  handleValueChange?: (e: Event) => void;
}

export const RadioButtonGroupTemplate = (context: RadioButtonGroupContext) => html`
  <div
    class="biz-radio-button-group ${context.orientation} ${context.size} ${context.variant} ${context.disabled ? 'disabled' : ''} ${context.error ? 'error' : ''} ${context.readonly ? 'readonly' : ''}"
    role="radiogroup"
    aria-labelledby=${context.labelId || 'label-slot'}
    aria-describedby=${context.helperTextId || 'helper-text-slot'}
    aria-invalid=${context.error ? 'true' : 'false'}
    aria-required=${context.required ? 'true' : 'false'}
    aria-disabled=${context.disabled ? 'true' : 'false'}
    aria-readonly=${context.readonly ? 'true' : 'false'}
  >
    <div class="biz-radio-button-group__label" id=${context.labelId || 'label-slot'}>
      <slot name="label-slot">${context.label}</slot>
    </div>
    <div class="biz-radio-button-group__items" @change=${context.handleValueChange}>
      <slot @slotchange=${context.handleSlotChange}></slot>
    </div>
    <div class="biz-radio-button-group__helper-text" id=${context.helperTextId || 'helper-text-slot'}>
      <slot name="helper-text-slot">${context.helperText}</slot>
    </div>
  </div>
`;