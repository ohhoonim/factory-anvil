import { css } from "lit";

export const radioButtonGroupStyles = css`
  :host {
    display: inline-block;

    --biz-radio-button-group-gap-sm: 8px;
    --biz-radio-button-group-gap-md: 12px;
    --biz-radio-button-group-gap-lg: 16px;

    --biz-radio-button-group-label-margin-bottom: 8px;
    --biz-radio-button-group-helper-margin-top: 4px;

    --biz-radio-button-group-label-color: #111827;
    --biz-radio-button-group-helper-text-color: #6b7280;

    --biz-radio-button-group-error-color: #dc2626;
    --biz-radio-button-group-disabled-opacity: 0.5;

    --biz-radio-button-group-font-size-sm: 12px;
    --biz-radio-button-group-font-size-md: 14px;
    --biz-radio-button-group-font-size-lg: 16px;
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  .biz-radio-button-group {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
  }

  .biz-radio-button-group--full-width {
    width: 100%;
  }

  /* Label Area */
  .biz-radio-button-group__label-container {
    margin-bottom: var(--biz-radio-button-group-label-margin-bottom);
    color: var(--biz-radio-button-group-label-color);
    font-weight: 600;
  }

  .biz-radio-button-group__label-container--hidden {
    display: none;
  }

  /* Items Container Layouts */
  .biz-radio-button-group__container {
    display: flex;
    box-sizing: border-box;
  }

  .biz-radio-button-group--vertical .biz-radio-button-group__container {
    flex-direction: column;
  }

  .biz-radio-button-group--horizontal .biz-radio-button-group__container {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  /* Size Variations - Gap */
  .biz-radio-button-group--small .biz-radio-button-group__container {
    gap: var(--biz-radio-button-group-gap-sm);
    font-size: var(--biz-radio-button-group-font-size-sm);
  }

  .biz-radio-button-group--medium .biz-radio-button-group__container {
    gap: var(--biz-radio-button-group-gap-md);
    font-size: var(--biz-radio-button-group-font-size-md);
  }

  .biz-radio-button-group--large .biz-radio-button-group__container {
    gap: var(--biz-radio-button-group-gap-lg);
    font-size: var(--biz-radio-button-group-font-size-lg);
  }

  /* Variants */
  /* Standard Variant */
  .biz-radio-button-group--standard .biz-radio-button-group__container {
    background: transparent;
  }

  /* Card Variant */
  .biz-radio-button-group--card .biz-radio-button-group__container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  /* Button Variant (Segmented Control Style) */
  .biz-radio-button-group--button .biz-radio-button-group__container {
    display: inline-flex;
    gap: 0;
    padding: 2px;
    background-color: #f3f4f6;
    border-radius: 6px;
    border: 1px solid #e5e7eb;
  }

  /* Helper Text Area */
  .biz-radio-button-group__helper-container {
    margin-top: var(--biz-radio-button-group-helper-margin-top);
    color: var(--biz-radio-button-group-helper-text-color);
    font-size: var(--biz-radio-button-group-font-size-sm);
  }

  .biz-radio-button-group__helper-container--hidden {
    display: none;
  }

  /* States */
  /* Disabled State */
  .biz-radio-button-group--disabled {
    opacity: var(--biz-radio-button-group-disabled-opacity);
    cursor: not-allowed;
  }

  .biz-radio-button-group--disabled .biz-radio-button-group__container {
    pointer-events: none;
  }

  /* Readonly State */
  .biz-radio-button-group--readonly .biz-radio-button-group__container {
    pointer-events: none;
  }

  /* Error State */
  .biz-radio-button-group--error .biz-radio-button-group__label-container {
    color: var(--biz-radio-button-group-error-color);
  }

  .biz-radio-button-group--error .biz-radio-button-group__helper-container {
    color: var(--biz-radio-button-group-error-color);
  }
`;