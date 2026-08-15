import { html } from "lit";

export interface NumberInputProps {
  value: number | null;
  min: number;
  max: number;
  step: number;
  precision?: number;
  controls: boolean;
  controlsPosition: 'end' | 'stacked' | 'split';
  useGrouping: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  inputValue: string;
  onInputChange: (e: Event) => void;
  onInputBlur: (e: FocusEvent) => void;
  onInputFocus: (e: FocusEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onDecrement: (e: MouseEvent) => void;
  onIncrement: (e: MouseEvent) => void;
}

export const NumberInputTemplate = (props: NumberInputProps) => {
  const isMinReached = props.value !== null && props.value <= props.min;
  const isMaxReached = props.value !== null && props.value >= props.max;
  const isControlDisabled = props.disabled || props.readonly;

  const containerClasses = [
    'biz-number-input',
    `biz-number-input--variant-${props.variant}`,
    `biz-number-input--size-${props.size}`,
    `biz-number-input--controls-${props.controlsPosition}`,
    props.disabled ? 'biz-number-input--disabled' : '',
    props.readonly ? 'biz-number-input--readonly' : '',
    props.error ? 'biz-number-input--error' : '',
    props.fullWidth ? 'biz-number-input--full-width' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderDecrementButton = () => html`
    <button
      type="button"
      class="biz-number-input__control biz-number-input__control--decrement"
      ?disabled=${isControlDisabled || isMinReached}
      aria-label="값 감소"
      tabindex="-1"
      @click=${props.onDecrement}
    >
      <slot name="decrement-icon-slot">-</slot>
    </button>
  `;

  const renderIncrementButton = () => html`
    <button
      type="button"
      class="biz-number-input__control biz-number-input__control--increment"
      ?disabled=${isControlDisabled || isMaxReached}
      aria-label="값 증가"
      tabindex="-1"
      @click=${props.onIncrement}
    >
      <slot name="increment-icon-slot">+</slot>
    </button>
  `;

  return html`
    <div class=${containerClasses}>
      <div class="biz-number-input__label-wrapper">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-number-input__field-wrapper">
        ${props.controls && props.controlsPosition === 'split'
          ? renderDecrementButton()
          : ''}

        <div class="biz-number-input__input-container">
          <slot name="prefix-slot"></slot>
          <input
            type="text"
            role="spinbutton"
            class="biz-number-input__input"
            .value=${props.inputValue}
            ?disabled=${props.disabled}
            ?readonly=${props.readonly}
            ?required=${props.required}
            aria-valuenow=${props.value !== null ? props.value : ''}
            aria-valuemin=${props.min !== -Infinity ? props.min : ''}
            aria-valuemax=${props.max !== Infinity ? props.max : ''}
            aria-invalid=${props.error ? 'true' : 'false'}
            aria-required=${props.required ? 'true' : 'false'}
            aria-describedby="helper-text"
            @input=${props.onInputChange}
            @focus=${props.onInputFocus}
            @blur=${props.onInputBlur}
            @keydown=${props.onKeyDown}
          />
          <slot name="suffix-slot"></slot>
        </div>

        ${props.controls && props.controlsPosition === 'end'
          ? html`
              <div class="biz-number-input__controls-group">
                ${renderDecrementButton()} ${renderIncrementButton()}
              </div>
            `
          : ''}
        ${props.controls && props.controlsPosition === 'stacked'
          ? html`
              <div class="biz-number-input__controls-stacked">
                ${renderIncrementButton()} ${renderDecrementButton()}
              </div>
            `
          : ''}
        ${props.controls && props.controlsPosition === 'split'
          ? renderIncrementButton()
          : ''}
      </div>

      <div id="helper-text" class="biz-number-input__helper-wrapper">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};