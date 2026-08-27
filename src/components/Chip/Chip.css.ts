import { css } from 'lit';

export const chipStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-chip-container-min-height-sm: var(--ui-chip-container-min-height-sm, 32px);
    --biz-chip-container-min-height-md: var(--ui-chip-container-min-height-md, 40px);
    --biz-chip-container-min-height-lg: var(--ui-chip-container-min-height-lg, 48px);
    --biz-chip-container-padding-x: var(--ui-chip-container-padding-x, 8px);
    --biz-chip-container-padding-y: var(--ui-chip-container-padding-y, 4px);
    --biz-chip-gap: var(--ui-chip-gap, 6px);
    --biz-chip-border-radius: var(--ui-chip-border-radius, 4px);

    /* Individual Chip Styling Tokens */
    --biz-chip-item-bg-color: var(--ui-chip-item-bg-color, #e5e7eb);
    --biz-chip-item-text-color: var(--ui-chip-item-text-color, #111827);
    --biz-chip-item-height: var(--ui-chip-item-height, 24px);
    --biz-chip-item-border-radius: var(--ui-chip-item-border-radius, 12px);

    /* Base Color Tokens */
    --biz-chip-bg-color: var(--ui-chip-bg-color, #ffffff);
    --biz-chip-border-color: var(--ui-chip-border-color, #d1d5db);
    --biz-chip-text-color: var(--ui-chip-text-color, #111827);
    --biz-chip-placeholder-color: var(--ui-chip-placeholder-color, #9ca3af);

    /* Interactive Tokens */
    --biz-chip-hover-border-color: var(--ui-chip-hover-border-color, #9ca3af);
    --biz-chip-focus-border-color: var(--ui-chip-focus-border-color, #2563eb);
    --biz-chip-focus-ring-color: var(--ui-chip-focus-ring-color, rgba(37, 99, 235, 0.2));

    /* State Tokens */
    --biz-chip-error-color: var(--ui-chip-error-color, #dc2626);
    --biz-chip-disabled-bg-color: var(--ui-chip-disabled-bg-color, #f3f4f6);
    --biz-chip-disabled-text-color: var(--ui-chip-disabled-text-color, #9ca3af);

    display: inline-block;
    box-sizing: border-box;
    font-family: inherit;
  }

  :host([full-width]),
  .biz-chip.full-width {
    display: block;
    width: 100%;
  }

  .biz-chip {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
  }

  .biz-chip__wrapper {
    display: flex;
    align-items: center;
    background-color: var(--biz-chip-bg-color);
    border: 1px solid var(--biz-chip-border-color);
    border-radius: var(--biz-chip-border-radius);
    padding: var(--biz-chip-container-padding-y) var(--biz-chip-container-padding-x);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  .biz-chip__wrapper:hover:not(.disabled) {
    border-color: var(--biz-chip-hover-border-color);
  }

  .biz-chip__wrapper:focus-within:not(.disabled) {
    border-color: var(--biz-chip-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-chip-focus-ring-color);
  }

  .biz-chip__container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--biz-chip-gap);
    flex: 1;
    width: 100%;
  }

  /* Variants */
  .biz-chip.outlined .biz-chip__wrapper {
    background-color: var(--biz-chip-bg-color);
    border: 1px solid var(--biz-chip-border-color);
  }

  .biz-chip.filled .biz-chip__wrapper {
    background-color: var(--biz-chip-disabled-bg-color);
    border: 1px solid transparent;
  }

  .biz-chip.standard .biz-chip__wrapper {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid var(--biz-chip-border-color);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Sizes */
  .biz-chip.small .biz-chip__wrapper {
    min-height: var(--biz-chip-container-min-height-sm);
    font-size: 0.875rem;
  }

  .biz-chip.medium .biz-chip__wrapper {
    min-height: var(--biz-chip-container-min-height-md);
    font-size: 1rem;
  }

  .biz-chip.large .biz-chip__wrapper {
    min-height: var(--biz-chip-container-min-height-lg);
    font-size: 1.125rem;
  }

  /* Chip Item Styles */
  .biz-chip__item {
    display: inline-flex;
    align-items: center;
    height: var(--biz-chip-item-height);
    background-color: var(--biz-chip-item-bg-color);
    color: var(--biz-chip-item-text-color);
    border-radius: var(--biz-chip-item-border-radius);
    padding: 0 8px;
    font-size: 0.875rem;
    line-height: 1;
    user-select: none;
    outline: none;
  }

  .biz-chip__item:focus-visible,
  .biz-chip__item.focused {
    box-shadow: 0 0 0 2px var(--biz-chip-focus-border-color);
  }

  .biz-chip__item-delete {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: currentColor;
    margin-left: 4px;
    padding: 0;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1;
    opacity: 0.7;
  }

  .biz-chip__item-delete:hover {
    opacity: 1;
  }

  /* Input Field */
  .biz-chip__input {
    flex: 1;
    min-width: 80px;
    border: none;
    outline: none;
    background: transparent;
    color: var(--biz-chip-text-color);
    font-family: inherit;
    font-size: inherit;
    padding: 2px 0;
  }

  .biz-chip__input::placeholder {
    color: var(--biz-chip-placeholder-color);
  }

  /* States */
  .biz-chip.error .biz-chip__wrapper {
    border-color: var(--biz-chip-error-color) !important;
  }

  .biz-chip.disabled .biz-chip__wrapper {
    background-color: var(--biz-chip-disabled-bg-color);
    border-color: var(--biz-chip-border-color);
    opacity: 0.6;
    cursor: not-allowed;
  }

  .biz-chip.disabled .biz-chip__input {
    cursor: not-allowed;
  }

  .biz-chip.readonly .biz-chip__wrapper {
    background-color: var(--biz-chip-disabled-bg-color);
  }

  /* Accessibility Screen Reader Only */
  .biz-chip__sr-only {
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