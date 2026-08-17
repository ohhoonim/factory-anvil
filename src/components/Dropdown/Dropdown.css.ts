import { css } from 'lit';

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
    --biz-dropdown-popover-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
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
    font-family: inherit;
    box-sizing: border-box;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .biz-dropdown.full-width {
    width: 100%;
  }

  /* Trigger Control Base */
  .trigger-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 var(--biz-dropdown-padding-x);
    background-color: var(--biz-dropdown-bg-color);
    border: 1px solid var(--biz-dropdown-border-color);
    border-radius: var(--biz-dropdown-border-radius);
    color: var(--biz-dropdown-text-color);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    outline: none;
  }

  /* Variants */
  .biz-dropdown.outlined .trigger-control {
    background-color: var(--biz-dropdown-bg-color);
    border-style: solid;
  }

  .biz-dropdown.filled .trigger-control {
    background-color: #f9fafb;
    border: 1px solid transparent;
  }

  .biz-dropdown.standard .trigger-control {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--biz-dropdown-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Sizes */
  .biz-dropdown.small .trigger-control {
    min-height: var(--biz-dropdown-height-sm);
    font-size: 12px;
  }

  .biz-dropdown.medium .trigger-control {
    min-height: var(--biz-dropdown-height-md);
    font-size: 14px;
  }

  .biz-dropdown.large .trigger-control {
    min-height: var(--biz-dropdown-height-lg);
    font-size: 16px;
  }

  /* Value Container */
  .value-container {
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    overflow: hidden;
  }

  .placeholder {
    color: var(--biz-dropdown-placeholder-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .selected-value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .filter-input {
    border: none;
    outline: none;
    background: transparent;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    color: var(--biz-dropdown-text-color);
    padding: 0;
  }

  /* Tags */
  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 2px 0;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background-color: var(--biz-dropdown-tag-bg);
    color: var(--biz-dropdown-tag-text);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
  }

  .tag-remove-btn {
    border: none;
    background: transparent;
    color: inherit;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    line-height: 1;
  }

  /* Suffix & Actions */
  .suffix-actions {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--biz-dropdown-icon-color);
  }

  .clear-btn {
    border: none;
    background: transparent;
    color: var(--biz-dropdown-icon-color);
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    line-height: 1;
  }

  .clear-btn:hover {
    color: var(--biz-dropdown-text-color);
  }

  .arrow-icon {
    display: inline-flex;
    transition: transform 0.2s ease-in-out;
  }

  .biz-dropdown.open .arrow-icon {
    transform: rotate(180deg);
  }

  /* States - Hover & Focus */
  .trigger-control:hover {
    border-color: var(--biz-dropdown-hover-border-color);
  }

  .biz-dropdown.focused .trigger-control,
  .trigger-control:focus-visible {
    border-color: var(--biz-dropdown-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-dropdown-focus-ring-color);
  }

  .biz-dropdown.standard.focused .trigger-control {
    box-shadow: none;
    border-bottom-color: var(--biz-dropdown-focus-border-color);
  }

  /* States - Error */
  .biz-dropdown.error .trigger-control {
    border-color: var(--biz-dropdown-error-color);
  }

  .biz-dropdown.error.focused .trigger-control {
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }

  /* States - Disabled */
  .biz-dropdown.disabled .trigger-control {
    background-color: var(--biz-dropdown-disabled-bg-color);
    color: var(--biz-dropdown-disabled-text-color);
    border-color: var(--biz-dropdown-border-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* States - Readonly */
  .biz-dropdown.readonly .trigger-control {
    cursor: default;
    background-color: #f9fafb;
  }

  /* Popover */
  .popover {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    margin-top: 4px;
    background-color: var(--biz-dropdown-popover-bg);
    border: 1px solid var(--biz-dropdown-border-color);
    border-radius: var(--biz-dropdown-border-radius);
    box-shadow: var(--biz-dropdown-popover-shadow);
    display: none;
    flex-direction: column;
    overflow: hidden;
  }

  .popover.open {
    display: flex;
  }

  .options-container {
    max-height: var(--biz-dropdown-popover-max-height);
    overflow-y: auto;
  }

  .option-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    cursor: pointer;
    color: var(--biz-dropdown-text-color);
    transition: background-color 0.15s ease;
  }

  .option-item:hover,
  .option-item.active {
    background-color: var(--biz-dropdown-option-hover-bg);
  }

  .option-item.selected {
    background-color: var(--biz-dropdown-option-selected-bg);
    color: var(--biz-dropdown-option-selected-text);
    font-weight: 500;
  }

  .option-item.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: transparent;
  }

  .empty-state {
    padding: 12px;
    text-align: center;
    color: var(--biz-dropdown-placeholder-color);
    font-size: 14px;
  }

  /* Spinner */
  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid var(--biz-dropdown-icon-color);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Screen Reader Only */
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