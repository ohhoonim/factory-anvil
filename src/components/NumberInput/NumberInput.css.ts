import { css } from "lit";

export const numberInputStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    /* Layout & Sizing */
    --biz-number-input-height-sm: 32px;
    --biz-number-input-height-md: 40px;
    --biz-number-input-height-lg: 48px;
    --biz-number-input-padding-x: 12px;
    --biz-number-input-padding-y: 8px;
    --biz-number-input-border-radius: 4px;

    /* Colors - Base */
    --biz-number-input-bg-color: #ffffff;
    --biz-number-input-border-color: #d1d5db;
    --biz-number-input-text-color: #111827;
    --biz-number-input-placeholder-color: #9ca3af;
    --biz-number-input-control-bg: #f9fafb;
    --biz-number-input-control-icon-color: #4b5563;

    /* Colors - Interactive States */
    --biz-number-input-hover-border-color: #9ca3af;
    --biz-number-input-focus-border-color: #2563eb;
    --biz-number-input-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-number-input-control-hover-bg: #f3f4f6;

    /* Colors - Error & Disabled */
    --biz-number-input-error-color: #dc2626;
    --biz-number-input-disabled-bg-color: #f3f4f6;
    --biz-number-input-disabled-text-color: #9ca3af;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-number-input {
    display: inline-flex;
    flex-direction: column;
    font-family: inherit;
    width: 100%;
  }

  .biz-number-input--full-width {
    width: 100%;
  }

  .biz-number-input__field-wrapper {
    display: flex;
    align-items: center;
    position: relative;
    background-color: var(--biz-number-input-bg-color);
    border-radius: var(--biz-number-input-border-radius);
    transition: all 0.2s ease-in-out;
  }

  .biz-number-input__input-container {
    display: flex;
    align-items: center;
    flex: 1;
    width: 100%;
  }

  .biz-number-input__input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-number-input-text-color);
    font-size: 14px;
    padding: 0;
    text-align: right;
  }

  .biz-number-input__input::placeholder {
    color: var(--biz-number-input-placeholder-color);
  }

  /* Sizes */
  .biz-number-input--size-small .biz-number-input__field-wrapper {
    height: var(--biz-number-input-height-sm);
    padding: 0 var(--biz-number-input-padding-x);
  }
  .biz-number-input--size-small .biz-number-input__input {
    font-size: 12px;
  }

  .biz-number-input--size-medium .biz-number-input__field-wrapper {
    height: var(--biz-number-input-height-md);
    padding: 0 var(--biz-number-input-padding-x);
  }
  .biz-number-input--size-medium .biz-number-input__input {
    font-size: 14px;
  }

  .biz-number-input--size-large .biz-number-input__field-wrapper {
    height: var(--biz-number-input-height-lg);
    padding: 0 var(--biz-number-input-padding-x);
  }
  .biz-number-input--size-large .biz-number-input__input {
    font-size: 16px;
  }

  /* Variants */
  .biz-number-input--variant-outlined .biz-number-input__field-wrapper {
    border: 1px solid var(--biz-number-input-border-color);
  }

  .biz-number-input--variant-filled .biz-number-input__field-wrapper {
    background-color: var(--biz-number-input-control-bg);
    border: 1px solid transparent;
    border-bottom: 1px solid var(--biz-number-input-border-color);
  }

  .biz-number-input--variant-standard .biz-number-input__field-wrapper {
    border: none;
    border-bottom: 1px solid var(--biz-number-input-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* States: Hover & Focus */
  .biz-number-input:not(.biz-number-input--disabled):not(
      .biz-number-input--readonly
    )
    .biz-number-input__field-wrapper:hover {
    border-color: var(--biz-number-input-hover-border-color);
  }

  .biz-number-input:not(.biz-number-input--disabled):not(
      .biz-number-input--readonly
    )
    .biz-number-input__field-wrapper:focus-within {
    border-color: var(--biz-number-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-number-input-focus-ring-color);
  }

  /* States: Error */
  .biz-number-input--error .biz-number-input__field-wrapper {
    border-color: var(--biz-number-input-error-color) !important;
  }

  .biz-number-input--error
    .biz-number-input__field-wrapper:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
  }

  /* States: Disabled */
  .biz-number-input--disabled .biz-number-input__field-wrapper {
    background-color: var(--biz-number-input-disabled-bg-color);
    border-color: var(--biz-number-input-border-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-number-input--disabled .biz-number-input__input {
    color: var(--biz-number-input-disabled-text-color);
    cursor: not-allowed;
  }

  /* States: Readonly */
  .biz-number-input--readonly .biz-number-input__field-wrapper {
    background-color: var(--biz-number-input-disabled-bg-color);
  }

  /* Controls Placement & Buttons */
  .biz-number-input__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--biz-number-input-control-bg);
    color: var(--biz-number-input-control-icon-color);
    border: 1px solid var(--biz-number-input-border-color);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease;
    padding: 0;
  }

  .biz-number-input__control:hover:not(:disabled) {
    background-color: var(--biz-number-input-control-hover-bg);
  }

  .biz-number-input__control:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  /* Controls Position: End */
  .biz-number-input--controls-end .biz-number-input__controls-group {
    display: flex;
    gap: 2px;
    margin-left: 8px;
  }

  .biz-number-input--controls-end .biz-number-input__control {
    width: 24px;
    height: 24px;
    border-radius: 4px;
  }

  /* Controls Position: Stacked */
  .biz-number-input--controls-stacked .biz-number-input__controls-stacked {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 8px;
  }

  .biz-number-input--controls-stacked .biz-number-input__control {
    height: 50%;
    width: 20px;
    font-size: 10px;
    border-radius: 0;
  }

  .biz-number-input--controls-stacked
    .biz-number-input__control--increment {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  .biz-number-input--controls-stacked
    .biz-number-input__control--decrement {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  /* Controls Position: Split */
  .biz-number-input--controls-split .biz-number-input__control {
    width: 28px;
    height: 100%;
    border-radius: var(--biz-number-input-border-radius);
  }

  .biz-number-input--controls-split
    .biz-number-input__control--decrement {
    margin-right: 8px;
  }

  .biz-number-input--controls-split
    .biz-number-input__control--increment {
    margin-left: 8px;
  }

  /* Label & Helper Text Slots */
  .biz-number-input__label-wrapper {
    margin-bottom: 4px;
    font-size: 14px;
    color: var(--biz-number-input-text-color);
  }

  .biz-number-input__helper-wrapper {
    margin-top: 4px;
    font-size: 12px;
    color: var(--biz-number-input-placeholder-color);
  }

  .biz-number-input--error .biz-number-input__helper-wrapper {
    color: var(--biz-number-input-error-color);
  }
`;