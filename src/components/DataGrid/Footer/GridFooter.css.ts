import { css } from "lit";

export const GridfooterStyles = css`
  :host {
    --grid-footer-bg: #f6f8fa;
    --grid-footer-border-top: 1px solid #d0d7de;
    --grid-footer-height: 40px;
    --grid-footer-text-color: #24292f;
    --grid-footer-font-size: 13px;
    --grid-footer-font-weight: 600;
    --grid-footer-summary-bg: #ffffff;
    --grid-footer-summary-padding: 0 12px;
    --grid-footer-cell-border-right: 1px solid #e1e4e8;

    display: block;
    width: 100%;
    position: sticky;
    bottom: 0;
    z-index: 2;
    box-sizing: border-box;
  }

  .grid-footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--grid-footer-bg);
    border-top: var(--grid-footer-border-top);
    color: var(--grid-footer-text-color);
    font-size: var(--grid-footer-font-size);
    font-weight: var(--grid-footer-font-weight);
    box-sizing: border-box;
    user-select: none;
  }

  /* Sizes */
  .grid-footer--sm {
    --grid-footer-height: 32px;
    --grid-footer-font-size: 12px;
  }

  .grid-footer--md {
    --grid-footer-height: 40px;
    --grid-footer-font-size: 13px;
  }

  .grid-footer--lg {
    --grid-footer-height: 48px;
    --grid-footer-font-size: 14px;
  }

  /* Variants */
  .grid-footer--compact .grid-footer__summary-bar {
    display: none;
  }

  /* Meta Summary Bar */
  .grid-footer__summary-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(var(--grid-footer-height) * 0.75);
    padding: var(--grid-footer-summary-padding);
    background-color: var(--grid-footer-summary-bg);
    border-bottom: 1px solid #e1e4e8;
    cursor: pointer;
  }

  .grid-footer__summary-bar:hover {
    background-color: #f3f4f6;
  }

  .grid-footer__meta-info {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .grid-footer__meta-item strong {
    color: #0969da;
    font-weight: 700;
  }

  .grid-footer__summary-slot {
    display: flex;
    align-items: center;
  }

  /* Aggregation Row Viewport & Container */
  .grid-footer__aggregation-viewport {
    width: 100%;
    overflow: hidden;
    position: relative;
    height: var(--grid-footer-height);
  }

  .grid-footer__aggregation-row {
    display: flex;
    height: 100%;
    will-change: transform;
    transition: transform 0.05s ease-out;
  }

  ::slotted(*) {
    box-sizing: border-box;
  }
`;