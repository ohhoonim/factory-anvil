import { css } from "lit";

export const GridColumnResizerStyles = css`
  :host {
    --grid-column-resizer-width: 6px;
    --grid-column-resizer-hover-bg: #0969da;
    --grid-column-resizer-active-bg: #218bff;
    --grid-column-resizer-line-color: #0969da;
    --grid-column-resizer-cursor: col-resize;

    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    right: calc(var(--grid-column-resizer-width) / -2);
    z-index: 10;
  }

  .grid-column-resizer {
    width: var(--grid-column-resizer-width);
    height: 100%;
    cursor: var(--grid-column-resizer-cursor);
    background-color: transparent;
    transition: background-color 0.15s ease;
    position: relative;
  }

  .grid-column-resizer.default:hover {
    background-color: var(--grid-column-resizer-hover-bg);
  }

  .grid-column-resizer.active {
    background-color: var(--grid-column-resizer-active-bg);
  }

  .visual-overlay-line {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100vh;
    background-color: var(--grid-column-resizer-line-color);
    pointer-events: none;
    z-index: 9999;
  }
`;