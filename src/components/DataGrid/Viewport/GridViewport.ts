import { html, type TemplateResult } from 'lit';

export interface SelectionRange {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface GridViewportHost {
  phantomWidth: number;
  phantomHeight: number;
  rowHeight: number;
  striped: boolean;
  scrollTop: number;
  scrollLeft: number;
  selectionRange: SelectionRange | null;
  isDragging: boolean;
  handleScroll: (e: Event) => void;
  handleMouseDown: (e: MouseEvent) => void;
  handleMouseMove: (e: MouseEvent) => void;
  handleMouseUp: (e: MouseEvent) => void;
}

export const GridViewportTemplate = (host: GridViewportHost): TemplateResult => {
  return html`
    <div
      class="grid-viewport ${host.striped ? 'grid-viewport--striped' : ''}"
      style="--grid-viewport-row-height: ${host.rowHeight}px;"
      @scroll=${host.handleScroll}
      @mousedown=${host.handleMouseDown}
      @mousemove=${host.handleMouseMove}
      @mouseup=${host.handleMouseUp}
    >
      <div
        class="grid-phantom"
        style="width: ${host.phantomWidth}px; height: ${host.phantomHeight}px;"
      ></div>
      <div class="grid-content">
        <slot></slot>
      </div>
      ${host.selectionRange
        ? html`
            <div
              class="grid-selection-overlay ${host.isDragging ? 'grid-selection-overlay--dragging' : ''}"
              style="
                top: ${host.selectionRange.top}px;
                left: ${host.selectionRange.left}px;
                width: ${host.selectionRange.width}px;
                height: ${host.selectionRange.height}px;
              "
            ></div>
          `
        : ''}
    </div>
  `;
};