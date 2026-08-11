import { css } from "lit";

export const textInputStyles = css`
  :host {
    display: inline-block;
    --biz-text-input-height-sm: 32px;
    --biz-text-input-height-md: 40px;
    --biz-text-input-height-lg: 48px;
    --biz-text-input-padding-x: 12px;
    --biz-text-input-padding-y: 8px;
    --biz-text-input-border-radius: 4px;
    --biz-text-input-bg-color: #ffffff;
    --biz-text-input-border-color: #d1d5db;
    --biz-text-input-text-color: #111827;
    --biz-text-input-placeholder-color: #9ca3af;
    --biz-text-input-hover-border-color: #9ca3af;
    --biz-text-input-focus-border-color: #2563eb;
    --biz-text-input-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-text-input-error-color: #dc2626;
    --biz-text-input-disabled-bg-color: #f3f4f6;
    --biz-text-input-disabled-text-color: #9ca3af;
  }

  :host([full-width]),
  .biz-text-input.full-width {
    width: 100%;
  }

  .biz-text-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    font-family: inherit;
  }

  .biz-text-input__control {
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    border-radius: var(--biz-text-input-border-radius);
    background-color: var(--biz-text-input-bg-color);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .biz-text-input__field {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-text-input-text-color);
    font-size: 14px;
    padding: 0 var(--biz-text-input-padding-x);
    box-sizing: border-box;
  }

  .biz-text-input__field::placeholder {
    color: var(--biz-text-input-placeholder-color);
  }

  .biz-text-input.small .biz-text-input__control {
    height: var(--biz-text-input-height-sm);
  }

  .biz-text-input.small .biz-text-input__field {
    font-size: 12px;
  }

  .biz-text-input.medium .biz-text-input__control {
    height: var(--biz-text-input-height-md);
  }

  .biz-text-input.medium .biz-text-input__field {
    font-size: 14px;
  }

  .biz-text-input.large .biz-text-input__control {
    height: var(--biz-text-input-height-lg);
  }

  .biz-text-input.large .biz-text-input__field {
    font-size: 16px;
  }

  .biz-text-input.outlined .biz-text-input__control {
    border: 1px solid var(--biz-text-input-border-color);
  }

  .biz-text-input.filled .biz-text-input__control {
    border: none;
    border-bottom: 1px solid var(--biz-text-input-border-color);
    background-color: var(--biz-text-input-disabled-bg-color);
    border-radius: var(--biz-text-input-border-radius) var(--biz-text-input-border-radius) 0 0;
  }

  .biz-text-input.standard .biz-text-input__control {
    border: none;
    border-bottom: 1px solid var(--biz-text-input-border-color);
    border-radius: 0;
    background-color: transparent;
  }

  .biz-text-input.outlined .biz-text-input__control:hover:not(.disabled) {
    border-color: var(--biz-text-input-hover-border-color);
  }

  .biz-text-input__control:focus-within {
    border-color: var(--biz-text-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-text-input-focus-ring-color);
  }

  .biz-text-input.disabled .biz-text-input__control {
    background-color: var(--biz-text-input-disabled-bg-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-text-input.disabled .biz-text-input__field {
    color: var(--biz-text-input-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-text-input.readonly .biz-text-input__control {
    background-color: var(--biz-text-input-disabled-bg-color);
  }

  .biz-text-input.error .biz-text-input__control {
    border-color: var(--biz-text-input-error-color);
  }

  .biz-text-input.error .biz-text-input__control:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  .biz-text-input__clear-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0 8px;
    color: var(--biz-text-input-placeholder-color);
    font-size: 16px;
    line-height: 1;
  }

  .biz-text-input__spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--biz-text-input-border-color);
    border-top-color: var(--biz-text-input-focus-border-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  .biz-text-input__label-wrapper {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-text-input-text-color);
    line-height: 1.4;
  }

  .biz-text-input__label-wrapper ::slotted(label) {
    cursor: pointer;
  }

  .biz-text-input__helper-wrapper {
    display: flex;
    align-items: center;
    font-size: 12px;
    line-height: 1.4;
    color: var(--biz-text-input-placeholder-color);
    min-height: 18px;
  }

  .biz-text-input.error .biz-text-input__helper-wrapper {
    color: var(--biz-text-input-error-color);
  }

  .biz-text-input.disabled .biz-text-input__label-wrapper,
  .biz-text-input.disabled .biz-text-input__helper-wrapper {
    color: var(--biz-text-input-disabled-text-color);
    opacity: 0.6;
  }
`;