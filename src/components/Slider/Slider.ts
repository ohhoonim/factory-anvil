import { html } from "lit";

export interface SliderHost {
  value: number | number[];
  min: number;
  max: number;
  step: number;
  mode: 'single' | 'range';
  orientation: 'horizontal' | 'vertical';
  showTicks: boolean;
  showTooltip: 'always' | 'hover' | 'drag' | 'never';
  formatTooltip: ((value: number) => string) | null;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  size: 'small' | 'medium' | 'large';
  variant: 'outlined' | 'filled' | 'standard';
  draggingIndex: number | null;
  activeThumbIndex: number | null;
  handleTrackClick: (e: MouseEvent) => void;
  handleThumbMouseDown: (index: number, e: MouseEvent) => void;
  handleThumbKeyDown: (index: number, e: KeyboardEvent) => void;
  handleThumbFocus: (index: number, e: FocusEvent) => void;
  handleThumbBlur: (index: number, e: FocusEvent) => void;
  handleThumbMouseEnter: (index: number) => void;
  handleThumbMouseLeave: (index: number) => void;
}

export const SliderTemplate = (host: SliderHost) => {
  const isRange = host.mode === 'range' && Array.isArray(host.value);
  const values = isRange ? (host.value as number[]) : [typeof host.value === 'number' ? host.value : host.min];
  const startVal = isRange ? Math.min(values[0], values[1]) : host.min;
  const endVal = isRange ? Math.max(values[0], values[1]) : values[0];

  const rangeSpan = Math.max(host.max - host.min, 1);
  const fillStartPercent = Math.max(0, Math.min(100, ((startVal - host.min) / rangeSpan) * 100));
  const fillEndPercent = Math.max(0, Math.min(100, ((endVal - host.min) / rangeSpan) * 100));

  const isVertical = host.orientation === 'vertical';
  const fillStyle = isVertical
    ? `bottom: ${isRange ? fillStartPercent : 0}%; height: ${isRange ? fillEndPercent - fillStartPercent : fillEndPercent}%;`
    : `left: ${isRange ? fillStartPercent : 0}%; width: ${isRange ? fillEndPercent - fillStartPercent : fillEndPercent}%;`;

  const ticks = [];
  if (host.showTicks && host.step > 0) {
    const totalSteps = Math.floor(rangeSpan / host.step);
    for (let i = 0; i <= totalSteps; i++) {
      const tickVal = host.min + i * host.step;
      if (tickVal <= host.max) {
        const tickPercent = ((tickVal - host.min) / rangeSpan) * 100;
        const tickStyle = isVertical ? `bottom: ${tickPercent}%;` : `left: ${tickPercent}%;`;
        ticks.push({ value: tickVal, style: tickStyle });
      }
    }
  }

  const renderThumb = (val: number, index: number) => {
    const percent = Math.max(0, Math.min(100, ((val - host.min) / rangeSpan) * 100));
    const thumbStyle = isVertical ? `bottom: ${percent}%;` : `left: ${percent}%;`;
    const formattedValue = host.formatTooltip ? host.formatTooltip(val) : String(val);
    const isDragging = host.draggingIndex === index;
    const isFocused = host.activeThumbIndex === index;

    return html`
      <div
        class="biz-slider__thumb ${isDragging ? 'biz-slider__thumb--dragging' : ''}"
        style="${thumbStyle}"
        role="slider"
        tabindex="${host.disabled ? '-1' : '0'}"
        aria-valuemin="${host.min}"
        aria-valuemax="${host.max}"
        aria-valuenow="${val}"
        aria-valuetext="${formattedValue}"
        aria-orientation="${host.orientation}"
        aria-disabled="${host.disabled}"
        aria-readonly="${host.readonly}"
        @mousedown="${(e: MouseEvent) => host.handleThumbMouseDown(index, e)}"
        @keydown="${(e: KeyboardEvent) => host.handleThumbKeyDown(index, e)}"
        @focus="${(e: FocusEvent) => host.handleThumbFocus(index, e)}"
        @blur="${(e: FocusEvent) => host.handleThumbBlur(index, e)}"
        @mouseenter="${() => host.handleThumbMouseEnter(index)}"
        @mouseleave="${() => host.handleThumbMouseLeave(index)}"
      >
        ${host.showTooltip !== 'never'
          ? html`
              <div class="biz-slider__tooltip ${isDragging || isFocused ? 'biz-slider__tooltip--visible' : ''}">
                <slot name="tooltip-slot">${formattedValue}</slot>
              </div>
            `
          : ''}
      </div>
    `;
  };

  return html`
    <div
      class="biz-slider biz-slider--${host.orientation} biz-slider--${host.size} biz-slider--${host.variant} ${host.disabled ? 'biz-slider--disabled' : ''} ${host.readonly ? 'biz-slider--readonly' : ''} ${host.error ? 'biz-slider--error' : ''}"
    >
      <div class="biz-slider__label-container">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-slider__body">
        <div class="biz-slider__prefix">
          <slot name="prefix-icon-slot"></slot>
          <slot name="start-slot"></slot>
        </div>

        <div class="biz-slider__track-container" @click="${host.handleTrackClick}">
          <div class="biz-slider__track"></div>
          <div class="biz-slider__range-fill" style="${fillStyle}"></div>

          ${host.showTicks
            ? html`
                <div class="biz-slider__ticks">
                  ${ticks.map(
                    (tick) => html`
                      <div class="biz-slider__tick" style="${tick.style}">
                        <slot name="tick-label-slot">${tick.value}</slot>
                      </div>
                    `
                  )}
                </div>
              `
            : ''}

          ${values.map((v, i) => renderThumb(v, i))}
        </div>

        <div class="biz-slider__suffix">
          <slot name="suffix-icon-slot"></slot>
          <slot name="end-slot"></slot>
        </div>
      </div>

      <div class="biz-slider__helper-container">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};