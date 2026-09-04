import { css } from "lit";

export const GridcellStyles = css`
  :host {
    --grid-cell-bg: var(--ui-comp-grid-cell-bg, #ffffff);
    --grid-cell-padding: var(--ui-comp-grid-cell-padding, 0 8px);
    --grid-cell-color: var(--ui-comp-grid-cell-color, #24292f);
    --grid-cell-border-right: var(--ui-comp-grid-cell-border-right, 1px solid #e1e4e8);
    --grid-cell-dirty-bg: var(--ui-comp-grid-cell-dirty-bg, #fffbe6);
    --grid-cell-dirty-indicator-color: var(--ui-comp-grid-cell-dirty-indicator-color, #d97706);
    --grid-cell-selected-bg: var(--ui-comp-grid-cell-selected-bg, rgba(9, 105, 218, 0.12));
    --grid-cell-selected-border: var(--ui-comp-grid-cell-selected-border, #0969da);
    
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }

  .grid-cell {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: var(--grid-cell-padding);
    background-color: var(--grid-cell-bg);
    color: var(--grid-cell-color);
    border-right: var(--grid-cell-border-right);
    box-sizing: border-box;
    outline: none;
    user-select: none;
  }

  .grid-cell__content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .grid-cell__display-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  /* Variants */
  .grid-cell--dirty {
    background-color: var(--grid-cell-dirty-bg);
  }

  .grid-cell__dirty-indicator {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 6px 0 0;
    border-color: var(--grid-cell-dirty-indicator-color) transparent transparent transparent;
  }

  .grid-cell--selected {
    background-color: var(--grid-cell-selected-bg);
    outline: 1px solid var(--grid-cell-selected-border);
    outline-offset: -1px;
  }

  .grid-cell--editing {
    padding: 0;
    overflow: visible;
  }

  /* Alignment */
  .grid-cell--align-left .grid-cell__content {
    justify-content: flex-start;
    text-align: left;
  }

  .grid-cell--align-center .grid-cell__content {
    justify-content: center;
    text-align: center;
  }

  .grid-cell--align-right .grid-cell__content {
    justify-content: flex-end;
    text-align: right;
  }

  /* Type Icon Area */
  .grid-cell__type-icon {
    display: inline-block;
    margin-right: 4px;
    flex-shrink: 0;
  }
`;