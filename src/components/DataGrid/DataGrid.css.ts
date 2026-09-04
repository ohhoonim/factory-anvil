// src/components/DataGrid/DataGrid.css.ts

import { css } from "lit";

export const dataGridStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-data-grid-height: 400px;
    --biz-data-grid-row-height: 40px;
    --biz-data-grid-header-height: 40px;
    --biz-data-grid-border-color: #d1d5db;
    --biz-data-grid-cell-border-color: #e5e7eb;
    --biz-data-grid-cell-padding-x: 8px;
    --biz-data-grid-font-size: 13px;
    --biz-data-grid-border-radius: 4px;

    /* Repeating Linear Gradient Background (Zebra Style) */
    --biz-data-grid-row-bg-even: #ffffff;
    --biz-data-grid-row-bg-odd: #f9fafb;

    /* Colors - Header */
    --biz-data-grid-header-bg: #f3f4f6;
    --biz-data-grid-header-text-color: #374151;
    --biz-data-grid-header-border-color: #e5e7eb;

    /* Colors - Base & Interactive States */
    --biz-data-grid-bg-color: #ffffff;
    --biz-data-grid-text-color: #111827;
    --biz-data-grid-hover-bg-color: #f3f4f6;
    --biz-data-grid-focus-border-color: #2563eb;
    --biz-data-grid-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-data-grid-active-bg-color: #e5e7eb;

    /* Colors - States (Disabled, Readonly, Error) */
    --biz-data-grid-disabled-bg-color: #f3f4f6;
    --biz-data-grid-disabled-text-color: #9ca3af;
    --biz-data-grid-disabled-border-color: #e5e7eb;
    --biz-data-grid-readonly-bg-color: #f9fafb;
    --biz-data-grid-error-border-color: #dc2626;
    --biz-data-grid-error-focus-ring: rgba(220, 38, 38, 0.2);

    /* Data Type Icon Colors */
    --biz-data-grid-icon-color-string: #4a90e2;
    --biz-data-grid-icon-color-number: #50e3c2;
    --biz-data-grid-icon-color-objectid: #f5a623;

    display: block;
    width: 100%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    box-sizing: border-box;
  }

  :host([full-width]) {
    width: 100%;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Root Container */
  .biz-data-grid {
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
    position: relative;
    color: var(--biz-data-grid-text-color);
  }

  /* Sub-structure Slots */
  .biz-data-grid__label {
    font-size: 14px;
    font-weight: 500;
    color: var(--biz-data-grid-text-color);
  }

  .biz-data-grid__wrapper {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .biz-data-grid__prefix,
  .biz-data-grid__suffix {
    display: flex;
    align-items: center;
  }

  .biz-data-grid__helper {
    font-size: 12px;
    color: #6b7280;
  }

  /* Grid Header Layout & Styling */
  .grid-header-container {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 2;
    overflow: hidden;
    background-color: var(--biz-data-grid-header-bg);
    border-bottom: 1px solid var(--biz-data-grid-header-border-color);
    user-select: none;
    height: var(--biz-data-grid-header-height);
  }

  .grid-header {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
  }

  .grid-header-cell {
    display: flex;
    align-items: center;
    padding: 0 var(--biz-data-grid-cell-padding-x);
    font-weight: 600;
    font-size: var(--biz-data-grid-font-size);
    color: var(--biz-data-grid-header-text-color);
    border-right: 1px solid var(--biz-data-grid-header-border-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .grid-header-cell:last-child {
    border-right: none;
  }

  /* Viewport Layout */
  .biz-data-grid__viewport {
    height: var(--biz-data-grid-height);
    overflow: auto;
    position: relative;
    width: 100%;
    border: 1px solid var(--biz-data-grid-border-color);
    border-radius: var(--biz-data-grid-border-radius);
    background-color: var(--biz-data-grid-bg-color);
    will-change: transform;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    /* Repeating linear gradient zebra striping */
    background-image: repeating-linear-gradient(
      to bottom,
      var(--biz-data-grid-row-bg-even) 0px,
      var(--biz-data-grid-row-bg-even) var(--biz-data-grid-row-height),
      var(--biz-data-grid-row-bg-odd) var(--biz-data-grid-row-height),
      var(--biz-data-grid-row-bg-odd) calc(var(--biz-data-grid-row-height) * 2)
    );
  }

  /* Phantom & Content Layers */
  .biz-data-grid__phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    pointer-events: none;
  }

  .biz-data-grid__content {
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
  }

  /* Row & Cell Layout */
  .biz-data-grid__row {
    position: absolute;
    left: 0;
    top: 0;
    height: var(--biz-data-grid-row-height);
    display: flex;
    white-space: nowrap;
    transition: background-color 0.1s ease;
  }

  .biz-data-grid__row:hover {
    background-color: var(--biz-data-grid-hover-bg-color);
  }

  .biz-data-grid__row:active {
    background-color: var(--biz-data-grid-active-bg-color);
  }

  .biz-data-grid__cell {
    position: absolute;
    top: 0;
    height: 100%;
    border-right: 1px solid var(--biz-data-grid-cell-border-color);
    padding: 0 var(--biz-data-grid-cell-padding-x);
    display: flex;
    align-items: center;
    overflow: hidden;
    font-size: var(--biz-data-grid-font-size);
    background-repeat: no-repeat;
    background-position: 4px center;
    background-size: 14px 14px;
  }

  .biz-data-grid__cell-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .biz-data-grid__cell.has-icon {
    padding-left: 22px;
  }

  /* Data Type SVG Icons */
  .biz-data-grid__cell.type-string {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234A90E2"><path d="M13 6h-2v8h2V6zm4 0h-2v8h2V6zM7 6h2v8H7V6z"/></svg>');
  }

  .biz-data-grid__cell.type-number {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2350E3C2"><path d="M7 11h2v2H7zM11 11h2v2h-2zM15 11h2v2h-2z"/></svg>');
  }

  .biz-data-grid__cell.type-objectId {
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23F5A623"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg>');
  }

  /* --- 1.2 Variants --- */
  /* Outlined (Default) */
  :host([variant='outlined']) .biz-data-grid__viewport,
  .biz-data-grid__viewport {
    border: 1px solid var(--biz-data-grid-border-color);
    background-color: var(--biz-data-grid-bg-color);
  }

  /* Filled */
  :host([variant='filled']) .biz-data-grid__viewport {
    border: none;
    background-color: #f3f4f6;
  }

  /* Standard */
  :host([variant='standard']) .biz-data-grid__viewport {
    border: none;
    border-bottom: 2px solid var(--biz-data-grid-border-color);
    border-radius: 0;
  }

  /* --- 1.3 Sizes --- */
  /* Small */
  :host([size='small']) {
    --biz-data-grid-row-height: 32px;
    --biz-data-grid-header-height: 32px;
    --biz-data-grid-font-size: 12px;
    --biz-data-grid-cell-padding-x: 6px;
  }

  /* Medium (Default) */
  :host([size='medium']) {
    --biz-data-grid-row-height: 40px;
    --biz-data-grid-header-height: 40px;
    --biz-data-grid-font-size: 13px;
    --biz-data-grid-cell-padding-x: 8px;
  }

  /* Large */
  :host([size='large']) {
    --biz-data-grid-row-height: 48px;
    --biz-data-grid-header-height: 48px;
    --biz-data-grid-font-size: 14px;
    --biz-data-grid-cell-padding-x: 12px;
  }

  /* --- 3.2 States --- */
  /* Focus / Focus-visible */
  .biz-data-grid__viewport:focus-visible {
    border-color: var(--biz-data-grid-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-data-grid-focus-ring-color);
  }

  /* Disabled */
  :host([disabled]) .biz-data-grid__viewport {
    background-color: var(--biz-data-grid-disabled-bg-color);
    border-color: var(--biz-data-grid-disabled-border-color);
    color: var(--biz-data-grid-disabled-text-color);
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Readonly */
  :host([readonly]) .biz-data-grid__viewport {
    background-color: var(--biz-data-grid-readonly-bg-color);
    cursor: default;
  }

  /* Error */
  :host([error]) .biz-data-grid__viewport {
    border-color: var(--biz-data-grid-error-border-color);
  }

  :host([error]) .biz-data-grid__viewport:focus-visible {
    box-shadow: 0 0 0 3px var(--biz-data-grid-error-focus-ring);
  }

  :host([error]) .biz-data-grid__helper {
    color: var(--biz-data-grid-error-border-color);
  }

  /* Loading State & Overlay */
  .biz-data-grid__loading-overlay {
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

  .biz-data-grid__spinner {
    width: 24px;
    height: 24px;
    border: 3px solid #e5e7eb;
    border-top-color: var(--biz-data-grid-focus-border-color);
    border-radius: 50%;
    animation: biz-data-grid-spin 0.8s linear infinite;
  }

  @keyframes biz-data-grid-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;