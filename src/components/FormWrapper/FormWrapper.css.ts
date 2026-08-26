import { css } from 'lit';

export const formWrapperStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-form-wrapper-gap: 6px;
    --biz-form-wrapper-label-width: 120px;
    --biz-form-wrapper-label-margin-bottom: 4px;

    /* Typography */
    --biz-form-wrapper-label-font-size: 14px;
    --biz-form-wrapper-label-font-weight: 500;
    --biz-form-wrapper-message-font-size: 12px;

    /* Colors - Base */
    --biz-form-wrapper-label-color: #111827;
    --biz-form-wrapper-required-color: #dc2626;
    --biz-form-wrapper-helper-text-color: #6b7280;

    /* Colors - Validation States */
    --biz-form-wrapper-error-color: #dc2626;
    --biz-form-wrapper-success-color: #16a34a;

    /* Colors - Disabled */
    --biz-form-wrapper-disabled-opacity: 0.5;

    display: inline-block;
    box-sizing: border-box;
  }

  :host([full-width]),
  :host([layout='inline']) {
    display: block;
    width: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-form-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--biz-form-wrapper-gap);
    width: 100%;
  }

  .biz-form-wrapper--full-width {
    width: 100%;
  }

  /* Core Elements */
  .biz-form-wrapper__label-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .biz-form-wrapper__label {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    color: var(--biz-form-wrapper-label-color);
    font-size: var(--biz-form-wrapper-label-font-size);
    font-weight: var(--biz-form-wrapper-label-font-weight);
    cursor: pointer;
    user-select: none;
  }

  .biz-form-wrapper__required {
    color: var(--biz-form-wrapper-required-color);
    margin-left: 2px;
  }

  .biz-form-wrapper__extra {
    display: inline-flex;
    align-items: center;
  }

  .biz-form-wrapper__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .biz-form-wrapper__control {
    position: relative;
    width: 100%;
  }

  .biz-form-wrapper__message {
    font-size: var(--biz-form-wrapper-message-font-size);
    color: var(--biz-form-wrapper-helper-text-color);
    margin-top: 4px;
    min-height: 18px;
  }

  .biz-form-wrapper__message:empty {
    display: none;
  }

  /* Variants (Layout Modes) */
  .biz-form-wrapper--vertical {
    flex-direction: column;
  }

  .biz-form-wrapper--vertical .biz-form-wrapper__label-container {
    margin-bottom: var(--biz-form-wrapper-label-margin-bottom);
  }

  .biz-form-wrapper--horizontal {
    flex-direction: row;
    align-items: flex-start;
    gap: 12px;
  }

  .biz-form-wrapper--horizontal .biz-form-wrapper__label-container {
    width: var(--biz-form-wrapper-label-width);
    flex-shrink: 0;
    padding-top: 6px;
  }

  .biz-form-wrapper--horizontal .biz-form-wrapper__content {
    flex: 1;
  }

  .biz-form-wrapper--inline {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  .biz-form-wrapper--inline .biz-form-wrapper__label-container {
    width: var(--biz-form-wrapper-label-width);
    flex-shrink: 0;
  }

  .biz-form-wrapper--inline .biz-form-wrapper__content {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .biz-form-wrapper--inline .biz-form-wrapper__control {
    width: auto;
    flex: 1;
  }

  .biz-form-wrapper--inline .biz-form-wrapper__message {
    margin-top: 0;
    white-space: nowrap;
  }

  /* Sizes */
  .biz-form-wrapper--small {
    --biz-form-wrapper-label-font-size: 12px;
    --biz-form-wrapper-message-font-size: 11px;
    --biz-form-wrapper-gap: 4px;
  }

  .biz-form-wrapper--medium {
    --biz-form-wrapper-label-font-size: 14px;
    --biz-form-wrapper-message-font-size: 12px;
    --biz-form-wrapper-gap: 6px;
  }

  .biz-form-wrapper--large {
    --biz-form-wrapper-label-font-size: 16px;
    --biz-form-wrapper-message-font-size: 13px;
    --biz-form-wrapper-gap: 8px;
  }

  /* Validation & Interactive States */
  .biz-form-wrapper--error .biz-form-wrapper__message {
    color: var(--biz-form-wrapper-error-color);
  }

  .biz-form-wrapper--success .biz-form-wrapper__message {
    color: var(--biz-form-wrapper-success-color);
  }

  .biz-form-wrapper:focus-within .biz-form-wrapper__label {
    color: var(--biz-form-wrapper-label-color);
  }

  /* Disabled State */
  .biz-form-wrapper--disabled {
    opacity: var(--biz-form-wrapper-disabled-opacity);
    cursor: not-allowed;
  }

  .biz-form-wrapper--disabled .biz-form-wrapper__label {
    cursor: not-allowed;
  }
`;