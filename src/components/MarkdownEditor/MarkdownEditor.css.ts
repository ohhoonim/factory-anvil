import { css } from "lit";

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

    /* Colors - Disabled */
    --biz-markdown-editor-disabled-bg: #f3f4f6;
    --biz-markdown-editor-disabled-text-color: #9ca3af;

    /* Colors - Error & Loading */
    --biz-markdown-editor-error-border-color: #ef4444;
    --biz-markdown-editor-error-ring-color: rgba(239, 68, 68, 0.2);

    display: block;
    width: var(--biz-markdown-editor-width);
    box-sizing: border-box;
  }

  *, *::before, *::after {
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
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  /* Variants */
  .biz-markdown-editor--outlined {
    border: 1px solid var(--biz-markdown-editor-border-color);
  }

  .biz-markdown-editor--filled {
    background-color: var(--biz-markdown-editor-toolbar-bg);
    border: 1px solid transparent;
  }

  .biz-markdown-editor--standard {
    border: none;
    border-bottom: 1px solid var(--biz-markdown-editor-border-color);
    border-radius: 0;
  }

  /* Sizes */
  .biz-markdown-editor--small {
    --biz-markdown-editor-toolbar-height: 34px;
    --biz-markdown-editor-statusbar-height: 24px;
    font-size: 12px;
  }

  .biz-markdown-editor--medium {
    --biz-markdown-editor-toolbar-height: 42px;
    --biz-markdown-editor-statusbar-height: 28px;
    font-size: 14px;
  }

  .biz-markdown-editor--large {
    --biz-markdown-editor-toolbar-height: 50px;
    --biz-markdown-editor-statusbar-height: 32px;
    font-size: 16px;
  }

  /* States */
  .biz-markdown-editor:hover:not(.biz-markdown-editor--disabled) {
    border-color: var(--biz-markdown-editor-focus-border-color);
  }

  .biz-markdown-editor--focused {
    border-color: var(--biz-markdown-editor-focus-border-color);
    box-shadow: 0 0 0 3px var(--biz-markdown-editor-focus-ring-color);
  }

  .biz-markdown-editor--error {
    border-color: var(--biz-markdown-editor-error-border-color);
  }

  .biz-markdown-editor--error.biz-markdown-editor--focused {
    box-shadow: 0 0 0 3px var(--biz-markdown-editor-error-ring-color);
  }

  .biz-markdown-editor--disabled {
    background-color: var(--biz-markdown-editor-disabled-bg);
    color: var(--biz-markdown-editor-disabled-text-color);
    cursor: not-allowed;
    opacity: 0.7;
  }

  .biz-markdown-editor--readonly {
    background-color: var(--biz-markdown-editor-statusbar-bg);
  }

  .biz-markdown-editor--loading {
    pointer-events: none;
    opacity: 0.6;
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
    gap: 8px;
  }

  .biz-markdown-editor__toolbar-group {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .biz-markdown-editor__toolbar-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border: none;
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
    color: inherit;
    font-size: inherit;
  }

  .biz-markdown-editor__toolbar-btn:hover:not(:disabled) {
    background-color: var(--biz-markdown-editor-toolbar-btn-hover-bg);
  }

  .biz-markdown-editor__toolbar-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .biz-markdown-editor__toolbar-btn--active {
    background-color: var(--biz-markdown-editor-resizer-bg);
    font-weight: bold;
  }

  /* Main Workspace & Modes */
  .biz-markdown-editor__main {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .biz-markdown-editor__pane {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .biz-markdown-editor__pane--editor {
    width: var(--editor-width, 50%);
    background-color: var(--biz-markdown-editor-editor-bg);
  }

  .biz-markdown-editor__pane--preview {
    flex: 1;
    background-color: var(--biz-markdown-editor-preview-bg);
  }

  .biz-markdown-editor--mode-edit .biz-markdown-editor__pane--editor {
    width: 100%;
  }

  .biz-markdown-editor--mode-edit .biz-markdown-editor__pane--preview,
  .biz-markdown-editor--mode-edit .biz-markdown-editor__resizer {
    display: none;
  }

  .biz-markdown-editor--mode-preview .biz-markdown-editor__pane--editor,
  .biz-markdown-editor--mode-preview .biz-markdown-editor__resizer {
    display: none;
  }

  .biz-markdown-editor--mode-preview .biz-markdown-editor__pane--preview {
    width: 100%;
  }

  /* Header Slots */
  .biz-markdown-editor__pane-header {
    border-bottom: 1px solid var(--biz-markdown-editor-border-color);
    background: var(--biz-markdown-editor-toolbar-bg);
  }

  /* Editor Textarea */
  .biz-markdown-editor__textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    resize: none;
    padding: 12px;
    font-family: monospace;
    font-size: inherit;
    line-height: 1.5;
    color: inherit;
    background: transparent;
  }

  .biz-markdown-editor__textarea:disabled {
    cursor: not-allowed;
  }

  /* Preview Render Area */
  .biz-markdown-editor__preview-content {
    height: 100%;
    overflow-y: auto;
    padding: 12px;
  }

  /* Split Resizer */
  .biz-markdown-editor__resizer {
    width: 4px;
    height: 100%;
    background-color: var(--biz-markdown-editor-resizer-bg);
    cursor: col-resize;
    user-select: none;
    transition: background-color 0.2s;
  }

  .biz-markdown-editor__resizer:hover,
  .biz-markdown-editor--resizing .biz-markdown-editor__resizer {
    background-color: var(--biz-markdown-editor-resizer-hover-bg);
  }

  /* Status Bar */
  .biz-markdown-editor__statusbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--biz-markdown-editor-statusbar-height);
    background-color: var(--biz-markdown-editor-statusbar-bg);
    border-top: 1px solid var(--biz-markdown-editor-border-color);
    padding: 0 12px;
    font-size: 0.85em;
  }

  .biz-markdown-editor__statusbar-info {
    display: flex;
    gap: 12px;
  }

  /* Visually Hidden Live Region */
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