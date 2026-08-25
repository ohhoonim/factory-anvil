import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    --biz-button-height-sm: 32px;
    --biz-button-height-md: 40px;
    --biz-button-height-lg: 48px;

    --biz-button-padding-x-sm: 12px;
    --biz-button-padding-x-md: 16px;
    --biz-button-padding-x-lg: 20px;

    --biz-button-border-radius: 4px;

    --biz-button-font-size-sm: 12px;
    --biz-button-font-size-md: 14px;
    --biz-button-font-size-lg: 16px;

    --biz-button-bg-color: #2563eb;
    --biz-button-text-color: #ffffff;
    --biz-button-border-color: transparent;

    --biz-button-hover-bg-color: #1d4ed8;
    --biz-button-active-bg-color: #1e40af;
    --biz-button-focus-ring-color: rgba(37, 99, 235, 0.4);

    --biz-button-disabled-bg-color: #e5e7eb;
    --biz-button-disabled-text-color: #9ca3af;
    --biz-button-disabled-border-color: transparent;
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

  .biz-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 1px;
    border-radius: var(--biz-button-border-radius);
    font-family: inherit;
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    outline: none;
  }

  /* Sizes */
  .biz-button--small {
    height: var(--biz-button-height-sm);
    padding: 0 var(--biz-button-padding-x-sm);
    font-size: var(--biz-button-font-size-sm);
  }

  .biz-button--medium {
    height: var(--biz-button-height-md);
    padding: 0 var(--biz-button-padding-x-md);
    font-size: var(--biz-button-font-size-md);
  }

  .biz-button--large {
    height: var(--biz-button-height-lg);
    padding: 0 var(--biz-button-padding-x-lg);
    font-size: var(--biz-button-font-size-lg);
  }

  /* Variants */
  .biz-button--filled {
    background-color: var(--biz-button-bg-color);
    color: var(--biz-button-text-color);
    border-color: var(--biz-button-border-color);
  }

  .biz-button--filled:hover:not(:disabled) {
    background-color: var(--biz-button-hover-bg-color);
  }

  .biz-button--filled:active:not(:disabled) {
    background-color: var(--biz-button-active-bg-color);
  }

  .biz-button--outlined {
    background-color: transparent;
    color: var(--biz-button-bg-color);
    border-color: var(--biz-button-bg-color);
  }

  .biz-button--outlined:hover:not(:disabled) {
    background-color: rgba(37, 99, 235, 0.04);
  }

  .biz-button--outlined:active:not(:disabled) {
    background-color: rgba(37, 99, 235, 0.12);
  }

  .biz-button--text {
    background-color: transparent;
    color: var(--biz-button-bg-color);
    border-color: transparent;
  }

  .biz-button--text:hover:not(:disabled) {
    background-color: rgba(37, 99, 235, 0.04);
  }

  .biz-button--text:active:not(:disabled) {
    background-color: rgba(37, 99, 235, 0.12);
  }

  /* Focus & Focus-visible */
  .biz-button:focus-visible {
    box-shadow: 0 0 0 3px var(--biz-button-focus-ring-color);
  }

  /* Full Width */
  .biz-button--full-width {
    width: 100%;
  }

  /* Disabled State */
  .biz-button:disabled {
    background-color: var(--biz-button-disabled-bg-color);
    color: var(--biz-button-disabled-text-color);
    border-color: var(--biz-button-disabled-border-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  .biz-button--outlined:disabled,
  .biz-button--text:disabled {
    background-color: transparent;
    border-color: var(--biz-button-disabled-bg-color);
  }

  .biz-button--text:disabled {
    border-color: transparent;
  }

  /* Loading State */
  .biz-button--loading {
    cursor: wait;
  }

  .biz-button__spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1em;
    height: 1em;
    animation: biz-button-spin 1s linear infinite;
  }

  .biz-button__spinner svg {
    width: 100%;
    height: 100%;
  }

  @keyframes biz-button-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .biz-button__icon {
    display: inline-flex;
    align-items: center;
  }

  .biz-button__label {
    display: inline-flex;
    align-items: center;
  }
`;