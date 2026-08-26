import { css } from 'lit';

export const pageHeaderStyles = css`
  :host {
    --biz-page-header-padding-x: 24px;
    --biz-page-header-padding-y: 16px;
    --biz-page-header-title-size-sm: 18px;
    --biz-page-header-title-size-md: 24px;
    --biz-page-header-title-size-lg: 30px;
    --biz-page-header-bg-color: #ffffff;
    --biz-page-header-border-color: #e5e7eb;
    --biz-page-header-title-color: #111827;
    --biz-page-header-subtitle-color: #6b7280;
    --biz-page-header-focus-ring-color: #3b82f6;

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
    background-color: var(--biz-page-header-bg-color);
    border-bottom: 1px solid var(--biz-page-header-border-color);
    transition: all 0.2s ease-in-out;
  }

  .biz-page-header[data-compact] {
    padding-top: calc(var(--biz-page-header-padding-y) * 0.5);
    padding-bottom: calc(var(--biz-page-header-padding-y) * 0.5);
  }

  .biz-page-header__breadcrumb {
    margin-bottom: 8px;
  }

  .biz-page-header__main {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .biz-page-header__title-container {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .biz-page-header__title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .biz-page-header__title {
    margin: 0;
    font-weight: 700;
    color: var(--biz-page-header-title-color);
    line-height: 1.25;
  }

  .biz-page-header__subtitle {
    margin: 0;
    font-size: 14px;
    color: var(--biz-page-header-subtitle-color);
    line-height: 1.5;
  }

  .biz-page-header__extra-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .biz-page-header[data-variant='standard'] {
    background-color: transparent;
    border-bottom: 1px solid var(--biz-page-header-border-color);
  }

  .biz-page-header[data-variant='filled'] {
    background-color: var(--biz-page-header-bg-color);
    border: 1px solid var(--biz-page-header-border-color);
    border-radius: 8px;
  }

  .biz-page-header[data-variant='ghost'] {
    background-color: transparent;
    border: none;
  }

  .biz-page-header[data-variant='outlined'] {
    background-color: transparent;
    border: 1px solid var(--biz-page-header-border-color);
    border-radius: 8px;
  }

  .biz-page-header[data-size='small'] {
    --biz-page-header-padding-x: 16px;
    --biz-page-header-padding-y: 10px;
  }

  .biz-page-header[data-size='small'] .biz-page-header__title {
    font-size: var(--biz-page-header-title-size-sm);
  }

  .biz-page-header[data-size='medium'] {
    --biz-page-header-padding-x: 24px;
    --biz-page-header-padding-y: 16px;
  }

  .biz-page-header[data-size='medium'] .biz-page-header__title {
    font-size: var(--biz-page-header-title-size-md);
  }

  .biz-page-header[data-size='large'] {
    --biz-page-header-padding-x: 32px;
    --biz-page-header-padding-y: 24px;
  }

  .biz-page-header[data-size='large'] .biz-page-header__title {
    font-size: var(--biz-page-header-title-size-lg);
  }

  .biz-page-header:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  }

  .biz-page-header:focus-within {
    outline: 2px solid var(--biz-page-header-focus-ring-color);
    outline-offset: -2px;
  }

  .biz-page-header[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  .biz-page-header[data-readonly] {
    user-select: none;
  }

  .biz-page-header[data-error] {
    border-color: #ef4444;
  }

  .biz-page-header[data-loading] .biz-page-header__title,
  .biz-page-header[data-loading] .biz-page-header__subtitle {
    color: transparent;
    background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
  }

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;