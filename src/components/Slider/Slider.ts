import { html } from "lit";

export const SliderTemplate = (host: any) => {
  const isRange = host.mode === 'range';
  const isVertical = host.orientation === 'vertical';
  const min = host.min ?? 0;
  const max = host.max ?? 100;
  const step = host.step ?? 1;

  let valStart = min;
  let valEnd = max;

  if (isRange) {
    if (Array.isArray(host.value)) {
      valStart = host.value[0] ?? min;
      valEnd = host.value[1] ?? max;
    }
  } else {
    valEnd = typeof host.value === 'number' ? host.value : (Array.isArray(host.value) ? host.value[0] : min);
  }

  const getPct = (v: number) => Math.max(0, Math.min(100, ((v - min) / (max - min || 1)) * 100));
  const fillStart = isRange ? getPct(valStart) : 0;
  const fillEnd = getPct(valEnd);

  const trackFillStyle = isVertical
    ? `bottom: ${fillStart}%; height: ${fillEnd - fillStart}%;`
    : `left: ${fillStart}%; width: ${fillEnd - fillStart}%;`;

  const thumbStartStyle = isVertical ? `bottom: ${fillStart}%;` : `left: ${fillStart}%;`;
  const thumbEndStyle = isVertical ? `bottom: ${fillEnd}%;` : `left: ${fillEnd}%;`;

  return html`
    <div
      class="biz-slider ${host.variant ?? 'standard'} ${host.size ?? 'medium'} ${isVertical ? 'vertical' : 'horizontal'} ${host.disabled ? 'disabled' : ''} ${host.readonly ? 'readonly' : ''} ${host.error ? 'error' : ''} ${host.loading ? 'loading' : ''}"
    >
      <div class="biz-slider__label-container">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-slider__body">
        <div class="biz-slider__prefix">
          <slot name="prefix-icon-slot"></slot>
        </div>

        <div
          class="biz-slider__track-container"
          @pointerdown=${host.handleTrackPointerDown}
        >
          <div class="biz-slider__track"></div>
          <div class="biz-slider__fill" style="${trackFillStyle}"></div>

          ${host.showTicks ? html`
            <div class="biz-slider__ticks">
              ${host.renderTicks ? host.renderTicks() : ''}
            </div>
          ` : ''}

          ${isRange ? html`
            <div
              class="biz-slider__thumb biz-slider__thumb--start ${host.activeThumb === 'start' ? 'active' : ''}"
              style="${thumbStartStyle}"
              tabindex="${host.disabled ? -1 : 0}"
              role="slider"
              aria-valuemin="${min}"
              aria-valuemax="${max}"
              aria-valuenow="${valStart}"
              aria-orientation="${host.orientation ?? 'horizontal'}"
              aria-disabled="${host.disabled ? 'true' : 'false'}"
              aria-readonly="${host.readonly ? 'true' : 'false'}"
              @keydown=${(e: KeyboardEvent) => host.handleKeyDown(e, 'start')}
              @focus=${(e: FocusEvent) => host.handleFocus(e, 'start')}
              @blur=${(e: FocusEvent) => host.handleBlur(e, 'start')}
              @pointerdown=${(e: PointerEvent) => host.handleThumbPointerDown(e, 'start')}
            >
              ${host.showTooltip !== 'never' ? html`
                <div class="biz-slider__tooltip">
                  <slot name="tooltip-slot">
                    ${host.formatTooltip ? host.formatTooltip(valStart) : valStart}
                  </slot>
                </div>
              ` : ''}
            </div>
          ` : ''}

          <div
            class="biz-slider__thumb biz-slider__thumb--end ${host.activeThumb === 'end' ? 'active' : ''}"
            style="${thumbEndStyle}"
            tabindex="${host.disabled ? -1 : 0}"
            role="slider"
            aria-valuemin="${min}"
            aria-valuemax="${max}"
            aria-valuenow="${valEnd}"
            aria-orientation="${host.orientation ?? 'horizontal'}"
            aria-disabled="${host.disabled ? 'true' : 'false'}"
            aria-readonly="${host.readonly ? 'true' : 'false'}"
            @keydown=${(e: KeyboardEvent) => host.handleKeyDown(e, 'end')}
            @focus=${(e: FocusEvent) => host.handleFocus(e, 'end')}
            @blur=${(e: FocusEvent) => host.handleBlur(e, 'end')}
            @pointerdown=${(e: PointerEvent) => host.handleThumbPointerDown(e, 'end')}
          >
            ${host.showTooltip !== 'never' ? html`
              <div class="biz-slider__tooltip">
                <slot name="tooltip-slot">
                  ${host.formatTooltip ? host.formatTooltip(valEnd) : valEnd}
                </slot>
              </div>
            ` : ''}
          </div>

          <slot name="tick-label-slot"></slot>
        </div>

        <div class="biz-slider__suffix">
          <slot name="suffix-icon-slot"></slot>
        </div>
      </div>

      <div class="biz-slider__helper-container">
        <slot name="helper-text-slot"></slot>
      </div>

      <input
        type="range"
        class="biz-slider__native-input"
        .name=${host.name || ''}
        .min=${String(min)}
        .max=${String(max)}
        .step=${String(step)}
        .value=${String(isRange ? `${valStart},${valEnd}` : valEnd)}
        ?disabled=${host.disabled}
        hidden
      />
    </div>
  `;
};