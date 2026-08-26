import { css } from "lit";

export const inlineEditWrapperStyles = css`
  :host {
    --biz-inline-edit-wrapper-min-height-sm: var(--ui-inline-edit-min-height-sm, 32px);
    --biz-inline-edit-wrapper-min-height-md: var(--ui-inline-edit-min-height-md, 40px);
    --biz-inline-edit-wrapper-min-height-lg: var(--ui-inline-edit-min-height-lg, 48px);
    --biz-inline-edit-wrapper-padding-x: var(--ui-inline-edit-padding-x, 8px);
    --biz-inline-edit-wrapper-padding-y: var(--ui-inline-edit-padding-y, 4px);
    --biz-inline-edit-wrapper-border-radius: var(--ui-inline-edit-border-radius, 4px);

    --biz-inline-edit-wrapper-view-text-color: var(--ui-inline-edit-view-text-color, #111827);
    --biz-inline-edit-wrapper-view-hover-bg: var(--ui-inline-edit-view-hover-bg, #f3f4f6);
    --biz-inline-edit-wrapper-edit-bg: var(--ui-inline-edit-edit-bg, #ffffff);
    --biz-inline-edit-wrapper-border-color: var(--ui-inline-edit-border-color, #d1d5db);

    --biz-inline-edit-wrapper-focus-border-color: var(--ui-inline-edit-focus-border-color, #2563eb);
    --biz-inline-edit-wrapper-focus-ring-color: var(--ui-inline-edit-focus-ring-color, rgba(37, 99, 235, 0.2));

    --biz-inline-edit-wrapper-error-color: var(--ui-inline-edit-error-color, #dc2626);
    --biz-inline-edit-wrapper-disabled-text-color: var(--ui-inline-edit-disabled-text-color, #9ca3af);

    display: inline-block;
    box-sizing: border-box;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  :host([full-width]) .biz-inline-edit-wrapper,
.biz-inline-edit-wrapper--full-width {
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .biz-inline-edit-wrapper {
    display: inline-flex;
    align-items: center;
    width: 100%;
    min-height: var(--biz-inline-edit-wrapper-min-height-md);
    border-radius: var(--biz-inline-edit-wrapper-border-radius);
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  /* Sizes */
  .biz-inline-edit-wrapper--small {
    min-height: var(--biz-inline-edit-wrapper-min-height-sm);
    font-size: 0.875rem;
  }

  .biz-inline-edit-wrapper--medium {
    min-height: var(--biz-inline-edit-wrapper-min-height-md);
    font-size: 1rem;
  }

  .biz-inline-edit-wrapper--large {
    min-height: var(--biz-inline-edit-wrapper-min-height-lg);
    font-size: 1.125rem;
  }

  /* View Mode Base */
  .biz-inline-edit-wrapper__view {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: var(--biz-inline-edit-wrapper-padding-y) var(--biz-inline-edit-wrapper-padding-x);
    border-radius: var(--biz-inline-edit-wrapper-border-radius);
    color: var(--biz-inline-edit-wrapper-view-text-color);
    cursor: pointer;
    user-select: none;
    outline: none;
    border: 1px solid transparent;
  }

  .biz-inline-edit-wrapper__edit-icon {
    display: inline-flex;
    align-items: center;
    opacity: 0;
    margin-left: 8px;
    transition: opacity 0.2s ease;
  }

  /* Variants */
  .biz-inline-edit-wrapper--standard .biz-inline-edit-wrapper__view:hover {
    background-color: var(--biz-inline-edit-wrapper-view-hover-bg);
  }

  .biz-inline-edit-wrapper--standard .biz-inline-edit-wrapper__view:hover .biz-inline-edit-wrapper__edit-icon {
    opacity: 1;
  }

  .biz-inline-edit-wrapper--outlined .biz-inline-edit-wrapper__view {
    border-color: var(--biz-inline-edit-wrapper-border-color);
  }

  .biz-inline-edit-wrapper--outlined .biz-inline-edit-wrapper__view:hover {
    background-color: var(--biz-inline-edit-wrapper-view-hover-bg);
  }

  .biz-inline-edit-wrapper--outlined .biz-inline-edit-wrapper__view:hover .biz-inline-edit-wrapper__edit-icon {
    opacity: 1;
  }

  .biz-inline-edit-wrapper--ghost .biz-inline-edit-wrapper__view {
    padding-left: 0;
    padding-right: 0;
  }

  .biz-inline-edit-wrapper--ghost .biz-inline-edit-wrapper__view:hover .biz-inline-edit-wrapper__edit-icon {
    opacity: 1;
  }

  /* Edit Mode Base */
  .biz-inline-edit-wrapper__edit {
    display: inline-flex;
    align-items: center;
    width: 100%;
    gap: 8px;
    position: relative;
  }

  .biz-inline-edit-wrapper__control {
    flex: 1;
  }

  .biz-inline-edit-wrapper__actions {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .biz-inline-edit-wrapper__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border: 1px solid var(--biz-inline-edit-wrapper-border-color);
    border-radius: var(--biz-inline-edit-wrapper-border-radius);
    background-color: #ffffff;
    cursor: pointer;
    font-size: 0.875rem;
    line-height: 1;
  }

  .biz-inline-edit-wrapper__btn:hover {
    background-color: var(--biz-inline-edit-wrapper-view-hover-bg);
  }

  .biz-inline-edit-wrapper__btn--save {
    color: #059669;
    border-color: #10b981;
  }

  .biz-inline-edit-wrapper__btn--cancel {
    color: var(--biz-inline-edit-wrapper-error-color);
    border-color: var(--biz-inline-edit-wrapper-error-color);
  }

  /* States */
  .biz-inline-edit-wrapper__view:focus-visible {
    border-color: var(--biz-inline-edit-wrapper-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-inline-edit-wrapper-focus-ring-color);
  }

  .biz-inline-edit-wrapper--error .biz-inline-edit-wrapper__view,
  .biz-inline-edit-wrapper--error .biz-inline-edit-wrapper__control {
    border-color: var(--biz-inline-edit-wrapper-error-color);
  }

  .biz-inline-edit-wrapper--disabled {
    opacity: 0.6;
    pointer-events: none;
  }

  .biz-inline-edit-wrapper--disabled .biz-inline-edit-wrapper__view {
    color: var(--biz-inline-edit-wrapper-disabled-text-color);
    cursor: not-allowed;
  }

  .biz-inline-edit-wrapper__placeholder {
    color: var(--biz-inline-edit-wrapper-disabled-text-color);
    font-style: italic;
  }

  /* Spinner for Loading State */
  .biz-inline-edit-wrapper__spinner {
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