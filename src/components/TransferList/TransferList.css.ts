import { css } from 'lit';

export const transferListStyles = css`
  :host {
    /* Layout & Sizing Design Tokens */
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

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-transfer-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--biz-transfer-list-gap);
    width: var(--biz-transfer-list-width);
    color: var(--biz-transfer-list-text-color);
  }

  /* Variants */
  .biz-transfer-list[data-variant='vertical'] {
    flex-direction: column;
    width: var(--biz-transfer-list-box-width);
  }

  .biz-transfer-list[data-variant='vertical'] .biz-transfer-list__actions,
  .biz-transfer-list[data-variant='vertical'] .biz-transfer-list__reorder-actions {
    flex-direction: row;
  }

  /* Variant styling mapping for Outlined / Filled / Standard compatibility */
  .biz-transfer-list[data-variant='outlined'] .biz-transfer-list__box {
    border: 1px solid var(--biz-transfer-list-border-color);
    background-color: var(--biz-transfer-list-bg);
  }

  .biz-transfer-list[data-variant='filled'] .biz-transfer-list__box {
    border: 1px solid transparent;
    background-color: var(--biz-transfer-list-header-bg);
  }

  .biz-transfer-list[data-variant='standard'] .biz-transfer-list__box {
    border: none;
    border-bottom: 2px solid var(--biz-transfer-list-border-color);
    border-radius: 0;
  }

  /* Sizes */
  .biz-transfer-list[data-size='small'] {
    --biz-transfer-list-box-width: 200px;
    --biz-transfer-list-box-height: 240px;
    --biz-transfer-list-item-height: 32px;
    --biz-transfer-list-gap: 10px;
    font-size: 12px;
  }

  .biz-transfer-list[data-size='medium'] {
    --biz-transfer-list-box-width: 250px;
    --biz-transfer-list-box-height: 320px;
    --biz-transfer-list-item-height: 40px;
    --biz-transfer-list-gap: 16px;
    font-size: 14px;
  }

  .biz-transfer-list[data-size='large'] {
    --biz-transfer-list-box-width: 300px;
    --biz-transfer-list-box-height: 400px;
    --biz-transfer-list-item-height: 48px;
    --biz-transfer-list-gap: 20px;
    font-size: 16px;
  }

  /* Box Layout */
  .biz-transfer-list__box {
    display: flex;
    flex-direction: column;
    width: var(--biz-transfer-list-box-width);
    height: var(--biz-transfer-list-box-height);
    border: 1px solid var(--biz-transfer-list-border-color);
    border-radius: var(--biz-transfer-list-border-radius);
    background-color: var(--biz-transfer-list-bg);
    overflow: hidden;
  }

  .biz-transfer-list__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background-color: var(--biz-transfer-list-header-bg);
    border-bottom: 1px solid var(--biz-transfer-list-border-color);
    font-weight: 600;
  }

  .biz-transfer-list__title {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .biz-transfer-list__count {
    font-size: 0.85em;
    color: var(--biz-transfer-list-disabled-text);
  }

  .biz-transfer-list__search {
    padding: 6px 8px;
    border-bottom: 1px solid var(--biz-transfer-list-border-color);
  }

  .biz-transfer-list__search-input {
    width: 100%;
    padding: 4px 8px;
    border: 1px solid var(--biz-transfer-list-border-color);
    border-radius: calc(var(--biz-transfer-list-border-radius) - 2px);
    outline: none;
    font-size: inherit;
  }

  .biz-transfer-list__search-input:focus {
    border-color: var(--biz-transfer-list-item-selected-text);
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }

  .biz-transfer-list__list {
    flex: 1;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y: auto;
    outline: none;
  }

  .biz-transfer-list__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--biz-transfer-list-disabled-text);
  }

  /* Items & Interactions */
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

  .biz-transfer-list__item:hover:not([data-disabled]) {
    background-color: var(--biz-transfer-list-item-hover-bg);
  }

  .biz-transfer-list__item:focus-visible {
    outline: 2px solid var(--biz-transfer-list-item-selected-text);
    outline-offset: -2px;
  }

  .biz-transfer-list__item[data-selected] {
    background-color: var(--biz-transfer-list-item-selected-bg);
    color: var(--biz-transfer-list-item-selected-text);
  }

  .biz-transfer-list__item[data-disabled] {
    cursor: not-allowed;
    color: var(--biz-transfer-list-disabled-text);
    background-color: transparent;
  }

  .biz-transfer-list__item-label {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .biz-transfer-list__checkbox {
    cursor: pointer;
  }

  .biz-transfer-list__checkbox:disabled {
    cursor: not-allowed;
  }

  /* Actions & Reorder */
  .biz-transfer-list__actions,
  .biz-transfer-list__reorder-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

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
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.15s ease, border-color 0.15s ease;
  }

  .biz-transfer-list__btn:hover:not(:disabled) {
    background-color: var(--biz-transfer-list-btn-hover-bg);
  }

  .biz-transfer-list__btn:active:not(:disabled) {
    background-color: var(--biz-transfer-list-btn-active-bg);
    color: var(--biz-transfer-list-btn-active-text);
  }

  .biz-transfer-list__btn:focus-visible {
    outline: 2px solid var(--biz-transfer-list-item-selected-text);
    outline-offset: 2px;
  }

  .biz-transfer-list__btn:disabled {
    cursor: not-allowed;
    background-color: var(--biz-transfer-list-disabled-bg);
    border-color: var(--biz-transfer-list-disabled-border);
    color: var(--biz-transfer-list-disabled-text);
  }

  .biz-transfer-list__footer {
    border-top: 1px solid var(--biz-transfer-list-border-color);
  }

  /* Component Level States */
  .biz-transfer-list[data-disabled] {
    opacity: 0.6;
    pointer-events: none;
  }
`;