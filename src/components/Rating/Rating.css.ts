import { css } from 'lit';

export const ratingStyles = css`
  :host {
    /* Layout & Sizing Token */
    --biz-rating-icon-size-sm: 16px;
    --biz-rating-icon-size-md: 24px;
    --biz-rating-icon-size-lg: 32px;
    --biz-rating-gap: 4px;

    /* Colors - Icon Token */
    --biz-rating-filled-color: #f59e0b;
    --biz-rating-empty-color: #e5e7eb;
    --biz-rating-hover-color: #fbbf24;

    /* Colors - Interactive & States Token */
    --biz-rating-focus-ring-color: rgba(245, 158, 11, 0.4);
    --biz-rating-disabled-filled-color: #d1d5db;
    --biz-rating-disabled-empty-color: #f3f4f6;

    display: inline-block;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-rating {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    outline: none;
    user-select: none;
    position: relative;
  }

  .biz-rating__track {
    display: inline-flex;
    align-items: center;
    gap: var(--biz-rating-gap);
  }

  /* Sizes */
  .biz-rating--sm .biz-rating__item {
    width: var(--biz-rating-icon-size-sm);
    height: var(--biz-rating-icon-size-sm);
  }

  .biz-rating--md .biz-rating__item {
    width: var(--biz-rating-icon-size-md);
    height: var(--biz-rating-icon-size-md);
  }

  .biz-rating--lg .biz-rating__item {
    width: var(--biz-rating-icon-size-lg);
    height: var(--biz-rating-icon-size-lg);
  }

  /* Rating Item Layout */
  .biz-rating__item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .biz-rating__icon-layer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .biz-rating__icon-layer--empty {
    color: var(--biz-rating-empty-color);
  }

  .biz-rating__icon-layer--filled {
    position: absolute;
    top: 0;
    left: 0;
    color: var(--biz-rating-filled-color);
    white-space: nowrap;
    transition: width 0.1s ease;
  }

  .biz-rating__default-icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
    flex-shrink: 0;
  }

  /* Tooltip */
  .biz-rating__tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 6px;
    padding: 2px 6px;
    background-color: #1f2937;
    color: #ffffff;
    font-size: 12px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;
  }

  /* States: Hover */
  .biz-rating:not(.biz-rating--disabled):not(.biz-rating--readonly) .biz-rating__item:hover {
    transform: scale(1.15);
  }

  .biz-rating:not(.biz-rating--disabled):not(.biz-rating--readonly) .biz-rating__icon-layer--filled {
    color: var(--biz-rating-hover-color);
  }

  /* States: Focus */
  .biz-rating--focused .biz-rating__track {
    border-radius: 4px;
    box-shadow: 0 0 0 3px var(--biz-rating-focus-ring-color);
  }

  /* States: Disabled */
  .biz-rating--disabled .biz-rating__item {
    cursor: not-allowed;
  }

  .biz-rating--disabled .biz-rating__icon-layer--empty {
    color: var(--biz-rating-disabled-empty-color);
  }

  .biz-rating--disabled .biz-rating__icon-layer--filled {
    color: var(--biz-rating-disabled-filled-color);
  }

  /* States: Readonly */
  .biz-rating--readonly .biz-rating__item {
    cursor: default;
  }

  /* Label & Helper Slots */
  .biz-rating__value-label {
    font-size: 14px;
    color: #4b5563;
  }

  .biz-rating__helper {
    font-size: 12px;
    color: #6b7280;
  }
`;