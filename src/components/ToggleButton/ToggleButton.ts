import { html, type TemplateResult } from 'lit';

export interface ToggleButtonTemplateProps {
  checked: boolean;
  disabled: boolean;
  readonly: boolean;
  variant: 'standard' | 'filled' | 'outlined';
  size: 'small' | 'medium' | 'large';
  labelPosition: 'left' | 'right';
  onToggle: (e: Event) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
}

export function ToggleButtonTemplate(props: ToggleButtonTemplateProps): TemplateResult {
  const {
    checked,
    disabled,
    readonly,
    variant = 'standard',
    size = 'medium',
    labelPosition = 'right',
    onToggle,
    onKeyDown,
    onFocus,
    onBlur,
  } = props;

  return html`
    <div
      class="biz-toggle-button variant-${variant} size-${size} label-${labelPosition} ${checked ? 'checked' : 'unchecked'} ${disabled ? 'disabled' : ''} ${readonly ? 'readonly' : ''}"
      role="switch"
      aria-checked="${checked}"
      aria-disabled="${disabled}"
      tabindex="${disabled ? -1 : 0}"
      @click="${!disabled && !readonly ? onToggle : null}"
      @keydown="${!disabled && !readonly ? onKeyDown : null}"
      @focus="${onFocus}"
      @blur="${onBlur}"
    >
      <div class="biz-toggle-button__label-container">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-toggle-button__switch-track">
        <div class="biz-toggle-button__slot-start">
          <slot name="start-slot"></slot>
        </div>
        <div class="biz-toggle-button__thumb">
          <span class="biz-toggle-button__text-on"><slot name="on-text-slot"></slot></span>
          <span class="biz-toggle-button__text-off"><slot name="off-text-slot"></slot></span>
        </div>
        <div class="biz-toggle-button__slot-end">
          <slot name="end-slot"></slot>
        </div>
      </div>

      <div class="biz-toggle-button__helper-container">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
}