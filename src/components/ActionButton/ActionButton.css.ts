import { css } from "lit";

export const actionButtonStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-action-button-height-sm: 28px;
    --biz-action-button-height-md: 36px;
    --biz-action-button-height-lg: 44px;
    --biz-action-button-padding-x: 12px;
    --biz-action-button-padding-y: 6px;
    --biz-action-button-border-radius: 4px;

    /* Base Colors */
    --biz-action-button-bg-color: #2563eb;
    --biz-action-button-border-color: #2563eb;
    --biz-action-button-text-color: #ffffff;

    /* Interactive States Colors */
    --biz-action-button-hover-bg-color: #1d4ed8;
    --biz-action-button-hover-border-color: #1d4ed8;
    --biz-action-button-active-bg-color: #1e40af;
    --biz-action-button-focus-ring-color: rgba(37, 99, 235, 0.3);

    /* Menu Colors */
    --biz-action-menu-bg-color: #ffffff;
    --biz-action-menu-border-color: #e5e7eb;
    --biz-action-menu-item-hover-bg-color: #f3f4f6;
    --biz-action-menu-item-danger-color: #dc2626;

    /* Disabled State Colors */
    --biz-action-button-disabled-bg-color: #f3f4f6;
    --biz-action-button-disabled-border-color: #e5e7eb;
    --biz-action-button-disabled-text-color: #9ca3af;

    /* Error & Readonly Colors */
    --biz-action-button-error-border-color: #dc2626;
    --biz-action-button-readonly-bg-color: #f9fafb;

    display: inline-block;
    box-sizing: border-box;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-action-button {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    font-family: inherit;
  }

  .biz-action-button--full-width {
    width: 100%;
  }

  .biz-action-button__group {
    display: inline-flex;
    align-items: center;
    width: 100%;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    border: 1px solid var(--biz-action-button-border-color);
    background-color: var(--biz-action-button-bg-color);
    color: var(--biz-action-button-text-color);
    border-radius: var(--biz-action-button-border-radius);
    padding: var(--biz-action-button-padding-y) var(--biz-action-button-padding-x);
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;
  }

  button:hover:not(:disabled) {
    background-color: var(--biz-action-button-hover-bg-color);
    border-color: var(--biz-action-button-hover-border-color);
  }

  button:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--biz-action-button-focus-ring-color);
  }

  button:active:not(:disabled) {
    background-color: var(--biz-action-button-active-bg-color);
  }

  button:disabled {
    background-color: var(--biz-action-button-disabled-bg-color);
    border-color: var(--biz-action-button-disabled-border-color);
    color: var(--biz-action-button-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-action-button__main {
    flex: 1;
    height: var(--biz-action-button-height-md);
  }

  /* Split Variant Styles */
  .biz-action-button--split .biz-action-button__main {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: none;
  }

  .biz-action-button__trigger {
    height: var(--biz-action-button-height-md);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-x: 8px;
  }

  /* Variants */
  .biz-action-button--solid {
    --biz-action-button-bg-color: #2563eb;
    --biz-action-button-border-color: #2563eb;
    --biz-action-button-text-color: #ffffff;
  }

  .biz-action-button--outlined {
    --biz-action-button-bg-color: transparent;
    --biz-action-button-border-color: #2563eb;
    --biz-action-button-text-color: #2563eb;
    --biz-action-button-hover-bg-color: rgba(37, 99, 235, 0.04);
    --biz-action-button-hover-border-color: #1d4ed8;
  }

  .biz-action-button--text {
    --biz-action-button-bg-color: transparent;
    --biz-action-button-border-color: transparent;
    --biz-action-button-text-color: #2563eb;
    --biz-action-button-hover-bg-color: rgba(37, 99, 235, 0.08);
    --biz-action-button-hover-border-color: transparent;
  }

  /* Sizes */
  .biz-action-button--small .biz-action-button__main,
  .biz-action-button--small .biz-action-button__trigger {
    height: var(--biz-action-button-height-sm);
    font-size: 12px;
    padding: 2px 8px;
  }

  .biz-action-button--medium .biz-action-button__main,
  .biz-action-button--medium .biz-action-button__trigger {
    height: var(--biz-action-button-height-md);
    font-size: 14px;
    padding: var(--biz-action-button-padding-y) var(--biz-action-button-padding-x);
  }

  .biz-action-button--large .biz-action-button__main,
  .biz-action-button--large .biz-action-button__trigger {
    height: var(--biz-action-button-height-lg);
    font-size: 16px;
    padding: 10px 16px;
  }

  /* States */
  .biz-action-button--readonly button {
    background-color: var(--biz-action-button-readonly-bg-color);
    cursor: default;
  }

  .biz-action-button--error button {
    border-color: var(--biz-action-button-error-border-color);
  }

  .biz-action-button--loading button {
    cursor: wait;
  }

  .biz-action-button__spinner {
    display: inline-block;
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: biz-action-button-spin 0.75s linear infinite;
  }

  @keyframes biz-action-button-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Dropdown Menu & Placements */
  .biz-action-button__menu {
    position: absolute;
    z-index: 1000;
    min-width: 160px;
    background-color: var(--biz-action-menu-bg-color);
    border: 1px solid var(--biz-action-menu-border-color);
    border-radius: var(--biz-action-button-border-radius);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 4px 0;
    margin-top: 4px;
  }

  .biz-action-button--placement-bottom-start .biz-action-button__menu {
    top: 100%;
    left: 0;
  }

  .biz-action-button--placement-bottom-end .biz-action-button__menu {
    top: 100%;
    right: 0;
  }

  .biz-action-button--placement-top-start .biz-action-button__menu {
    bottom: 100%;
    left: 0;
    margin-top: 0;
    margin-bottom: 4px;
  }

  .biz-action-button--placement-top-end .biz-action-button__menu {
    bottom: 100%;
    right: 0;
    margin-top: 0;
    margin-bottom: 4px;
  }

  .biz-action-button__menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .biz-action-button__menu-item {
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 8px 12px;
    border: none;
    border-radius: 0;
    background-color: transparent;
    color: #374151;
    font-size: 14px;
    text-align: left;
    justify-content: flex-start;
  }

  .biz-action-button__menu-item:hover:not(:disabled) {
    background-color: var(--biz-action-menu-item-hover-bg-color);
  }

  .biz-action-button__menu-item--danger {
    color: var(--biz-action-menu-item-danger-color);
  }

  .biz-action-button__arrow {
    font-size: 10px;
  }

  .biz-action-button__helper {
    margin-top: 4px;
    font-size: 12px;
  }
`;