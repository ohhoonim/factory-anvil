import { html } from 'lit';

export interface RatingTemplateProps {
  value: number;
  max: number;
  precision: number;
  allowClear: boolean;
  readonly: boolean;
  disabled: boolean;
  showTooltip: boolean;
  size: 'sm' | 'md' | 'lg';
  name: string | null;
  hoverValue: number | null;
  focused: boolean;
  onItemMouseMove: (e: MouseEvent, index: number) => void;
  onItemMouseLeave: () => void;
  onItemClick: (e: MouseEvent, index: number) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onFocus: () => void;
  onBlur: () => void;
}

export const RatingTemplate = (props: RatingTemplateProps) => {
  const displayValue = props.hoverValue !== null ? props.hoverValue : props.value;
  const isInteractive = !props.readonly && !props.disabled;

  const renderIcon = (index: number) => {
    const itemValue = index + 1;
    const fillRatio = Math.max(0, Math.min(1, displayValue - index));
    const isFull = fillRatio >= 1;
    const isHalf = fillRatio > 0 && fillRatio < 1;
    const isEmpty = fillRatio === 0;

    const clipWidth = `${fillRatio * 100}%`;

    return html`
      <div
        class="biz-rating__item ${fillRatio > 0 ? 'biz-rating__item--active' : ''}"
        data-index="${index}"
        @mousemove=${(e: MouseEvent) => isInteractive && props.onItemMouseMove(e, index)}
        @click=${(e: MouseEvent) => isInteractive && props.onItemClick(e, index)}
      >
        <div class="biz-rating__icon-layer biz-rating__icon-layer--empty">
          <slot name="icon-empty-slot">
            <svg class="biz-rating__default-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </slot>
        </div>

        <div
          class="biz-rating__icon-layer biz-rating__icon-layer--filled"
          style="width: ${clipWidth};"
        >
          <slot name="${isHalf ? 'icon-half-slot' : 'icon-filled-slot'}">
            <svg class="biz-rating__default-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </slot>
        </div>

        ${props.showTooltip && props.hoverValue !== null
          ? html`<div class="biz-rating__tooltip">${displayValue}</div>`
          : ''}
      </div>
    `;
  };

  const items = Array.from({ length: props.max }, (_, i) => renderIcon(i));

  return html`
    <div
      class="biz-rating biz-rating--${props.size} ${props.disabled ? 'biz-rating--disabled' : ''} ${props.readonly ? 'biz-rating--readonly' : ''} ${props.focused ? 'biz-rating--focused' : ''}"
      tabindex="${props.disabled ? '-1' : '0'}"
      role="slider"
      aria-valuenow="${props.value}"
      aria-valuemin="0"
      aria-valuemax="${props.max}"
      aria-valuetext="별점 ${props.max}점 만점에 ${props.value}점"
      aria-readonly="${props.readonly ? 'true' : 'false'}"
      aria-disabled="${props.disabled ? 'true' : 'false'}"
      @mouseleave=${isInteractive ? props.onItemMouseLeave : undefined}
      @keydown=${isInteractive ? props.onKeyDown : undefined}
      @focus=${isInteractive ? props.onFocus : undefined}
      @blur=${isInteractive ? props.onBlur : undefined}
    >
      ${props.name
        ? html`<input type="hidden" name="${props.name}" value="${props.value}" />`
        : ''}

      <div class="biz-rating__track">
        ${items}
      </div>

      <div class="biz-rating__value-label">
        <slot name="value-label-slot">
          <span class="biz-rating__value-text">${displayValue} / ${props.max}</span>
        </slot>
      </div>

      <div class="biz-rating__helper">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};