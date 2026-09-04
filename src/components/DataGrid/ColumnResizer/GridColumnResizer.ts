import { html } from "lit";

export interface GridColumnResizerHost {
  columnKey: string;
  currentWidth: number;
  minWidth: number;
  maxWidth: number;
  isResizing: boolean;
  deltaX: number;
  handlePointerDown: (e: PointerEvent) => void;
}

export const GridColumnResizerTemplate = (host: GridColumnResizerHost) => html`
  <div 
    class="grid-column-resizer ${host.isResizing ? 'active' : 'default'}"
    @pointerdown="${host.handlePointerDown}"
  >
    ${host.isResizing 
      ? html`<div class="visual-overlay-line" style="transform: translateX(${host.deltaX}px);"></div>` 
      : ''}
  </div>
`;