import { css } from 'lit';

export const checkboxStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    --biz-checkbox-size-sm: 16px;
    --biz-checkbox-size-md: 20px;
    --biz-checkbox-size-lg: 24px;
    --biz-checkbox-label-gap: 8px;
    --biz-checkbox-border-radius: 4px;

    --biz-checkbox-bg: #ffffff;
    --biz-checkbox-border-color: #d1d5db;
    --biz-checkbox-text-color: #111827;

    --biz-checkbox-checked-bg: #2563eb;
    --biz-checkbox-checked-border-color: #2563eb;
    --biz-checkbox-icon-color: #ffffff;

    --biz-checkbox-hover-border-color: #9ca3af;
    --biz-checkbox-focus-ring-color: rgba(37, 99, 235, 0.2);

    --biz-checkbox-error-color: #dc2626;
    --biz-checkbox-disabled-bg: #f3f4f6;
    --biz-checkbox-disabled-border-color: #e5e7eb;
    --biz-checkbox-disabled-text-color: #9ca3af;

    --biz-checkbox-control-size: var(--biz-checkbox-size-md);
    --biz-checkbox-font-size: 14px;
    --biz-checkbox-card-padding: 8px 12px;
    --biz-checkbox-card-bg: #ffffff;
    --biz-checkbox-card-border: 1px solid var(--biz-checkbox-border-color);
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
    color: var(--biz-checkbox-text-color);
  }

  .biz-checkbox__wrapper {
    display: inline-flex;
    align-items: center;
    gap: var(--biz-checkbox-label-gap);
    cursor: pointer;
    user-select: none;
    position: relative;
  }

  .biz-checkbox--label-left .biz-checkbox__wrapper {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  .biz-checkbox--small {
    --biz-checkbox-control-size: var(--biz-checkbox-size-sm);
    --biz-checkbox-font-size: 12px;
    --biz-checkbox-card-padding: 6px 10px;
  }

  .biz-checkbox--medium {
    --biz-checkbox-control-size: var(--biz-checkbox-size-md);
    --biz-checkbox-font-size: 14px;
    --biz-checkbox-card-padding: 8px 12px;
  }

  .biz-checkbox--large {
    --biz-checkbox-control-size: var(--biz-checkbox-size-lg);
    --biz-checkbox-font-size: 16px;
    --biz-checkbox-card-padding: 10px 16px;
  }

  .biz-checkbox--outlined .biz-checkbox__wrapper {
    padding: var(--biz-checkbox-card-padding);
    border: var(--biz-checkbox-card-border);
    border-radius: calc(var(--biz-checkbox-border-radius) + 2px);
    background-color: var(--biz-checkbox-card-bg);
  }

  .biz-checkbox--filled .biz-checkbox__wrapper {
    padding: var(--biz-checkbox-card-padding);
    border: 1px solid transparent;
    border-radius: calc(var(--biz-checkbox-border-radius) + 2px);
    background-color: var(--biz-checkbox-disabled-bg);
  }

  .biz-checkbox__control-container {
    position: relative;
    width: var(--biz-checkbox-control-size);
    height: var(--biz-checkbox-control-size);
    flex-shrink: 0;
  }

  .biz-checkbox__native {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    margin: 0;
    padding: 0;
    cursor: pointer;
    z-index: 1;
  }

  .biz-checkbox__control {
    width: 100%;
    height: 100%;
    display: flex;
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
    font-size: var(--biz-checkbox-font-size);
    line-height: 1.5;
  }

  .biz-checkbox__description {
    font-size: calc(var(--biz-checkbox-font-size) - 2px);
    color: #6b7280;
    margin-top: 4px;
    padding-left: calc(var(--biz-checkbox-control-size) + var(--biz-checkbox-label-gap));
  }

  .biz-checkbox--label-left .biz-checkbox__description {
    padding-left: 0;
    padding-right: calc(var(--biz-checkbox-control-size) + var(--biz-checkbox-label-gap));
  }

  .biz-checkbox__wrapper:hover .biz-checkbox__control {
    border-color: var(--biz-checkbox-hover-border-color);
  }

  .biz-checkbox__native:focus-visible + .biz-checkbox__control {
    border-color: var(--biz-checkbox-checked-border-color);
    box-shadow: 0 0 0 3px var(--biz-checkbox-focus-ring-color);
  }

  .biz-checkbox__native:active + .biz-checkbox__control {
    border-color: var(--biz-checkbox-checked-border-color);
  }

  .biz-checkbox[data-checked] .biz-checkbox__control,
  .biz-checkbox[data-indeterminate] .biz-checkbox__control {
    background-color: var(--biz-checkbox-checked-bg);
    border-color: var(--biz-checkbox-checked-border-color);
  }

  .biz-checkbox[data-error] .biz-checkbox__control {
    border-color: var(--biz-checkbox-error-color);
  }

  .biz-checkbox[data-error] .biz-checkbox__description {
    color: var(--biz-checkbox-error-color);
  }

  .biz-checkbox[data-disabled] {
    opacity: 0.6;
  }

  .biz-checkbox[data-disabled] .biz-checkbox__wrapper,
  .biz-checkbox[data-disabled] .biz-checkbox__native {
    cursor: not-allowed;
  }

  .biz-checkbox[data-disabled] .biz-checkbox__control {
    background-color: var(--biz-checkbox-disabled-bg);
    border-color: var(--biz-checkbox-disabled-border-color);
  }

  .biz-checkbox[data-disabled] .biz-checkbox__label {
    color: var(--biz-checkbox-disabled-text-color);
  }

  .biz-checkbox[data-readonly] .biz-checkbox__wrapper,
  .biz-checkbox[data-readonly] .biz-checkbox__native {
    cursor: default;
  }
`;