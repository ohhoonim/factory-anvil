import { css } from 'lit';

export const dateRangePickerStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-date-range-picker-height-sm: 32px;
    --biz-date-range-picker-height-md: 40px;
    --biz-date-range-picker-height-lg: 48px;
    --biz-date-range-picker-padding-x: 12px;
    --biz-date-range-picker-border-radius: 6px;
    --biz-date-range-picker-popover-width: 640px;
    --biz-date-range-picker-cell-size: 36px;

    /* Colors - Base */
    --biz-date-range-picker-bg: #ffffff;
    --biz-date-range-picker-border-color: #d1d5db;
    --biz-date-range-picker-text-color: #111827;
    --biz-date-range-picker-placeholder-color: #9ca3af;

    /* Colors - Selection & Range Highlight */
    --biz-date-range-picker-popover-bg: #ffffff;
    --biz-date-range-picker-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
    --biz-date-range-picker-cell-hover-bg: #f3f4f6;
    --biz-date-range-picker-range-start-bg: #2563eb;
    --biz-date-range-picker-range-start-text: #ffffff;
    --biz-date-range-picker-range-end-bg: #2563eb;
    --biz-date-range-picker-range-end-text: #ffffff;
    --biz-date-range-picker-in-range-bg: #eff6ff;
    --biz-date-range-picker-in-range-text: #1d4ed8;
    --biz-date-range-picker-cell-disabled-text: #d1d5db;

    /* Colors - Interactive States */
    --biz-date-range-picker-hover-border-color: #9ca3af;
    --biz-date-range-picker-focus-border-color: #2563eb;
    --biz-date-range-picker-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-date-range-picker-error-color: #dc2626;
    --biz-date-range-picker-disabled-bg: #f3f4f6;
    --biz-date-range-picker-disabled-text-color: #9ca3af;

    display: inline-block;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }

  .biz-date-range-picker {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: auto;
  }

  .biz-date-range-picker--full-width {
    width: 100%;
    display: flex;
  }

  .biz-date-range-picker__control {
    display: flex;
    align-items: center;
    background-color: var(--biz-date-range-picker-bg);
    border: 1px solid var(--biz-date-range-picker-border-color);
    border-radius: var(--biz-date-range-picker-border-radius);
    padding: 0 var(--biz-date-range-picker-padding-x);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .biz-date-range-picker__control:hover:not(.biz-date-range-picker--disabled) {
    border-color: var(--biz-date-range-picker-hover-border-color);
  }

  .biz-date-range-picker--open .biz-date-range-picker__control,
  .biz-date-range-picker__control:focus-within {
    border-color: var(--biz-date-range-picker-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-date-range-picker-focus-ring-color);
  }

  /* Sizes */
  .biz-date-range-picker--size-small .biz-date-range-picker__control {
    height: var(--biz-date-range-picker-height-sm);
    font-size: 12px;
  }

  .biz-date-range-picker--size-medium .biz-date-range-picker__control {
    height: var(--biz-date-range-picker-height-md);
    font-size: 14px;
  }

  .biz-date-range-picker--size-large .biz-date-range-picker__control {
    height: var(--biz-date-range-picker-height-lg);
    font-size: 16px;
  }

  /* Variants */
  .biz-date-range-picker--variant-outlined .biz-date-range-picker__control {
    background-color: var(--biz-date-range-picker-bg);
  }

  .biz-date-range-picker--variant-filled .biz-date-range-picker__control {
    background-color: #f9fafb;
    border-bottom: 2px solid var(--biz-date-range-picker-border-color);
    border-top: none;
    border-left: none;
    border-right: none;
    border-radius: var(--biz-date-range-picker-border-radius) var(--biz-date-range-picker-border-radius) 0 0;
  }

  .biz-date-range-picker--variant-standard .biz-date-range-picker__control {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--biz-date-range-picker-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Inputs & Separator */
  .biz-date-range-picker__input {
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-date-range-picker-text-color);
    width: 110px;
    text-align: center;
    font-size: inherit;
  }

  .biz-date-range-picker__input--single {
    width: 220px;
    text-align: left;
  }

  .biz-date-range-picker__input::placeholder {
    color: var(--biz-date-range-picker-placeholder-color);
  }

  .biz-date-range-picker__separator {
    margin: 0 8px;
    color: var(--biz-date-range-picker-placeholder-color);
  }

  .biz-date-range-picker__trigger,
  .biz-date-range-picker__clear-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--biz-date-range-picker-placeholder-color);
    padding: 2px;
  }

  .biz-date-range-picker__trigger:hover,
  .biz-date-range-picker__clear-btn:hover {
    color: var(--biz-date-range-picker-text-color);
  }

  /* States: Disabled, Readonly, Error */
  .biz-date-range-picker--disabled .biz-date-range-picker__control {
    background-color: var(--biz-date-range-picker-disabled-bg);
    cursor: not-allowed;
  }

  .biz-date-range-picker--disabled .biz-date-range-picker__input {
    color: var(--biz-date-range-picker-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-date-range-picker--readonly .biz-date-range-picker__control {
    background-color: #f9fafb;
  }

  .biz-date-range-picker--error .biz-date-range-picker__control {
    border-color: var(--biz-date-range-picker-error-color);
  }

  .biz-date-range-picker__helper-text {
    font-size: 12px;
    margin-top: 4px;
    color: var(--biz-date-range-picker-placeholder-color);
  }

  .biz-date-range-picker--error .biz-date-range-picker__helper-text {
    color: var(--biz-date-range-picker-error-color);
  }

  /* Popover */
  .biz-date-range-picker__popover {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    z-index: 1000;
    min-width: var(--biz-date-range-picker-popover-width);
    background-color: var(--biz-date-range-picker-popover-bg);
    box-shadow: var(--biz-date-range-picker-popover-shadow);
    border: 1px solid var(--biz-date-range-picker-border-color);
    border-radius: var(--biz-date-range-picker-border-radius);
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .biz-date-range-picker__popover-body {
    display: flex;
    gap: 20px;
  }

  /* Presets Sidebar */
  .biz-date-range-picker__presets-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-right: 1px solid #e5e7eb;
    padding-right: 16px;
    min-width: 90px;
  }

  .biz-date-range-picker__preset-btn {
    border: none;
    background: transparent;
    text-align: left;
    padding: 8px 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    white-space: nowrap;
    color: var(--biz-date-range-picker-text-color);
  }

  .biz-date-range-picker__preset-btn:hover {
    background-color: var(--biz-date-range-picker-cell-hover-bg);
  }

  /* Calendars Container */
  .biz-date-range-picker__calendars {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .biz-date-range-picker__calendar-nav {
    position: absolute;
    top: -2px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    pointer-events: none;
  }

  .biz-date-range-picker__nav-btn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    pointer-events: auto;
    font-weight: bold;
    color: #4b5563;
  }

  .biz-date-range-picker__nav-btn:hover {
    background-color: var(--biz-date-range-picker-cell-hover-bg);
    color: var(--biz-date-range-picker-text-color);
  }

  .biz-date-range-picker__grids {
    display: flex;
    gap: 32px;
  }

  /* Grid Cell Styles */
  .biz-date-range-picker__grid {
    border-collapse: collapse;
    width: 252px; /* 36px * 7 */
  }

  .biz-date-range-picker__grid caption {
    caption-side: top;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 12px;
    color: var(--biz-date-range-picker-text-color);
  }

  .biz-date-range-picker__grid th {
    font-weight: 600;
    font-size: 13px;
    color: #6b7280;
    padding-bottom: 8px;
  }

  .biz-date-range-picker__cell {
    width: var(--biz-date-range-picker-cell-size);
    height: var(--biz-date-range-picker-cell-size);
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    font-size: 13px;
    border-radius: 4px;
  }

  .biz-date-range-picker__cell:hover:not(.biz-date-range-picker__cell--disabled):not(.biz-date-range-picker__cell--empty) {
    background-color: var(--biz-date-range-picker-cell-hover-bg);
  }

  .biz-date-range-picker__cell--selected-start {
    background-color: var(--biz-date-range-picker-range-start-bg) !important;
    color: var(--biz-date-range-picker-range-start-text) !important;
    border-radius: 4px 0 0 4px;
  }

  .biz-date-range-picker__cell--selected-end {
    background-color: var(--biz-date-range-picker-range-end-bg) !important;
    color: var(--biz-date-range-picker-range-end-text) !important;
    border-radius: 0 4px 4px 0;
  }

  .biz-date-range-picker__cell--in-range {
    background-color: var(--biz-date-range-picker-in-range-bg);
    color: var(--biz-date-range-picker-in-range-text);
    border-radius: 0;
  }

  .biz-date-range-picker__cell--disabled {
    color: var(--biz-date-range-picker-cell-disabled-text);
    cursor: not-allowed;
  }

  /* Popover Footer */
  .biz-date-range-picker__popover-footer {
    display: flex;
    justify-content: flex-end;
    border-top: 1px solid #e5e7eb;
    padding-top: 12px;
  }

  .biz-date-range-picker__action-buttons {
    display: flex;
    gap: 8px;
  }

  .biz-date-range-picker__btn {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid var(--biz-date-range-picker-border-color);
    background-color: #ffffff;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
  }

  .biz-date-range-picker__btn--cancel:hover {
    background-color: #f9fafb;
  }

  .biz-date-range-picker__btn--apply {
    background-color: var(--biz-date-range-picker-range-start-bg);
    color: #ffffff;
    border: none;
  }

  .biz-date-range-picker__btn--apply:hover {
    background-color: #1d4ed8;
  }

  .biz-date-range-picker__aria-live {
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