import { css } from 'lit';

export const datePickerStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    /* Design Tokens / Custom Properties */
    --biz-date-picker-height-sm: 32px;
    --biz-date-picker-height-md: 40px;
    --biz-date-picker-height-lg: 48px;
    --biz-date-picker-padding-x: 12px;
    --biz-date-picker-border-radius: 4px;
    --biz-date-picker-popover-width: 280px;
    --biz-date-picker-cell-size: 36px;

    /* Base Colors */
    --biz-date-picker-bg: #ffffff;
    --biz-date-picker-border-color: #d1d5db;
    --biz-date-picker-text-color: #111827;
    --biz-date-picker-placeholder-color: #9ca3af;

    /* Popover & Calendar Cell Colors */
    --biz-date-picker-popover-bg: #ffffff;
    --biz-date-picker-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --biz-date-picker-cell-hover-bg: #f3f4f6;
    --biz-date-picker-cell-selected-bg: #2563eb;
    --biz-date-picker-cell-selected-text: #ffffff;
    --biz-date-picker-cell-range-bg: #eff6ff;
    --biz-date-picker-cell-disabled-text: #d1d5db;

    /* Interactive States Colors */
    --biz-date-picker-hover-border-color: #9ca3af;
    --biz-date-picker-focus-border-color: #2563eb;
    --biz-date-picker-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Error & Disabled Colors */
    --biz-date-picker-error-color: #dc2626;
    --biz-date-picker-disabled-bg: #f3f4f6;
    --biz-date-picker-disabled-text-color: #9ca3af;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-date-picker {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    font-family: inherit;
    font-size: 14px;
    color: var(--biz-date-picker-text-color);
  }

  .biz-date-picker--full-width {
    max-width: 100%;
  }

  /* Label & Helper Area */
  .biz-date-picker__label-area {
    margin-bottom: 4px;
  }

  .biz-date-picker__helper-area {
    margin-top: 4px;
    font-size: 12px;
  }

  /* Input Container */
  .biz-date-picker__input-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    background-color: var(--biz-date-picker-bg);
    border: 1px solid var(--biz-date-picker-border-color);
    border-radius: var(--biz-date-picker-border-radius);
    padding: 0 var(--biz-date-picker-padding-x);
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
  }

  .biz-date-picker__input-container:hover {
    border-color: var(--biz-date-picker-hover-border-color);
  }

  .biz-date-picker__input-container:focus-within {
    border-color: var(--biz-date-picker-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-date-picker-focus-ring-color);
  }

  /* Input Element */
  .biz-date-picker__input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    width: 100%;
  }

  .biz-date-picker__input::placeholder {
    color: var(--biz-date-picker-placeholder-color);
  }

  /* Prefix & Suffix */
  .biz-date-picker__prefix,
  .biz-date-picker__suffix {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .biz-date-picker__prefix {
    margin-right: 8px;
  }

  .biz-date-picker__suffix {
    margin-left: 8px;
  }

  .biz-date-picker__clear-btn,
  .biz-date-picker__trigger-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--biz-date-picker-placeholder-color);
    transition: color 0.2s;
  }

  .biz-date-picker__clear-btn:hover,
  .biz-date-picker__trigger-btn:hover {
    color: var(--biz-date-picker-text-color);
  }

  .biz-date-picker__clear-btn {
    font-size: 16px;
    line-height: 1;
    margin-left: 4px;
  }

  /* Variants */
  .biz-date-picker--outlined .biz-date-picker__input-container {
    /* Base Outlined Style */
  }

  .biz-date-picker--filled .biz-date-picker__input-container {
    background-color: var(--biz-date-picker-disabled-bg);
    border-color: transparent;
  }

  .biz-date-picker--filled .biz-date-picker__input-container:hover {
    border-color: var(--biz-date-picker-hover-border-color);
  }

  .biz-date-picker--standard .biz-date-picker__input-container {
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Sizes */
  .biz-date-picker--small .biz-date-picker__input-container {
    height: var(--biz-date-picker-height-sm);
    font-size: 12px;
  }

  .biz-date-picker--medium .biz-date-picker__input-container {
    height: var(--biz-date-picker-height-md);
    font-size: 14px;
  }

  .biz-date-picker--large .biz-date-picker__input-container {
    height: var(--biz-date-picker-height-lg);
    font-size: 16px;
  }

  /* States: Disabled, Readonly, Error */
  .biz-date-picker--disabled .biz-date-picker__input-container {
    background-color: var(--biz-date-picker-disabled-bg);
    border-color: var(--biz-date-picker-border-color);
    cursor: not-allowed;
  }

  .biz-date-picker--disabled .biz-date-picker__input {
    color: var(--biz-date-picker-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-date-picker--disabled .biz-date-picker__clear-btn,
  .biz-date-picker--disabled .biz-date-picker__trigger-btn {
    cursor: not-allowed;
    color: var(--biz-date-picker-disabled-text-color);
  }

  .biz-date-picker--readonly .biz-date-picker__input {
    cursor: default;
  }

  .biz-date-picker--error .biz-date-picker__input-container {
    border-color: var(--biz-date-picker-error-color);
  }

  .biz-date-picker--error .biz-date-picker__input-container:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  /* Calendar Popover */
  .biz-date-picker__popover {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1000;
    width: var(--biz-date-picker-popover-width);
    padding: 16px;
    background-color: var(--biz-date-picker-popover-bg);
    border-radius: var(--biz-date-picker-border-radius);
    box-shadow: var(--biz-date-picker-popover-shadow);
    border: 1px solid var(--biz-date-picker-border-color);
  }

  .biz-date-picker__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .biz-date-picker__current-month {
    font-weight: 600;
  }

  .biz-date-picker__nav-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    color: inherit;
  }

  .biz-date-picker__nav-btn:hover {
    background-color: var(--biz-date-picker-cell-hover-bg);
  }

  /* Day Grid */
  .biz-date-picker__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 8px;
    color: var(--biz-date-picker-placeholder-color);
  }

  .biz-date-picker__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .biz-date-picker__cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--biz-date-picker-cell-size);
    width: 100%;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    color: inherit;
    padding: 0;
    transition: background-color 0.15s, color 0.15s;
  }

  .biz-date-picker__cell:hover:not(.biz-date-picker__cell--disabled):not(.biz-date-picker__cell--empty) {
    background-color: var(--biz-date-picker-cell-hover-bg);
  }

  .biz-date-picker__cell--selected {
    background-color: var(--biz-date-picker-cell-selected-bg) !important;
    color: var(--biz-date-picker-cell-selected-text) !important;
  }

  .biz-date-picker__cell--range {
    background-color: var(--biz-date-picker-cell-range-bg);
    border-radius: 0;
  }

  .biz-date-picker__cell--today {
    font-weight: bold;
    text-decoration: underline;
  }

  .biz-date-picker__cell--disabled {
    color: var(--biz-date-picker-cell-disabled-text);
    cursor: not-allowed;
  }

  .biz-date-picker__cell--focused {
    outline: 2px solid var(--biz-date-picker-focus-border-color);
    outline-offset: -2px;
  }

  .biz-date-picker__cell--empty {
    cursor: default;
  }
`;