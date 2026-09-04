import { css } from "lit";

export const GridfooterCellStyles = css`
  :host {
    --grid-footer-cell-bg: var(--ui-comp-grid-footer-cell-bg, #f6f8fa);
    --grid-footer-cell-padding: var(--ui-comp-grid-footer-cell-padding, 0 8px);
    --grid-footer-cell-color: var(--ui-comp-grid-footer-cell-color, #24292f);
    --grid-footer-cell-border-right: var(--ui-comp-grid-footer-cell-border-right, 1px solid #d0d7de);
    --grid-footer-cell-font-weight: var(--ui-comp-grid-footer-cell-font-weight, 600);
    --grid-footer-cell-font-size: var(--ui-comp-grid-footer-cell-font-size, 13px);
    --grid-footer-cell-height: var(--ui-comp-grid-footer-cell-height, 100%);
    --grid-footer-cell-positive-color: var(--ui-comp-grid-footer-cell-positive-color, #1a7f37);
    --grid-footer-cell-negative-color: var(--ui-comp-grid-footer-cell-negative-color, #cf222e);
    --grid-footer-cell-positive-bg: var(--ui-comp-grid-footer-cell-positive-bg, #dafbe1);
    --grid-footer-cell-negative-bg: var(--ui-comp-grid-footer-cell-negative-bg, #ffebe9);

    display: inline-block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .grid-footer-cell {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--grid-footer-cell-height);
    padding: var(--grid-footer-cell-padding);
    background-color: var(--grid-footer-cell-bg);
    color: var(--grid-footer-cell-color);
    font-weight: var(--grid-footer-cell-font-weight);
    font-size: var(--grid-footer-cell-font-size);
    border-right: var(--grid-footer-cell-border-right);
    box-sizing: border-box;
    overflow: hidden;
    user-select: none;
    cursor: pointer;
  }

  /* Alignment Variants */
  .grid-footer-cell.align-left {
    justify-content: flex-start;
    text-align: left;
  }

  .grid-footer-cell.align-center {
    justify-content: center;
    text-align: center;
  }

  .grid-footer-cell.align-right {
    justify-content: flex-end;
    text-align: right;
  }

  /* Variants */
  .grid-footer-cell.variant-positive {
    color: var(--grid-footer-cell-positive-color);
    background-color: var(--grid-footer-cell-positive-bg);
  }

  .grid-footer-cell.variant-negative {
    color: var(--grid-footer-cell-negative-color);
    background-color: var(--grid-footer-cell-negative-bg);
  }

  /* Inner Elements */
  .grid-footer-cell__label {
    margin-right: 4px;
    font-size: 0.85em;
    opacity: 0.8;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .grid-footer-cell__value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;