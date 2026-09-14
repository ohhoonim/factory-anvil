import { html, type TemplateResult } from 'lit';

export interface DblToggleButtonHost {
  value: string;
  leftValue: string;
  rightValue: string;
  variant: 'contained' | 'outlined' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  disabled: boolean;
  readonly: boolean;
  onSelect: (side: 'left' | 'right', val: string) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
}

export const DblToggleButtonTemplate = (host: DblToggleButtonHost): TemplateResult => {
  const isLeftSelected = host.value === host.leftValue;
  const isRightSelected = host.value === host.rightValue;

  const handleSegmentClick = (side: 'left' | 'right', val: string) => {
    if (host.disabled || host.readonly) return;
    host.onSelect(side, val);
  };

  return html`
    <div
      class="biz-dbl-toggle-button variant-${host.variant || 'contained'} size-${host.size || 'medium'} ${host.fullWidth ? 'full-width' : ''}"
      role="radiogroup"
      aria-disabled="${host.disabled}"
      aria-readonly="${host.readonly}"
      @focusin="${(e: FocusEvent) => host.onFocus?.(e)}"
      @focusout="${(e: FocusEvent) => host.onBlur?.(e)}"
    >
      <button
        type="button"
        class="segment left-segment ${isLeftSelected ? 'selected' : ''}"
        role="radio"
        aria-checked="${isLeftSelected}"
        ?disabled="${host.disabled}"
        @click="${() => handleSegmentClick('left', host.leftValue)}"
      >
        <slot name="left-icon-slot"></slot>
        <slot name="left-label-slot">
          <span>${host.leftValue}</span>
        </slot>
      </button>

      <button
        type="button"
        class="segment right-segment ${isRightSelected ? 'selected' : ''}"
        role="radio"
        aria-checked="${isRightSelected}"
        ?disabled="${host.disabled}"
        @click="${() => handleSegmentClick('right', host.rightValue)}"
      >
        <slot name="right-icon-slot"></slot>
        <slot name="right-label-slot">
          <span>${host.rightValue}</span>
        </slot>
      </button>
    </div>
  `;
};