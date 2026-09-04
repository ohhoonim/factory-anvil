import { css } from "lit";

export const GridheaderStyles = css`
  :host {
    --grid-header-bg: var(--ui-comp-grid-header-bg, #f6f8fa);
    --grid-header-border-bottom: var(--ui-comp-grid-header-border-bottom, 1px solid #d0d7de);
    --grid-header-height: var(--ui-comp-grid-header-height, 40px);
    --grid-header-text-color: var(--ui-comp-grid-header-text-color, #24292f);
    --grid-header-font-size: var(--ui-comp-grid-header-font-size, 13px);
    --grid-header-font-weight: var(--ui-comp-grid-header-font-weight, 600);
    --grid-header-drag-bg: rgba(9, 105, 218, 0.08);
    --grid-header-target-border: 2px solid #0969da;

    display: block;
    width: 100%;
    overflow: hidden;
    user-select: none;
    box-sizing: border-box;
  }

  .grid-header {
    display: flex;
    width: 100%;
    background-color: var(--grid-header-bg);
    border-bottom: var(--grid-header-border-bottom);
    color: var(--grid-header-text-color);
    font-size: var(--grid-header-font-size);
    font-weight: var(--grid-header-font-weight);
    height: var(--grid-header-height);
    box-sizing: border-box;
  }

  /* 1.2 Variants */
  .grid-header--default {
    position: relative;
  }

  .grid-header--sticky {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  /* 1.3 Sizes */
  .grid-header--sm {
    --grid-header-height: 32px;
    --grid-header-font-size: 12px;
  }

  .grid-header--md {
    --grid-header-height: 40px;
    --grid-header-font-size: 13px;
  }

  .grid-header--lg {
    --grid-header-height: 48px;
    --grid-header-font-size: 14px;
  }

  /* Layout Architecture */
  .grid-header__transform-layer {
    display: flex;
    align-items: center;
    height: 100%;
    will-change: transform;
    box-sizing: border-box;
  }

  .grid-header__cell-group {
    display: flex;
    align-items: center;
    height: 100%;
  }

  /* 3.2 States Visual Effects */
  grid-header-cell.is-dragging {
    opacity: 0.5;
    background-color: var(--grid-header-drag-bg);
  }

  grid-header-cell.is-target {
    border-left: var(--grid-header-target-border);
  }
`;