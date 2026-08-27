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

    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  :host([full-width]),
  .biz-search-input[data-full-width] {
    display: block;
    width: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-search-input {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  .biz-search-input__field-container {
    display: flex;
    align-items: center;
    position: relative;
    background-color: var(--biz-search-input-bg-color);
    border: 1px solid var(--biz-search-input-border-color);
    border-radius: var(--biz-search-input-border-radius);
    padding: 0 var(--biz-search-input-padding-x);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  /* Sizes */
  .biz-search-input[data-size='small'] .biz-search-input__field-container {
    height: var(--biz-search-input-height-sm);
    font-size: 13px;
  }

  .biz-search-input[data-size='medium'] .biz-search-input__field-container {
    height: var(--biz-search-input-height-md);
    font-size: 14px;
  }

  .biz-search-input[data-size='large'] .biz-search-input__field-container {
    height: var(--biz-search-input-height-lg);
    font-size: 16px;
  }

  /* Variants */
  .biz-search-input[data-variant='outlined'] .biz-search-input__field-container {
    background-color: var(--biz-search-input-bg-color);
    border-style: solid;
  }

  .biz-search-input[data-variant='filled'] .biz-search-input__field-container {
    background-color: #f3f4f6;
    border-color: transparent;
  }

  .biz-search-input[data-variant='standard'] .biz-search-input__field-container {
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid var(--biz-search-input-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Control (Input) */
  .biz-search-input__control {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-search-input-text-color);
    font-size: inherit;
    padding: 0 8px;
  }

  .biz-search-input__control::-webkit-search-decoration,
  .biz-search-input__control::-webkit-search-cancel-button,
  .biz-search-input__control::-webkit-search-results-button,
  .biz-search-input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .biz-search-input__control::placeholder {
    color: var(--biz-search-input-placeholder-color);
  }

  /* Slots & Icons */
  .biz-search-input__start-slot,
  .biz-search-input__end-slot {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--biz-search-input-icon-color);
  }

  .biz-search-input__default-search-icon,
  .biz-search-input__spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
  }

  .biz-search-input__default-search-icon svg,
  .biz-search-input__spinner svg,
  .biz-search-input__clear-btn svg,
  .biz-search-input__search-action-btn svg {
    width: 100%;
    height: 100%;
  }

  .biz-search-input__spinner svg {
    animation: biz-search-input-spin 1s linear infinite;
  }

  @keyframes biz-search-input-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Clear Button & Action Button */
  .biz-search-input__clear-btn,
  .biz-search-input__search-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 2px;
    border: none;
    background: transparent;
    color: var(--biz-search-input-icon-color);
    cursor: pointer;
    border-radius: 50%;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .biz-search-input__clear-btn:hover,
  .biz-search-input__search-action-btn:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: var(--biz-search-input-text-color);
  }

  /* States: Hover */
  .biz-search-input:not([data-disabled]):not([data-readonly]) .biz-search-input__field-container:hover {
    border-color: var(--biz-search-input-hover-border-color);
  }

  /* States: Focus */
  .biz-search-input:not([data-disabled]) .biz-search-input__field-container:focus-within {
    border-color: var(--biz-search-input-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-search-input-focus-ring-color);
  }

  /* States: Error */
  .biz-search-input[data-error] .biz-search-input__field-container {
    border-color: var(--biz-search-input-error-color) !important;
  }

  .biz-search-input[data-error] .biz-search-input__field-container:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
  }

  .biz-search-input__helper-area {
    font-size: 12px;
    line-height: 1.4;
  }

  .biz-search-input__helper-text {
    color: #6b7280;
  }

  .biz-search-input[data-error] .biz-search-input__helper-text {
    color: var(--biz-search-input-error-color);
  }

  /* States: Disabled */
  .biz-search-input[data-disabled] .biz-search-input__field-container {
    background-color: var(--biz-search-input-disabled-bg-color);
    border-color: #e5e7eb;
    cursor: not-allowed;
  }

  .biz-search-input[data-disabled] .biz-search-input__control {
    color: var(--biz-search-input-disabled-text-color);
    cursor: not-allowed;
  }

  /* States: Readonly */
  .biz-search-input[data-readonly] .biz-search-input__field-container {
    background-color: #f9fafb;
  }

  .biz-search-input[data-readonly] .biz-search-input__control {
    cursor: default;
  }
`;