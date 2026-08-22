import { css } from 'lit';

export const toggleButtonStyles = css`
  :host {
    /* Design Tokens - Biz-UI Toggle Button */
    --biz-toggle-button-width-sm: 40px;
    --biz-toggle-button-height-sm: 24px;
    --biz-toggle-button-thumb-sm: 18px;

    --biz-toggle-button-width-md: 52px;
    --biz-toggle-button-height-md: 32px;
    --biz-toggle-button-thumb-md: 24px;

    --biz-toggle-button-width-lg: 64px;
    --biz-toggle-button-height-lg: 40px;
    --biz-toggle-button-thumb-lg: 30px;

    --biz-toggle-button-bg-off: #e5e7eb;
    --biz-toggle-button-bg-on: #2563eb;
    --biz-toggle-button-thumb-color: #ffffff;
    --biz-toggle-button-border-color: #d1d5db;
    
    --biz-toggle-button-disabled-opacity: 0.5;
    --biz-toggle-button-transition-duration: 0.2s;
    --biz-toggle-button-focus-ring: rgba(37, 99, 235, 0.2);

    display: inline-block;
    font-family: inherit;
    user-select: none;
  }

  .biz-toggle-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    outline: none;
    transition: opacity var(--biz-toggle-button-transition-duration) ease;
  }

  /* Layout Positions */
  .biz-toggle-button.label-left {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  .biz-toggle-button.label-right {
    flex-direction: row;
  }

  /* Sizes */
  .biz-toggle-button.size-small .biz-toggle-button__switch-track {
    width: var(--biz-toggle-button-width-sm);
    height: var(--biz-toggle-button-height-sm);
  }
  .biz-toggle-button.size-small .biz-toggle-button__thumb {
    width: var(--biz-toggle-button-thumb-sm);
    height: var(--biz-toggle-button-thumb-sm);
  }

  .biz-toggle-button.size-medium .biz-toggle-button__switch-track {
    width: var(--biz-toggle-button-width-md);
    height: var(--biz-toggle-button-height-md);
  }
  .biz-toggle-button.size-medium .biz-toggle-button__thumb {
    width: var(--biz-toggle-button-thumb-md);
    height: var(--biz-toggle-button-thumb-md);
  }

  .biz-toggle-button.size-large .biz-toggle-button__switch-track {
    width: var(--biz-toggle-button-width-lg);
    height: var(--biz-toggle-button-height-lg);
  }
  .biz-toggle-button.size-large .biz-toggle-button__thumb {
    width: var(--biz-toggle-button-thumb-lg);
    height: var(--biz-toggle-button-thumb-lg);
  }

  /* Variants */
  .biz-toggle-button.variant-standard .biz-toggle-button__switch-track {
    background-color: var(--biz-toggle-button-bg-off);
    border-radius: 9999px;
  }
  .biz-toggle-button.variant-standard.checked .biz-toggle-button__switch-track {
    background-color: var(--biz-toggle-button-bg-on);
  }

  .biz-toggle-button.variant-filled .biz-toggle-button__switch-track {
    background-color: var(--biz-toggle-button-bg-off);
    border-radius: 9999px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  }
  .biz-toggle-button.variant-filled.checked .biz-toggle-button__switch-track {
    background-color: var(--biz-toggle-button-bg-on);
  }

  .biz-toggle-button.variant-outlined .biz-toggle-button__switch-track {
    background-color: transparent;
    border: 2px solid var(--biz-toggle-button-border-color);
    border-radius: 9999px;
  }
  .biz-toggle-button.variant-outlined.checked .biz-toggle-button__switch-track {
    background-color: var(--biz-toggle-button-bg-on);
    border-color: var(--biz-toggle-button-bg-on);
  }

  /* Switch Track & Thumb */
  .biz-toggle-button__switch-track {
    position: relative;
    display: flex;
    align-items: center;
    padding: 2px;
    transition: background-color var(--biz-toggle-button-transition-duration) ease, border-color var(--biz-toggle-button-transition-duration) ease;
  }

  .biz-toggle-button__thumb {
    position: absolute;
    left: 2px;
    background-color: var(--biz-toggle-button-thumb-color);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform var(--biz-toggle-button-transition-duration) ease;
  }

  .biz-toggle-button.checked .biz-toggle-button__thumb {
    transform: translateX(calc(100% + 4px));
  }

  /* States: Hover, Focus, Active, Disabled, Readonly */
  .biz-toggle-button:hover:not(.disabled):not(.readonly) {
    opacity: 0.9;
  }

  .biz-toggle-button:focus-visible {
    box-shadow: 0 0 0 3px var(--biz-toggle-button-focus-ring);
    border-radius: 4px;
  }

  .biz-toggle-button:active:not(.disabled):not(.readonly) .biz-toggle-button__thumb {
    transform: scale(0.95);
  }

  .biz-toggle-button.disabled {
    opacity: var(--biz-toggle-button-disabled-opacity);
    cursor: not-allowed;
  }

  .biz-toggle-button.readonly {
    cursor: default;
  }

  /* Slots Container */
  .biz-toggle-button__text-on,
  .biz-toggle-button__text-off {
    display: none;
  }
`;