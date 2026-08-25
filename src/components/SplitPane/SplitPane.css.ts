import { css } from 'lit';

export const splitPaneStyles = css`
  :host {
    --biz-split-pane-resizer-size-sm: 4px;
    --biz-split-pane-resizer-size-md: 6px;
    --biz-split-pane-resizer-size-lg: 8px;
    --biz-split-pane-resizer-hit-area: 12px;
    --biz-split-pane-bg-color: #ffffff;
    --biz-split-pane-resizer-bg-color: #e5e7eb;
    --biz-split-pane-resizer-hover-color: #2563eb;
    --biz-split-pane-resizer-active-color: #1d4ed8;
    --biz-split-pane-resizer-focus-ring-color: rgba(37, 99, 235, 0.2);

    display: flex;
    width: 100%;
    height: 100%;
  }

  .biz-split-pane {
    display: flex;
    background-color: var(--biz-split-pane-bg-color);
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .biz-split-pane.full-width {
    width: 100vw;
  }

  .biz-split-pane.full-height {
    height: 100vh;
  }

  .biz-split-pane.horizontal {
    flex-direction: row;
  }

  .biz-split-pane.vertical {
    flex-direction: column;
  }

  .pane {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: flex 0.1s ease;
  }

  .pane.collapsed {
    flex: 0 0 0% !important;
    min-width: 0 !important;
    min-height: 0 !important;
  }

  .resizer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--biz-split-pane-resizer-bg-color);
    z-index: 10;
    outline: none;
    transition: background-color 0.2s ease;
  }

  .resizer::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .biz-split-pane.horizontal > .resizer {
    width: var(--biz-split-pane-resizer-size-md);
    cursor: col-resize;
  }

  .biz-split-pane.horizontal > .resizer::after {
    width: var(--biz-split-pane-resizer-hit-area);
    height: 100%;
  }

  .biz-split-pane.vertical > .resizer {
    height: var(--biz-split-pane-resizer-size-md);
    cursor: row-resize;
  }

  .biz-split-pane.vertical > .resizer::after {
    height: var(--biz-split-pane-resizer-hit-area);
    width: 100%;
  }

  .biz-split-pane.Small > .resizer {
    width: var(--biz-split-pane-resizer-size-sm);
  }

  .biz-split-pane.vertical.Small > .resizer {
    height: var(--biz-split-pane-resizer-size-sm);
  }

  .biz-split-pane.Large > .resizer {
    width: var(--biz-split-pane-resizer-size-lg);
  }

  .biz-split-pane.vertical.Large > .resizer {
    height: var(--biz-split-pane-resizer-size-lg);
  }

  .biz-split-pane.Invisible > .resizer {
    background-color: transparent;
  }

  .resizer:hover,
  .resizer:focus-visible {
    background-color: var(--biz-split-pane-resizer-hover-color);
  }

  .biz-split-pane.Invisible > .resizer:hover,
  .biz-split-pane.Invisible > .resizer:focus-visible {
    background-color: var(--biz-split-pane-resizer-hover-color);
  }

  .resizer:focus-visible {
    box-shadow: 0 0 0 3px var(--biz-split-pane-resizer-focus-ring-color);
  }

  .resizer.active {
    background-color: var(--biz-split-pane-resizer-active-color);
  }

  .biz-split-pane.disabled > .resizer {
    background-color: var(--biz-split-pane-resizer-bg-color);
    cursor: default;
    pointer-events: none;
  }

  .grip-icon {
    width: 4px;
    height: 16px;
    border-left: 1px solid #9ca3af;
    border-right: 1px solid #9ca3af;
  }

  .biz-split-pane.vertical .grip-icon {
    width: 16px;
    height: 4px;
    border-top: 1px solid #9ca3af;
    border-bottom: 1px solid #9ca3af;
    border-left: none;
    border-right: none;
  }
`;