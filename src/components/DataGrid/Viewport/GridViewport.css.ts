import { css } from 'lit';

export const GridviewportStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    
    --grid-viewport-bg: var(--ui-comp-grid-viewport-bg, #ffffff);
    --grid-viewport-row-height: var(--ui-comp-grid-viewport-row-height, 40px);
    --grid-viewport-zebra-bg: var(--ui-comp-grid-viewport-zebra-bg, #f9fafb);
    --grid-viewport-selection-bg: var(--ui-comp-grid-viewport-selection-bg, rgba(9, 105, 218, 0.12));
    --grid-viewport-selection-border: var(--ui-comp-grid-viewport-selection-border, #0969da);
    --grid-viewport-scrollbar-thumb: var(--ui-comp-grid-viewport-scrollbar-thumb, #d0d7de);
  }

  .grid-viewport {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--grid-viewport-bg);
    box-sizing: border-box;
  }

  .grid-viewport::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .grid-viewport::-webkit-scrollbar-thumb {
    background-color: var(--grid-viewport-scrollbar-thumb);
    border-radius: 4px;
  }

  .grid-phantom {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: -1;
  }

  .grid-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: auto;
  }

  .grid-viewport--striped ::slotted(grid-row:nth-child(odd)) {
    background-color: var(--grid-viewport-zebra-bg);
  }

  .grid-selection-overlay {
    position: absolute;
    pointer-events: none;
    background-color: var(--grid-viewport-selection-bg);
    border: 1px solid var(--grid-viewport-selection-border);
    box-sizing: border-box;
    z-index: 10;
  }

  .grid-selection-overlay--dragging {
    will-change: top, left, width, height;
  }
`;