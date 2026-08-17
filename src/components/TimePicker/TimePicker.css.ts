import { css } from 'lit';

export const timePickerStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-time-picker-height-sm: 32px;
    --biz-time-picker-height-md: 40px;
    --biz-time-picker-height-lg: 48px;
    --biz-time-picker-padding-x: 12px;
    --biz-time-picker-border-radius: 4px;
    --biz-time-picker-panel-width: 220px;
    --biz-time-picker-column-height: 220px;
    --biz-time-picker-item-height: 32px;

    /* Base Colors */
    --biz-time-picker-bg: #ffffff;
    --biz-time-picker-filled-bg: #f3f4f6;
    --biz-time-picker-border-color: #d1d5db;
    --biz-time-picker-text-color: #111827;
    --biz-time-picker-placeholder-color: #9ca3af;

    /* Panel & Item Colors */
    --biz-time-picker-panel-bg: #ffffff;
    --biz-time-picker-panel-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --biz-time-picker-item-hover-bg: #f3f4f6;
    --biz-time-picker-item-selected-bg: #eff6ff;
    --biz-time-picker-item-selected-text: #2563eb;
    --biz-time-picker-item-disabled-text: #d1d5db;

    /* Interactive States Colors */
    --biz-time-picker-hover-border-color: #9ca3af;
    --biz-time-picker-focus-border-color: #2563eb;
    --biz-time-picker-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Error & Disabled Colors */
    --biz-time-picker-error-color: #dc2626;
    --biz-time-picker-disabled-bg: #f3f4f6;
    --biz-time-picker-disabled-text-color: #9ca3af;

    display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    box-sizing: border-box;
  }

  :host([full-width]),
  .biz-time-picker--full-width {
    width: 100%;
    display: block;
  }

  .biz-time-picker {
    position: relative;
    width: 100%;
    box-sizing: border-box;
  }

  /* Control Area */
  .biz-time-picker__control {
    display: flex;
    align-items: center;
    background-color: var(--biz-time-picker-bg);
    border-radius: var(--biz-time-picker-border-radius);
    padding: 0 var(--biz-time-picker-padding-x);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    box-sizing: border-box;
  }

  .biz-time-picker__input {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-time-picker-text-color);
    font-size: 14px;
    padding: 0;
    margin: 0;
  }

  .biz-time-picker__input::placeholder {
    color: var(--biz-time-picker-placeholder-color);
  }

  /* Variants */
  .biz-time-picker--outlined .biz-time-picker__control {
    border: 1px solid var(--biz-time-picker-border-color);
  }

  .biz-time-picker--filled .biz-time-picker__control {
    border: 1px solid transparent;
    background-color: var(--biz-time-picker-filled-bg);
  }

  .biz-time-picker--standard .biz-time-picker__control {
    border: none;
    border-bottom: 1px solid var(--biz-time-picker-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Sizes */
  .biz-time-picker--small .biz-time-picker__control {
    height: var(--biz-time-picker-height-sm);
  }
  .biz-time-picker--small .biz-time-picker__input {
    font-size: 12px;
  }

  .biz-time-picker--medium .biz-time-picker__control {
    height: var(--biz-time-picker-height-md);
  }
  .biz-time-picker--medium .biz-time-picker__input {
    font-size: 14px;
  }

  .biz-time-picker--large .biz-time-picker__control {
    height: var(--biz-time-picker-height-lg);
  }
  .biz-time-picker--large .biz-time-picker__input {
    font-size: 16px;
  }

  /* States: Hover, Focus & Open */
  .biz-time-picker__control:hover {
    border-color: var(--biz-time-picker-hover-border-color);
  }

  .biz-time-picker--open .biz-time-picker__control,
  .biz-time-picker__control:focus-within {
    border-color: var(--biz-time-picker-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-time-picker-focus-ring-color);
  }

  /* States: Error */
  .biz-time-picker--error .biz-time-picker__control {
    border-color: var(--biz-time-picker-error-color) !important;
  }
  .biz-time-picker--error .biz-time-picker__control:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2) !important;
  }

  /* States: Disabled & Readonly */
  .biz-time-picker--disabled .biz-time-picker__control {
    background-color: var(--biz-time-picker-disabled-bg);
    border-color: var(--biz-time-picker-border-color);
    cursor: not-allowed;
    opacity: 0.7;
  }
  .biz-time-picker--disabled .biz-time-picker__input {
    color: var(--biz-time-picker-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-time-picker--readonly .biz-time-picker__control {
    cursor: default;
    background-color: var(--biz-time-picker-bg);
  }

  /* Suffix & Clear Button */
  .biz-time-picker__suffix,
  .biz-time-picker__prefix {
    display: inline-flex;
    align-items: center;
    color: var(--biz-time-picker-placeholder-color);
  }

  .biz-time-picker__clear-button,
  .biz-time-picker__trigger-icon {
    border: none;
    background: transparent;
    padding: 0;
    margin: 0 0 0 4px;
    cursor: pointer;
    color: var(--biz-time-picker-placeholder-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .biz-time-picker__clear-button:hover {
    color: var(--biz-time-picker-text-color);
  }

  /* Dropdown Panel */
  .biz-time-picker__panel {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1000;
    min-width: var(--biz-time-picker-panel-width);
    background-color: var(--biz-time-picker-panel-bg);
    border: 1px solid var(--biz-time-picker-border-color);
    border-radius: var(--biz-time-picker-border-radius);
    box-shadow: var(--biz-time-picker-panel-shadow);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Panel Columns Container */
  .biz-time-picker__columns {
    display: flex;
    height: var(--biz-time-picker-column-height);
    border-bottom: 1px solid var(--biz-time-picker-border-color);
  }

  .biz-time-picker__column {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    list-style: none;
    margin: 0;
    padding: 0;
    border-right: 1px solid var(--biz-time-picker-border-color);
  }

  .biz-time-picker__column:last-child {
    border-right: none;
  }

  .biz-time-picker__column--active {
    background-color: rgba(37, 99, 235, 0.03);
  }

  /* Option Items */
  .biz-time-picker__option {
    height: var(--biz-time-picker-item-height);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: var(--biz-time-picker-text-color);
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease;
  }

  .biz-time-picker__option:hover {
    background-color: var(--biz-time-picker-item-hover-bg);
  }

  .biz-time-picker__option--selected {
    background-color: var(--biz-time-picker-item-selected-bg);
    color: var(--biz-time-picker-item-selected-text);
    font-weight: 600;
  }

  .biz-time-picker__option--disabled {
    color: var(--biz-time-picker-item-disabled-text);
    cursor: not-allowed;
    background-color: transparent !important;
  }

  /* Action Footer */
  .biz-time-picker__footer {
    padding: 8px 12px;
    background-color: var(--biz-time-picker-bg);
  }

  .biz-time-picker__action-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .biz-time-picker__btn-now,
  .biz-time-picker__btn-cancel,
  .biz-time-picker__btn-confirm {
    border: none;
    background: transparent;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .biz-time-picker__btn-now {
    color: var(--biz-time-picker-focus-border-color);
    font-weight: 500;
  }

  .biz-time-picker__btn-cancel {
    color: var(--biz-time-picker-placeholder-color);
  }

  .biz-time-picker__btn-confirm {
    background-color: var(--biz-time-picker-focus-border-color);
    color: #ffffff;
    font-weight: 500;
  }

  .biz-time-picker__btn-confirm:hover {
    opacity: 0.9;
  }

  /* SR Only Live Area */
  .biz-time-picker__sr-live {
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