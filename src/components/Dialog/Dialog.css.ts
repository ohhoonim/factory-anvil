import { css } from 'lit';

export const dialogStyles = css`
  :host {
    /* Sizing & Radius */
    --biz-dialog-width-sm: 400px;
    --biz-dialog-width-md: 560px;
    --biz-dialog-width-lg: 800px;
    --biz-dialog-border-radius: 8px;
    --biz-dialog-padding: 24px;

    /* Colors - Base */
    --biz-dialog-bg-color: #ffffff;
    --biz-dialog-text-color: #111827;
    --biz-dialog-backdrop-color: rgba(0, 0, 0, 0.5);

    /* Elevation & Transition */
    --biz-dialog-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --biz-dialog-transition-duration: 200ms;

    /* Header & Footer */
    --biz-dialog-header-border-color: #e5e7eb;
    --biz-dialog-footer-border-color: #e5e7eb;

    display: block;
  }

  /* Backdrop Style via Native Dialog Pseudo-element */
  .biz-dialog::backdrop {
    background-color: var(--biz-dialog-backdrop-color);
    animation: biz-dialog-backdrop-fade-in var(--biz-dialog-transition-duration) ease-out;
  }

  .biz-dialog--non-modal::backdrop {
    background-color: transparent;
    pointer-events: none;
  }

  /* Core Dialog Container */
  .biz-dialog {
    box-sizing: border-box;
    padding: 0;
    border: none;
    border-radius: var(--biz-dialog-border-radius);
    background-color: var(--biz-dialog-bg-color);
    color: var(--biz-dialog-text-color);
    box-shadow: var(--biz-dialog-shadow);
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 32px);
    overflow: hidden;
    margin: auto;
  }

  .biz-dialog[open] {
    display: flex;
    flex-direction: column;
    animation: biz-dialog-scale-in var(--biz-dialog-transition-duration) ease-out;
  }

  .biz-dialog__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  /* Sizes */
  .biz-dialog--size-small {
    width: var(--biz-dialog-width-sm);
  }

  .biz-dialog--size-medium {
    width: var(--biz-dialog-width-md);
  }

  .biz-dialog--size-large {
    width: var(--biz-dialog-width-lg);
  }

  .biz-dialog--size-full-screen {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }

  /* Variants */
  .biz-dialog--alert {
    --biz-dialog-width-sm: 360px;
    border-top: 4px solid #ef4444;
  }

  /* Header */
  .biz-dialog__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--biz-dialog-padding);
    border-bottom: 1px solid var(--biz-dialog-header-border-color);
  }

  .biz-dialog__title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.5;
    color: var(--biz-dialog-text-color);
  }

  .biz-dialog__close-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    margin: -4px;
    border: none;
    background: transparent;
    color: #6b7280;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
  }

  .biz-dialog__close-button:hover {
    background-color: #f3f4f6;
    color: #111827;
  }

  .biz-dialog__close-button:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }

  .biz-dialog__close-button:active {
    background-color: #e5e7eb;
  }

  /* Body */
  .biz-dialog__body {
    flex: 1 1 auto;
    padding: var(--biz-dialog-padding);
    overflow-y: auto;
  }

  .biz-dialog--scrollable .biz-dialog__body {
    max-height: 60vh;
  }

  /* Footer */
  .biz-dialog__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: var(--biz-dialog-padding);
    border-top: 1px solid var(--biz-dialog-footer-border-color);
  }

  /* Layout States */
  .biz-dialog--centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
  }

  /* Keyframe Animations */
  @keyframes biz-dialog-scale-in {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes biz-dialog-backdrop-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;