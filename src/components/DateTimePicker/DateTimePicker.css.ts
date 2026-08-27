import { css } from 'lit';

export const dateTimePickerStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-date-time-picker-height-sm: var(--ui-datetimepicker-height-sm, 32px);
    --biz-date-time-picker-height-md: var(--ui-datetimepicker-height-md, 40px);
    --biz-date-time-picker-height-lg: var(--ui-datetimepicker-height-lg, 48px);
    --biz-date-time-picker-padding-x: var(--ui-datetimepicker-padding-x, 12px);
    --biz-date-time-picker-border-radius: var(--ui-datetimepicker-border-radius, 4px);
    --biz-date-time-picker-popover-width: var(--ui-datetimepicker-popover-width, 480px);
    --biz-date-time-picker-calendar-width: var(--ui-datetimepicker-calendar-width, 280px);
    --biz-date-time-picker-time-width: var(--ui-datetimepicker-time-width, 200px);
    --biz-date-time-picker-cell-size: var(--ui-datetimepicker-cell-size, 36px);

    /* Label Layout Tokens */
    --biz-date-time-picker-label-width: 100px;
    --biz-date-time-picker-label-gap: 8px;

    /* Base Color Tokens */
    --biz-date-time-picker-bg: var(--ui-datetimepicker-bg, #ffffff);
    --biz-date-time-picker-border-color: var(--ui-datetimepicker-border-color, #d1d5db);
    --biz-date-time-picker-text-color: var(--ui-datetimepicker-text-color, #111827);
    --biz-date-time-picker-label-color: var(--ui-datetimepicker-label-color, #374151);
    --biz-date-time-picker-placeholder-color: var(--ui-datetimepicker-placeholder-color, #9ca3af);

    /* Popover & Selection Tokens */
    --biz-date-time-picker-popover-bg: var(--ui-datetimepicker-popover-bg, #ffffff);
    --biz-date-time-picker-popover-shadow: var(--ui-datetimepicker-popover-shadow, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    --biz-date-time-picker-item-hover-bg: var(--ui-datetimepicker-item-hover-bg, #f3f4f6);
    --biz-date-time-picker-item-selected-bg: var(--ui-datetimepicker-item-selected-bg, #2563eb);
    --biz-date-time-picker-item-selected-text: var(--ui-datetimepicker-item-selected-text, #ffffff);
    --biz-date-time-picker-item-disabled-text: var(--ui-datetimepicker-item-disabled-text, #d1d5db);

    /* Interactive State Tokens */
    --biz-date-time-picker-hover-border-color: var(--ui-datetimepicker-hover-border-color, #9ca3af);
    --biz-date-time-picker-focus-border-color: var(--ui-datetimepicker-focus-border-color, #2563eb);
    --biz-date-time-picker-focus-ring-color: var(--ui-datetimepicker-focus-ring-color, rgba(37, 99, 235, 0.2));

    /* Error & Disabled Tokens */
    --biz-date-time-picker-error-color: var(--ui-datetimepicker-error-color, #dc2626);
    --biz-date-time-picker-disabled-bg: var(--ui-datetimepicker-disabled-bg, #f3f4f6);
    --biz-date-time-picker-disabled-text-color: var(--ui-datetimepicker-disabled-text-color, #9ca3af);

    display: inline-block;
    font-family: system-ui, -apple-system, sans-serif;
    box-sizing: border-box;
  }

  :host(*), :host(*::before), :host(*::after) {
    box-sizing: border-box;
  }

  .biz-date-time-picker {
    position: relative;
    display: inline-flex;
    width: 260px;
  }

  .biz-date-time-picker--full-width {
    width: 100%;
  }

  /* Label Layout: Vertical (Default) */
  .biz-date-time-picker--label-vertical {
    flex-direction: column;
  }

  .biz-date-time-picker--label-vertical .biz-date-time-picker__label {
    margin-bottom: var(--biz-date-time-picker-label-gap);
  }

  /* Label Layout: Horizontal */
  .biz-date-time-picker--label-horizontal {
    flex-direction: row;
    align-items: flex-start;
  }

  .biz-date-time-picker--label-horizontal .biz-date-time-picker__label {
    width: var(--biz-date-time-picker-label-width);
    margin-right: var(--biz-date-time-picker-label-gap);
    padding-top: 8px; /* Align text with input text baseline */
    flex-shrink: 0;
  }

  /* Label Slot Container & Fallback Display Control */
  .biz-date-time-picker__label {
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-date-time-picker-label-color);
  }

  /* Hide container completely if label-slot is not provided or empty */
  .biz-date-time-picker__label:not(:has(slot:has(*))):not(:has(slot:not(:empty))) {
    display: none !important;
  }

  /* Control Wrapper Area */
  .biz-date-time-picker__field-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* Control Area */
  .biz-date-time-picker__control {
    display: flex;
    align-items: center;
    background-color: var(--biz-date-time-picker-bg);
    border: 1px solid var(--biz-date-time-picker-border-color);
    border-radius: var(--biz-date-time-picker-border-radius);
    padding: 0 var(--biz-date-time-picker-padding-x);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    outline: none;
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

  /* Input Field */
  .biz-date-time-picker__input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    color: var(--biz-date-time-picker-text-color);
    font-size: inherit;
    cursor: pointer;
    width: 100%;
  }

  .biz-date-time-picker__input::placeholder {
    color: var(--biz-date-time-picker-placeholder-color);
  }

  .biz-date-time-picker__clear-btn {
    border: none;
    background: transparent;
    color: var(--biz-date-time-picker-placeholder-color);
    cursor: pointer;
    padding: 2px 4px;
    font-size: 12px;
  }

  .biz-date-time-picker__clear-btn:hover {
    color: var(--biz-date-time-picker-text-color);
  }

  .biz-date-time-picker__icon {
    color: var(--biz-date-time-picker-placeholder-color);
    display: flex;
    align-items: center;
  }

  /* States: Hover, Focus, Disabled, Readonly, Error */
  .biz-date-time-picker__control:hover:not([aria-disabled="true"]) {
    border-color: var(--biz-date-time-picker-hover-border-color);
  }

  .biz-date-time-picker__control:focus-visible,
  .biz-date-time-picker--open .biz-date-time-picker__control {
    border-color: var(--biz-date-time-picker-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-date-time-picker-focus-ring-color);
  }

  .biz-date-time-picker--error .biz-date-time-picker__control {
    border-color: var(--biz-date-time-picker-error-color) !important;
  }

  .biz-date-time-picker--disabled .biz-date-time-picker__control {
    background-color: var(--biz-date-time-picker-disabled-bg);
    border-color: var(--biz-date-time-picker-border-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-date-time-picker--readonly .biz-date-time-picker__control {
    cursor: default;
    background-color: var(--biz-date-time-picker-disabled-bg);
  }

  /* Helper Text Area */
  .biz-date-time-picker__helper-text {
    font-size: 12px;
    margin-top: 4px;
    color: var(--biz-date-time-picker-placeholder-color);
  }

  .biz-date-time-picker--error .biz-date-time-picker__helper-text {
    color: var(--biz-date-time-picker-error-color);
  }

  .biz-date-time-picker__helper-text:not(:has(slot:has(*))):not(:has(slot:not(:empty))) {
    display: none !important;
  }

  /* Popover Layout */
  .biz-date-time-picker__popover {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1000;
    background-color: var(--biz-date-time-picker-popover-bg);
    border-radius: var(--biz-date-time-picker-border-radius);
    box-shadow: var(--biz-date-time-picker-popover-shadow);
    border: 1px solid var(--biz-date-time-picker-border-color);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .biz-date-time-picker__body--side-by-side {
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: var(--biz-date-time-picker-popover-width);
  }

  .biz-date-time-picker__body--tabbed {
    display: flex;
    flex-direction: column;
    width: var(--biz-date-time-picker-calendar-width);
  }

  /* Tabs */
  .biz-date-time-picker__tabs {
    display: flex;
    border-bottom: 1px solid var(--biz-date-time-picker-border-color);
    margin-bottom: 8px;
  }

  .biz-date-time-picker__tab {
    flex: 1;
    padding: 6px 12px;
    border: none;
    background: transparent;
    cursor: pointer;
    font-weight: 500;
    color: var(--biz-date-time-picker-placeholder-color);
  }

  .biz-date-time-picker__tab--active {
    color: var(--biz-date-time-picker-item-selected-bg);
    border-bottom: 2px solid var(--biz-date-time-picker-item-selected-bg);
  }

  /* Calendar Section */
  .biz-date-time-picker__calendar {
    width: var(--biz-date-time-picker-calendar-width);
    display: flex;
    flex-direction: column;
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
    font-size: 16px;
    padding: 4px 8px;
    border-radius: var(--biz-date-time-picker-border-radius);
  }

  .biz-date-time-picker__nav-btn:hover {
    background-color: var(--biz-date-time-picker-item-hover-bg);
  }

  .biz-date-time-picker__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-size: 12px;
    color: var(--biz-date-time-picker-placeholder-color);
    margin-bottom: 4px;
  }

  .biz-date-time-picker__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .biz-date-time-picker__cell {
    height: var(--biz-date-time-picker-cell-size);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
    border-radius: var(--biz-date-time-picker-border-radius);
    color: var(--biz-date-time-picker-text-color);
  }

  .biz-date-time-picker__cell:hover:not(.biz-date-time-picker__cell--disabled) {
    background-color: var(--biz-date-time-picker-item-hover-bg);
  }

  .biz-date-time-picker__cell--other-month {
    color: var(--biz-date-time-picker-placeholder-color);
    opacity: 0.5;
  }

  .biz-date-time-picker__cell--today {
    border: 1px solid var(--biz-date-time-picker-item-selected-bg);
  }

  .biz-date-time-picker__cell--selected {
    background-color: var(--biz-date-time-picker-item-selected-bg) !important;
    color: var(--biz-date-time-picker-item-selected-text) !important;
  }

  .biz-date-time-picker__cell--disabled {
    color: var(--biz-date-time-picker-item-disabled-text);
    cursor: not-allowed;
  }

  /* Time Section */
  .biz-date-time-picker__time-panel {
    flex: 1;
    display: flex;
    gap: 4px;
    height: calc(var(--biz-date-time-picker-cell-size) * 7 + 24px);
    border-left: 1px solid var(--biz-date-time-picker-border-color);
    padding-left: 8px;
  }

  .biz-date-time-picker__time-column {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
  }

  .biz-date-time-picker__time-option {
    padding: 6px 8px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    border-radius: var(--biz-date-time-picker-border-radius);
  }

  .biz-date-time-picker__time-option:hover:not(.biz-date-time-picker__time-option--disabled) {
    background-color: var(--biz-date-time-picker-item-hover-bg);
  }

  .biz-date-time-picker__time-option--selected {
    background-color: var(--biz-date-time-picker-item-selected-bg) !important;
    color: var(--biz-date-time-picker-item-selected-text) !important;
  }

  .biz-date-time-picker__time-option--disabled {
    color: var(--biz-date-time-picker-item-disabled-text);
    cursor: not-allowed;
  }

  /* Action Footer */
  .biz-date-time-picker__action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 8px;
    border-top: 1px solid var(--biz-date-time-picker-border-color);
  }

  .biz-date-time-picker__action-right {
    display: flex;
    gap: 8px;
  }

  .biz-date-time-picker__btn {
    padding: 4px 12px;
    font-size: 12px;
    border-radius: var(--biz-date-time-picker-border-radius);
    cursor: pointer;
    border: 1px solid var(--biz-date-time-picker-border-color);
    background: transparent;
  }

  .biz-date-time-picker__btn:hover {
    background-color: var(--biz-date-time-picker-item-hover-bg);
  }

  .biz-date-time-picker__btn--confirm {
    background-color: var(--biz-date-time-picker-item-selected-bg);
    color: var(--biz-date-time-picker-item-selected-text);
    border: none;
  }

  /* Accessibility SR Live */
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