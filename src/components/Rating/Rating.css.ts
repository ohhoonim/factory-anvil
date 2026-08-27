import { css } from "lit";

export const ratingStyles = css`
  :host {
    /* Layout & Sizing Design Tokens */
    --biz-rating-icon-size-sm: 16px;
    --biz-rating-icon-size-md: 24px;
    --biz-rating-icon-size-lg: 32px;
    --biz-rating-gap: 4px;

    /* Colors - Icon */
    --biz-rating-filled-color: #f59e0b;
    --biz-rating-empty-color: #e5e7eb;
    --biz-rating-hover-color: #fbbf24;

    /* Colors - Interactive & States */
    --biz-rating-focus-ring-color: rgba(245, 158, 11, 0.4);
    --biz-rating-disabled-filled-color: #d1d5db;
    --biz-rating-disabled-empty-color: #f3f4f6;

    display: inline-flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Root Container */
  .biz-rating {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    outline: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .biz-rating__track-container {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .biz-rating__track {
    display: inline-flex;
    align-items: center;
    gap: var(--biz-rating-gap);
    position: relative;
    cursor: pointer;
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

  /* Rating Item Layout & Layers */
  .biz-rating__item {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease-in-out;
  }

  .biz-rating__icon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .biz-rating__icon svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  .biz-rating__icon--empty {
    color: var(--biz-rating-empty-color);
  }

  .biz-rating__icon--filled {
    color: var(--biz-rating-filled-color);
  }

  .biz-rating__item-filled-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
  }

  /* States: Hover, Focus, Disabled, Readonly */
  .biz-rating:not(.biz-rating--readonly):not(.biz-rating--disabled) .biz-rating__item:hover {
    transform: scale(1.15);
  }

  .biz-rating--hover .biz-rating__icon--filled {
    color: var(--biz-rating-hover-color);
  }

  .biz-rating:focus-visible .biz-rating__track {
    outline: 2px solid var(--biz-rating-focus-ring-color);
    outline-offset: 4px;
    border-radius: 4px;
  }

  .biz-rating--disabled .biz-rating__track {
    cursor: not-allowed;
  }

  .biz-rating--disabled .biz-rating__icon--filled {
    color: var(--biz-rating-disabled-filled-color);
  }

  .biz-rating--disabled .biz-rating__icon--empty {
    color: var(--biz-rating-disabled-empty-color);
  }

  .biz-rating--readonly .biz-rating__track {
    cursor: default;
  }

  /* Value Label & Helper Text */
  .biz-rating__value-label {
    font-size: 14px;
    color: #374151;
    font-weight: 500;
  }

  .biz-rating__helper-text {
    font-size: 12px;
    color: #6b7280;
    margin-top: 2px;
  }

  .biz-rating--disabled .biz-rating__value-label,
  .biz-rating--disabled .biz-rating__helper-text {
    color: #9ca3af;
  }

  /* Hidden input for native form integration */
  .biz-rating__native-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }
`;