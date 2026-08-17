import { css } from 'lit';

export const dateTimePickerStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-date-time-picker-height-sm: 32px;
    --biz-date-time-picker-height-md: 40px;
    --biz-date-time-picker-height-lg: 48px;
    --biz-date-time-picker-padding-x: 12px;
    --biz-date-time-picker-border-radius: 4px;
    --biz-date-time-picker-popover-width: 480px;
    --biz-date-time-picker-calendar-width: 280px;
    --biz-date-time-picker-time-width: 200px;
    --biz-date-time-picker-cell-size: 36px;

    /* Colors - Base */
    --biz-date-time-picker-bg: #ffffff;
    --biz-date-time-picker-border-color: #d1d5db;
    --biz-date-time-picker-text-color: #111827;
    --biz-date-time-picker-placeholder-color: #9ca3af;

    /* Colors - Popover & Selection */
    --biz-date-time-picker-popover-bg: #ffffff;
    --biz-date-time-picker-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --biz-date-time-picker-item-hover-bg: #f3f4f6;
    --biz-date-time-picker-item-selected-bg: #2563eb;
    --biz-date-time-picker-item-selected-text: #ffffff;
    --biz-date-time-picker-item-disabled-text: #d1d5db;

    /* Colors - Interactive States */
    --biz-date-time-picker-hover-border-color: #9ca3af;
    --biz-date-time-picker-focus-border-color: #2563eb;
    --biz-date-time-picker-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-date-time-picker-error-color: #dc2626;
    --biz-date-time-picker-disabled-bg: #f3f4f6;
    --biz-date-time-picker-disabled-text-color: #9ca3af;

    display: inline-block;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    box-sizing: border-box;
  }

  :host *, :host *::before, :host *::after {
    box-sizing: inherit;
  }

  .biz-date-time-picker {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: 280px;
  }

  .biz-date-time-picker--full-width {
    width: 100%;
  }

  /* Control Area */
  .biz-date-time-picker__control {
    display: flex;
    align-items: center;
    background-color: var(--biz-date-time-picker-bg);
    border: 1px solid var(--biz-date-time-picker-border-color);
    border-radius: var(--biz-date-time-picker-border-radius);
    padding: 0 var(--biz-date-time-picker-padding-x);
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .biz-date-time-picker__control:hover {
    border-color: var(--biz-date-time-picker-hover-border-color);
  }

  .biz-date-time-picker__control:focus-within {
    border-color: var(--biz-date-time-picker-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-date-time-picker-focus-ring-color);
  }

  .biz-date-time-picker__input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-date-time-picker-text-color);
    font-size: inherit;
    width: 100%;
  }

  .biz-date-time-picker__input::placeholder {
    color: var(--biz-date-time-picker-placeholder-color);
  }

  /* Sizes */
  .biz-date-time-picker--small .biz-date-time-picker__control {
    height: var(--biz-date-time-picker-height-sm);
    font-size: 12px;
  }

  .biz-date-time-picker--medium .biz-date-time-picker__control {
    height: var(--biz-date-time-picker-height-md);
    font-size: 14px;
  }

  .biz-date-time-picker--large .biz-date-time-picker__control {
    height: var(--biz-date-time-picker-height-lg);
    font-size: 16px;
  }

  /* Variants */
  .biz-date-time-picker--outlined .biz-date-time-picker__control {
    border-style: solid;
  }

  .biz-date-time-picker--filled .biz-date-time-picker__control {
    background-color: var(--biz-date-time-picker-item-hover-bg);
    border-bottom: 2px solid var(--biz-date-time-picker-border-color);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: var(--biz-date-time-picker-border-radius) var(--biz-date-time-picker-border-radius) 0 0;
  }

  .biz-date-time-picker--standard .biz-date-time-picker__control {
    background-color: transparent;
    border-bottom: 1px solid var(--biz-date-time-picker-border-color);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* States */
  .biz-date-time-picker--disabled .biz-date-time-picker__control {
    background-color: var(--biz-date-time-picker-disabled-bg);
    border-color: var(--biz-date-time-picker-border-color);
    cursor: not-allowed;
  }

  .biz-date-time-picker--disabled .biz-date-time-picker__input {
    color: var(--biz-date-time-picker-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-date-time-picker--readonly .biz-date-time-picker__control {
    cursor: default;
  }

  .biz-date-time-picker--error .biz-date-time-picker__control {
    border-color: var(--biz-date-time-picker-error-color);
  }

  .biz-date-time-picker__clear-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 16px;
    color: var(--biz-date-time-picker-placeholder-color);
    padding: 0 4px;
  }

  .biz-date-time-picker__clear-btn:hover {
    color: var(--biz-date-time-picker-text-color);
  }

  /* Popover Panel */
  .biz-date-time-picker__popover {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1000;
    background-color: var(--biz-date-time-picker-popover-bg);
    border: 1px solid var(--biz-date-time-picker-border-color);
    border-radius: var(--biz-date-time-picker-border-radius);
    box-shadow: var(--biz-date-time-picker-popover-shadow);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .biz-date-time-picker__body--side-by-side {
    display: flex;
    gap: 16px;
    width: var(--biz-date-time-picker-popover-width);
  }

  .biz-date-time-picker__body--tabbed {
    display: flex;
    flex-direction: column;
    width: var(--biz-date-time-picker-calendar-width);
  }

  .biz-date-time-picker__tabs {
    display: flex;
    border-bottom: 1px solid var(--biz-date-time-picker-border-color);
  }

  .biz-date-time-picker__tab {
    flex: 1;
    padding: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: 500;
  }

  .biz-date-time-picker__tab--active {
    border-bottom: 2px solid var(--biz-date-time-picker-item-selected-bg);
    color: var(--biz-date-time-picker-item-selected-bg);
  }

  /* Calendar View */
  .biz-date-time-picker__calendar-view {
    width: var(--biz-date-time-picker-calendar-width);
  }

  .biz-date-time-picker__calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .biz-date-time-picker__nav-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
  }

  .biz-date-time-picker__nav-btn:hover {
    background-color: var(--biz-date-time-picker-item-hover-bg);
  }

  .biz-date-time-picker__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 600;
    font-size: 12px;
    margin-bottom: 4px;
  }

  .biz-date-time-picker__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .biz-date-time-picker__cell {
    height: var(--biz-date-time-picker-cell-size);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 50%;
    font-size: 13px;
  }

  .biz-date-time-picker__cell:hover:not(.biz-date-time-picker__cell--empty) {
    background-color: var(--biz-date-time-picker-item-hover-bg);
  }

  .biz-date-time-picker__cell--selected {
    background-color: var(--biz-date-time-picker-item-selected-bg) !important;
    color: var(--biz-date-time-picker-item-selected-text);
  }

  /* Time View */
  .biz-date-time-picker__time-view {
    display: flex;
    height: 250px;
    border-left: 1px solid var(--biz-date-time-picker-border-color);
  }

  .biz-date-time-picker__time-column {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
  }

  .biz-date-time-picker__time-option {
    padding: 6px 12px;
    text-align: center;
    cursor: pointer;
  }

  .biz-date-time-picker__time-option:hover {
    background-color: var(--biz-date-time-picker-item-hover-bg);
  }

  .biz-date-time-picker__time-option--selected {
    background-color: var(--biz-date-time-picker-item-selected-bg);
    color: var(--biz-date-time-picker-item-selected-text);
  }

  /* Footer */
  .biz-date-time-picker__default-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--biz-date-time-picker-border-color);
    padding-top: 8px;
  }

  .biz-date-time-picker__action-group {
    display: flex;
    gap: 8px;
  }

  .biz-date-time-picker__action-btn {
    border: 1px solid var(--biz-date-time-picker-border-color);
    background: white;
    padding: 4px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
  }

  .biz-date-time-picker__action-btn--primary {
    background: var(--biz-date-time-picker-item-selected-bg);
    color: white;
    border: none;
  }

  .biz-date-time-picker__sr-live {
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