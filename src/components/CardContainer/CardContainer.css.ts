import { css } from 'lit';

export const cardContainerStyles = css`
  :host {
    display: inline-block;
    box-sizing: border-box;

    --biz-card-container-padding-sm: 12px;
    --biz-card-container-padding-md: 16px;
    --biz-card-container-padding-lg: 24px;
    --biz-card-container-border-radius: 8px;

    --biz-card-container-bg-color: #ffffff;
    --biz-card-container-border-color: #e5e7eb;
    --biz-card-container-divider-color: #f3f4f6;

    --biz-card-container-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    --biz-card-container-hover-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --biz-card-container-focus-ring-color: #3b82f6;

    --biz-card-container-disabled-opacity: 0.6;
    --biz-card-container-filled-bg: #f9fafb;
    --biz-card-container-elevated-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  :host([full-width]) {
    display: block;
    width: 100%;
  }

  .biz-card-container {
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: var(--biz-card-container-border-radius);
    background-color: var(--biz-card-container-bg-color);
    transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
    overflow: hidden;
  }

  /* Variants */
  .biz-card-container--outlined {
    border: 1px solid var(--biz-card-container-border-color);
    box-shadow: none;
  }

  .biz-card-container--filled {
    border: 1px solid transparent;
    background-color: var(--biz-card-container-filled-bg);
    box-shadow: none;
  }

  .biz-card-container--elevated {
    border: 1px solid transparent;
    box-shadow: var(--biz-card-container-elevated-shadow);
  }

  /* Sizes */
  .biz-card-container--small .biz-card-container__header,
  .biz-card-container--small .biz-card-container__body,
  .biz-card-container--small .biz-card-container__footer {
    padding: var(--biz-card-container-padding-sm);
  }

  .biz-card-container--medium .biz-card-container__header,
  .biz-card-container--medium .biz-card-container__body,
  .biz-card-container--medium .biz-card-container__footer {
    padding: var(--biz-card-container-padding-md);
  }

  .biz-card-container--large .biz-card-container__header,
  .biz-card-container--large .biz-card-container__body,
  .biz-card-container--large .biz-card-container__footer {
    padding: var(--biz-card-container-padding-lg);
  }

  /* Layout Properties */
  .biz-card-container--full-width {
    width: 100%;
  }

  .biz-card-container__divider {
    height: 1px;
    background-color: var(--biz-card-container-divider-color);
    width: 100%;
  }

  /* States: Hoverable */
  .biz-card-container--hoverable {
    cursor: pointer;
  }

  .biz-card-container--hoverable:hover {
    box-shadow: var(--biz-card-container-hover-shadow);
    border-color: var(--biz-card-container-border-color);
  }

  /* States: Focus / Focus-visible */
  .biz-card-container:focus-visible {
    outline: 2px solid var(--biz-card-container-focus-ring-color);
    outline-offset: 2px;
  }

  /* States: Disabled */
  .biz-card-container--disabled {
    opacity: var(--biz-card-container-disabled-opacity);
    cursor: not-allowed;
    pointer-events: none;
  }

  /* States: Loading */
  .biz-card-container--loading {
    pointer-events: none;
  }

  .biz-card-container__loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  .biz-card-container__spinner {
    width: 24px;
    height: 24px;
    border: 3px solid var(--biz-card-container-border-color);
    border-top-color: var(--biz-card-container-focus-ring-color);
    border-radius: 50%;
    animation: biz-card-spinner 0.8s linear infinite;
  }

  @keyframes biz-card-spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;