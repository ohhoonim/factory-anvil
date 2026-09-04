import { css } from "lit";

export const GridpaginationStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;

    --grid-pagination-bg: var(--ui-comp-grid-pagination-bg, #ffffff);
    --grid-pagination-padding: var(--ui-comp-grid-pagination-padding, 8px 12px);
    --grid-pagination-border-top: var(--ui-comp-grid-pagination-border-top, 1px solid #d0d7de);
    --grid-pagination-text-color: var(--ui-comp-grid-pagination-text-color, #24292f);
    --grid-pagination-btn-bg: var(--ui-comp-grid-pagination-btn-bg, #ffffff);
    --grid-pagination-btn-hover-bg: var(--ui-comp-grid-pagination-btn-hover-bg, #f3f4f6);
    --grid-pagination-btn-active-bg: var(--ui-comp-grid-pagination-btn-active-bg, #0969da);
    --grid-pagination-btn-active-color: var(--ui-comp-grid-pagination-btn-active-color, #ffffff);
    --grid-pagination-btn-disabled-color: var(--ui-comp-grid-pagination-btn-disabled-color, #8c959f);
    --grid-pagination-border-color: #d0d7de;
    --grid-pagination-font-size-sm: 12px;
    --grid-pagination-font-size-md: 14px;
    --grid-pagination-height-sm: 28px;
    --grid-pagination-height-md: 36px;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .grid-pagination {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--grid-pagination-bg);
    padding: var(--grid-pagination-padding);
    border-top: var(--grid-pagination-border-top);
    color: var(--grid-pagination-text-color);
  }

  .grid-pagination--align-left {
    justify-content: flex-start;
  }

  .grid-pagination--align-center {
    justify-content: center;
  }

  .grid-pagination--align-right {
    justify-content: flex-end;
  }

  .grid-pagination--align-space-between {
    justify-content: space-between;
  }

  .grid-pagination__body {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .grid-pagination__prefix,
  .grid-pagination__suffix {
    display: flex;
    align-items: center;
  }

  .grid-pagination__size-selector {
    display: flex;
    align-items: center;
  }

  .grid-pagination__select {
    border: 1px solid var(--grid-pagination-border-color);
    border-radius: 4px;
    background-color: var(--grid-pagination-btn-bg);
    color: var(--grid-pagination-text-color);
    outline: none;
    cursor: pointer;
  }

  .grid-pagination__info {
    font-weight: 400;
    white-space: nowrap;
  }

  .grid-pagination__nav {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .grid-pagination__pages {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .grid-pagination__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--grid-pagination-border-color);
    border-radius: 4px;
    background-color: var(--grid-pagination-btn-bg);
    color: var(--grid-pagination-text-color);
    cursor: pointer;
    user-select: none;
    font-weight: 500;
  }

  .grid-pagination__btn:hover:not(:disabled) {
    background-color: var(--grid-pagination-btn-hover-bg);
  }

  .grid-pagination__btn.is-active {
    background-color: var(--grid-pagination-btn-active-bg);
    color: var(--grid-pagination-btn-active-color);
    border-color: var(--grid-pagination-btn-active-bg);
  }

  .grid-pagination__btn:disabled {
    color: var(--grid-pagination-btn-disabled-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .grid-pagination__select:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .grid-pagination--sm {
    font-size: var(--grid-pagination-font-size-sm);
  }

  .grid-pagination--sm .grid-pagination__btn {
    height: var(--grid-pagination-height-sm);
    min-width: var(--grid-pagination-height-sm);
    padding: 0 6px;
    font-size: var(--grid-pagination-font-size-sm);
  }

  .grid-pagination--sm .grid-pagination__select {
    height: var(--grid-pagination-height-sm);
    font-size: var(--grid-pagination-font-size-sm);
    padding: 0 4px;
  }

  .grid-pagination--md {
    font-size: var(--grid-pagination-font-size-md);
  }

  .grid-pagination--md .grid-pagination__btn {
    height: var(--grid-pagination-height-md);
    min-width: var(--grid-pagination-height-md);
    padding: 0 10px;
    font-size: var(--grid-pagination-font-size-md);
  }

  .grid-pagination--md .grid-pagination__select {
    height: var(--grid-pagination-height-md);
    font-size: var(--grid-pagination-font-size-md);
    padding: 0 8px;
  }

  .grid-pagination.is-disabled {
    pointer-events: none;
    opacity: 0.6;
  }
`;