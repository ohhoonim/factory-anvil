import { css } from 'lit';

export const contentContainerStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-content-container-max-width-sm: 800px;
    --biz-content-container-max-width-md: 1200px;
    --biz-content-container-max-width-lg: 1600px;
    --biz-content-container-padding-x: 24px;
    --biz-content-container-padding-y: 24px;

    /* Colors Tokens */
    --biz-content-container-bg-color: #f9fafb;
    --biz-content-container-card-bg-color: #ffffff;
    --biz-content-container-border-color: #e5e7eb;
    --biz-content-container-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --biz-content-container-text-color: #111827;
    --biz-content-container-empty-text-color: #6b7280;
    --biz-content-container-spinner-color: #3b82f6;

    display: block;
    width: 100%;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  .biz-content-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    background-color: var(--biz-content-container-bg-color);
    color: var(--biz-content-container-text-color);
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  }

  /* Variants */
  .biz-content-container--standard {
    background-color: var(--biz-content-container-bg-color);
  }

  .biz-content-container--fluid {
    background-color: var(--biz-content-container-bg-color);
    max-width: 100% !important;
  }

  .biz-content-container--card {
    background-color: var(--biz-content-container-card-bg-color);
    border: 1px solid var(--biz-content-container-border-color);
    border-radius: 8px;
    box-shadow: var(--biz-content-container-shadow);
  }

  /* Sizes (Max-Width) */
  .biz-content-container--small {
    max-width: var(--biz-content-container-max-width-sm);
  }

  .biz-content-container--medium {
    max-width: var(--biz-content-container-max-width-md);
  }

  .biz-content-container--large {
    max-width: var(--biz-content-container-max-width-lg);
  }

  .biz-content-container--full {
    max-width: 100%;
  }

  /* Layout Control Options */
  .biz-content-container--centered {
    margin-left: auto;
    margin-right: auto;
  }

  .biz-content-container--scrollable {
    overflow-y: auto;
    max-height: 100%;
  }

  .biz-content-container--padding {
    padding: var(--biz-content-container-padding-y) var(--biz-content-container-padding-x);
  }

  /* States */
  .biz-content-container--loading {
    pointer-events: none;
    opacity: 0.8;
  }

  .biz-content-container__loading-state,
  .biz-content-container__empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    width: 100%;
  }

  .biz-content-container__empty-text {
    color: var(--biz-content-container-empty-text-color);
    font-size: 0.875rem;
  }

  .biz-content-container__spinner {
    width: 32px;
    height: 32px;
    border: 3px solid var(--biz-content-container-border-color);
    border-top-color: var(--biz-content-container-spinner-color);
    border-radius: 50%;
    animation: biz-content-container-spin 1s linear infinite;
  }

  @keyframes biz-content-container-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .biz-content-container__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .biz-content-container__body {
    flex: 1 1 auto;
  }
`;