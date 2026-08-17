import { css } from "lit";

export const radioButtonGroupStyles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    width: auto;
    box-sizing: border-box;
    --biz-radio-button-group-gap-sm: 8px;
    --biz-radio-button-group-gap-md: 12px;
    --biz-radio-button-group-gap-lg: 16px;
    --biz-radio-button-group-label-margin-bottom: 8px;
    --biz-radio-button-group-label-color: #111827;
    --biz-radio-button-group-helper-text-color: #6b7280;
    --biz-radio-button-group-error-color: #dc2626;
    --biz-radio-button-group-disabled-opacity: 0.5;
  }

  :host([full-width]) {
    display: flex;
    width: 100%;
  }

  .biz-radio-button-group {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
  }

  .biz-radio-button-group__label {
    display: block;
    margin-bottom: var(--biz-radio-button-group-label-margin-bottom);
    color: var(--biz-radio-button-group-label-color);
    font-weight: 600;
  }

  .biz-radio-button-group__items {
    display: flex;
    gap: var(--biz-radio-button-group-gap-md);
  }

  .biz-radio-button-group.vertical .biz-radio-button-group__items {
    flex-direction: column;
  }

  .biz-radio-button-group.horizontal .biz-radio-button-group__items {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .biz-radio-button-group.small .biz-radio-button-group__items {
    gap: var(--biz-radio-button-group-gap-sm);
    font-size: 0.875rem;
  }

  .biz-radio-button-group.medium .biz-radio-button-group__items {
    gap: var(--biz-radio-button-group-gap-md);
    font-size: 1rem;
  }

  .biz-radio-button-group.large .biz-radio-button-group__items {
    gap: var(--biz-radio-button-group-gap-lg);
    font-size: 1.125rem;
  }

  .biz-radio-button-group.standard {
    background-color: transparent;
  }

  .biz-radio-button-group.card {
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background-color: #ffffff;
  }

  .biz-radio-button-group.button {
    display: inline-flex;
    padding: 4px;
    background-color: #f3f4f6;
    border-radius: 8px;
  }

  .biz-radio-button-group.outlined {
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 8px;
  }

  .biz-radio-button-group.filled {
    background-color: #f9fafb;
    border-radius: 6px;
    padding: 8px;
  }

  .biz-radio-button-group:hover {
    color: var(--biz-radio-button-group-label-color);
  }

  .biz-radio-button-group:focus-within {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  .biz-radio-button-group.disabled {
    opacity: var(--biz-radio-button-group-disabled-opacity);
    cursor: not-allowed;
    pointer-events: none;
  }

  .biz-radio-button-group.readonly {
    cursor: default;
  }

  .biz-radio-button-group.error .biz-radio-button-group__label {
    color: var(--biz-radio-button-group-error-color);
  }

  .biz-radio-button-group.error .biz-radio-button-group__helper-text {
    color: var(--biz-radio-button-group-error-color);
  }

  .biz-radio-button-group.loading {
    opacity: 0.7;
    pointer-events: none;
  }

  .biz-radio-button-group__helper-text {
    margin-top: 4px;
    font-size: 0.75rem;
    color: var(--biz-radio-button-group-helper-text-color);
  }
`;