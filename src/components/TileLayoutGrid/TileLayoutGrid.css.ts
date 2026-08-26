import { css } from 'lit';

export const tileLayoutGridStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;

    /* Design Tokens */
    --biz-tile-layout-grid-gap-sm: 12px;
    --biz-tile-layout-grid-gap-md: 16px;
    --biz-tile-layout-grid-gap-lg: 24px;
    --biz-tile-layout-grid-min-width: 280px;
    --biz-tile-layout-grid-aspect-ratio: 1 / 1;

    /* Colors - Base */
    --biz-tile-layout-grid-bg-color: transparent;
    --biz-tile-layout-grid-skeleton-bg-color: #e5e7eb;

    /* Colors - Interactive States */
    --biz-tile-layout-grid-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-tile-layout-grid-border-color: #d1d5db;
    --biz-tile-layout-grid-hover-bg: rgba(0, 0, 0, 0.02);
    --biz-tile-layout-grid-active-bg: rgba(0, 0, 0, 0.05);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Root Container */
  .biz-tile-layout-grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--biz-tile-layout-grid-bg-color);
  }

  .biz-tile-layout-grid__header {
    margin-bottom: var(--biz-tile-layout-grid-gap-current, var(--biz-tile-layout-grid-gap-md));
  }

  .biz-tile-layout-grid__header:empty {
    display: none;
  }

  /* Grid Content Layout */
  .biz-tile-layout-grid__content {
    display: grid;
    gap: var(--biz-tile-layout-grid-gap-current, var(--biz-tile-layout-grid-gap-md));
    grid-template-columns: var(--biz-tile-layout-grid-columns-current);
    width: 100%;
  }

  .biz-tile-layout-grid__content ::slotted(*) {
    box-sizing: border-box;
    min-width: 0;
  }

  .biz-tile-layout-grid__content--hidden {
    display: none;
  }

  /* Mode Variants */
  .biz-tile-layout-grid--fixed .biz-tile-layout-grid__content ::slotted(*) {
    aspect-ratio: var(--biz-tile-layout-grid-aspect-ratio-current, var(--biz-tile-layout-grid-aspect-ratio));
    height: 100%;
    object-fit: cover;
  }

  .biz-tile-layout-grid--masonry .biz-tile-layout-grid__content {
    align-items: start;
  }

  .biz-tile-layout-grid--masonry .biz-tile-layout-grid__content ::slotted(*) {
    height: auto;
  }

  /* Structural Visual Variants */
  .biz-tile-layout-grid--outlined .biz-tile-layout-grid__content ::slotted(*) {
    border: 1px solid var(--biz-tile-layout-grid-border-color);
    border-radius: 8px;
  }

  .biz-tile-layout-grid--filled .biz-tile-layout-grid__content ::slotted(*) {
    background-color: #f3f4f6;
    border-radius: 8px;
  }

  .biz-tile-layout-grid--standard .biz-tile-layout-grid__content ::slotted(*) {
    background-color: transparent;
  }

  /* Size Options */
  .biz-tile-layout-grid--small {
    --biz-tile-layout-grid-gap-current: var(--biz-tile-layout-grid-gap-sm);
  }

  .biz-tile-layout-grid--medium {
    --biz-tile-layout-grid-gap-current: var(--biz-tile-layout-grid-gap-md);
  }

  .biz-tile-layout-grid--large {
    --biz-tile-layout-grid-gap-current: var(--biz-tile-layout-grid-gap-lg);
  }

  /* Skeleton Loading State */
  .biz-tile-layout-grid__skeleton-container {
    display: grid;
    gap: var(--biz-tile-layout-grid-gap-current, var(--biz-tile-layout-grid-gap-md));
    grid-template-columns: var(--biz-tile-layout-grid-columns-current);
    width: 100%;
  }

  .biz-tile-layout-grid__skeleton-item {
    width: 100%;
    aspect-ratio: var(--biz-tile-layout-grid-aspect-ratio-current, var(--biz-tile-layout-grid-aspect-ratio));
    background-color: var(--biz-tile-layout-grid-skeleton-bg-color);
    border-radius: 8px;
    animation: biz-tile-skeleton-pulse 1.5s infinite ease-in-out;
  }

  @keyframes biz-tile-skeleton-pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }

  /* Empty State */
  .biz-tile-layout-grid__empty {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 48px 16px;
    width: 100%;
    border: 1px dashed var(--biz-tile-layout-grid-border-color);
    border-radius: 8px;
    text-align: center;
  }

  .biz-tile-layout-grid__empty-text {
    margin: 0;
    color: #6b7280;
    font-size: 14px;
  }

  /* States Effects */
  .biz-tile-layout-grid ::slotted(*:hover) {
    background-color: var(--biz-tile-layout-grid-hover-bg);
  }

  .biz-tile-layout-grid ::slotted(*:focus-visible) {
    outline: 2px solid var(--biz-tile-layout-grid-focus-ring-color);
    outline-offset: 2px;
  }

  .biz-tile-layout-grid ::slotted(*:active) {
    background-color: var(--biz-tile-layout-grid-active-bg);
  }

  .biz-tile-layout-grid--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .biz-tile-layout-grid--readonly {
    pointer-events: none;
  }

  .biz-tile-layout-grid--error {
    border: 1px solid #ef4444;
  }
`;