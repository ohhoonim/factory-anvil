import { css } from "lit";

export const datePickerStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-date-picker-height-sm: 32px;
    --biz-date-picker-height-md: 40px;
    --biz-date-picker-height-lg: 48px;
    --biz-date-picker-padding-x: 12px;
    --biz-date-picker-border-radius: 4px;
    --biz-date-picker-popover-width: 280px;
    --biz-date-picker-cell-size: 36px;

    /* Colors - Base */
    --biz-date-picker-bg: #ffffff;
    --biz-date-picker-border-color: #d1d5db;
    --biz-date-picker-text-color: #111827;
    --biz-date-picker-placeholder-color: #9ca3af;

    /* Colors - Popover & Calendar Cell */
    --biz-date-picker-popover-bg: #ffffff;
    --biz-date-picker-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --biz-date-picker-cell-hover-bg: #f3f4f6;
    --biz-date-picker-cell-selected-bg: #2563eb;
    --biz-date-picker-cell-selected-text: #ffffff;
    --biz-date-picker-cell-range-bg: #eff6ff;
    --biz-date-picker-cell-disabled-text: #d1d5db;

    /* Colors - Interactive States */
    --biz-date-picker-hover-border-color: #9ca3af;
    --biz-date-picker-focus-border-color: #2563eb;
    --biz-date-picker-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-date-picker-error-color: #dc2626;
    --biz-date-picker-disabled-bg: #f3f4f6;
    --biz-date-picker-disabled-text-color: #9ca3af;

    display: inline-block;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  .biz-date-picker {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 240px;
    font-family: inherit;
  }

  .biz-date-picker--full-width {
    width: 100%;
  }

  .biz-date-picker__sr-live {
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

  /* Input Control Base */
  .biz-date-picker__control {
    display: flex;
    align-items: center;
    background-color: var(--biz-date-picker-bg);
    border-radius: var(--biz-date-picker-border-radius);
    transition: all 0.2s ease;
  }

  .biz-date-picker__input {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-date-picker-text-color);
    font-size: 14px;
    padding: 0 var(--biz-date-picker-padding-x);
  }

  .biz-date-picker__input::placeholder {
    color: var(--biz-date-picker-placeholder-color);
  }

  /* Sizes */
  .biz-date-picker--small .biz-date-picker__control {
    height: var(--biz-date-picker-height-sm);
  }
  .biz-date-picker--small .biz-date-picker__input {
    font-size: 12px;
  }

  .biz-date-picker--medium .biz-date-picker__control {
    height: var(--biz-date-picker-height-md);
  }

  .biz-date-picker--large .biz-date-picker__control {
    height: var(--biz-date-picker-height-lg);
  }
  .biz-date-picker--large .biz-date-picker__input {
    font-size: 16px;
  }

  /* Variants */
  .biz-date-picker--outlined .biz-date-picker__control {
    border: 1px solid var(--biz-date-picker-border-color);
  }
  .biz-date-picker--outlined:not(.biz-date-picker--disabled):hover .biz-date-picker__control {
    border-color: var(--biz-date-picker-hover-border-color);
  }
  .biz-date-picker--outlined.biz-date-picker--open .biz-date-picker__control,
  .biz-date-picker--outlined .biz-date-picker__control:focus-within {
    border-color: var(--biz-date-picker-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-date-picker-focus-ring-color);
  }

  .biz-date-picker--filled .biz-date-picker__control {
    background-color: var(--biz-date-picker-disabled-bg);
    border: 1px solid transparent;
    border-bottom: 2px solid var(--biz-date-picker-border-color);
  }
  .biz-date-picker--filled:not(.biz-date-picker--disabled):hover .biz-date-picker__control {
    background-color: #e5e7eb;
  }
  .biz-date-picker--filled.biz-date-picker--open .biz-date-picker__control,
  .biz-date-picker--filled .biz-date-picker__control:focus-within {
    border-bottom-color: var(--biz-date-picker-focus-border-color);
  }

  .biz-date-picker--standard .biz-date-picker__control {
    border: none;
    border-bottom: 1px solid var(--biz-date-picker-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }
  .biz-date-picker--standard:not(.biz-date-picker--disabled):hover .biz-date-picker__control {
    border-bottom-color: var(--biz-date-picker-hover-border-color);
  }
  .biz-date-picker--standard.biz-date-picker--open .biz-date-picker__control,
  .biz-date-picker--standard .biz-date-picker__control:focus-within {
    border-bottom: 2px solid var(--biz-date-picker-focus-border-color);
  }

  /* States: Disabled, Readonly, Error */
  .biz-date-picker--disabled .biz-date-picker__control {
    background-color: var(--biz-date-picker-disabled-bg);
    cursor: not-allowed;
  }
  .biz-date-picker--disabled .biz-date-picker__input {
    color: var(--biz-date-picker-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-date-picker--readonly .biz-date-picker__input {
    cursor: default;
  }

  .biz-date-picker--error .biz-date-picker__control {
    border-color: var(--biz-date-picker-error-color) !important;
  }

  /* Action Icons */
  .biz-date-picker__clear-btn,
  .biz-date-picker__toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0 8px;
    cursor: pointer;
    color: var(--biz-date-picker-placeholder-color);
    transition: color 0.2s ease;
  }
  .biz-date-picker__clear-btn:hover,
  .biz-date-picker__toggle-btn:hover {
    color: var(--biz-date-picker-text-color);
  }

  /* Popover */
  .biz-date-picker__popover {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1000;
    width: var(--biz-date-picker-popover-width);
    padding: 12px;
    background-color: var(--biz-date-picker-popover-bg);
    border-radius: var(--biz-date-picker-border-radius);
    box-shadow: var(--biz-date-picker-popover-shadow);
    border: 1px solid var(--biz-date-picker-border-color);
  }

  .biz-date-picker__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .biz-date-picker__nav-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    color: var(--biz-date-picker-text-color);
  }
  .biz-date-picker__nav-btn:hover {
    background-color: var(--biz-date-picker-cell-hover-bg);
  }

  .biz-date-picker__current-month {
    font-weight: 600;
    font-size: 14px;
  }

  /* Grid & Cells */
  .biz-date-picker__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 12px;
    color: var(--biz-date-picker-placeholder-color);
    margin-bottom: 4px;
  }

  .biz-date-picker__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .biz-date-picker__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--biz-date-picker-cell-size);
    font-size: 13px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.15s ease;
  }

  .biz-date-picker__cell:hover:not(.biz-date-picker__cell--disabled) {
    background-color: var(--biz-date-picker-cell-hover-bg);
  }

  .biz-date-picker__cell--other-month {
    color: var(--biz-date-picker-disabled-text-color);
  }

  .biz-date-picker__cell--today {
    font-weight: bold;
    color: var(--biz-date-picker-focus-border-color);
  }

  .biz-date-picker__cell--selected {
    background-color: var(--biz-date-picker-cell-selected-bg) !important;
    color: var(--biz-date-picker-cell-selected-text) !important;
  }

  .biz-date-picker__cell--in-range {
    background-color: var(--biz-date-picker-cell-range-bg);
    border-radius: 0;
  }

  .biz-date-picker__cell--range-start {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .biz-date-picker__cell--range-end {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .biz-date-picker__cell--disabled {
    color: var(--biz-date-picker-cell-disabled-text);
    cursor: not-allowed;
    background-color: transparent !important;
  }

  .biz-date-picker__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--biz-date-picker-border-color);
  }

  .biz-date-picker__today-btn,
  .biz-date-picker__confirm-btn {
    background: none;
    border: none;
    color: var(--biz-date-picker-focus-border-color);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .biz-date-picker__today-btn:hover,
  .biz-date-picker__confirm-btn:hover {
    background-color: var(--biz-date-picker-cell-range-bg);
  }
`;