import { css } from 'lit';

export const radioButtonStyles = css`
  :host {
    display: inline-block;

    /* Layout & Sizing */
    --biz-radio-button-size-sm: 16px;
    --biz-radio-button-size-md: 20px;
    --biz-radio-button-size-lg: 24px;
    --biz-radio-button-dot-size-sm: 6px;
    --biz-radio-button-dot-size-md: 8px;
    --biz-radio-button-dot-size-lg: 10px;
    --biz-radio-button-label-gap: 8px;
    --biz-radio-button-font-size-sm: 14px;
    --biz-radio-button-font-size-md: 16px;
    --biz-radio-button-font-size-lg: 18px;

    /* Colors - Base */
    --biz-radio-button-bg: #ffffff;
    --biz-radio-button-border-color: #d1d5db;
    --biz-radio-button-text-color: #111827;

    /* Colors - Checked */
    --biz-radio-button-checked-border-color: #2563eb;
    --biz-radio-button-checked-icon-color: #2563eb;

    /* Colors - Interactive States */
    --biz-radio-button-hover-border-color: #9ca3af;
    --biz-radio-button-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-radio-button-error-color: #dc2626;
    --biz-radio-button-disabled-bg: #f3f4f6;
    --biz-radio-button-disabled-border-color: #e5e7eb;
    --biz-radio-button-disabled-text-color: #9ca3af;
  }

  .biz-radio-button {
    display: inline-flex;
    flex-direction: column;
    font-family: inherit;
    box-sizing: border-box;
  }

  .biz-radio-button__label-container {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    user-select: none;
    gap: var(--biz-radio-button-label-gap);
  }

  .biz-radio-button--label-left .biz-radio-button__label-container {
    flex-direction: row-reverse;
  }

  /* Hidden Native Input */
  .biz-radio-button__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  /* Visual Control Box */
  .biz-radio-button__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid var(--biz-radio-button-border-color);
    border-radius: 50%;
    background-color: var(--biz-radio-button-bg);
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .biz-radio-button__dot {
    display: block;
    border-radius: 50%;
    background-color: var(--biz-radio-button-checked-icon-color);
    opacity: 0;
    transform: scale(0);
    transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
  }

  /* Checked State */
  .biz-radio-button--checked .biz-radio-button__control {
    border-color: var(--biz-radio-button-checked-border-color);
  }

  .biz-radio-button--checked .biz-radio-button__dot {
    opacity: 1;
    transform: scale(1);
  }

  /* Hover State */
  .biz-radio-button:not(.biz-radio-button--disabled):not(.biz-radio-button--readonly)
    .biz-radio-button__label-container:hover
    .biz-radio-button__control {
    border-color: var(--biz-radio-button-hover-border-color);
  }

  .biz-radio-button--checked:not(.biz-radio-button--disabled):not(.biz-radio-button--readonly)
    .biz-radio-button__label-container:hover
    .biz-radio-button__control {
    border-color: var(--biz-radio-button-checked-border-color);
  }

  /* Focus State */
  .biz-radio-button__input:focus-visible + .biz-radio-button__control {
    outline: none;
    box-shadow: 0 0 0 3px var(--biz-radio-button-focus-ring-color);
  }

  /* Sizes */
  .biz-radio-button--small .biz-radio-button__control {
    width: var(--biz-radio-button-size-sm);
    height: var(--biz-radio-button-size-sm);
  }
  .biz-radio-button--small .biz-radio-button__dot {
    width: var(--biz-radio-button-dot-size-sm);
    height: var(--biz-radio-button-dot-size-sm);
  }
  .biz-radio-button--small .biz-radio-button__label {
    font-size: var(--biz-radio-button-font-size-sm);
  }

  .biz-radio-button--medium .biz-radio-button__control {
    width: var(--biz-radio-button-size-md);
    height: var(--biz-radio-button-size-md);
  }
  .biz-radio-button--medium .biz-radio-button__dot {
    width: var(--biz-radio-button-dot-size-md);
    height: var(--biz-radio-button-dot-size-md);
  }
  .biz-radio-button--medium .biz-radio-button__label {
    font-size: var(--biz-radio-button-font-size-md);
  }

  .biz-radio-button--large .biz-radio-button__control {
    width: var(--biz-radio-button-size-lg);
    height: var(--biz-radio-button-size-lg);
  }
  .biz-radio-button--large .biz-radio-button__dot {
    width: var(--biz-radio-button-dot-size-lg);
    height: var(--biz-radio-button-dot-size-lg);
  }
  .biz-radio-button--large .biz-radio-button__label {
    font-size: var(--biz-radio-button-font-size-lg);
  }

  /* Variants */
  .biz-radio-button--button,
  .biz-radio-button--card {
    border: 1px solid var(--biz-radio-button-border-color);
    border-radius: 6px;
    padding: 8px 12px;
    background-color: var(--biz-radio-button-bg);
    transition: all 0.2s ease-in-out;
  }

  .biz-radio-button--button.biz-radio-button--checked,
  .biz-radio-button--card.biz-radio-button--checked {
    border-color: var(--biz-radio-button-checked-border-color);
    background-color: rgba(37, 99, 235, 0.04);
  }

  .biz-radio-button--card {
    padding: 12px 16px;
    border-radius: 8px;
  }

  /* Label Text */
  .biz-radio-button__label {
    color: var(--biz-radio-button-text-color);
  }

  /* Description Slot */
  .biz-radio-button__description {
    margin-top: 4px;
    padding-left: calc(var(--biz-radio-button-size-md) + var(--biz-radio-button-label-gap));
    font-size: 12px;
    color: var(--biz-radio-button-disabled-text-color);
  }

  /* Error State */
  .biz-radio-button--error .biz-radio-button__control {
    border-color: var(--biz-radio-button-error-color);
  }
  .biz-radio-button--error .biz-radio-button__label {
    color: var(--biz-radio-button-error-color);
  }

  /* Disabled State */
  .biz-radio-button--disabled {
    cursor: not-allowed;
  }
  .biz-radio-button--disabled .biz-radio-button__label-container {
    cursor: not-allowed;
  }
  .biz-radio-button--disabled .biz-radio-button__control {
    background-color: var(--biz-radio-button-disabled-bg);
    border-color: var(--biz-radio-button-disabled-border-color);
  }
  .biz-radio-button--disabled .biz-radio-button__dot {
    background-color: var(--biz-radio-button-disabled-text-color);
  }
  .biz-radio-button--disabled .biz-radio-button__label {
    color: var(--biz-radio-button-disabled-text-color);
  }

  /* Readonly State */
  .biz-radio-button--readonly {
    cursor: default;
  }
  .biz-radio-button--readonly .biz-radio-button__label-container {
    cursor: default;
  }
`;