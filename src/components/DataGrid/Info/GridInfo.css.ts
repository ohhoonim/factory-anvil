import { css } from 'lit';

export const GridinfoStyles = css`
  :host {
    --grid-info-bg: #f6f8fa;
    --grid-info-padding: 0 12px;
    --grid-info-border-color: #d0d7de;
    --grid-info-height-sm: 24px;
    --grid-info-height-md: 32px;
    --grid-info-text-color: #57606a;
    --grid-info-font-size-sm: 11px;
    --grid-info-font-size-md: 12px;
    --grid-info-dirty-color: #d97706;
    --grid-info-dirty-bg: #fffbeb;
    --grid-info-selected-color: #0969da;
    --grid-info-selected-bg: #ddf4ff;
    --grid-info-hover-bg: #eaeef2;

    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  .grid-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: var(--grid-info-bg);
    color: var(--grid-info-text-color);
    padding: var(--grid-info-padding);
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    user-select: none;
  }

  /* Sizes */
  .grid-info--sm {
    height: var(--grid-info-height-sm);
    font-size: var(--grid-info-font-size-sm);
  }

  .grid-info--md {
    height: var(--grid-info-height-md);
    font-size: var(--grid-info-font-size-md);
  }

  /* Positions */
  .grid-info--top {
    border-bottom: 1px solid var(--grid-info-border-color);
  }

  .grid-info--bottom {
    border-top: 1px solid var(--grid-info-border-color);
  }

  /* Layout Structure */
  .grid-info__body {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    overflow: hidden;
  }

  .grid-info__slot {
    display: flex;
    align-items: center;
  }

  .grid-info__slot--prefix {
    margin-right: 8px;
  }

  .grid-info__slot--suffix {
    margin-left: 8px;
  }

  .grid-info__section {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    padding: 2px 6px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .grid-info__section:hover {
    background-color: var(--grid-info-hover-bg);
  }

  .grid-info__label {
    font-weight: 600;
  }

  /* Variants */
  .grid-info--compact .grid-info__body {
    justify-content: flex-start;
  }

  /* States & Highlights */
  .grid-info__section--selection.grid-info__section--active {
    color: var(--grid-info-selected-color);
    background-color: var(--grid-info-selected-bg);
    font-weight: 500;
  }

  .grid-info__section--dirty.grid-info__section--active {
    color: var(--grid-info-dirty-color);
    background-color: var(--grid-info-dirty-bg);
    font-weight: 600;
  }
`;