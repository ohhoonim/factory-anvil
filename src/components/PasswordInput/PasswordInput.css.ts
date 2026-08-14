import { css } from "lit";

export const passwordInputStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    --biz-password-input-height-sm: 32px;
    --biz-password-input-height-md: 40px;
    --biz-password-input-height-lg: 48px;
    --biz-password-input-padding-x: 12px;
    --biz-password-input-padding-y: 8px;
    --biz-password-input-border-radius: 4px;

    --biz-password-input-bg-color: #ffffff;
    --biz-password-input-border-color: #d1d5db;
    --biz-password-input-text-color: #111827;
    --biz-password-input-placeholder-color: #9ca3af;
    --biz-password-input-toggle-icon-color: #6b7280;

    --biz-password-input-hover-border-color: #9ca3af;
    --biz-password-input-focus-border-color: #2563eb;
    --biz-password-input-focus-ring-color: rgba(37, 99, 235, 0.2);

    --biz-password-input-error-color: #dc2626;
    --biz-password-input-disabled-bg-color: #f3f4f6;
    --biz-password-input-disabled-text-color: #9ca3af;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-password-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    font-family: inherit;
  }

  .biz-password-input--full-width {
    width: 100%;
  }

  .biz-password-input__control {
    display: flex;
    align-items: center;
    position: relative;
    background-color: var(--biz-password-input-bg-color);
    border-radius: var(--biz-password-input-border-radius);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .biz-password-input__field {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-password-input-text-color);
    font-size: 14px;
    padding: 0;
  }

  .biz-password-input__field::placeholder {
    color: var(--biz-password-input-placeholder-color);
  }

  /* Variants */
  .biz-password-input--outlined .biz-password-input__control {
    border: 1px solid var(--biz-password-input-border-color);
  }

  .biz-password-input--filled .biz-password-input__control {
    background-color: #f9fafb;
    border: 1px solid transparent;
    border-bottom: 1px solid var(--biz-password-input-border-color);
  }

  .biz-password-input--standard .biz-password-input__control {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--biz-password-input-border-color);
    border-radius: 0;
  }

  /* Sizes */
  .biz-password-input--small .biz-password-input__control {
    height: var(--biz-password-input-height-sm);
    padding: 0 var(--biz-password-input-padding-x);
  }

  .biz-password-input--medium .biz-password-input__control {
    height: var(--biz-password-input-height-md);
    padding: 0 var(--biz-password-input-padding-x);
  }

  .biz-password-input--large .biz-password-input__control {
    height: var(--biz-password-input-height-lg);
    padding: 0 var(--biz-password-input-padding-x);
  }

  /* States: Hover & Focus */
  .biz-password-input:not(.biz-password-input--disabled):not(.biz-password-input--readonly) .biz-password-input__control:hover {
    border-color: var(--biz-password-input-hover-border-color);
  }

  .biz-password-input:not(.biz-password-input--disabled):not(.biz-password-input--readonly) .biz-password-input__control:focus-within {
    border-color: var(--biz-password-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-password-input-focus-ring-color);
  }

  /* States: Error */
  .biz-password-input--error .biz-password-input__control {
    border-color: var(--biz-password-input-error-color) !important;
  }

  .biz-password-input--error .biz-password-input__control:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
  }

  .biz-password-input--error .biz-password-input__helper-container {
    color: var(--biz-password-input-error-color);
  }

  /* States: Disabled */
  .biz-password-input--disabled .biz-password-input__control {
    background-color: var(--biz-password-input-disabled-bg-color);
    border-color: var(--biz-password-input-border-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  .biz-password-input--disabled .biz-password-input__field {
    color: var(--biz-password-input-disabled-text-color);
    cursor: not-allowed;
  }

  /* States: Readonly */
  .biz-password-input--readonly .biz-password-input__control {
    background-color: #f3f4f6;
    border-color: var(--biz-password-input-border-color);
  }

  /* Buttons */
  .biz-password-input__clear-button,
  .biz-password-input__toggle-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 4px;
    margin: 0;
    cursor: pointer;
    color: var(--biz-password-input-toggle-icon-color);
    border-radius: 50%;
  }

  .biz-password-input__clear-button:hover,
  .biz-password-input__toggle-button:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  .biz-password-input__clear-button:focus-visible,
  .biz-password-input__toggle-button:focus-visible {
    outline: 2px solid var(--biz-password-input-focus-border-color);
  }

  .biz-password-input__icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }

  .biz-password-input__sr-only {
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