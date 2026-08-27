import { css } from 'lit';

export const checkboxGroupStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-checkbox-group-gap-sm: 8px;
    --biz-checkbox-group-gap-md: 12px;
    --biz-checkbox-group-gap-lg: 16px;
    --biz-checkbox-group-label-margin-bottom: 8px;

    /* Colors - Base */
    --biz-checkbox-group-label-color: #111827;
    --biz-checkbox-group-helper-text-color: #6b7280;

    /* Colors - Error & Disabled */
    --biz-checkbox-group-error-color: #dc2626;
    --biz-checkbox-group-disabled-opacity: 0.5;

    display: inline-block;
    box-sizing: border-box;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  .biz-checkbox-group {
    border: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
  }

  .biz-checkbox-group__label {
    padding: 0;
    margin-bottom: var(--biz-checkbox-group-label-margin-bottom);
    color: var(--biz-checkbox-group-label-color);
    font-weight: 600;
  }

  .biz-checkbox-group__container {
    display: flex;
    box-sizing: border-box;
  }

  /* Orientation */
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
    font-size: 0.875rem;
  }

  .biz-checkbox-group--medium .biz-checkbox-group__container {
    gap: var(--biz-checkbox-group-gap-md);
    font-size: 1rem;
  }

  .biz-checkbox-group--large .biz-checkbox-group__container {
    gap: var(--biz-checkbox-group-gap-lg);
    font-size: 1.125rem;
  }

  /* Variants */
  .biz-checkbox-group--standard {
    /* Standard Layout Default */
  }

  .biz-checkbox-group--card .biz-checkbox-group__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  .biz-checkbox-group--button .biz-checkbox-group__container {
    gap: 0;
  }

  /* States */
  .biz-checkbox-group--disabled {
    opacity: var(--biz-checkbox-group-disabled-opacity);
    cursor: not-allowed;
  }

  .biz-checkbox-group--readonly {
    cursor: default;
  }

  .biz-checkbox-group--error .biz-checkbox-group__label {
    color: var(--biz-checkbox-group-error-color);
  }

  .biz-checkbox-group__helper-text {
    margin-top: 4px;
    color: var(--biz-checkbox-group-helper-text-color);
    font-size: 0.875rem;
  }

  .biz-checkbox-group--error .biz-checkbox-group__helper-text {
    color: var(--biz-checkbox-group-error-color);
  }
`;