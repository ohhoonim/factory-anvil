import { css } from "lit";

export const splitPaneStyles = css`
  :host {
    /* Layout & Sizing Tokens */
    --biz-split-pane-resizer-size-sm: 4px;
    --biz-split-pane-resizer-size-md: 6px;
    --biz-split-pane-resizer-size-lg: 8px;
    --biz-split-pane-resizer-hit-area: 12px;

    /* Base Colors */
    --biz-split-pane-bg-color: #ffffff;
    --biz-split-pane-resizer-bg-color: #e5e7eb;

    /* Interactive States */
    --biz-split-pane-resizer-hover-color: #2563eb;
    --biz-split-pane-resizer-active-color: #1d4ed8;
    --biz-split-pane-resizer-focus-ring-color: rgba(37, 99, 235, 0.2);

    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  :host([full-width]) {
    width: 100%;
  }

  :host([full-height]) {
    height: 100%;
  }

  .biz-split-pane {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: var(--biz-split-pane-bg-color);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .biz-split-pane--horizontal {
    flex-direction: row;
  }

  .biz-split-pane--vertical {
    flex-direction: column;
  }

  /* Pane Elements */
  .biz-split-pane__pane {
    box-sizing: border-box;
    overflow: auto;
    position: relative;
  }

  /* Resizer Core */
  .biz-split-pane__resizer {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    user-select: none;
    touch-action: none;
    background-color: var(--biz-split-pane-resizer-bg-color);
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
    outline: none;
  }

  .biz-split-pane--horizontal > .biz-split-pane__resizer {
    cursor: col-resize;
    height: 100%;
  }

  .biz-split-pane--vertical > .biz-split-pane__resizer {
    cursor: row-resize;
    width: 100%;
  }

  /* Sizes */
  .biz-split-pane--small.biz-split-pane--horizontal > .biz-split-pane__resizer {
    width: var(--biz-split-pane-resizer-size-sm);
  }
  .biz-split-pane--small.biz-split-pane--vertical > .biz-split-pane__resizer {
    height: var(--biz-split-pane-resizer-size-sm);
  }

  .biz-split-pane--medium.biz-split-pane--horizontal > .biz-split-pane__resizer {
    width: var(--biz-split-pane-resizer-size-md);
  }
  .biz-split-pane--medium.biz-split-pane--vertical > .biz-split-pane__resizer {
    height: var(--biz-split-pane-resizer-size-md);
  }

  .biz-split-pane--large.biz-split-pane--horizontal > .biz-split-pane__resizer {
    width: var(--biz-split-pane-resizer-size-lg);
  }
  .biz-split-pane--large.biz-split-pane--vertical > .biz-split-pane__resizer {
    height: var(--biz-split-pane-resizer-size-lg);
  }

  /* Hit Area Extender */
  .biz-split-pane__resizer::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .biz-split-pane--horizontal > .biz-split-pane__resizer::before {
    width: var(--biz-split-pane-resizer-hit-area);
    height: 100%;
  }
  .biz-split-pane--vertical > .biz-split-pane__resizer::before {
    width: 100%;
    height: var(--biz-split-pane-resizer-hit-area);
  }

  /* Variants */
  .biz-split-pane--line .biz-split-pane__resizer-bar {
    width: 100%;
    height: 100%;
  }

  .biz-split-pane--grip .biz-split-pane__grip-icon {
    width: 16px;
    height: 16px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .biz-split-pane--grip .biz-split-pane__grip-icon::before {
    content: '···';
    font-size: 14px;
    letter-spacing: 1px;
    color: #6b7280;
  }
  .biz-split-pane--horizontal.biz-split-pane--grip .biz-split-pane__grip-icon::before {
    transform: rotate(90deg);
  }

  .biz-split-pane--invisible .biz-split-pane__resizer {
    background-color: transparent;
  }

  /* States: Hover, Active, Focus, Disabled */
  .biz-split-pane__resizer:hover,
  .biz-split-pane--invisible .biz-split-pane__resizer:hover {
    background-color: var(--biz-split-pane-resizer-hover-color);
  }

  .biz-split-pane__resizer:focus-visible {
    box-shadow: 0 0 0 3px var(--biz-split-pane-resizer-focus-ring-color);
    background-color: var(--biz-split-pane-resizer-hover-color);
  }

  .biz-split-pane--dragging .biz-split-pane__resizer,
  .biz-split-pane__resizer:active {
    background-color: var(--biz-split-pane-resizer-active-color);
  }

  .biz-split-pane--disabled .biz-split-pane__resizer {
    cursor: not-allowed;
    background-color: var(--biz-split-pane-resizer-bg-color);
    opacity: 0.6;
  }
  .biz-split-pane--disabled .biz-split-pane__resizer:hover {
    background-color: var(--biz-split-pane-resizer-bg-color);
  }
`;