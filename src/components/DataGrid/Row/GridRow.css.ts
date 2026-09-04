import { css } from "lit";

export const GridrowStyles = css`
  :host {
    --grid-row-bg: #ffffff;
    --grid-row-hover-bg: #f1f5f9;
    --grid-row-dirty-bg: #fffbe6;
    --grid-row-selected-bg: #e6f4ff;
    --grid-row-border-bottom: 1px solid #e1e4e8;
    --grid-row-height: var(--ui-comp-grid-viewport-row-height, 36px);

    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--grid-row-height);
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none !important;
  }

  .grid-row {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--grid-row-bg);
    border-bottom: var(--grid-row-border-bottom);
    box-sizing: border-box;
    user-select: none;
    transition: background-color 0.15s ease;
  }

  .grid-row:hover {
    background-color: var(--grid-row-hover-bg);
  }

  /* Variants & States */
  .grid-row.is-dirty {
    background-color: var(--grid-row-dirty-bg);
  }

  .grid-row.is-selected {
    background-color: var(--grid-row-selected-bg);
  }

  .grid-row.is-dirty.is-selected {
    background-color: var(--grid-row-selected-bg);
  }

  .grid-row.is-inactive {
    visibility: hidden;
    pointer-events: none;
  }

  .grid-row.is-active {
    visibility: visible;
    pointer-events: auto;
  }

  /* Slot Layouts */
  .grid-row__cells {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    overflow: hidden;
  }

  .grid-row__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .grid-row__overlay ::slotted(*) {
    pointer-events: auto;
  }
`;