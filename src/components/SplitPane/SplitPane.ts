import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface SplitPaneHost {
  direction: 'horizontal' | 'vertical';
  variant: 'line' | 'grip' | 'invisible';
  size: 'small' | 'medium' | 'large';
  sizes: number[];
  minSizes: number[];
  maxSizes: number[];
  disabled: boolean;
  collapsible: boolean;
  collapsed: boolean;
  isDragging: boolean;
  handleMouseDown: (event: MouseEvent) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
  handleDoubleClick: () => void;
}

export const SplitPaneTemplate = (host: SplitPaneHost) => {
  const isHorizontal = host.direction === 'horizontal';
  const primarySize = host.sizes[0] ?? 50;
  const secondarySize = host.sizes[1] ?? (100 - primarySize);

  const pane1Style = isHorizontal
    ? `width: ${primarySize}%; height: 100%;`
    : `width: 100%; height: ${primarySize}%;`;

  const pane2Style = isHorizontal
    ? `width: ${secondarySize}%; height: 100%;`
    : `width: 100%; height: ${secondarySize}%;`;

  return html`
    <div
      class=${classMap({
        'biz-split-pane': true,
        'biz-split-pane--horizontal': isHorizontal,
        'biz-split-pane--vertical': !isHorizontal,
        [`biz-split-pane--${host.variant}`]: Boolean(host.variant),
        [`biz-split-pane--${host.size}`]: Boolean(host.size),
        'biz-split-pane--disabled': host.disabled,
        'biz-split-pane--dragging': host.isDragging,
        'biz-split-pane--collapsed': host.collapsed,
      })}
    >
      <div class="biz-split-pane__pane biz-split-pane__pane--1" style=${pane1Style} id="pane-1">
        <slot name="pane-1-slot"></slot>
      </div>

      <div
        class="biz-split-pane__resizer"
        role="separator"
        tabindex=${host.disabled ? '-1' : '0'}
        aria-orientation=${host.direction}
        aria-valuenow=${Math.round(primarySize)}
        aria-valuemin=${host.minSizes[0] ?? 0}
        aria-valuemax=${host.maxSizes[0] ?? 100}
        aria-controls="pane-1 pane-2"
        aria-disabled=${host.disabled ? 'true' : 'false'}
        @mousedown=${host.handleMouseDown}
        @keydown=${host.handleKeyDown}
        @dblclick=${host.handleDoubleClick}
      >
        <slot name="resizer-slot">
          ${host.variant === 'grip'
            ? html`<div class="biz-split-pane__grip-icon"></div>`
            : html`<div class="biz-split-pane__resizer-bar"></div>`}
        </slot>
      </div>

      <div class="biz-split-pane__pane biz-split-pane__pane--2" style=${pane2Style} id="pane-2">
        <slot name="pane-2-slot"></slot>
      </div>
    </div>
  `;
};