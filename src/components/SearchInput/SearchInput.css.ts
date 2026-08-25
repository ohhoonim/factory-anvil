import { css } from 'lit';

export const searchInputStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    /* Layout & Sizing */
    --biz-search-input-height-sm: 32px;
    --biz-search-input-height-md: 40px;
    --biz-search-input-height-lg: 48px;
    --biz-search-input-padding-x: 12px;
    --biz-search-input-padding-y: 8px;
    --biz-search-input-border-radius: 4px;

    /* Colors - Base */
    --biz-search-input-bg-color: #ffffff;
    --biz-search-input-filled-bg-color: #f3f4f6;
    --biz-search-input-border-color: #d1d5db;
    --biz-search-input-text-color: #111827;
    --biz-search-input-placeholder-color: #9ca3af;
    --biz-search-input-icon-color: #6b7280;

    /* Colors - Interactive States */
    --biz-search-input-hover-border-color: #9ca3af;
    --biz-search-input-focus-border-color: #2563eb;
    --biz-search-input-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-search-input-error-color: #dc2626;
    --biz-search-input-disabled-bg-color: #f3f4f6;
    --biz-search-input-disabled-text-color: #9ca3af;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-search-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 280px;
    font-family: inherit;
  }

  .biz-search-input--full-width {
    width: 100%;
  }

  .biz-search-input__label {
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-search-input-text-color);
  }

  .biz-search-input__control-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    background-color: var(--biz-search-input-bg-color);
    border: 1px solid var(--biz-search-input-border-color);
    border-radius: var(--biz-search-input-border-radius);
    padding: 0 var(--biz-search-input-padding-x);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  /* Sizes */
  .biz-search-input--sm .biz-search-input__control-wrapper {
    height: var(--biz-search-input-height-sm);
    font-size: 12px;
  }

  .biz-search-input--md .biz-search-input__control-wrapper {
    height: var(--biz-search-input-height-md);
    font-size: 14px;
  }

  .biz-search-input--lg .biz-search-input__control-wrapper {
    height: var(--biz-search-input-height-lg);
    font-size: 16px;
  }

  /* Variants */
  .biz-search-input--outlined .biz-search-input__control-wrapper {
    border-style: solid;
  }

  .biz-search-input--filled .biz-search-input__control-wrapper {
    background-color: var(--biz-search-input-filled-bg-color);
    border-color: transparent;
  }

  .biz-search-input--standard .biz-search-input__control-wrapper {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Input Control */
  .biz-search-input__control {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    color: var(--biz-search-input-text-color);
    font-size: inherit;
    font-family: inherit;
    outline: none;
    padding: 0 8px;
  }

  .biz-search-input__control::placeholder {
    color: var(--biz-search-input-placeholder-color);
  }

  /* Slots */
  .biz-search-input__start-slot,
  .biz-search-input__end-slot {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--biz-search-input-icon-color);
  }

  /* Buttons */
  .biz-search-input__clear-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 2px;
    margin: 0;
    cursor: pointer;
    color: var(--biz-search-input-icon-color);
    border-radius: 50%;
  }

  .biz-search-input__clear-btn:hover {
    opacity: 0.8;
  }

  .biz-search-input__action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: var(--biz-search-input-focus-border-color);
    color: #ffffff;
    padding: 4px 10px;
    border-radius: var(--biz-search-input-border-radius);
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
  }

  /* Interactive States */
  .biz-search-input__control-wrapper:hover {
    border-color: var(--biz-search-input-hover-border-color);
  }

  .biz-search-input__control-wrapper:focus-within {
    border-color: var(--biz-search-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-search-input-focus-ring-color);
  }

  /* Disabled State */
  .biz-search-input--disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .biz-search-input--disabled .biz-search-input__control-wrapper {
    background-color: var(--biz-search-input-disabled-bg-color);
    border-color: var(--biz-search-input-border-color);
  }

  .biz-search-input--disabled .biz-search-input__control {
    color: var(--biz-search-input-disabled-text-color);
    cursor: not-allowed;
  }

  /* Readonly State */
  .biz-search-input--readonly .biz-search-input__control {
    cursor: default;
  }

  /* Error State */
  .biz-search-input--error .biz-search-input__control-wrapper {
    border-color: var(--biz-search-input-error-color);
  }

  .biz-search-input--error .biz-search-input__control-wrapper:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  .biz-search-input__helper-text {
    font-size: 12px;
    color: var(--biz-search-input-icon-color);
  }

  .biz-search-input--error .biz-search-input__helper-text {
    color: var(--biz-search-input-error-color);
  }

  /* Spinner */
  .biz-search-input__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid var(--biz-search-input-icon-color);
    border-top-color: transparent;
    border-radius: 50%;
    animation: biz-search-input-spin 0.8s linear infinite;
  }

  @keyframes biz-search-input-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Screen Reader Only */
  .biz-search-input__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;