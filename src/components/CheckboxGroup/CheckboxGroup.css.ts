import { css } from 'lit';

export const checkboxGroupStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    /* Design Tokens */
    --biz-checkbox-group-gap-sm: 8px;
    --biz-checkbox-group-gap-md: 12px;
    --biz-checkbox-group-gap-lg: 16px;
    --biz-checkbox-group-label-margin-bottom: 8px;

    --biz-checkbox-group-label-color: #111827;
    --biz-checkbox-group-helper-text-color: #6b7280;
    --biz-checkbox-group-error-color: #dc2626;
    --biz-checkbox-group-disabled-opacity: 0.5;

    --biz-checkbox-group-focus-ring-color: #2563eb;
    --biz-checkbox-group-border-color: #d1d5db;
    --biz-checkbox-group-bg: transparent;
  }

  :host([full-width]),
  .biz-checkbox-group--full-width {
    width: 100%;
    display: block;
  }

  .biz-checkbox-group {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
  }

  /* Label & Helper Styles */
  .biz-checkbox-group__label {
    color: var(--biz-checkbox-group-label-color);
    margin-bottom: var(--biz-checkbox-group-label-margin-bottom);
    font-weight: 600;
  }

  .biz-checkbox-group__helper-text {
    margin-top: 6px;
    font-size: 0.875rem;
    color: var(--biz-checkbox-group-helper-text-color);
  }

  /* Container & Orientation */
  .biz-checkbox-group__container {
    display: flex;
    box-sizing: border-box;
  }

  .biz-checkbox-group--vertical .biz-checkbox-group__container {
    flex-direction: column;
  }

  .biz-checkbox-group--horizontal .biz-checkbox-group__container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  /* Sizes */
  .biz-checkbox-group--small .biz-checkbox-group__container {
    gap: var(--biz-checkbox-group-gap-sm);
  }

  .biz-checkbox-group--small .biz-checkbox-group__label {
    font-size: 0.875rem;
  }

  .biz-checkbox-group--medium .biz-checkbox-group__container {
    gap: var(--biz-checkbox-group-gap-md);
  }

  .biz-checkbox-group--medium .biz-checkbox-group__label {
    font-size: 1rem;
  }

  .biz-checkbox-group--large .biz-checkbox-group__container {
    gap: var(--biz-checkbox-group-gap-lg);
  }

  .biz-checkbox-group--large .biz-checkbox-group__label {
    font-size: 1.125rem;
  }

  /* Variants */
  .biz-checkbox-group--standard {
    /* Standard Layout */
  }

  .biz-checkbox-group--card .biz-checkbox-group__container {
    padding: 4px;
  }

  .biz-checkbox-group--button .biz-checkbox-group__container {
    display: inline-flex;
    border-radius: 6px;
    background-color: #f3f4f6;
    padding: 2px;
  }

  /* States */
  .biz-checkbox-group--disabled {
    opacity: var(--biz-checkbox-group-disabled-opacity);
    cursor: not-allowed;
    pointer-events: none;
  }

  .biz-checkbox-group--readonly {
    pointer-events: none;
  }

  .biz-checkbox-group--error .biz-checkbox-group__label,
  .biz-checkbox-group--error .biz-checkbox-group__helper-text {
    color: var(--biz-checkbox-group-error-color);
  }

  .biz-checkbox-group:focus-within {
    outline: none;
  }
`;