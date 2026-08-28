import { css } from 'lit';

export const toastStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-toast-min-width: 300px;
    --biz-toast-max-width: 480px;
    --biz-toast-padding-x: 16px;
    --biz-toast-padding-y: 12px;
    --biz-toast-border-radius: 6px;
    --biz-toast-gap: 12px;

    /* Typography Tokens */
    --biz-toast-font-size: 14px;
    --biz-toast-line-height: 1.5;

    /* Elevation & Transition Tokens */
    --biz-toast-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --biz-toast-transition-duration: 300ms;

    /* Type Palette - Success */
    --biz-toast-success-bg: #f0fdf4;
    --biz-toast-success-border: #bbf7d0;
    --biz-toast-success-text: #166534;
    --biz-toast-success-filled-bg: #166534;
    --biz-toast-success-filled-text: #ffffff;

    /* Type Palette - Info */
    --biz-toast-info-bg: #eff6ff;
    --biz-toast-info-border: #bfdbfe;
    --biz-toast-info-text: #1e40af;
    --biz-toast-info-filled-bg: #1e40af;
    --biz-toast-info-filled-text: #ffffff;

    /* Type Palette - Warning */
    --biz-toast-warning-bg: #fffbeb;
    --biz-toast-warning-border: #fde68a;
    --biz-toast-warning-text: #92400e;
    --biz-toast-warning-filled-bg: #d97706;
    --biz-toast-warning-filled-text: #ffffff;

    /* Type Palette - Error */
    --biz-toast-error-bg: #fef2f2;
    --biz-toast-error-border: #fecaca;
    --biz-toast-error-text: #991b1b;
    --biz-toast-error-filled-bg: #991b1b;
    --biz-toast-error-filled-text: #ffffff;

    display: block;
    position: relative;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Root Container */
  .biz-toast {
    display: flex;
    align-items: center;
    gap: var(--biz-toast-gap);
    min-width: var(--biz-toast-min-width);
    max-width: var(--biz-toast-max-width);
    padding: var(--biz-toast-padding-y) var(--biz-toast-padding-x);
    border-radius: var(--biz-toast-border-radius);
    box-shadow: var(--biz-toast-shadow);
    font-size: var(--biz-toast-font-size);
    line-height: var(--biz-toast-line-height);
    border: 1px solid transparent;
    transition: transform var(--biz-toast-transition-duration) ease,
                opacity var(--biz-toast-transition-duration) ease,
                box-shadow 0.2s ease,
                background-color 0.2s ease;
    outline: none;
    position: relative;
  }

  /* --- Variants --- */
  /* Standard Variant */
  .biz-toast--standard.biz-toast--success {
    background-color: var(--biz-toast-success-bg);
    border-color: var(--biz-toast-success-border);
    color: var(--biz-toast-success-text);
  }
  .biz-toast--standard.biz-toast--info {
    background-color: var(--biz-toast-info-bg);
    border-color: var(--biz-toast-info-border);
    color: var(--biz-toast-info-text);
  }
  .biz-toast--standard.biz-toast--warning {
    background-color: var(--biz-toast-warning-bg);
    border-color: var(--biz-toast-warning-border);
    color: var(--biz-toast-warning-text);
  }
  .biz-toast--standard.biz-toast--error {
    background-color: var(--biz-toast-error-bg);
    border-color: var(--biz-toast-error-border);
    color: var(--biz-toast-error-text);
  }

  /* Outlined Variant */
  .biz-toast--outlined {
    background-color: #ffffff;
  }
  .biz-toast--outlined.biz-toast--success {
    border-color: var(--biz-toast-success-text);
    color: var(--biz-toast-success-text);
  }
  .biz-toast--outlined.biz-toast--info {
    border-color: var(--biz-toast-info-text);
    color: var(--biz-toast-info-text);
  }
  .biz-toast--outlined.biz-toast--warning {
    border-color: var(--biz-toast-warning-text);
    color: var(--biz-toast-warning-text);
  }
  .biz-toast--outlined.biz-toast--error {
    border-color: var(--biz-toast-error-text);
    color: var(--biz-toast-error-text);
  }

  /* Filled Variant */
  .biz-toast--filled.biz-toast--success {
    background-color: var(--biz-toast-success-filled-bg);
    color: var(--biz-toast-success-filled-text);
    border-color: transparent;
  }
  .biz-toast--filled.biz-toast--info {
    background-color: var(--biz-toast-info-filled-bg);
    color: var(--biz-toast-info-filled-text);
    border-color: transparent;
  }
  .biz-toast--filled.biz-toast--warning {
    background-color: var(--biz-toast-warning-filled-bg);
    color: var(--biz-toast-warning-filled-text);
    border-color: transparent;
  }
  .biz-toast--filled.biz-toast--error {
    background-color: var(--biz-toast-error-filled-bg);
    color: var(--biz-toast-error-filled-text);
    border-color: transparent;
  }

  /* --- Sizes --- */
  .biz-toast--small {
    --biz-toast-padding-x: 12px;
    --biz-toast-padding-y: 8px;
    --biz-toast-font-size: 12px;
    --biz-toast-min-width: 240px;
  }

  .biz-toast--medium {
    --biz-toast-padding-x: 16px;
    --biz-toast-padding-y: 12px;
    --biz-toast-font-size: 14px;
    --biz-toast-min-width: 300px;
  }

  .biz-toast--large {
    --biz-toast-padding-x: 20px;
    --biz-toast-padding-y: 16px;
    --biz-toast-font-size: 16px;
    --biz-toast-min-width: 360px;
  }

  /* Structural Regions */
  .biz-toast__start,
  .biz-toast__action,
  .biz-toast__close {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .biz-toast__content {
    flex: 1;
    word-break: break-word;
  }

  .biz-toast__close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    line-height: 1;
    color: inherit;
    opacity: 0.7;
    padding: 2px 4px;
    border-radius: 4px;
    transition: opacity 0.2s ease, background-color 0.2s ease;
  }

  .biz-toast__close-btn:hover:not(:disabled) {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.08);
  }

  /* Spinner for Loading State */
  .biz-toast__spinner {
    width: 14px;
    height: 14px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: biz-toast-spin 0.8s linear infinite;
    display: inline-block;
  }

  @keyframes biz-toast-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* --- Lifecycle States & Interactions --- */
  .biz-toast--entering {
    opacity: 0;
    transform: translateY(-10px);
  }

  .biz-toast--showing {
    opacity: 1;
    transform: translateY(0);
  }

  .biz-toast--paused,
  .biz-toast:hover:not(.biz-toast--disabled) {
    box-shadow: 0 12px 20px -3px rgba(0, 0, 0, 0.15), 0 6px 8px -2px rgba(0, 0, 0, 0.08);
  }

  .biz-toast:active:not(.biz-toast--disabled) {
    transform: scale(0.99);
  }

  .biz-toast--exiting {
    opacity: 0;
    transform: translateY(-10px);
  }

  .biz-toast:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }

  /* Disabled State */
  .biz-toast--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
  }

  /* Readonly State */
  .biz-toast--readonly {
    user-select: text;
  }
`;