import { css } from 'lit';

export const breadcrumbStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    --biz-breadcrumb-height-sm: 28px;
    --biz-breadcrumb-height-md: 36px;
    --biz-breadcrumb-height-lg: 44px;

    --biz-breadcrumb-gap-sm: 4px;
    --biz-breadcrumb-gap-md: 8px;
    --biz-breadcrumb-gap-lg: 12px;

    --biz-breadcrumb-font-size-sm: 12px;
    --biz-breadcrumb-font-size-md: 14px;
    --biz-breadcrumb-font-size-lg: 16px;

    --biz-breadcrumb-padding-x: 0px;
    --biz-breadcrumb-padding-y: 4px;

    --biz-breadcrumb-text-color: #4b5563;
    --biz-breadcrumb-current-text-color: #111827;
    --biz-breadcrumb-separator-color: #9ca3af;
    --biz-breadcrumb-hover-text-color: #2563eb;
    --biz-breadcrumb-focus-ring-color: rgba(37, 99, 235, 0.4);
    --biz-breadcrumb-active-text-color: #1d4ed8;
    --biz-breadcrumb-disabled-text-color: #d1d5db;

    --biz-breadcrumb-contained-bg: #f3f4f6;
    --biz-breadcrumb-contained-radius: 6px;
    --biz-breadcrumb-contained-padding: 4px 8px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-breadcrumb {
    display: inline-flex;
    align-items: center;
    padding: var(--biz-breadcrumb-padding-y) var(--biz-breadcrumb-padding-x);
    font-family: inherit;
  }

  .biz-breadcrumb--full-width {
    display: flex;
    width: 100%;
  }

  .biz-breadcrumb__list {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .biz-breadcrumb--wrap .biz-breadcrumb__list {
    flex-wrap: wrap;
  }

  .biz-breadcrumb--small {
    height: var(--biz-breadcrumb-height-sm);
    font-size: var(--biz-breadcrumb-font-size-sm);
  }
  .biz-breadcrumb--small .biz-breadcrumb__list {
    gap: var(--biz-breadcrumb-gap-sm);
  }

  .biz-breadcrumb--medium {
    height: var(--biz-breadcrumb-height-md);
    font-size: var(--biz-breadcrumb-font-size-md);
  }
  .biz-breadcrumb--medium .biz-breadcrumb__list {
    gap: var(--biz-breadcrumb-gap-md);
  }

  .biz-breadcrumb--large {
    height: var(--biz-breadcrumb-height-lg);
    font-size: var(--biz-breadcrumb-font-size-lg);
  }
  .biz-breadcrumb--large .biz-breadcrumb__list {
    gap: var(--biz-breadcrumb-gap-lg);
  }

  .biz-breadcrumb__item {
    display: inline-flex;
    align-items: center;
  }

  .biz-breadcrumb__link,
  .biz-breadcrumb__text {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--biz-breadcrumb-text-color);
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
    transition: color 0.2s ease, background-color 0.2s ease;
  }

  .biz-breadcrumb__link:hover {
    color: var(--biz-breadcrumb-hover-text-color);
    text-decoration: underline;
  }

  .biz-breadcrumb__link:focus-visible,
  .biz-breadcrumb__overflow-button:focus-visible {
    outline: 2px solid var(--biz-breadcrumb-focus-ring-color);
    outline-offset: 2px;
  }

  .biz-breadcrumb__link:active {
    color: var(--biz-breadcrumb-active-text-color);
  }

  .biz-breadcrumb__item--current .biz-breadcrumb__text,
  .biz-breadcrumb__item--current .biz-breadcrumb__link {
    color: var(--biz-breadcrumb-current-text-color);
    font-weight: 600;
    cursor: default;
    text-decoration: none;
  }

  .biz-breadcrumb__separator {
    display: inline-flex;
    align-items: center;
    color: var(--biz-breadcrumb-separator-color);
    user-select: none;
  }

  .biz-breadcrumb--contained .biz-breadcrumb__link,
  .biz-breadcrumb--contained .biz-breadcrumb__text {
    background-color: var(--biz-breadcrumb-contained-bg);
    padding: var(--biz-breadcrumb-contained-padding);
    border-radius: var(--biz-breadcrumb-contained-radius);
  }

  .biz-breadcrumb--contained .biz-breadcrumb__link:hover {
    text-decoration: none;
    background-color: #e5e7eb;
  }

  .biz-breadcrumb--standard-icon .biz-breadcrumb__icon {
    display: inline-flex;
    align-items: center;
  }

  .biz-breadcrumb__overflow-button {
    background: none;
    border: none;
    padding: 2px 6px;
    margin: 0;
    font: inherit;
    color: var(--biz-breadcrumb-text-color);
    cursor: pointer;
    border-radius: 4px;
  }

  .biz-breadcrumb__overflow-button:hover {
    background-color: #f3f4f6;
    color: var(--biz-breadcrumb-hover-text-color);
  }

  .biz-breadcrumb--disabled .biz-breadcrumb__link,
  .biz-breadcrumb--disabled .biz-breadcrumb__text,
  .biz-breadcrumb--disabled .biz-breadcrumb__separator,
  .biz-breadcrumb--disabled .biz-breadcrumb__overflow-button {
    color: var(--biz-breadcrumb-disabled-text-color);
    cursor: not-allowed;
    pointer-events: none;
    text-decoration: none;
  }
`;