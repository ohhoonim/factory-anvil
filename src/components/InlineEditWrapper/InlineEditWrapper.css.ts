import { css } from 'lit';

export const inlineEditWrapperStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-inline-edit-wrapper-min-height-sm: 32px;
    --biz-inline-edit-wrapper-min-height-md: 40px;
    --biz-inline-edit-wrapper-min-height-lg: 48px;
    --biz-inline-edit-wrapper-padding-x: 8px;
    --biz-inline-edit-wrapper-padding-y: 4px;
    --biz-inline-edit-wrapper-border-radius: 4px;

    /* Colors - Base */
    --biz-inline-edit-wrapper-view-text-color: #111827;
    --biz-inline-edit-wrapper-view-hover-bg: #f3f4f6;
    --biz-inline-edit-wrapper-edit-bg: #ffffff;
    --biz-inline-edit-wrapper-border-color: #d1d5db;

    /* Colors - Interactive States */
    --biz-inline-edit-wrapper-focus-border-color: #2563eb;
    --biz-inline-edit-wrapper-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-inline-edit-wrapper-error-color: #dc2626;
    --biz-inline-edit-wrapper-disabled-text-color: #9ca3af;
    --biz-inline-edit-wrapper-disabled-bg: #f9fafb;

    display: inline-block;
    box-sizing: border-box;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  .biz-inline-edit-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    border-radius: var(--biz-inline-edit-wrapper-border-radius);
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  /* Sizes */
  .biz-inline-edit-wrapper--small {
    min-height: var(--biz-inline-edit-wrapper-min-height-sm);
    font-size: 14px;
  }

  .biz-inline-edit-wrapper--medium {
    min-height: var(--biz-inline-edit-wrapper-min-height-md);
    font-size: 16px;
  }

  .biz-inline-edit-wrapper--large {
    min-height: var(--biz-inline-edit-wrapper-min-height-lg);
    font-size: 18px;
  }

  /* Variants */
  .biz-inline-edit-wrapper--standard {
    border: 1px solid transparent;
  }

  .biz-inline-edit-wrapper--standard.biz-inline-edit-wrapper--view:hover {
    background-color: var(--biz-inline-edit-wrapper-view-hover-bg);
  }

  .biz-inline-edit-wrapper--outlined {
    border: 1px solid var(--biz-inline-edit-wrapper-border-color);
  }

  .biz-inline-edit-wrapper--outlined.biz-inline-edit-wrapper--view:hover {
    background-color: var(--biz-inline-edit-wrapper-view-hover-bg);
  }

  .biz-inline-edit-wrapper--ghost {
    border: 1px dashed var(--biz-inline-edit-wrapper-border-color);
    background-color: transparent;
  }

  .biz-inline-edit-wrapper--ghost.biz-inline-edit-wrapper--view:hover {
    border-style: solid;
    background-color: var(--biz-inline-edit-wrapper-view-hover-bg);
  }

  /* View & Edit Container Layout */
  .biz-inline-edit-wrapper__view {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: var(--biz-inline-edit-wrapper-padding-y) var(--biz-inline-edit-wrapper-padding-x);
    color: var(--biz-inline-edit-wrapper-view-text-color);
    cursor: pointer;
    box-sizing: border-box;
    outline: none;
    border-radius: var(--biz-inline-edit-wrapper-border-radius);
  }

  .biz-inline-edit-wrapper__view:focus-visible {
    border-color: var(--biz-inline-edit-wrapper-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-inline-edit-wrapper-focus-ring-color);
  }

  .biz-inline-edit-wrapper__edit {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: var(--biz-inline-edit-wrapper-padding-y) var(--biz-inline-edit-wrapper-padding-x);
    background-color: var(--biz-inline-edit-wrapper-edit-bg);
    box-sizing: border-box;
    border-radius: var(--biz-inline-edit-wrapper-border-radius);
  }

  .biz-inline-edit-wrapper__control {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .biz-inline-edit-wrapper__actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Placeholder */
  .biz-inline-edit-wrapper__placeholder {
    color: var(--biz-inline-edit-wrapper-disabled-text-color);
    font-style: italic;
  }

  /* Buttons */
  .biz-inline-edit-wrapper__btn {
    padding: 4px 8px;
    font-size: 12px;
    border-radius: var(--biz-inline-edit-wrapper-border-radius);
    border: 1px solid var(--biz-inline-edit-wrapper-border-color);
    cursor: pointer;
    background-color: #ffffff;
  }

  .biz-inline-edit-wrapper__btn--save {
    background-color: var(--biz-inline-edit-wrapper-focus-border-color);
    color: #ffffff;
    border-color: var(--biz-inline-edit-wrapper-focus-border-color);
  }

  /* States */
  .biz-inline-edit-wrapper--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: var(--biz-inline-edit-wrapper-disabled-bg);
  }

  .biz-inline-edit-wrapper--disabled .biz-inline-edit-wrapper__view {
    cursor: not-allowed;
    color: var(--biz-inline-edit-wrapper-disabled-text-color);
  }

  .biz-inline-edit-wrapper--error {
    border-color: var(--biz-inline-edit-wrapper-error-color) !important;
  }

  .biz-inline-edit-wrapper--loading {
    pointer-events: none;
    opacity: 0.8;
  }

  .biz-inline-edit-wrapper__spinner {
    position: absolute;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .biz-inline-edit-wrapper__spinner-icon {
    width: 16px;
    height: 16px;
    border: 2px solid var(--biz-inline-edit-wrapper-border-color);
    border-top-color: var(--biz-inline-edit-wrapper-focus-border-color);
    border-radius: 50%;
    animation: biz-inline-edit-spin 0.8s linear infinite;
  }

  @keyframes biz-inline-edit-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;