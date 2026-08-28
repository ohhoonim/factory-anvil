import { css } from 'lit';

export const timePickerStyles = css`
  :host {
    /* Design Tokens */
    --biz-time-picker-height-sm: var(--ui-timepicker-height-sm, 32px);
    --biz-time-picker-height-md: var(--ui-timepicker-height-md, 40px);
    --biz-time-picker-height-lg: var(--ui-timepicker-height-lg, 48px);
    --biz-time-picker-padding-x: var(--ui-timepicker-padding-x, 12px);
    --biz-time-picker-border-radius: var(--ui-timepicker-border-radius, 4px);
    --biz-time-picker-panel-width: var(--ui-timepicker-panel-width, 220px);
    --biz-time-picker-column-height: var(--ui-timepicker-column-height, 220px);
    --biz-time-picker-item-height: var(--ui-timepicker-item-height, 32px);

    --biz-time-picker-bg: var(--ui-timepicker-bg, #ffffff);
    --biz-time-picker-border-color: var(--ui-timepicker-border-color, #d1d5db);
    --biz-time-picker-text-color: var(--ui-timepicker-text-color, #111827);
    --biz-time-picker-placeholder-color: var(--ui-timepicker-placeholder-color, #9ca3af);

    --biz-time-picker-panel-bg: var(--ui-timepicker-panel-bg, #ffffff);
    --biz-time-picker-panel-shadow: var(--ui-timepicker-panel-shadow, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
    --biz-time-picker-item-hover-bg: var(--ui-timepicker-item-hover-bg, #f3f4f6);
    --biz-time-picker-item-selected-bg: var(--ui-timepicker-item-selected-bg, #eff6ff);
    --biz-time-picker-item-selected-text: var(--ui-timepicker-item-selected-text, #2563eb);
    --biz-time-picker-item-disabled-text: var(--ui-timepicker-item-disabled-text, #d1d5db);

    --biz-time-picker-hover-border-color: var(--ui-timepicker-hover-border-color, #9ca3af);
    --biz-time-picker-focus-border-color: var(--ui-timepicker-focus-border-color, #2563eb);
    --biz-time-picker-focus-ring-color: var(--ui-timepicker-focus-ring-color, rgba(37, 99, 235, 0.2));

    --biz-time-picker-error-color: var(--ui-timepicker-error-color, #dc2626);
    --biz-time-picker-disabled-bg: var(--ui-timepicker-disabled-bg, #f3f4f6);
    --biz-time-picker-disabled-text-color: var(--ui-timepicker-disabled-text-color, #9ca3af);

    display: inline-block;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-time-picker {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 200px;
  }

  .biz-time-picker--full-width {
    width: 100%;
  }

  .biz-time-picker__input-container {
    display: flex;
    align-items: center;
    position: relative;
    background-color: var(--biz-time-picker-bg);
    border-radius: var(--biz-time-picker-border-radius);
    padding: 0 var(--biz-time-picker-padding-x);
    transition: all 0.2s ease-in-out;
  }

  .biz-time-picker__input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-time-picker-text-color);
    font-size: 14px;
    padding: 0;
  }

  .biz-time-picker__input::placeholder {
    color: var(--biz-time-picker-placeholder-color);
  }

  /* Variants */
  .biz-time-picker--outlined .biz-time-picker__input-container {
    border: 1px solid var(--biz-time-picker-border-color);
  }

  .biz-time-picker--filled .biz-time-picker__input-container {
    border: 1px solid transparent;
    background-color: var(--biz-time-picker-disabled-bg);
  }

  .biz-time-picker--standard .biz-time-picker__input-container {
    border: none;
    border-bottom: 1px solid var(--biz-time-picker-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Sizes */
  .biz-time-picker--small .biz-time-picker__input-container {
    height: var(--biz-time-picker-height-sm);
  }
  .biz-time-picker--small .biz-time-picker__input {
    font-size: 12px;
  }

  .biz-time-picker--medium .biz-time-picker__input-container {
    height: var(--biz-time-picker-height-md);
  }
  .biz-time-picker--medium .biz-time-picker__input {
    font-size: 14px;
  }

  .biz-time-picker--large .biz-time-picker__input-container {
    height: var(--biz-time-picker-height-lg);
  }
  .biz-time-picker--large .biz-time-picker__input {
    font-size: 16px;
  }

  /* States: Hover & Focus */
  .biz-time-picker:not(.biz-time-picker--disabled):hover .biz-time-picker__input-container {
    border-color: var(--biz-time-picker-hover-border-color);
  }

  .biz-time-picker:not(.biz-time-picker--disabled) .biz-time-picker__input-container:focus-within {
    border-color: var(--biz-time-picker-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-time-picker-focus-ring-color);
  }

  /* States: Disabled & Readonly */
  .biz-time-picker--disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-time-picker--disabled .biz-time-picker__input-container {
    background-color: var(--biz-time-picker-disabled-bg);
    border-color: var(--biz-time-picker-border-color);
  }

  .biz-time-picker--disabled .biz-time-picker__input {
    color: var(--biz-time-picker-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-time-picker--readonly .biz-time-picker__input {
    cursor: default;
  }

  /* States: Error */
  .biz-time-picker--error .biz-time-picker__input-container {
    border-color: var(--biz-time-picker-error-color) !important;
  }

  /* Icons & Actions */
  .biz-time-picker__clear-btn,
  .biz-time-picker__icon-btn {
    border: none;
    background: transparent;
    padding: 0;
    margin-left: 6px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--biz-time-picker-placeholder-color);
    transition: color 0.15s ease;
  }

  .biz-time-picker__clear-btn:hover,
  .biz-time-picker__icon-btn:hover {
    color: var(--biz-time-picker-text-color);
  }

  /* Dropdown Panel */
  .biz-time-picker__dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    z-index: 1000;
    width: var(--biz-time-picker-panel-width);
    background-color: var(--biz-time-picker-panel-bg);
    border-radius: var(--biz-time-picker-border-radius);
    box-shadow: var(--biz-time-picker-panel-shadow);
    border: 1px solid var(--biz-time-picker-border-color);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .biz-time-picker__columns {
    display: flex;
    height: var(--biz-time-picker-column-height);
  }

  .biz-time-picker__column {
    flex: 1;
    overflow-y: auto;
    border-right: 1px solid var(--biz-time-picker-border-color);
    outline: none;
    scrollbar-width: thin;
  }

  .biz-time-picker__column:last-child {
    border-right: none;
  }

  .biz-time-picker__column--focused {
    background-color: rgba(37, 99, 235, 0.03);
  }

  .biz-time-picker__option {
    height: var(--biz-time-picker-item-height);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
    color: var(--biz-time-picker-text-color);
    transition: background-color 0.15s ease;
  }

  .biz-time-picker__option:hover:not(.biz-time-picker__option--disabled) {
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
  }

  .biz-time-picker__footer {
    border-top: 1px solid var(--biz-time-picker-border-color);
    padding: 6px 12px;
  }

  .biz-time-picker__action-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .biz-time-picker__now-btn,
  .biz-time-picker__confirm-btn {
    border: none;
    background: transparent;
    color: var(--biz-time-picker-focus-border-color);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 2px;
  }

  .biz-time-picker__now-btn:hover,
  .biz-time-picker__confirm-btn:hover {
    background-color: var(--biz-time-picker-item-hover-bg);
  }
/* 라벨 컨테이너 구조 스타일 */
.biz-time-picker__label-container {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--biz-time-picker-text-color, #111827);
}

/* 1. CSS-First (Shadow DOM 대응): 슬롯에 노드가 할당되지 않은 경우 숨김 */
.biz-time-picker__label-container:has(slot[name="label-slot"]:not(:assigned)) {
  display: none !important;
}

/* 2. Controller 연동 후 has-label 속성이 없을 때 라벨 컨테이너 숨김 */
:host(:not([has-label])) .biz-time-picker__label-container {
  display: none !important;
}

/* 3. 라벨이 없을 때 하단 margin 제거 */
:host(:not([has-label])) .biz-time-picker__label-container {
  margin-bottom: 0;
}
`;