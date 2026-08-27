import { css } from "lit";

export const dropdownStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-dropdown-height-sm: 32px;
    --biz-dropdown-height-md: 40px;
    --biz-dropdown-height-lg: 48px;
    --biz-dropdown-padding-x: 12px;
    --biz-dropdown-padding-y: 8px;
    --biz-dropdown-border-radius: 4px;
    --biz-dropdown-popover-max-height: 256px;

    /* Colors - Base */
    --biz-dropdown-bg-color: #ffffff;
    --biz-dropdown-border-color: #d1d5db;
    --biz-dropdown-text-color: #111827;
    --biz-dropdown-placeholder-color: #9ca3af;
    --biz-dropdown-icon-color: #6b7280;

    /* Colors - Popover & Option */
    --biz-dropdown-popover-bg: #ffffff;
    --biz-dropdown-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --biz-dropdown-option-hover-bg: #f3f4f6;
    --biz-dropdown-option-selected-bg: #eff6ff;
    --biz-dropdown-option-selected-text: #2563eb;

    /* Colors - Tag / Chip */
    --biz-dropdown-tag-bg: #e5e7eb;
    --biz-dropdown-tag-text: #374151;

    /* Colors - Interactive States */
    --biz-dropdown-hover-border-color: #9ca3af;
    --biz-dropdown-focus-border-color: #2563eb;
    --biz-dropdown-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-dropdown-error-color: #dc2626;
    --biz-dropdown-disabled-bg-color: #f3f4f6;
    --biz-dropdown-disabled-text-color: #9ca3af;

    display: inline-block;
    width: auto;
    box-sizing: border-box;
    font-family: inherit;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  /* Label */
  .biz-dropdown__label {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-dropdown-text-color);
  }

  /* Trigger Container */
  .biz-dropdown__trigger-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  /* Trigger Control */
  .biz-dropdown__trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    min-height: var(--biz-dropdown-height-md);
    padding: var(--biz-dropdown-padding-y) var(--biz-dropdown-padding-x);
    background-color: var(--biz-dropdown-bg-color);
    border: 1px solid var(--biz-dropdown-border-color);
    border-radius: var(--biz-dropdown-border-radius);
    color: var(--biz-dropdown-text-color);
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  /* Sizes */
  .biz-dropdown--small .biz-dropdown__trigger {
    min-height: var(--biz-dropdown-height-sm);
    padding: 4px 8px;
    font-size: 12px;
  }

  .biz-dropdown--medium .biz-dropdown__trigger {
    min-height: var(--biz-dropdown-height-md);
    padding: var(--biz-dropdown-padding-y) var(--biz-dropdown-padding-x);
    font-size: 14px;
  }

  .biz-dropdown--large .biz-dropdown__trigger {
    min-height: var(--biz-dropdown-height-lg);
    padding: 12px 16px;
    font-size: 16px;
  }

  /* Variants */
  .biz-dropdown--outlined .biz-dropdown__trigger {
    border: 1px solid var(--biz-dropdown-border-color);
    background-color: var(--biz-dropdown-bg-color);
  }

  .biz-dropdown--filled .biz-dropdown__trigger {
    border: 1px solid transparent;
    background-color: var(--biz-dropdown-disabled-bg-color);
  }

  .biz-dropdown--standard .biz-dropdown__trigger {
    border: none;
    border-bottom: 1px solid var(--biz-dropdown-border-color);
    border-radius: 0;
    background-color: transparent;
    padding-left: 0;
    padding-right: 0;
  }

  /* States: Hover, Focus, Open */
  .biz-dropdown__trigger:hover:not(:disabled) {
    border-color: var(--biz-dropdown-hover-border-color);
  }

  .biz-dropdown--open .biz-dropdown__trigger,
  .biz-dropdown__trigger:focus-visible {
    border-color: var(--biz-dropdown-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-dropdown-focus-ring-color);
  }

  .biz-dropdown--standard.biz-dropdown--open .biz-dropdown__trigger,
  .biz-dropdown--standard .biz-dropdown__trigger:focus-visible {
    box-shadow: none;
    border-bottom-color: var(--biz-dropdown-focus-border-color);
  }

  /* States: Disabled */
  .biz-dropdown--disabled .biz-dropdown__trigger {
    background-color: var(--biz-dropdown-disabled-bg-color);
    border-color: var(--biz-dropdown-border-color);
    color: var(--biz-dropdown-disabled-text-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  /* States: Readonly */
  .biz-dropdown--readonly .biz-dropdown__trigger {
    cursor: default;
    background-color: var(--biz-dropdown-disabled-bg-color);
  }

  /* States: Error */
  .biz-dropdown--error .biz-dropdown__trigger {
    border-color: var(--biz-dropdown-error-color);
  }

  .biz-dropdown--error .biz-dropdown__trigger:focus-visible,
  .biz-dropdown--error.biz-dropdown--open .biz-dropdown__trigger {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  /* Content Display Area */
  .biz-dropdown__content-area {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    flex: 1;
    overflow: hidden;
  }

  .biz-dropdown__placeholder {
    color: var(--biz-dropdown-placeholder-color);
  }

  .biz-dropdown__filter-input {
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    width: 100%;
    padding: 0;
  }

  .biz-dropdown__filter-input--inline {
    flex: 1;
    min-width: 60px;
  }

  /* Tags / Chips */
  .biz-dropdown__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
  }

  .biz-dropdown__tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background-color: var(--biz-dropdown-tag-bg);
    color: var(--biz-dropdown-tag-text);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    line-height: 1.2;
  }

  .biz-dropdown__tag-remove {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    color: currentColor;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    opacity: 0.7;
  }

  .biz-dropdown__tag-remove:hover {
    opacity: 1;
  }

  /* Controls Section */
  .biz-dropdown__controls {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: 8px;
    color: var(--biz-dropdown-icon-color);
  }

  .biz-dropdown__clear-btn {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    color: var(--biz-dropdown-icon-color);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .biz-dropdown__clear-btn:hover {
    color: var(--biz-dropdown-text-color);
  }

  .biz-dropdown__arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--biz-dropdown-icon-color);
    transition: transform 0.2s ease;
  }

  .biz-dropdown--open .biz-dropdown__arrow {
    transform: rotate(180deg);
  }

  /* Spinner / Loading */
  .biz-dropdown__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid var(--biz-dropdown-border-color);
    border-top-color: var(--biz-dropdown-focus-border-color);
    border-radius: 50%;
    animation: biz-dropdown-spin 0.6s linear infinite;
  }

  @keyframes biz-dropdown-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Popover Menu */
  .biz-dropdown__popover {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: var(--biz-dropdown-popover-bg);
    border: 1px solid var(--biz-dropdown-border-color);
    border-radius: var(--biz-dropdown-border-radius);
    box-shadow: var(--biz-dropdown-popover-shadow);
    max-height: var(--biz-dropdown-popover-max-height);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .biz-dropdown__listbox {
    list-style: none;
    margin: 0;
    padding: 4px 0;
  }

  .biz-dropdown__option {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    color: var(--biz-dropdown-text-color);
    font-size: 14px;
    transition: background-color 0.15s ease;
  }

  .biz-dropdown__option:hover,
  .biz-dropdown__option--focused {
    background-color: var(--biz-dropdown-option-hover-bg);
  }

  .biz-dropdown__option--selected {
    background-color: var(--biz-dropdown-option-selected-bg);
    color: var(--biz-dropdown-option-selected-text);
    font-weight: 500;
  }

  .biz-dropdown__option--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: transparent;
  }

  .biz-dropdown__empty {
    padding: 12px;
    text-align: center;
    color: var(--biz-dropdown-placeholder-color);
    font-size: 14px;
  }

  /* Helper Text */
  .biz-dropdown__helper-text {
    margin-top: 4px;
    font-size: 12px;
    color: var(--biz-dropdown-icon-color);
  }

  .biz-dropdown--error .biz-dropdown__helper-text {
    color: var(--biz-dropdown-error-color);
  }

  /* Sr-Only Live Region */
  .biz-dropdown__sr-only {
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
  /* Label Layout & Alignment */
  .biz-dropdown__label-container {
    display: none;
  }

  .biz-dropdown__label-container--has-content {
    display: flex;
  }

  .biz-dropdown--label-vertical {
    flex-direction: column;
  }

  .biz-dropdown--label-vertical .biz-dropdown__label-container {
    margin-bottom: 4px;
  }

  .biz-dropdown--label-horizontal {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .biz-dropdown--label-horizontal .biz-dropdown__label-container {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .biz-dropdown--label-horizontal .biz-dropdown__trigger-container {
    flex: 1;
  }

  .biz-dropdown__label {
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-dropdown-text-color);
  }
`;