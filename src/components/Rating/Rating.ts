import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface RatingHost {
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
  handleMouseMove(event: MouseEvent, index: number): void;
  handleMouseLeave(): void;
  handleClick(event: MouseEvent, index: number): void;
  handleKeyDown(event: KeyboardEvent): void;
}

const renderDefaultStarSvg = () => html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
`;

export const RatingTemplate = (host: RatingHost) => {
  const displayValue = host.hoverValue !== null ? host.hoverValue : host.value;
  const isHovered = host.hoverValue !== null;

  const rootClasses = {
    'biz-rating': true,
    [`biz-rating--${host.size}`]: true,
    'biz-rating--disabled': host.disabled,
    'biz-rating--readonly': host.readonly,
    'biz-rating--hover': isHovered,
  };

  const items = Array.from({ length: host.max }, (_, index) => {
    const itemValue = index + 1;
    let fillRatio = 0;

    if (displayValue >= itemValue) {
      fillRatio = 1;
    } else if (displayValue > index) {
      fillRatio = displayValue - index;
    }

    const fillWidthPercent = `${fillRatio * 100}%`;

    return html`
      <div
        class="biz-rating__item"
        title=${host.showTooltip ? `${displayValue} / ${host.max}` : ''}
        @mousemove=${(e: MouseEvent) => host.handleMouseMove(e, index)}
        @click=${(e: MouseEvent) => host.handleClick(e, index)}
      >
        <div class="biz-rating__icon biz-rating__icon--empty">
          <slot name="icon-empty-slot">${renderDefaultStarSvg()}</slot>
        </div>
        <div
          class="biz-rating__item-filled-wrapper"
          style="width: ${fillWidthPercent};"
        >
          <div class="biz-rating__icon biz-rating__icon--filled">
            <slot name="icon-filled-slot">${renderDefaultStarSvg()}</slot>
          </div>
        </div>
      </div>
    `;
  });

  return html`
    <div
      class=${classMap(rootClasses)}
      role="slider"
      tabindex=${host.disabled ? -1 : 0}
      aria-valuenow=${host.value}
      aria-valuemin="0"
      aria-valuemax=${host.max}
      aria-valuetext="별점 ${host.max}점 만점에 ${host.value}점"
      aria-readonly=${host.readonly ? 'true' : 'false'}
      aria-disabled=${host.disabled ? 'true' : 'false'}
      @mouseleave=${host.handleMouseLeave}
      @keydown=${host.handleKeyDown}
    >
      ${host.name
        ? html`<input
            type="hidden"
            class="biz-rating__native-input"
            name=${host.name}
            .value=${String(host.value)}
          />`
        : ''}

      <div class="biz-rating__track-container">
        <div class="biz-rating__track">${items}</div>
        <div class="biz-rating__value-label">
          <slot name="value-label-slot"></slot>
        </div>
      </div>

      <div class="biz-rating__helper-text">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};