import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface CheckboxGroupHost {
  value: string[];
  name: string;
  orientation: 'vertical' | 'horizontal';
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  error: boolean;
  min: number;
  max: number;
  variant: 'standard' | 'card' | 'button';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  handleSlotChange: (e: Event) => void;
  handleCheckboxChange: (e: Event) => void;
}

export const CheckboxGroupTemplate = (host: CheckboxGroupHost) => html`
  <fieldset
    class=${classMap({
      'biz-checkbox-group': true,
      [`biz-checkbox-group--${host.variant}`]: true,
      [`biz-checkbox-group--${host.size}`]: true,
      'biz-checkbox-group--horizontal': host.orientation === 'horizontal',
      'biz-checkbox-group--vertical': host.orientation === 'vertical',
      'biz-checkbox-group--disabled': host.disabled,
      'biz-checkbox-group--readonly': host.readonly,
      'biz-checkbox-group--error': host.error,
      'biz-checkbox-group--full-width': host.fullWidth,
    })}
    role="group"
    aria-invalid=${host.error ? 'true' : 'false'}
    aria-required=${host.required ? 'true' : 'false'}
    ?disabled=${host.disabled}
  >
    <legend class="biz-checkbox-group__label">
      <slot name="label-slot"></slot>
    </legend>

    <div
      class="biz-checkbox-group__container"
      @change=${host.handleCheckboxChange}
    >
      <slot @slotchange=${host.handleSlotChange}></slot>
    </div>

    <div class="biz-checkbox-group__helper-text" id="helper-text">
      <slot name="helper-text-slot"></slot>
    </div>
  </fieldset>
`;