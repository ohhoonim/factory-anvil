import { css } from "lit";

export const tileLayoutGridStyles = css`
  :host {
    display: block;
    box-sizing: border-box;

    /* Layout & Sizing Tokens */
    --biz-tile-layout-grid-gap-sm: 12px;
    --biz-tile-layout-grid-gap-md: 16px;
    --biz-tile-layout-grid-gap-lg: 24px;
    --biz-tile-layout-grid-min-width: 280px;
    --biz-tile-layout-grid-aspect-ratio: 1 / 1;

    /* Colors - Base */
    --biz-tile-layout-grid-bg-color: transparent;
    --biz-tile-layout-grid-skeleton-bg-color: #e5e7eb;
    --biz-tile-layout-grid-skeleton-pulse-color: #f3f4f6;

    /* Colors - Interactive States */
    --biz-tile-layout-grid-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-tile-layout-grid-border-color: #d1d5db;
    --biz-tile-layout-grid-hover-border-color: #9ca3af;
    --biz-tile-layout-grid-active-border-color: #2563eb;
    --biz-tile-layout-grid-error-border-color: #ef4444;

    /* Sizes */
    --biz-tile-layout-grid-padding-sm: 8px;
    --biz-tile-layout-grid-padding-md: 16px;
    --biz-tile-layout-grid-padding-lg: 24px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-tile-layout-grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--biz-tile-layout-grid-bg-color);
  }

  .biz-tile-layout-grid__header {
    width: 100%;
    margin-bottom: var(--biz-tile-layout-grid-gap-current, var(--biz-tile-layout-grid-gap-md));
  }

  .biz-tile-layout-grid__header:empty {
    display: none;
  }

  .biz-tile-layout-grid__body {
    display: grid;
    grid-template-columns: var(--biz-tile-layout-grid-columns, repeat(auto-fit, minmax(var(--biz-tile-layout-grid-min-width), 1fr)));
    gap: var(--biz-tile-layout-grid-gap-current, var(--biz-tile-layout-grid-gap-md));
    width: 100%;
  }

  /* Variants: Mode */
  .biz-tile-layout-grid--fixed .biz-tile-layout-grid__body ::slotted(*) {
    aspect-ratio: var(--biz-tile-layout-grid-aspect-ratio-current, var(--biz-tile-layout-grid-aspect-ratio));
    height: 100%;
  }

  .biz-tile-layout-grid--masonry .biz-tile-layout-grid__body {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .biz-tile-layout-grid--masonry .biz-tile-layout-grid__body ::slotted(*) {
    flex: 1 1 var(--biz-tile-layout-grid-min-width);
    height: auto;
  }

  /* Variants: Visual Styles (Outlined, Filled, Standard) */
  .biz-tile-layout-grid--outlined {
    border: 1px solid var(--biz-tile-layout-grid-border-color);
    border-radius: 8px;
    padding: var(--biz-tile-layout-grid-padding-md);
  }

  .biz-tile-layout-grid--filled {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: var(--biz-tile-layout-grid-padding-md);
  }

  .biz-tile-layout-grid--standard {
    border: none;
    padding: 0;
  }

  /* Sizes */
  .biz-tile-layout-grid--size-small {
    --biz-tile-layout-grid-gap-current: var(--biz-tile-layout-grid-gap-sm);
    padding: var(--biz-tile-layout-grid-padding-sm);
  }

  .biz-tile-layout-grid--size-medium {
    --biz-tile-layout-grid-gap-current: var(--biz-tile-layout-grid-gap-md);
    padding: var(--biz-tile-layout-grid-padding-md);
  }

  .biz-tile-layout-grid--size-large {
    --biz-tile-layout-grid-gap-current: var(--biz-tile-layout-grid-gap-lg);
    padding: var(--biz-tile-layout-grid-padding-lg);
  }

  /* States: Loading & Skeleton */
  .biz-tile-layout-grid__skeleton-container {
    display: grid;
    grid-template-columns: var(--biz-tile-layout-grid-columns, repeat(auto-fit, minmax(var(--biz-tile-layout-grid-min-width), 1fr)));
    gap: var(--biz-tile-layout-grid-gap-current, var(--biz-tile-layout-grid-gap-md));
    width: 100%;
  }

  .biz-tile-layout-grid__skeleton-item {
    width: 100%;
    aspect-ratio: var(--biz-tile-layout-grid-aspect-ratio-current, var(--biz-tile-layout-grid-aspect-ratio));
    background-color: var(--biz-tile-layout-grid-skeleton-bg-color);
    border-radius: 6px;
    animation: biz-tile-layout-grid-pulse 1.5s infinite ease-in-out;
  }

  @keyframes biz-tile-layout-grid-pulse {
    0% {
      background-color: var(--biz-tile-layout-grid-skeleton-bg-color);
    }
    50% {
      background-color: var(--biz-tile-layout-grid-skeleton-pulse-color);
    }
    100% {
      background-color: var(--biz-tile-layout-grid-skeleton-bg-color);
    }
  }

  /* States: Empty */
  .biz-tile-layout-grid__empty {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    width: 100%;
    border: 1px dashed var(--biz-tile-layout-grid-border-color);
    border-radius: 8px;
  }

  .biz-tile-layout-grid__empty-text {
    color: #6b7280;
    font-size: 0.875rem;
    margin: 0;
  }

  /* Interactive States */
  .biz-tile-layout-grid:hover {
    border-color: var(--biz-tile-layout-grid-hover-border-color);
  }

  .biz-tile-layout-grid:focus-within {
    outline: none;
    box-shadow: 0 0 0 3px var(--biz-tile-layout-grid-focus-ring-color);
  }

  .biz-tile-layout-grid--active {
    border-color: var(--biz-tile-layout-grid-active-border-color);
  }

  .biz-tile-layout-grid--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .biz-tile-layout-grid--readonly {
    user-select: none;
  }

  .biz-tile-layout-grid--error {
    border-color: var(--biz-tile-layout-grid-error-border-color);
  }
`;