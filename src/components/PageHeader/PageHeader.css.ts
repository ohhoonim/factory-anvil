import { css } from "lit";

export const pageHeaderStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-page-header-padding-x: 24px;
    --biz-page-header-padding-y: 16px;
    --biz-page-header-gap: 12px;
    --biz-page-header-title-size-sm: 18px;
    --biz-page-header-title-size-md: 24px;
    --biz-page-header-title-size-lg: 30px;
    --biz-page-header-subtitle-size-sm: 12px;
    --biz-page-header-subtitle-size-md: 14px;
    --biz-page-header-subtitle-size-lg: 16px;

    /* Color Tokens */
    --biz-page-header-bg-color: transparent;
    --biz-page-header-border-color: #e5e7eb;
    --biz-page-header-title-color: #111827;
    --biz-page-header-subtitle-color: #6b7280;
    --biz-page-header-focus-ring-color: #2563eb;
    --biz-page-header-disabled-opacity: 0.5;
    --biz-page-header-skeleton-bg: #e5e7eb;

    display: block;
    box-sizing: border-box;
    width: 100%;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .biz-page-header {
    display: flex;
    flex-direction: column;
    padding: var(--biz-page-header-padding-y) var(--biz-page-header-padding-x);
    gap: var(--biz-page-header-gap);
    background-color: var(--biz-page-header-bg-color);
    border-bottom: 1px solid var(--biz-page-header-border-color);
    transition: background-color 0.2s ease, border-color 0.2s ease;
  }

  /* Full Width & Compact */
  .biz-page-header--full-width {
    width: 100%;
  }

  .biz-page-header--compact {
    --biz-page-header-padding-y: 8px;
    --biz-page-header-gap: 6px;
  }

  /* Variants */
  .biz-page-header--variant-standard {
    --biz-page-header-bg-color: transparent;
    --biz-page-header-border-color: #e5e7eb;
  }

  .biz-page-header--variant-filled {
    --biz-page-header-bg-color: #f9fafb;
    --biz-page-header-border-color: #e5e7eb;
    border-radius: 8px;
  }

  .biz-page-header--variant-ghost {
    --biz-page-header-bg-color: transparent;
    --biz-page-header-border-color: transparent;
    border-bottom: none;
  }

  /* Sizes */
  .biz-page-header--size-small {
    --biz-page-header-padding-x: 16px;
    --biz-page-header-padding-y: 12px;
  }

  .biz-page-header--size-small .biz-page-header__title {
    font-size: var(--biz-page-header-title-size-sm);
  }

  .biz-page-header--size-small .biz-page-header__subtitle {
    font-size: var(--biz-page-header-subtitle-size-sm);
  }

  .biz-page-header--size-medium {
    --biz-page-header-padding-x: 24px;
    --biz-page-header-padding-y: 16px;
  }

  .biz-page-header--size-medium .biz-page-header__title {
    font-size: var(--biz-page-header-title-size-md);
  }

  .biz-page-header--size-medium .biz-page-header__subtitle {
    font-size: var(--biz-page-header-subtitle-size-md);
  }

  .biz-page-header--size-large {
    --biz-page-header-padding-x: 32px;
    --biz-page-header-padding-y: 24px;
  }

  .biz-page-header--size-large .biz-page-header__title {
    font-size: var(--biz-page-header-title-size-lg);
  }

  .biz-page-header--size-large .biz-page-header__subtitle {
    font-size: var(--biz-page-header-subtitle-size-lg);
  }

  /* Main Layout Elements */
  .biz-page-header__breadcrumb {
    display: block;
  }

  .biz-page-header__main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .biz-page-header__title-container {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .biz-page-header__title {
    margin: 0;
    font-weight: 700;
    line-height: 1.25;
    color: var(--biz-page-header-title-color);
  }

  .biz-page-header__meta-status {
    display: inline-flex;
    align-items: center;
  }

  .biz-page-header__extra-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  .biz-page-header__subtitle-container {
    display: block;
  }

  .biz-page-header__subtitle {
    margin: 0;
    color: var(--biz-page-header-subtitle-color);
    line-height: 1.5;
  }

  /* States */
  .biz-page-header:hover {
    border-color: var(--biz-page-header-border-hover-color, var(--biz-page-header-border-color));
  }

  .biz-page-header:focus-within {
    outline: 2px solid var(--biz-page-header-focus-ring-color);
    outline-offset: 2px;
  }

  .biz-page-header--disabled {
    opacity: var(--biz-page-header-disabled-opacity);
    pointer-events: none;
  }

  /* Loading & Skeleton State */
  .biz-page-header__skeleton {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .biz-page-header__skeleton-breadcrumb,
  .biz-page-header__skeleton-title,
  .biz-page-header__skeleton-subtitle {
    background-color: var(--biz-page-header-skeleton-bg);
    border-radius: 4px;
    animation: biz-page-header-pulse 1.5s infinite ease-in-out;
  }

  .biz-page-header__skeleton-breadcrumb {
    width: 120px;
    height: 14px;
  }

  .biz-page-header__skeleton-title {
    width: 240px;
    height: 28px;
  }

  .biz-page-header__skeleton-subtitle {
    width: 360px;
    height: 16px;
  }

  @keyframes biz-page-header-pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;