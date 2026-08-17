import { css } from "lit";

export const chipStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-chip-container-min-height-sm: 32px;
    --biz-chip-container-min-height-md: 40px;
    --biz-chip-container-min-height-lg: 48px;
    --biz-chip-container-padding-x: 8px;
    --biz-chip-container-padding-y: 4px;
    --biz-chip-gap: 6px;
    --biz-chip-border-radius: 4px;

    /* Individual Chip Styling */
    --biz-chip-item-bg-color: #e5e7eb;
    --biz-chip-item-text-color: #111827;
    --biz-chip-item-height: 24px;
    --biz-chip-item-border-radius: 12px;

    /* Colors - Base */
    --biz-chip-bg-color: #ffffff;
    --biz-chip-border-color: #d1d5db;
    --biz-chip-text-color: #111827;
    --biz-chip-placeholder-color: #9ca3af;

    /* Colors - Interactive States */
    --biz-chip-hover-border-color: #9ca3af;
    --biz-chip-focus-border-color: #2563eb;
    --biz-chip-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-chip-error-color: #dc2626;
    --biz-chip-disabled-bg-color: #f3f4f6;
    --biz-chip-disabled-text-color: #9ca3af;

    display: inline-block;
    width: auto;
    font-family: inherit;
    box-sizing: border-box;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  .biz-chip {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  .biz-chip__label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-chip-text-color);
  }

  .biz-chip__container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--biz-chip-gap);
    padding: var(--biz-chip-container-padding-y) var(--biz-chip-container-padding-x);
    background-color: var(--biz-chip-bg-color);
    border: 1px solid var(--biz-chip-border-color);
    border-radius: var(--biz-chip-border-radius);
    box-sizing: border-box;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  .biz-chip__container:hover:not(.biz-chip__container--disabled):not(.biz-chip__container--readonly) {
    border-color: var(--biz-chip-hover-border-color);
  }

  .biz-chip__container--focused {
    border-color: var(--biz-chip-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-chip-focus-ring-color);
  }

  /* Variants */
  .biz-chip--outlined .biz-chip__container {
    background-color: transparent;
    border-style: solid;
  }

  .biz-chip--filled .biz-chip__container {
    background-color: #f3f4f6;
    border-color: transparent;
  }

  .biz-chip--filled .biz-chip__container:hover:not(.biz-chip__container--disabled):not(.biz-chip__container--readonly) {
    background-color: #e5e7eb;
    border-color: transparent;
  }

  .biz-chip--standard .biz-chip__container {
    background-color: transparent;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid var(--biz-chip-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Sizes */
  .biz-chip--sm .biz-chip__container {
    min-height: var(--biz-chip-container-min-height-sm);
    font-size: 12px;
  }

  .biz-chip--sm .biz-chip__item {
    height: 20px;
    font-size: 11px;
    padding: 0 6px;
  }

  .biz-chip--md .biz-chip__container {
    min-height: var(--biz-chip-container-min-height-md);
    font-size: 14px;
  }

  .biz-chip--md .biz-chip__item {
    height: var(--biz-chip-item-height);
    font-size: 12px;
    padding: 0 8px;
  }

  .biz-chip--lg .biz-chip__container {
    min-height: var(--biz-chip-container-min-height-lg);
    font-size: 16px;
  }

  .biz-chip--lg .biz-chip__item {
    height: 28px;
    font-size: 14px;
    padding: 0 10px;
  }

  /* Chip Item */
  .biz-chip__item-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--biz-chip-gap);
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .biz-chip__item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background-color: var(--biz-chip-item-bg-color);
    color: var(--biz-chip-item-text-color);
    border-radius: var(--biz-chip-item-border-radius);
    box-sizing: border-box;
    white-space: nowrap;
    outline: none;
  }

  .biz-chip__item--focused {
    box-shadow: 0 0 0 2px var(--biz-chip-focus-border-color);
  }

  .biz-chip__delete-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 0;
    margin: 0;
    cursor: pointer;
    color: currentColor;
    opacity: 0.6;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    line-height: 1;
  }

  .biz-chip__delete-btn:hover {
    opacity: 1;
  }

  /* Input Field */
  .biz-chip__input {
    flex: 1 1 60px;
    min-width: 60px;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-chip-text-color);
    font-family: inherit;
    font-size: inherit;
    padding: 0;
    margin: 0;
  }

  .biz-chip__input::placeholder {
    color: var(--biz-chip-placeholder-color);
  }

  /* States */
  .biz-chip__container--disabled {
    background-color: var(--biz-chip-disabled-bg-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .biz-chip__container--disabled .biz-chip__input {
    cursor: not-allowed;
  }

  .biz-chip__container--readonly {
    background-color: transparent;
  }

  .biz-chip__container--error {
    border-color: var(--biz-chip-error-color);
  }

  .biz-chip__container--error.biz-chip__container--focused {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  .biz-chip__helper-text {
    font-size: 12px;
    color: #6b7280;
  }

  .biz-chip__helper-text--error {
    color: var(--biz-chip-error-color);
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