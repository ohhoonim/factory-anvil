import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

export interface RadioButtonGroupHost {
  value: string;
  name: string;
  orientation: 'vertical' | 'horizontal';
  variant: 'standard' | 'card' | 'button';
  size: 'small' | 'medium' | 'large';
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  error: boolean;
  fullWidth: boolean;
  labelId: string;
  helperTextId: string;
  hasLabel: boolean;
  hasHelperText: boolean;
  handleSlotChange: (e: Event) => void;
  handleLabelSlotChange: (e: Event) => void;
  handleHelperSlotChange: (e: Event) => void;
}

export const RadioButtonGroupTemplate = (host: RadioButtonGroupHost) => html`
  <div
    class=${classMap({
      'biz-radio-button-group': true,
      [`biz-radio-button-group--${host.orientation}`]: true,
      [`biz-radio-button-group--${host.variant}`]: true,
      [`biz-radio-button-group--${host.size}`]: true,
      'biz-radio-button-group--disabled': host.disabled,
      'biz-radio-button-group--readonly': host.readonly,
      'biz-radio-button-group--error': host.error,
      'biz-radio-button-group--full-width': host.fullWidth,
    })}
    role="radiogroup"
    aria-labelledby=${ifDefined(host.hasLabel ? host.labelId : undefined)}
    aria-describedby=${ifDefined(host.hasHelperText ? host.helperTextId : undefined)}
    aria-invalid=${host.error ? 'true' : 'false'}
    aria-required=${host.required ? 'true' : 'false'}
  >
    <div
      id=${host.labelId}
      class=${classMap({
        'biz-radio-button-group__label-container': true,
        'biz-radio-button-group__label-container--hidden': !host.hasLabel,
      })}
    >
      <slot name="label-slot" @slotchange=${host.handleLabelSlotChange}></slot>
    </div>

    <div class="biz-radio-button-group__container">
      <slot @slotchange=${host.handleSlotChange}></slot>
    </div>

    <div
      id=${host.helperTextId}
      class=${classMap({
        'biz-radio-button-group__helper-container': true,
        'biz-radio-button-group__helper-container--hidden': !host.hasHelperText,
      })}
    >
      <slot name="helper-text-slot" @slotchange=${host.handleHelperSlotChange}></slot>
    </div>
  </div>
`;