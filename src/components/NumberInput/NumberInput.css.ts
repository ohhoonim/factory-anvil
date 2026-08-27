import { css } from 'lit';

export const numberInputStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    /* Layout & Sizing Tokens */
    --biz-number-input-height-sm: 32px;
    --biz-number-input-height-md: 40px;
    --biz-number-input-height-lg: 48px;
    --biz-number-input-padding-x: 12px;
    --biz-number-input-padding-y: 8px;
    --biz-number-input-border-radius: 4px;

    /* Colors - Base Tokens */
    --biz-number-input-bg-color: #ffffff;
    --biz-number-input-border-color: #d1d5db;
    --biz-number-input-text-color: #111827;
    --biz-number-input-placeholder-color: #9ca3af;
    --biz-number-input-control-bg: #f9fafb;
    --biz-number-input-control-icon-color: #4b5563;

    /* Colors - Interactive States Tokens */
    --biz-number-input-hover-border-color: #9ca3af;
    --biz-number-input-focus-border-color: #2563eb;
    --biz-number-input-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-number-input-control-hover-bg: #f3f4f6;

    /* Colors - Error & Disabled Tokens */
    --biz-number-input-error-color: #dc2626;
    --biz-number-input-disabled-bg-color: #f3f4f6;
    --biz-number-input-disabled-text-color: #9ca3af;
  }

  :host([full-width]),
  .biz-number-input.full-width {
    width: 100%;
  }

  .biz-number-input {
    display: inline-flex;
    flex-direction: column;
    font-family: inherit;
    width: 100%;
  }

  .label-wrapper {
    margin-bottom: 4px;
    font-size: 14px;
    color: var(--biz-number-input-text-color);
  }

  .input-container {
    display: flex;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    border-radius: var(--biz-number-input-border-radius);
    background-color: var(--biz-number-input-bg-color);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    padding: 0 var(--biz-number-input-padding-x);
  }

  .native-input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-number-input-text-color);
    font-size: 14px;
    text-align: right;
    box-sizing: border-box;
  }

  .native-input::placeholder {
    color: var(--biz-number-input-placeholder-color);
  }

  /* --- Sizes --- */
  .biz-number-input.small .input-container {
    height: var(--biz-number-input-height-sm);
  }
  .biz-number-input.small .native-input {
    font-size: 12px;
  }

  .biz-number-input.medium .input-container {
    height: var(--biz-number-input-height-md);
  }
  .biz-number-input.medium .native-input {
    font-size: 14px;
  }

  .biz-number-input.large .input-container {
    height: var(--biz-number-input-height-lg);
  }
  .biz-number-input.large .native-input {
    font-size: 16px;
  }

  /* --- Variants --- */
  /* Outlined */
  .biz-number-input.outlined .input-container {
    border: 1px solid var(--biz-number-input-border-color);
  }
  .biz-number-input.outlined:not(.disabled):hover .input-container {
    border-color: var(--biz-number-input-hover-border-color);
  }

  /* Filled */
  .biz-number-input.filled .input-container {
    border: 1px solid transparent;
    background-color: var(--biz-number-input-control-bg);
  }
  .biz-number-input.filled:not(.disabled):hover .input-container {
    background-color: var(--biz-number-input-control-hover-bg);
  }

  /* Standard */
  .biz-number-input.standard .input-container {
    border: none;
    border-bottom: 1px solid var(--biz-number-input-border-color);
    border-radius: 0;
    background-color: transparent;
  }
  .biz-number-input.standard:not(.disabled):hover .input-container {
    border-bottom-color: var(--biz-number-input-hover-border-color);
  }

  /* --- States: Focus --- */
  .input-container:has(.native-input:focus-visible) {
    border-color: var(--biz-number-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-number-input-focus-ring-color);
  }
  .biz-number-input.standard .input-container:has(.native-input:focus-visible) {
    box-shadow: none;
    border-bottom: 2px solid var(--biz-number-input-focus-border-color);
  }

  /* --- States: Error --- */
  .biz-number-input.error .input-container {
    border-color: var(--biz-number-input-error-color) !important;
  }
  .biz-number-input.error .input-container:has(.native-input:focus-visible) {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  /* --- States: Disabled --- */
  .biz-number-input.disabled {
    cursor: not-allowed;
  }
  .biz-number-input.disabled .input-container {
    background-color: var(--biz-number-input-disabled-bg-color);
    border-color: var(--biz-number-input-border-color);
    opacity: 0.6;
  }
  .biz-number-input.disabled .native-input {
    color: var(--biz-number-input-disabled-text-color);
    cursor: not-allowed;
  }

  /* --- States: Readonly --- */
  .biz-number-input.readonly .input-container {
    background-color: var(--biz-number-input-control-bg);
  }
  .biz-number-input.readonly .native-input {
    cursor: default;
  }

  /* --- Control Buttons Styling --- */
  .control-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--biz-number-input-control-bg);
    border: 1px solid var(--biz-number-input-border-color);
    color: var(--biz-number-input-control-icon-color);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease, opacity 0.15s ease;
  }

  .control-btn:hover:not(:disabled) {
    background-color: var(--biz-number-input-control-hover-bg);
  }

  .control-btn:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  /* Controls Position: End */
  .controls-end {
    display: flex;
    height: 100%;
  }
  .controls-end .control-btn {
    height: 100%;
    padding: 0 10px;
    border-top: none;
    border-bottom: none;
  }
  .controls-end .decrement-btn {
    border-left: 1px solid var(--biz-number-input-border-color);
    border-right: 1px solid var(--biz-number-input-border-color);
  }
  .controls-end .increment-btn {
    border-right: none;
    border-top-right-radius: var(--biz-number-input-border-radius);
    border-bottom-right-radius: var(--biz-number-input-border-radius);
  }

  /* Controls Position: Stacked */
  .controls-stacked {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .controls-stacked .control-btn {
    flex: 1;
    padding: 0 6px;
    font-size: 10px;
    line-height: 1;
    border-top: none;
    border-right: none;
    border-bottom: none;
    border-left: 1px solid var(--biz-number-input-border-color);
  }
  .controls-stacked .increment-btn {
    border-top-right-radius: var(--biz-number-input-border-radius);
    border-bottom: 1px solid var(--biz-number-input-border-color);
  }
  .controls-stacked .decrement-btn {
    border-bottom-right-radius: var(--biz-number-input-border-radius);
  }

  /* Controls Position: Split */
  .controls-split .decrement-btn,
  .controls-split .increment-btn {
    height: 100%;
    padding: 0 12px;
  }

  .helper-wrapper {
    margin-top: 4px;
    font-size: 12px;
    color: var(--biz-number-input-placeholder-color);
  }
  .biz-number-input.error .helper-wrapper {
    color: var(--biz-number-input-error-color);
  }
`;