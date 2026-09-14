import { css } from 'lit';

export const dblToggleButtonStyles = css`
  :host {
    display: inline-block;
    --biz-dbl-toggle-button-height-sm: 32px;
    --biz-dbl-toggle-button-height-md: 40px;
    --biz-dbl-toggle-button-height-lg: 48px;
    --biz-dbl-toggle-button-padding-x: 16px;
    --biz-dbl-toggle-button-border-radius: 6px;
    --biz-dbl-toggle-button-bg-color: #f3f4f6;
    --biz-dbl-toggle-button-border-color: #d1d5db;
    --biz-dbl-toggle-button-text-color: #4b5563;
    --biz-dbl-toggle-button-active-bg-color: #ffffff;
    --biz-dbl-toggle-button-active-text-color: #111827;
    --biz-dbl-toggle-button-active-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    --biz-dbl-toggle-button-hover-text-color: #111827;
    --biz-dbl-toggle-button-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-dbl-toggle-button-disabled-bg-color: #f9fafb;
    --biz-dbl-toggle-button-disabled-text-color: #9ca3af;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  .biz-dbl-toggle-button {
    display: inline-flex;
    background-color: var(--biz-dbl-toggle-button-bg-color);
    border-radius: var(--biz-dbl-toggle-button-border-radius);
    padding: 2px;
    box-sizing: border-box;
    position: relative;
    user-select: none;
    width: 100%;
  }

  .biz-dbl-toggle-button.full-width {
    display: flex;
    width: 100%;
  }

  /* Sizes */
  .biz-dbl-toggle-button.size-small {
    height: var(--biz-dbl-toggle-button-height-sm);
    font-size: 12px;
  }
  .biz-dbl-toggle-button.size-medium {
    height: var(--biz-dbl-toggle-button-height-md);
    font-size: 14px;
  }
  .biz-dbl-toggle-button.size-large {
    height: var(--biz-dbl-toggle-button-height-lg);
    font-size: 16px;
  }

  /* Segments */
  .segment {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: transparent;
    border: none;
    border-radius: calc(var(--biz-dbl-toggle-button-border-radius) - 2px);
    color: var(--biz-dbl-toggle-button-text-color);
    cursor: pointer;
    padding: 0 var(--biz-dbl-toggle-button-padding-x);
    transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
    font-family: inherit;
    font-size: inherit;
    font-weight: 500;
  }

  .segment:hover:not(:disabled) {
    color: var(--biz-dbl-toggle-button-hover-text-color);
  }

  .segment:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--biz-dbl-toggle-button-focus-ring-color);
  }

  .segment:active:not(:disabled) {
    transform: scale(0.98);
  }

  /* Selected State */
  .segment.selected {
    background-color: var(--biz-dbl-toggle-button-active-bg-color);
    color: var(--biz-dbl-toggle-button-active-text-color);
    box-shadow: var(--biz-dbl-toggle-button-active-shadow);
  }

  /* Variants */
  .biz-dbl-toggle-button.variant-outlined {
    background-color: transparent;
    border: 1px solid var(--biz-dbl-toggle-button-border-color);
  }
  .biz-dbl-toggle-button.variant-outlined .segment.selected {
    background-color: var(--biz-dbl-toggle-button-bg-color);
  }

  .biz-dbl-toggle-button.variant-standard {
    background-color: transparent;
    border-radius: 0;
    border-bottom: 2px solid var(--biz-dbl-toggle-button-border-color);
    padding: 0;
  }
  .biz-dbl-toggle-button.variant-standard .segment {
    border-radius: 0;
  }
  .biz-dbl-toggle-button.variant-standard .segment.selected {
    background-color: transparent;
    border-bottom: 2px solid var(--biz-dbl-toggle-button-active-text-color);
    box-shadow: none;
  }

  /* Disabled & Readonly */
  :host([disabled]) .biz-dbl-toggle-button,
  .segment:disabled {
    background-color: var(--biz-dbl-toggle-button-disabled-bg-color);
    color: var(--biz-dbl-toggle-button-disabled-text-color);
    cursor: not-allowed;
    box-shadow: none;
  }

  :host([readonly]) .segment {
    cursor: default;
    pointer-events: none;
  }
`;