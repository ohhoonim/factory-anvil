import { css } from 'lit';

export const formWrapperStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    --biz-form-wrapper-gap: 6px;
    --biz-form-wrapper-label-width: 120px;
    --biz-form-wrapper-label-margin-bottom: 4px;

    --biz-form-wrapper-label-color: #111827;
    --biz-form-wrapper-required-color: #dc2626;
    --biz-form-wrapper-helper-text-color: #6b7280;

    --biz-form-wrapper-error-color: #dc2626;
    --biz-form-wrapper-success-color: #16a34a;

    --biz-form-wrapper-disabled-opacity: 0.5;

    --biz-form-wrapper-font-size-sm: 12px;
    --biz-form-wrapper-font-size-md: 14px;
    --biz-form-wrapper-font-size-lg: 16px;
  }

  :host([full-width]),
  .biz-form-wrapper--full-width {
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

  .biz-form-wrapper--vertical {
    flex-direction: column;
  }

  .biz-form-wrapper--horizontal {
    flex-direction: row;
    align-items: flex-start;
  }

  .biz-form-wrapper--horizontal .biz-form-wrapper__label-area {
    width: var(--biz-form-wrapper-label-width);
    flex-shrink: 0;
    margin-bottom: 0;
    padding-top: 6px;
  }

  .biz-form-wrapper--horizontal .biz-form-wrapper__control-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .biz-form-wrapper--inline {
    flex-direction: row;
    align-items: center;
    gap: var(--biz-form-wrapper-gap);
  }

  .biz-form-wrapper--inline .biz-form-wrapper__control-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--biz-form-wrapper-gap);
  }

  .biz-form-wrapper--inline .biz-form-wrapper__message-area {
    margin-top: 0;
  }

  .biz-form-wrapper__label-area {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--biz-form-wrapper-label-margin-bottom);
  }

  .biz-form-wrapper__label {
    font-size: var(--biz-form-wrapper-font-size-md);
    font-weight: 500;
    color: var(--biz-form-wrapper-label-color);
    cursor: pointer;
  }

  .biz-form-wrapper__required {
    color: var(--biz-form-wrapper-required-color);
    margin-left: 2px;
  }

  .biz-form-wrapper__input-area {
    position: relative;
    width: 100%;
  }

  .biz-form-wrapper__message-area {
    margin-top: 4px;
    font-size: var(--biz-form-wrapper-font-size-sm);
    color: var(--biz-form-wrapper-helper-text-color);
  }

  .biz-form-wrapper--error .biz-form-wrapper__message-area {
    color: var(--biz-form-wrapper-error-color);
  }

  .biz-form-wrapper--success .biz-form-wrapper__message-area {
    color: var(--biz-form-wrapper-success-color);
  }

  .biz-form-wrapper--disabled {
    opacity: var(--biz-form-wrapper-disabled-opacity);
    pointer-events: none;
  }

  .biz-form-wrapper--disabled .biz-form-wrapper__label {
    cursor: not-allowed;
  }

  .biz-form-wrapper--small {
    font-size: var(--biz-form-wrapper-font-size-sm);
  }

  .biz-form-wrapper--medium {
    font-size: var(--biz-form-wrapper-font-size-md);
  }

  .biz-form-wrapper--large {
    font-size: var(--biz-form-wrapper-font-size-lg);
  }
`;