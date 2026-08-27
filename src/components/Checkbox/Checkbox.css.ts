import { css } from "lit";

export const checkboxStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-checkbox-size-sm: 16px;
    --biz-checkbox-size-md: 20px;
    --biz-checkbox-size-lg: 24px;
    --biz-checkbox-label-gap: 8px;
    --biz-checkbox-border-radius: 4px;

    /* Colors - Base */
    --biz-checkbox-bg: #ffffff;
    --biz-checkbox-border-color: #d1d5db;
    --biz-checkbox-text-color: #111827;

    /* Colors - Checked & Indeterminate */
    --biz-checkbox-checked-bg: #2563eb;
    --biz-checkbox-checked-border-color: #2563eb;
    --biz-checkbox-icon-color: #ffffff;

    /* Colors - Interactive States */
    --biz-checkbox-hover-border-color: #9ca3af;
    --biz-checkbox-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled & Required */
    --biz-checkbox-error-color: #dc2626;
    --biz-checkbox-required-indicator-color: #dc2626;
    --biz-checkbox-disabled-bg: #f3f4f6;
    --biz-checkbox-disabled-border-color: #e5e7eb;
    --biz-checkbox-disabled-text-color: #9ca3af;

    display: inline-block;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-checkbox {
    display: inline-flex;
    flex-direction: column;
    font-family: inherit;
  }

  .biz-checkbox__wrapper {
    display: inline-flex;
    align-items: center;
    gap: var(--biz-checkbox-label-gap);
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  .biz-checkbox__control {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .biz-checkbox__input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    margin: 0;
    padding: 0;
    cursor: inherit;
    z-index: 1;
  }

  .biz-checkbox__box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--biz-checkbox-bg);
    border: 1px solid var(--biz-checkbox-border-color);
    border-radius: var(--biz-checkbox-border-radius);
    color: var(--biz-checkbox-icon-color);
    transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
  }

  .biz-checkbox__icon {
    width: 70%;
    height: 70%;
  }

  .biz-checkbox__label {
    color: var(--biz-checkbox-text-color);
    font-size: 14px;
    line-height: 1.5;
  }

  /* Required Indicator Style */
  .biz-checkbox--required .biz-checkbox__label::after {
    content: ' *';
    color: var(--biz-checkbox-required-indicator-color);
    margin-left: 2px;
  }

  .biz-checkbox__description {
    margin-top: 4px;
    font-size: 12px;
    color: #6b7280;
  }

  /* Sizes */
  .biz-checkbox--small .biz-checkbox__box {
    width: var(--biz-checkbox-size-sm);
    height: var(--biz-checkbox-size-sm);
  }
  .biz-checkbox--small .biz-checkbox__label {
    font-size: 12px;
  }

  .biz-checkbox--medium .biz-checkbox__box {
    width: var(--biz-checkbox-size-md);
    height: var(--biz-checkbox-size-md);
  }
  .biz-checkbox--medium .biz-checkbox__label {
    font-size: 14px;
  }

  .biz-checkbox--large .biz-checkbox__box {
    width: var(--biz-checkbox-size-lg);
    height: var(--biz-checkbox-size-lg);
  }
  .biz-checkbox--large .biz-checkbox__label {
    font-size: 16px;
  }

  /* Label Position */
  .biz-checkbox--label-left .biz-checkbox__wrapper {
    flex-direction: row-reverse;
  }

  /* Variants */
  .biz-checkbox--standard {
    /* Standard layout */
  }

  .biz-checkbox--button {
    padding: 8px 16px;
    border: 1px solid var(--biz-checkbox-border-color);
    border-radius: var(--biz-checkbox-border-radius);
    background-color: var(--biz-checkbox-bg);
  }

  .biz-checkbox--card {
    padding: 16px;
    border: 1px solid var(--biz-checkbox-border-color);
    border-radius: calc(var(--biz-checkbox-border-radius) * 2);
    background-color: var(--biz-checkbox-bg);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  /* States - Checked & Indeterminate */
  .biz-checkbox--checked .biz-checkbox__box,
  .biz-checkbox--indeterminate .biz-checkbox__box {
    background-color: var(--biz-checkbox-checked-bg);
    border-color: var(--biz-checkbox-checked-border-color);
  }

  /* States - Hover */
  .biz-checkbox:not(.biz-checkbox--disabled):not(.biz-checkbox--readonly) .biz-checkbox__wrapper:hover .biz-checkbox__box {
    border-color: var(--biz-checkbox-hover-border-color);
  }

  /* States - Focus Visible */
  .biz-checkbox__input:focus-visible + .biz-checkbox__box {
    box-shadow: 0 0 0 3px var(--biz-checkbox-focus-ring-color);
  }

  /* States - Required Input Invalid (Native Form Validation Integration) */
  .biz-checkbox__input:invalid + .biz-checkbox__box {
    border-color: var(--biz-checkbox-error-color);
  }

  /* States - Error */
  .biz-checkbox--error .biz-checkbox__box {
    border-color: var(--biz-checkbox-error-color);
  }
  .biz-checkbox--error .biz-checkbox__label {
    color: var(--biz-checkbox-error-color);
  }

  /* States - Disabled */
  .biz-checkbox--disabled {
    cursor: not-allowed;
  }
  .biz-checkbox--disabled .biz-checkbox__wrapper {
    cursor: not-allowed;
  }
  .biz-checkbox--disabled .biz-checkbox__box {
    background-color: var(--biz-checkbox-disabled-bg);
    border-color: var(--biz-checkbox-disabled-border-color);
  }
  .biz-checkbox--disabled .biz-checkbox__label {
    color: var(--biz-checkbox-disabled-text-color);
  }

  /* States - Readonly */
  .biz-checkbox--readonly {
    cursor: default;
  }
  .biz-checkbox--readonly .biz-checkbox__wrapper {
    cursor: default;
  }
`;