import { css } from "lit";

export const multilineTextInputStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    /* Layout & Sizing */
    --biz-multiline-text-input-min-height: 80px;
    --biz-multiline-text-input-padding-x: 12px;
    --biz-multiline-text-input-padding-y: 8px;
    --biz-multiline-text-input-border-radius: 4px;
    --biz-multiline-text-input-font-size: 14px;
    --biz-multiline-text-input-line-height: 1.5;

    /* Colors - Base */
    --biz-multiline-text-input-bg-color: #ffffff;
    --biz-multiline-text-input-border-color: #d1d5db;
    --biz-multiline-text-input-text-color: #111827;
    --biz-multiline-text-input-placeholder-color: #9ca3af;
    --biz-multiline-text-input-counter-color: #6b7280;

    /* Colors - Interactive States */
    --biz-multiline-text-input-hover-border-color: #9ca3af;
    --biz-multiline-text-input-focus-border-color: #2563eb;
    --biz-multiline-text-input-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-multiline-text-input-error-color: #dc2626;
    --biz-multiline-text-input-disabled-bg-color: #f3f4f6;
    --biz-multiline-text-input-disabled-text-color: #9ca3af;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-multiline-text-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    font-family: inherit;
  }

  .biz-multiline-text-input--full-width {
    width: 100%;
  }

  /* Header */
  .biz-multiline-text-input__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  /* Control Container */
  .biz-multiline-text-input__control {
    position: relative;
    display: flex;
    align-items: stretch;
    width: 100%;
    border-radius: var(--biz-multiline-text-input-border-radius);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  /* Textarea */
  .biz-multiline-text-input__textarea {
    width: 100%;
    min-height: var(--biz-multiline-text-input-min-height);
    padding: var(--biz-multiline-text-input-padding-y) var(--biz-multiline-text-input-padding-x);
    font-family: inherit;
    font-size: var(--biz-multiline-text-input-font-size);
    line-height: var(--biz-multiline-text-input-line-height);
    color: var(--biz-multiline-text-input-text-color);
    background-color: transparent;
    border: none;
    outline: none;
    box-sizing: border-box;
  }

  .biz-multiline-text-input__textarea::placeholder {
    color: var(--biz-multiline-text-input-placeholder-color);
  }

  /* Sizes */
  .biz-multiline-text-input--small {
    --biz-multiline-text-input-min-height: 60px;
    --biz-multiline-text-input-padding-x: 8px;
    --biz-multiline-text-input-padding-y: 6px;
    --biz-multiline-text-input-font-size: 12px;
  }

  .biz-multiline-text-input--medium {
    --biz-multiline-text-input-min-height: 80px;
    --biz-multiline-text-input-padding-x: 12px;
    --biz-multiline-text-input-padding-y: 8px;
    --biz-multiline-text-input-font-size: 14px;
  }

  .biz-multiline-text-input--large {
    --biz-multiline-text-input-min-height: 100px;
    --biz-multiline-text-input-padding-x: 16px;
    --biz-multiline-text-input-padding-y: 12px;
    --biz-multiline-text-input-font-size: 16px;
  }

  /* Variants */
  /* Outlined */
  .biz-multiline-text-input--outlined .biz-multiline-text-input__control {
    background-color: var(--biz-multiline-text-input-bg-color);
    border: 1px solid var(--biz-multiline-text-input-border-color);
  }

  .biz-multiline-text-input--outlined:not(.biz-multiline-text-input--disabled):hover .biz-multiline-text-input__control {
    border-color: var(--biz-multiline-text-input-hover-border-color);
  }

  .biz-multiline-text-input--outlined:not(.biz-multiline-text-input--disabled):focus-within .biz-multiline-text-input__control {
    border-color: var(--biz-multiline-text-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-multiline-text-input-focus-ring-color);
  }

  /* Filled */
  .biz-multiline-text-input--filled .biz-multiline-text-input__control {
    background-color: var(--biz-multiline-text-input-disabled-bg-color);
    border: 1px solid transparent;
    border-bottom: 2px solid var(--biz-multiline-text-input-border-color);
    border-radius: var(--biz-multiline-text-input-border-radius) var(--biz-multiline-text-input-border-radius) 0 0;
  }

  .biz-multiline-text-input--filled:not(.biz-multiline-text-input--disabled):hover .biz-multiline-text-input__control {
    background-color: #e5e7eb;
    border-bottom-color: var(--biz-multiline-text-input-hover-border-color);
  }

  .biz-multiline-text-input--filled:not(.biz-multiline-text-input--disabled):focus-within .biz-multiline-text-input__control {
    background-color: #e5e7eb;
    border-bottom-color: var(--biz-multiline-text-input-focus-border-color);
  }

  /* Standard */
  .biz-multiline-text-input--standard .biz-multiline-text-input__control {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--biz-multiline-text-input-border-color);
    border-radius: 0;
  }

  .biz-multiline-text-input--standard:not(.biz-multiline-text-input--disabled):hover .biz-multiline-text-input__control {
    border-bottom-color: var(--biz-multiline-text-input-hover-border-color);
  }

  .biz-multiline-text-input--standard:not(.biz-multiline-text-input--disabled):focus-within .biz-multiline-text-input__control {
    border-bottom: 2px solid var(--biz-multiline-text-input-focus-border-color);
  }

  /* States: Error */
  .biz-multiline-text-input--error.biz-multiline-text-input--outlined .biz-multiline-text-input__control {
    border-color: var(--biz-multiline-text-input-error-color);
  }

  .biz-multiline-text-input--error.biz-multiline-text-input--outlined:focus-within .biz-multiline-text-input__control {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  .biz-multiline-text-input--error.biz-multiline-text-input--filled .biz-multiline-text-input__control,
  .biz-multiline-text-input--error.biz-multiline-text-input--standard .biz-multiline-text-input__control {
    border-bottom-color: var(--biz-multiline-text-input-error-color);
  }

  /* States: Disabled */
  .biz-multiline-text-input--disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  .biz-multiline-text-input--disabled .biz-multiline-text-input__control {
    background-color: var(--biz-multiline-text-input-disabled-bg-color);
  }

  .biz-multiline-text-input--disabled .biz-multiline-text-input__textarea {
    color: var(--biz-multiline-text-input-disabled-text-color);
    cursor: not-allowed;
  }

  /* States: Readonly */
  .biz-multiline-text-input--readonly .biz-multiline-text-input__textarea {
    cursor: default;
  }

  /* Footer */
  .biz-multiline-text-input__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
  }

  .biz-multiline-text-input__footer-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .biz-multiline-text-input__counter {
    margin-left: auto;
    color: var(--biz-multiline-text-input-counter-color);
    font-size: 12px;
    white-space: nowrap;
  }

  .biz-multiline-text-input__counter--error {
    color: var(--biz-multiline-text-input-error-color);
    font-weight: bold;
  }
`;