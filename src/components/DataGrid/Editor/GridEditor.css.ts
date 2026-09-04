import { css } from "lit";

export const GrideditorStyles = css`
  :host {
    --grid-editor-bg: #ffffff;
    --grid-editor-border: 2px solid #0969da;
    --grid-editor-font-size: 13px;
    --grid-editor-padding: 0 6px;
    --grid-editor-error-border: 1px solid #cf222e;
    --grid-editor-error-bg: #ffebe9;
    --grid-editor-error-color: #cf222e;
    --grid-editor-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  .grid-editor {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: var(--grid-editor-bg);
    border: var(--grid-editor-border);
    font-size: var(--grid-editor-font-size);
    padding: var(--grid-editor-padding);
  }

  .grid-editor__host {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .grid-editor__control {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: inherit;
    font-family: inherit;
    color: inherit;
    padding: 0;
    margin: 0;
  }

  /* Variant: Popup / Overlay */
  .grid-editor--select,
  .grid-editor--date {
    box-shadow: var(--grid-editor-shadow);
  }

  /* Variant: Invalid State */
  .grid-editor--invalid {
    border: var(--grid-editor-error-border);
    background-color: var(--grid-editor-error-bg);
  }

  /* Validation Message Indicator */
  .grid-editor__validation-message {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    margin-top: 2px;
    padding: 4px 8px;
    background-color: var(--grid-editor-error-bg);
    color: var(--grid-editor-error-color);
    border: var(--grid-editor-error-border);
    border-radius: 4px;
    font-size: 11px;
    white-space: nowrap;
    box-shadow: var(--grid-editor-shadow);
  }
`;