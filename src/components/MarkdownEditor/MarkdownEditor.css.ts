import { css } from 'lit';

export const markdownEditorStyles = css`
  :host {
    /* Layout & Sizing */
    --biz-markdown-editor-width: 100%;
    --biz-markdown-editor-height: 500px;
    --biz-markdown-editor-border-radius: 6px;
    --biz-markdown-editor-toolbar-height: 42px;
    --biz-markdown-editor-statusbar-height: 28px;

    /* Colors - Base & Panels */
    --biz-markdown-editor-bg: #ffffff;
    --biz-markdown-editor-border-color: #d1d5db;
    --biz-markdown-editor-toolbar-bg: #f9fafb;
    --biz-markdown-editor-statusbar-bg: #f3f4f6;
    --biz-markdown-editor-text-color: #111827;

    /* Colors - Editor & Syntax */
    --biz-markdown-editor-editor-bg: #ffffff;
    --biz-markdown-editor-preview-bg: #ffffff;
    --biz-markdown-editor-resizer-bg: #e5e7eb;
    --biz-markdown-editor-resizer-hover-bg: #2563eb;

    /* Colors - Focus & Active States */
    --biz-markdown-editor-focus-border-color: #2563eb;
    --biz-markdown-editor-focus-ring-color: rgba(37, 99, 235, 0.2);
    --biz-markdown-editor-toolbar-btn-hover-bg: #e5e7eb;

    /* Colors - Disabled & Readonly */
    --biz-markdown-editor-disabled-bg: #f3f4f6;
    --biz-markdown-editor-disabled-text-color: #9ca3af;
    --biz-markdown-editor-error-border-color: #dc2626;

    display: block;
    width: var(--biz-markdown-editor-width);
    box-sizing: border-box;
  }

  .biz-markdown-editor {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: var(--biz-markdown-editor-height);
    border: 1px solid var(--biz-markdown-editor-border-color);
    border-radius: var(--biz-markdown-editor-border-radius);
    background-color: var(--biz-markdown-editor-bg);
    color: var(--biz-markdown-editor-text-color);
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    box-sizing: border-box;
  }

  /* Variants */
  .biz-markdown-editor--outlined {
    border: 1px solid var(--biz-markdown-editor-border-color);
  }

  .biz-markdown-editor--filled {
    border: none;
    background-color: var(--biz-markdown-editor-toolbar-bg);
  }

  .biz-markdown-editor--standard {
    border: none;
    border-bottom: 2px solid var(--biz-markdown-editor-border-color);
    border-radius: 0;
  }

  /* Sizes */
  .biz-markdown-editor--small {
    --biz-markdown-editor-toolbar-height: 34px;
    --biz-markdown-editor-statusbar-height: 22px;
    font-size: 12px;
  }

  .biz-markdown-editor--medium {
    --biz-markdown-editor-toolbar-height: 42px;
    --biz-markdown-editor-statusbar-height: 28px;
    font-size: 14px;
  }

  .biz-markdown-editor--large {
    --biz-markdown-editor-toolbar-height: 50px;
    --biz-markdown-editor-statusbar-height: 34px;
    font-size: 16px;
  }

  /* Toolbar */
  .biz-markdown-editor__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--biz-markdown-editor-toolbar-height);
    background-color: var(--biz-markdown-editor-toolbar-bg);
    border-bottom: 1px solid var(--biz-markdown-editor-border-color);
    padding: 0 8px;
    box-sizing: border-box;
  }

  .biz-markdown-editor__toolbar-group {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .biz-markdown-editor__toolbar button {
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;
    font-size: inherit;
    color: var(--biz-markdown-editor-text-color);
  }

  .biz-markdown-editor__toolbar button:hover:not(:disabled) {
    background-color: var(--biz-markdown-editor-toolbar-btn-hover-bg);
  }

  .biz-markdown-editor__toolbar button.active {
    background-color: var(--biz-markdown-editor-resizer-bg);
    font-weight: bold;
  }

  /* Body & Layout Modes */
  .biz-markdown-editor__body {
    display: flex;
    flex: 1;
    min-height: 0;
    position: relative;
  }

  .biz-markdown-editor__editor-container,
  .biz-markdown-editor__preview-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: auto;
    box-sizing: border-box;
  }

  .biz-markdown-editor__textarea {
    width: 100%;
    height: 100%;
    border: none;
    padding: 12px;
    resize: none;
    outline: none;
    font-family: monospace;
    font-size: inherit;
    background-color: var(--biz-markdown-editor-editor-bg);
    color: var(--biz-markdown-editor-text-color);
    box-sizing: border-box;
  }

  .biz-markdown-editor__preview-container {
    background-color: var(--biz-markdown-editor-preview-bg);
    padding: 12px;
    border-left: 1px solid var(--biz-markdown-editor-border-color);
  }

  .biz-markdown-editor--edit .biz-markdown-editor__preview-container,
  .biz-markdown-editor--preview .biz-markdown-editor__editor-container {
    display: none;
  }

  .biz-markdown-editor--preview .biz-markdown-editor__preview-container {
    border-left: none;
  }

  /* Split Resizer */
  .biz-markdown-editor__resizer {
    width: 4px;
    background-color: var(--biz-markdown-editor-resizer-bg);
    cursor: col-resize;
    user-select: none;
    transition: background-color 0.2s;
  }

  .biz-markdown-editor__resizer:hover,
  .biz-markdown-editor__resizer:active {
    background-color: var(--biz-markdown-editor-resizer-hover-bg);
  }

  /* Status Bar */
  .biz-markdown-editor__statusbar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    height: var(--biz-markdown-editor-statusbar-height);
    background-color: var(--biz-markdown-editor-statusbar-bg);
    border-top: 1px solid var(--biz-markdown-editor-border-color);
    padding: 0 12px;
    font-size: 12px;
    color: var(--biz-markdown-editor-disabled-text-color);
    box-sizing: border-box;
  }

  /* States: Focus, Hover, Active, Disabled, Readonly, Error, Loading */
  .biz-markdown-editor:focus-within {
    border-color: var(--biz-markdown-editor-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-markdown-editor-focus-ring-color);
  }

  .biz-markdown-editor--disabled {
    background-color: var(--biz-markdown-editor-disabled-bg);
    color: var(--biz-markdown-editor-disabled-text-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  .biz-markdown-editor--disabled .biz-markdown-editor__textarea {
    background-color: var(--biz-markdown-editor-disabled-bg);
    cursor: not-allowed;
  }

  .biz-markdown-editor--readonly .biz-markdown-editor__textarea {
    background-color: var(--biz-markdown-editor-disabled-bg);
  }

  .biz-markdown-editor--error {
    border-color: var(--biz-markdown-editor-error-border-color);
  }

  .biz-markdown-editor--loading {
    pointer-events: none;
    opacity: 0.6;
  }

  /* Screen Reader Only */
  .biz-markdown-editor__sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;