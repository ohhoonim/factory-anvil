import { css } from 'lit';

export const GridheaderCellStyles = css`
  :host {
    --grid-header-cell-bg: #f6f8fa;
    --grid-header-cell-hover-bg: #eaeef2;
    --grid-header-cell-padding: 0 12px;
    --grid-header-cell-color: #24292f;
    --grid-header-cell-border-right: 1px solid #d0d7de;
    --grid-header-cell-cursor: default;
    --grid-header-cell-icon-active-color: #0969da;
    --grid-header-cell-height-sm: 32px;
    --grid-header-cell-height-md: 40px;
    --grid-header-cell-height-lg: 48px;
    --grid-header-cell-font-size-sm: 12px;
    --grid-header-cell-font-size-md: 14px;
    --grid-header-cell-font-size-lg: 16px;

    display: inline-block;
    box-sizing: border-box;
  }

  .grid-header-cell {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    background-color: var(--grid-header-cell-bg);
    color: var(--grid-header-cell-color);
    padding: var(--grid-header-cell-padding);
    border-right: var(--grid-header-cell-border-right);
    cursor: var(--grid-header-cell-cursor);
    user-select: none;
    position: relative;
    width: 100%;
    height: 100%;
  }

  /* Sizes */
  .grid-header-cell--sm {
    height: var(--grid-header-cell-height-sm);
    font-size: var(--grid-header-cell-font-size-sm);
  }

  .grid-header-cell--md {
    height: var(--grid-header-cell-height-md);
    font-size: var(--grid-header-cell-font-size-md);
  }

  .grid-header-cell--lg {
    height: var(--grid-header-cell-height-lg);
    font-size: var(--grid-header-cell-font-size-lg);
  }

  /* Alignment */
  .grid-header-cell--align-left {
    justify-content: flex-start;
  }

  .grid-header-cell--align-center {
    justify-content: center;
  }

  .grid-header-cell--align-right {
    justify-content: flex-end;
  }

  /* Variants & States */
  .grid-header-cell--sortable {
    cursor: pointer;
  }

  .grid-header-cell--sortable:hover {
    background-color: var(--grid-header-cell-hover-bg);
  }

  .grid-header-cell--dragging {
    opacity: 0.5;
    background-color: var(--grid-header-cell-hover-bg);
  }

  .grid-header-cell__title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .grid-header-cell__drag-handle {
    margin-right: 6px;
    cursor: grab;
    opacity: 0.5;
    user-select: none;
    -webkit-user-select: none;
  }

  .grid-header-cell__drag-handle:hover {
    opacity: 1;
  }

  .grid-header-cell__sort-indicator {
    margin-left: 6px;
    font-size: 10px;
    opacity: 0.3;
  }

  .grid-header-cell__sort-indicator.is-active {
    opacity: 1;
    color: var(--grid-header-cell-icon-active-color);
  }

  .grid-header-cell__filter-trigger {
    background: none;
    border: none;
    padding: 2px 4px;
    margin-left: 4px;
    cursor: pointer;
    color: var(--grid-header-cell-color);
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .grid-header-cell__filter-trigger:hover {
    opacity: 1;
  }

  .grid-header-cell__filter-trigger.is-filtered {
    opacity: 1;
    color: var(--grid-header-cell-icon-active-color);
  }

  .grid-header-cell__resizer {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 4px;
  }
`;