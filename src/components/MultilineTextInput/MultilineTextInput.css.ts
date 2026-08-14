import { css } from 'lit';

export const multilineTextInputStyles = css`
  :host {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;

    --biz-multiline-text-input-min-height: 80px;
    --biz-multiline-text-input-padding-x: 12px;
    --biz-multiline-text-input-padding-y: 8px;
    --biz-multiline-text-input-border-radius: 4px;

    --biz-multiline-text-input-bg-color: #ffffff;
    --biz-multiline-text-input-border-color: #d1d5db;
    --biz-multiline-text-input-text-color: #111827;
    --biz-multiline-text-input-placeholder-color: #9ca3af;
    --biz-multiline-text-input-counter-color: #6b7280;

    --biz-multiline-text-input-hover-border-color: #9ca3af;
    --biz-multiline-text-input-focus-border-color: #2563eb;
    --biz-multiline-text-input-focus-ring-color: rgba(37, 99, 235, 0.2);

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

  .biz-multiline-text-input__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-multiline-text-input-text-color);
  }

  .biz-multiline-text-input__control {
    position: relative;
    display: flex;
    width: 100%;
  }

  .biz-multiline-text-input__textarea {
    width: 100%;
    min-height: var(--biz-multiline-text-input-min-height);
    padding: var(--biz-multiline-text-input-padding-y) var(--biz-multiline-text-input-padding-x);
    font-family: inherit;
    font-size: 14px;
    line-height: 1.5;
    color: var(--biz-multiline-text-input-text-color);
    background-color: var(--biz-multiline-text-input-bg-color);
    border: 1px solid var(--biz-multiline-text-input-border-color);
    border-radius: var(--biz-multiline-text-input-border-radius);
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .biz-multiline-text-input__textarea::placeholder {
    color: var(--biz-multiline-text-input-placeholder-color);
  }

  .biz-multiline-text-input__textarea:hover:not(:disabled):not([readonly]) {
    border-color: var(--biz-multiline-text-input-hover-border-color);
  }

  .biz-multiline-text-input__textarea:focus:not(:disabled):not([readonly]) {
    border-color: var(--biz-multiline-text-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-multiline-text-input-focus-ring-color);
  }

  .biz-multiline-text-input.outlined .biz-multiline-text-input__textarea {
    border: 1px solid var(--biz-multiline-text-input-border-color);
    background-color: var(--biz-multiline-text-input-bg-color);
  }

  .biz-multiline-text-input.filled .biz-multiline-text-input__textarea {
    border: 1px solid transparent;
    background-color: #f3f4f6;
  }

  .biz-multiline-text-input.filled .biz-multiline-text-input__textarea:hover:not(:disabled):not([readonly]) {
    background-color: #e5e7eb;
  }

  .biz-multiline-text-input.filled .biz-multiline-text-input__textarea:focus:not(:disabled):not([readonly]) {
    background-color: var(--biz-multiline-text-input-bg-color);
    border-color: var(--biz-multiline-text-input-focus-border-color);
  }

  .biz-multiline-text-input.standard .biz-multiline-text-input__textarea {
    border: none;
    border-bottom: 1px solid var(--biz-multiline-text-input-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    background-color: transparent;
  }

  .biz-multiline-text-input.standard .biz-multiline-text-input__textarea:focus:not(:disabled):not([readonly]) {
    border-bottom-color: var(--biz-multiline-text-input-focus-border-color);
    box-shadow: 0 1px 0 0 var(--biz-multiline-text-input-focus-border-color);
  }

  .biz-multiline-text-input.small .biz-multiline-text-input__textarea {
    font-size: 12px;
    --biz-multiline-text-input-padding-x: 8px;
    --biz-multiline-text-input-padding-y: 6px;
    --biz-multiline-text-input-min-height: 60px;
  }

  .biz-multiline-text-input.medium .biz-multiline-text-input__textarea {
    font-size: 14px;
    --biz-multiline-text-input-padding-x: 12px;
    --biz-multiline-text-input-padding-y: 8px;
    --biz-multiline-text-input-min-height: 80px;
  }

  .biz-multiline-text-input.large .biz-multiline-text-input__textarea {
    font-size: 16px;
    --biz-multiline-text-input-padding-x: 16px;
    --biz-multiline-text-input-padding-y: 12px;
    --biz-multiline-text-input-min-height: 100px;
  }

  .biz-multiline-text-input.disabled .biz-multiline-text-input__textarea {
    background-color: var(--biz-multiline-text-input-disabled-bg-color);
    color: var(--biz-multiline-text-input-disabled-text-color);
    cursor: not-allowed;
    resize: none;
  }

  .biz-multiline-text-input.readonly .biz-multiline-text-input__textarea {
    background-color: #f9fafb;
    cursor: default;
  }

  .biz-multiline-text-input.error .biz-multiline-text-input__textarea {
    border-color: var(--biz-multiline-text-input-error-color);
  }

  .biz-multiline-text-input.error .biz-multiline-text-input__textarea:focus {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  .biz-multiline-text-input.loading .biz-multiline-text-input__textarea {
    opacity: 0.6;
    pointer-events: none;
  }

  .biz-multiline-text-input__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 12px;
    color: var(--biz-multiline-text-input-counter-color);
    margin-top: 2px;
  }

  .biz-multiline-text-input.error .biz-multiline-text-input__helper {
    color: var(--biz-multiline-text-input-error-color);
  }

  .biz-multiline-text-input__footer-right {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  .biz-multiline-text-input__counter {
    font-size: 12px;
    color: var(--biz-multiline-text-input-counter-color);
    white-space: nowrap;
  }

  .biz-multiline-text-input.error .biz-multiline-text-input__counter {
    color: var(--biz-multiline-text-input-error-color);
  }
`;