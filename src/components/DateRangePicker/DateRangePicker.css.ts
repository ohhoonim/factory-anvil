import { css } from 'lit';

export const dateRangePickerStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-date-range-picker-height-sm: 32px;
    --biz-date-range-picker-height-md: 40px;
    --biz-date-range-picker-height-lg: 48px;
    --biz-date-range-picker-padding-x: 12px;
    --biz-date-range-picker-border-radius: 4px;
    --biz-date-range-picker-popover-width: 620px;
    --biz-date-range-picker-cell-size: 36px;

    /* Colors - Base */
    --biz-date-range-picker-bg: #ffffff;
    --biz-date-range-picker-border-color: #d1d5db;
    --biz-date-range-picker-text-color: #111827;
    --biz-date-range-picker-placeholder-color: #9ca3af;

    /* Colors - Selection & Range Highlight */
    --biz-date-range-picker-popover-bg: #ffffff;
    --biz-date-range-picker-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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
    width: auto;
    font-family: system-ui, -apple-system, sans-serif;
    box-sizing: border-box;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-date-range-picker {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  .label-container {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--biz-date-range-picker-text-color);
  }

  .control-container {
    display: flex;
    align-items: center;
    padding: 0 var(--biz-date-range-picker-padding-x);
    background-color: var(--biz-date-range-picker-bg);
    border: 1px solid var(--biz-date-range-picker-border-color);
    border-radius: var(--biz-date-range-picker-border-radius);
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: pointer;
  }

  /* Variants */
  .biz-date-range-picker.outlined .control-container {
    background-color: var(--biz-date-range-picker-bg);
    border-style: solid;
  }

  .biz-date-range-picker.filled .control-container {
    background-color: #f8fafc;
    border-style: none;
    border-bottom: 2px solid var(--biz-date-range-picker-border-color);
    border-radius: var(--biz-date-range-picker-border-radius) var(--biz-date-range-picker-border-radius) 0 0;
  }

  .biz-date-range-picker.standard .control-container {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--biz-date-range-picker-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Sizes */
  .biz-date-range-picker.small .control-container {
    height: var(--biz-date-range-picker-height-sm);
    font-size: 0.875rem;
  }

  .biz-date-range-picker.medium .control-container {
    height: var(--biz-date-range-picker-height-md);
    font-size: 1rem;
  }

  .biz-date-range-picker.large .control-container {
    height: var(--biz-date-range-picker-height-lg);
    font-size: 1.125rem;
  }

  /* States: Hover, Focus, Active, Open */
  .control-container:hover {
    border-color: var(--biz-date-range-picker-hover-border-color);
  }

  .biz-date-range-picker.open .control-container,
  .control-container:focus-within {
    border-color: var(--biz-date-range-picker-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-date-range-picker-focus-ring-color);
  }

  /* States: Disabled */
  .biz-date-range-picker.disabled .control-container {
    background-color: var(--biz-date-range-picker-disabled-bg);
    border-color: var(--biz-date-range-picker-border-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-date-range-picker.disabled input {
    color: var(--biz-date-range-picker-disabled-text-color);
    cursor: not-allowed;
  }

  /* States: Readonly */
  .biz-date-range-picker.readonly .control-container {
    background-color: #f9fafb;
    cursor: default;
  }

  /* States: Error */
  .biz-date-range-picker.error .control-container {
    border-color: var(--biz-date-range-picker-error-color);
  }

  .biz-date-range-picker.error.open .control-container,
  .biz-date-range-picker.error .control-container:focus-within {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  /* States: Loading */
  .loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--biz-date-range-picker-border-color);
    border-top-color: var(--biz-date-range-picker-focus-border-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-left: 8px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Inputs & Separator */
  .double-input-group {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 8px;
  }

  .input-field {
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-date-range-picker-text-color);
    font-family: inherit;
    font-size: inherit;
    width: 100%;
  }

  .input-field::placeholder {
    color: var(--biz-date-range-picker-placeholder-color);
  }

  .separator {
    color: var(--biz-date-range-picker-placeholder-color);
    user-select: none;
  }

  .clear-button {
    border: none;
    background: transparent;
    color: var(--biz-date-range-picker-placeholder-color);
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0 4px;
    line-height: 1;
  }

  .clear-button:hover {
    color: var(--biz-date-range-picker-text-color);
  }

  /* Popover Panel */
  .popover-panel {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    z-index: 1000;
    background-color: var(--biz-date-range-picker-popover-bg);
    border: 1px solid var(--biz-date-range-picker-border-color);
    border-radius: var(--biz-date-range-picker-border-radius);
    box-shadow: var(--biz-date-range-picker-popover-shadow);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .popover-panel.dual {
    width: var(--biz-date-range-picker-popover-width);
  }

  .popover-panel.single {
    width: calc(var(--biz-date-range-picker-popover-width) / 2);
  }

  .popover-body {
    display: flex;
    gap: 16px;
  }

  .presets-sidebar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-right: 1px solid var(--biz-date-range-picker-border-color);
    padding-right: 16px;
    min-width: 110px;
  }

  .preset-button {
    background: transparent;
    border: none;
    text-align: left;
    padding: 6px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    color: var(--biz-date-range-picker-text-color);
  }

  .preset-button:hover {
    background-color: var(--biz-date-range-picker-cell-hover-bg);
  }

  .calendars-container {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .calendar-navigation-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 0 4px;
  }

  .calendar-navigation-bar button {
    background: transparent;
    border: 1px solid var(--biz-date-range-picker-border-color);
    border-radius: 4px;
    cursor: pointer;
    padding: 4px 8px;
    font-size: 0.875rem;
    line-height: 1;
  }

  .calendar-navigation-bar button:hover {
    background-color: var(--biz-date-range-picker-cell-hover-bg);
  }

  .grids-wrapper {
    display: flex;
    gap: 24px;
  }

  .calendar-grid {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .calendar-header-title {
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--biz-date-range-picker-text-color);
    margin-bottom: 4px;
  }

  .weekdays-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--biz-date-range-picker-placeholder-color);
  }

  .days-matrix {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px 0;
  }

  .empty-cell {
    height: var(--biz-date-range-picker-cell-size);
  }

  .day-cell {
    width: 100%;
    height: var(--biz-date-range-picker-cell-size);
    border: none;
    background: transparent;
    font-size: 0.875rem;
    color: var(--biz-date-range-picker-text-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    padding: 0;
  }

  .day-cell:hover {
    background-color: var(--biz-date-range-picker-cell-hover-bg);
    border-radius: 4px;
  }

  .day-cell.start {
    background-color: var(--biz-date-range-picker-range-start-bg) !important;
    color: var(--biz-date-range-picker-range-start-text) !important;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .day-cell.end {
    background-color: var(--biz-date-range-picker-range-end-bg) !important;
    color: var(--biz-date-range-picker-range-end-text) !important;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .day-cell.in-range {
    background-color: var(--biz-date-range-picker-in-range-bg);
    color: var(--biz-date-range-picker-in-range-text);
  }

  .popover-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    border-top: 1px solid var(--biz-date-range-picker-border-color);
    padding-top: 12px;
  }

  .action-button {
    padding: 6px 16px;
    border-radius: 4px;
    font-size: 0.875rem;
    cursor: pointer;
    font-weight: 500;
  }

  .action-button.cancel {
    background: transparent;
    border: 1px solid var(--biz-date-range-picker-border-color);
    color: var(--biz-date-range-picker-text-color);
  }

  .action-button.cancel:hover {
    background-color: var(--biz-date-range-picker-cell-hover-bg);
  }

  .action-button.apply {
    background: var(--biz-date-range-picker-range-start-bg);
    color: var(--biz-date-range-picker-range-start-text);
    border: none;
  }

  .action-button.apply:hover {
    opacity: 0.9;
  }

  .helper-text-container {
    font-size: 0.75rem;
    color: var(--biz-date-range-picker-placeholder-color);
  }

  .sr-only {
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