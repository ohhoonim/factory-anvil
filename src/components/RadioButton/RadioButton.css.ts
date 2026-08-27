import { css } from 'lit';

export const radioButtonStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-radio-button-size-sm: 16px;
    --biz-radio-button-size-md: 20px;
    --biz-radio-button-size-lg: 24px;
    --biz-radio-button-label-gap: 8px;

    /* Colors - Base */
    --biz-radio-button-bg: #ffffff;
    --biz-radio-button-border-color: #d1d5db;
    --biz-radio-button-text-color: #111827;

    /* Colors - Checked */
    --biz-radio-button-checked-border-color: #2563eb;
    --biz-radio-button-checked-icon-color: #2563eb;

    /* Colors - Interactive States */
    --biz-radio-button-hover-border-color: #9ca3af;
    --biz-radio-button-focus-ring-color: rgba(37, 99, 235, 0.2);

    /* Colors - Error & Disabled */
    --biz-radio-button-error-color: #dc2626;
    --biz-radio-button-disabled-bg: #f3f4f6;
    --biz-radio-button-disabled-border-color: #e5e7eb;
    --biz-radio-button-disabled-text-color: #9ca3af;

    display: inline-block;
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: border-box;
  }

  .biz-radio-button {
    display: inline-flex;
    flex-direction: column;
    font-family: inherit;
    color: var(--biz-radio-button-text-color);
  }

  .biz-radio-button__container {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }

  .biz-radio-button__wrapper {
    display: inline-flex;
    align-items: center;
    position: relative;
    gap: var(--biz-radio-button-label-gap);
  }

  /* Input Element (Hidden visually, accessible for screen readers) */
  .biz-radio-button__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  /* Radio Control Visual Frame */
  .biz-radio-button__control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid var(--biz-radio-button-border-color);
    border-radius: 50%;
    background-color: var(--biz-radio-button-bg);
    transition: all 0.2s ease-in-out;
    flex-shrink: 0;
  }

  .biz-radio-button__inner-dot {
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: var(--biz-radio-button-checked-icon-color);
    opacity: 0;
    transform: scale(0);
    transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
  }

  .biz-radio-button__label {
    font-size: 14px;
    line-height: 1.5;
  }

  .biz-radio-button__description {
    font-size: 12px;
    color: #6b7280;
    margin-top: 4px;
  }

  /* Label Position Variants */
  .biz-radio-button--label-right .biz-radio-button__wrapper {
    flex-direction: row;
  }

  .biz-radio-button--label-left .biz-radio-button__wrapper {
    flex-direction: row-reverse;
  }

  /* Sizes */
  .biz-radio-button--small .biz-radio-button__control {
    width: var(--biz-radio-button-size-sm);
    height: var(--biz-radio-button-size-sm);
  }
  .biz-radio-button--small .biz-radio-button__label {
    font-size: 12px;
  }

  .biz-radio-button--medium .biz-radio-button__control {
    width: var(--biz-radio-button-size-md);
    height: var(--biz-radio-button-size-md);
  }
  .biz-radio-button--medium .biz-radio-button__label {
    font-size: 14px;
  }

  .biz-radio-button--large .biz-radio-button__control {
    width: var(--biz-radio-button-size-lg);
    height: var(--biz-radio-button-size-lg);
  }
  .biz-radio-button--large .biz-radio-button__label {
    font-size: 16px;
  }

  /* Variants */
  .biz-radio-button--outlined .biz-radio-button__container,
  .biz-radio-button--button .biz-radio-button__container,
  .biz-radio-button--card .biz-radio-button__container {
    padding: 8px 16px;
    border: 1px solid var(--biz-radio-button-border-color);
    border-radius: 6px;
    background-color: var(--biz-radio-button-bg);
  }

  .biz-radio-button--filled .biz-radio-button__container {
    padding: 8px 16px;
    border: 1px solid transparent;
    border-radius: 6px;
    background-color: #f3f4f6;
  }

  /* Checked State */
  .biz-radio-button--checked .biz-radio-button__control {
    border-color: var(--biz-radio-button-checked-border-color);
  }

  .biz-radio-button--checked .biz-radio-button__inner-dot {
    opacity: 1;
    transform: scale(1);
  }

  .biz-radio-button--checked.biz-radio-button--outlined .biz-radio-button__container,
  .biz-radio-button--checked.biz-radio-button--button .biz-radio-button__container,
  .biz-radio-button--checked.biz-radio-button--card .biz-radio-button__container {
    border-color: var(--biz-radio-button-checked-border-color);
    background-color: rgba(37, 99, 235, 0.04);
  }

  /* Hover State */
  .biz-radio-button__container:hover .biz-radio-button__control {
    border-color: var(--biz-radio-button-hover-border-color);
  }

  /* Focus & Active State */
  .biz-radio-button__input:focus-visible + .biz-radio-button__control {
    outline: none;
    box-shadow: 0 0 0 3px var(--biz-radio-button-focus-ring-color);
  }

  /* Error State */
  .biz-radio-button--error .biz-radio-button__control {
    border-color: var(--biz-radio-button-error-color);
  }

  .biz-radio-button--error .biz-radio-button__description {
    color: var(--biz-radio-button-error-color);
  }

  /* Disabled State */
  .biz-radio-button--disabled .biz-radio-button__container {
    cursor: not-allowed;
  }

  .biz-radio-button--disabled .biz-radio-button__control {
    background-color: var(--biz-radio-button-disabled-bg);
    border-color: var(--biz-radio-button-disabled-border-color);
  }

  .biz-radio-button--disabled .biz-radio-button__label {
    color: var(--biz-radio-button-disabled-text-color);
  }

  /* Readonly State */
  .biz-radio-button--readonly .biz-radio-button__container {
    cursor: default;
    pointer-events: none;
  }
`;