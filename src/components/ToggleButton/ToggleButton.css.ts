import { css } from 'lit';

export const toggleButtonStyles = css`
  :host {
    --biz-toggle-button-height-sm: 28px;
    --biz-toggle-button-height-md: 36px;
    --biz-toggle-button-height-lg: 44px;
    --biz-toggle-button-padding-x-sm: 8px;
    --biz-toggle-button-padding-x-md: 12px;
    --biz-toggle-button-padding-x-lg: 16px;
    --biz-toggle-button-padding-y: 6px;
    --biz-toggle-button-border-radius: 4px;

    --biz-toggle-button-bg-color: #ffffff;
    --biz-toggle-button-border-color: #d1d5db;
    --biz-toggle-button-text-color: #374151;

    --biz-toggle-button-pressed-bg-color: #eff6ff;
    --biz-toggle-button-pressed-border-color: #2563eb;
    --biz-toggle-button-pressed-text-color: #2563eb;

    --biz-toggle-button-hover-bg-color: #f3f4f6;
    --biz-toggle-button-focus-ring-color: rgba(37, 99, 235, 0.2);

    --biz-toggle-button-disabled-bg-color: #f3f4f6;
    --biz-toggle-button-disabled-border-color: #e5e7eb;
    --biz-toggle-button-disabled-text-color: #9ca3af;

    display: inline-block;
    box-sizing: border-box;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  .biz-toggle-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: 1px;
    border-radius: var(--biz-toggle-button-border-radius);
    font-family: inherit;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
    outline: none;
    user-select: none;
  }

  :host([size='small']) .biz-toggle-button {
    height: var(--biz-toggle-button-height-sm);
    padding: var(--biz-toggle-button-padding-y) var(--biz-toggle-button-padding-x-sm);
    font-size: 12px;
  }

  :host([size='medium']) .biz-toggle-button,
  .biz-toggle-button {
    height: var(--biz-toggle-button-height-md);
    padding: var(--biz-toggle-button-padding-y) var(--biz-toggle-button-padding-x-md);
    font-size: 14px;
  }

  :host([size='large']) .biz-toggle-button {
    height: var(--biz-toggle-button-height-lg);
    padding: var(--biz-toggle-button-padding-y) var(--biz-toggle-button-padding-x-lg);
    font-size: 16px;
  }

  :host([variant='standard']) .biz-toggle-button {
    background-color: transparent;
    border-color: transparent;
    color: var(--biz-toggle-button-text-color);
  }

  :host([variant='standard']) .biz-toggle-button:hover:not(:disabled) {
    background-color: var(--biz-toggle-button-hover-bg-color);
  }

  :host([variant='standard'][pressed]) .biz-toggle-button {
    background-color: var(--biz-toggle-button-pressed-bg-color);
    border-color: transparent;
    color: var(--biz-toggle-button-pressed-text-color);
  }

  :host([variant='outlined']) .biz-toggle-button,
  .biz-toggle-button {
    background-color: var(--biz-toggle-button-bg-color);
    border-color: var(--biz-toggle-button-border-color);
    color: var(--biz-toggle-button-text-color);
  }

  :host([variant='outlined']) .biz-toggle-button:hover:not(:disabled),
  .biz-toggle-button:hover:not(:disabled) {
    background-color: var(--biz-toggle-button-hover-bg-color);
  }

  :host([variant='outlined'][pressed]) .biz-toggle-button,
  :host([pressed]) .biz-toggle-button {
    background-color: var(--biz-toggle-button-pressed-bg-color);
    border-color: var(--biz-toggle-button-pressed-border-color);
    color: var(--biz-toggle-button-pressed-text-color);
  }

  :host([variant='contained']) .biz-toggle-button {
    background-color: var(--biz-toggle-button-hover-bg-color);
    border-color: transparent;
    color: var(--biz-toggle-button-text-color);
  }

  :host([variant='contained']) .biz-toggle-button:hover:not(:disabled) {
    background-color: var(--biz-toggle-button-border-color);
  }

  :host([variant='contained'][pressed]) .biz-toggle-button {
    background-color: var(--biz-toggle-button-pressed-border-color);
    border-color: var(--biz-toggle-button-pressed-border-color);
    color: #ffffff;
  }

  .biz-toggle-button:focus-visible {
    box-shadow: 0 0 0 3px var(--biz-toggle-button-focus-ring-color);
  }

  .biz-toggle-button:disabled {
    background-color: var(--biz-toggle-button-disabled-bg-color);
    border-color: var(--biz-toggle-button-disabled-border-color);
    color: var(--biz-toggle-button-disabled-text-color);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .slot-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;