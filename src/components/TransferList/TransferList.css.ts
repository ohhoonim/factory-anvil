import { css } from 'lit';

export const transferListStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-transfer-list-width: 600px;
    --biz-transfer-list-box-width: 250px;
    --biz-transfer-list-box-height: 320px;
    --biz-transfer-list-item-height: 40px;
    --biz-transfer-list-border-radius: 6px;
    --biz-transfer-list-gap: 16px;

    /* Colors - Base & Box */
    --biz-transfer-list-bg: #ffffff;
    --biz-transfer-list-border-color: #d1d5db;
    --biz-transfer-list-header-bg: #f9fafb;
    --biz-transfer-list-text-color: #111827;

    /* Colors - Item & Interaction */
    --biz-transfer-list-item-hover-bg: #f3f4f6;
    --biz-transfer-list-item-selected-bg: #eff6ff;
    --biz-transfer-list-item-selected-text: #2563eb;

    /* Colors - Action Buttons */
    --biz-transfer-list-btn-bg: #ffffff;
    --biz-transfer-list-btn-border-color: #d1d5db;
    --biz-transfer-list-btn-hover-bg: #f9fafb;
    --biz-transfer-list-btn-active-bg: #2563eb;
    --biz-transfer-list-btn-active-text: #ffffff;

    /* Colors - Disabled */
    --biz-transfer-list-disabled-bg: #f3f4f6;
    --biz-transfer-list-disabled-text: #9ca3af;
    --biz-transfer-list-disabled-border: #e5e7eb;

    display: inline-block;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  .biz-transfer-list__live-region {
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

  /* Root Container */
  .biz-transfer-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--biz-transfer-list-gap);
    width: var(--biz-transfer-list-width);
    color: var(--biz-transfer-list-text-color);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* Variants */
  .biz-transfer-list--vertical {
    flex-direction: column;
    width: var(--biz-transfer-list-box-width);
  }

  .biz-transfer-list--vertical .biz-transfer-list__actions {
    flex-direction: row;
  }

  /* Sizes */
  .biz-transfer-list--small {
    --biz-transfer-list-box-width: 200px;
    --biz-transfer-list-box-height: 240px;
    --biz-transfer-list-item-height: 32px;
    font-size: 13px;
  }

  .biz-transfer-list--medium {
    --biz-transfer-list-box-width: 250px;
    --biz-transfer-list-box-height: 320px;
    --biz-transfer-list-item-height: 40px;
    font-size: 14px;
  }

  .biz-transfer-list--large {
    --biz-transfer-list-box-width: 300px;
    --biz-transfer-list-box-height: 400px;
    --biz-transfer-list-item-height: 48px;
    font-size: 16px;
  }

  /* List Box */
  .biz-transfer-list__box {
    display: flex;
    flex-direction: column;
    width: var(--biz-transfer-list-box-width);
    height: var(--biz-transfer-list-box-height);
    background-color: var(--biz-transfer-list-bg);
    border: 1px solid var(--biz-transfer-list-border-color);
    border-radius: var(--biz-transfer-list-border-radius);
    overflow: hidden;
  }

  /* Header */
  .biz-transfer-list__header {
    background-color: var(--biz-transfer-list-header-bg);
    border-bottom: 1px solid var(--biz-transfer-list-border-color);
    padding: 8px 12px;
  }

  .biz-transfer-list__header-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .biz-transfer-list__header-title {
    font-weight: 600;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .biz-transfer-list__header-count {
    font-size: 0.85em;
    color: #6b7280;
  }

  /* Search */
  .biz-transfer-list__search {
    padding: 8px;
    border-bottom: 1px solid var(--biz-transfer-list-border-color);
  }

  .biz-transfer-list__search-input {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid var(--biz-transfer-list-border-color);
    border-radius: calc(var(--biz-transfer-list-border-radius) - 2px);
    font-size: inherit;
    outline: none;
    background-color: var(--biz-transfer-list-bg);
    color: inherit;
  }

  .biz-transfer-list__search-input:focus {
    border-color: var(--biz-transfer-list-btn-active-bg);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  /* List Body */
  .biz-transfer-list__body {
    flex: 1;
    overflow-y: auto;
    outline: none;
  }

  .biz-transfer-list__body:focus-visible {
    box-shadow: inset 0 0 0 2px var(--biz-transfer-list-btn-active-bg);
  }

  .biz-transfer-list__list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  /* Items */
  .biz-transfer-list__item {
    display: flex;
    align-items: center;
    gap: 8px;
    height: var(--biz-transfer-list-item-height);
    padding: 0 12px;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease, color 0.15s ease;
  }

  .biz-transfer-list__item:hover:not(.biz-transfer-list__item--disabled) {
    background-color: var(--biz-transfer-list-item-hover-bg);
  }

  .biz-transfer-list__item--selected {
    background-color: var(--biz-transfer-list-item-selected-bg);
    color: var(--biz-transfer-list-item-selected-text);
  }

  .biz-transfer-list__item--focused {
    outline: 2px solid var(--biz-transfer-list-btn-active-bg);
    outline-offset: -2px;
  }

  .biz-transfer-list__item--disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .biz-transfer-list__item-content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .biz-transfer-list__checkbox {
    cursor: inherit;
  }

  /* Empty State */
  .biz-transfer-list__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 16px;
    color: #9ca3af;
    font-size: 0.9em;
  }

  /* Footer */
  .biz-transfer-list__footer:not(:empty) {
    border-top: 1px solid var(--biz-transfer-list-border-color);
    padding: 8px 12px;
    background-color: var(--biz-transfer-list-header-bg);
  }

  /* Action Buttons Container */
  .biz-transfer-list__actions,
  .biz-transfer-list__reorder-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
  }

  /* Action Button Styles */
  .biz-transfer-list__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    padding: 0 8px;
    background-color: var(--biz-transfer-list-btn-bg);
    border: 1px solid var(--biz-transfer-list-btn-border-color);
    border-radius: var(--biz-transfer-list-border-radius);
    color: var(--biz-transfer-list-text-color);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
    outline: none;
  }

  .biz-transfer-list__btn:hover:not(:disabled) {
    background-color: var(--biz-transfer-list-btn-hover-bg);
    border-color: #9ca3af;
  }

  .biz-transfer-list__btn:focus-visible {
    box-shadow: 0 0 0 2px var(--biz-transfer-list-btn-active-bg);
  }

  .biz-transfer-list__btn:active:not(:disabled) {
    background-color: var(--biz-transfer-list-btn-active-bg);
    color: var(--biz-transfer-list-btn-active-text);
  }

  .biz-transfer-list__btn:disabled {
    background-color: var(--biz-transfer-list-disabled-bg);
    color: var(--biz-transfer-list-disabled-text);
    border-color: var(--biz-transfer-list-disabled-border);
    cursor: not-allowed;
  }

  /* Disabled State for Component */
  .biz-transfer-list--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
`;