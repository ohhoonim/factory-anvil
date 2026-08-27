import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface MarkdownEditorHost {
  value: string;
  mode: 'split' | 'edit' | 'preview';
  placeholder: string;
  syncScroll: boolean;
  height: string;
  maxHeight: string | null;
  autofocus: boolean;
  readonly: boolean;
  disabled: boolean;
  sanitize: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  size?: 'small' | 'medium' | 'large';
  isFocused: boolean;
  isResizing: boolean;
  isError?: boolean;
  isLoading?: boolean;
  splitRatio: number;
  charCount: number;
  wordCount: number;
  lineCount: number;
  cursorLine: number;
  cursorCol: number;
  renderedHtml: string;
  
  handleInput: (e: Event) => void;
  handleFocus: (e: FocusEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleScroll: (e: Event) => void;
  handleResizerMouseDown: (e: MouseEvent) => void;
  handleModeChange: (mode: 'split' | 'edit' | 'preview') => void;
  insertFormat: (type: string) => void;
}

export const MarkdownEditorTemplate = (host: MarkdownEditorHost) => {
  const containerClasses = [
    'biz-markdown-editor',
    `biz-markdown-editor--${host.variant || 'outlined'}`,
    `biz-markdown-editor--${host.size || 'medium'}`,
    `biz-markdown-editor--mode-${host.mode}`,
    host.isFocused ? 'biz-markdown-editor--focused' : '',
    host.isResizing ? 'biz-markdown-editor--resizing' : '',
    host.disabled ? 'biz-markdown-editor--disabled' : '',
    host.readonly ? 'biz-markdown-editor--readonly' : '',
    host.isError ? 'biz-markdown-editor--error' : '',
    host.isLoading ? 'biz-markdown-editor--loading' : ''
  ].filter(Boolean).join(' ');

  return html`
    <div
      class="${containerClasses}"
      style="height: ${host.height}; ${host.maxHeight ? `max-height: ${host.maxHeight};` : ''}"
    >
      <!-- Screen Reader Live Region -->
      <div class="biz-markdown-editor__sr-only" aria-live="polite">
        현재 모드: ${host.mode}. 글자 수: ${host.charCount}, 단어 수: ${host.wordCount}
      </div>

      <!-- Toolbar -->
      <div class="biz-markdown-editor__toolbar" role="toolbar" aria-label="에디터 도구 모음">
        <div class="biz-markdown-editor__toolbar-group">
          <slot name="start-slot"></slot>
          <slot name="toolbar-left-slot"></slot>

          <button
            type="button"
            class="biz-markdown-editor__toolbar-btn"
            aria-label="굵게"
            ?disabled="${host.disabled || host.readonly}"
            @click="${() => host.insertFormat('bold')}"
          >
            <b>B</b>
          </button>
          <button
            type="button"
            class="biz-markdown-editor__toolbar-btn"
            aria-label="기울임"
            ?disabled="${host.disabled || host.readonly}"
            @click="${() => host.insertFormat('italic')}"
          >
            <i>I</i>
          </button>
          <button
            type="button"
            class="biz-markdown-editor__toolbar-btn"
            aria-label="링크 삽입"
            ?disabled="${host.disabled || host.readonly}"
            @click="${() => host.insertFormat('link')}"
          >
            Link
          </button>
          <button
            type="button"
            class="biz-markdown-editor__toolbar-btn"
            aria-label="이미지 삽입"
            ?disabled="${host.disabled || host.readonly}"
            @click="${() => host.insertFormat('image')}"
          >
            Image
          </button>
        </div>

        <div class="biz-markdown-editor__toolbar-group">
          <slot name="toolbar-right-slot"></slot>
          <slot name="end-slot"></slot>

          <button
            type="button"
            class="biz-markdown-editor__toolbar-btn ${host.mode === 'split' ? 'biz-markdown-editor__toolbar-btn--active' : ''}"
            aria-label="분할 뷰"
            ?disabled="${host.disabled}"
            @click="${() => host.handleModeChange('split')}"
          >
            Split
          </button>
          <button
            type="button"
            class="biz-markdown-editor__toolbar-btn ${host.mode === 'edit' ? 'biz-markdown-editor__toolbar-btn--active' : ''}"
            aria-label="편집기만 보기"
            ?disabled="${host.disabled}"
            @click="${() => host.handleModeChange('edit')}"
          >
            Edit
          </button>
          <button
            type="button"
            class="biz-markdown-editor__toolbar-btn ${host.mode === 'preview' ? 'biz-markdown-editor__toolbar-btn--active' : ''}"
            aria-label="미리보기만 보기"
            ?disabled="${host.disabled}"
            @click="${() => host.handleModeChange('preview')}"
          >
            Preview
          </button>
        </div>
      </div>

      <!-- Main Workspace -->
      <div class="biz-markdown-editor__main">
        <!-- Editor Pane -->
        <div
          class="biz-markdown-editor__pane biz-markdown-editor__pane--editor"
          style="--editor-width: ${host.splitRatio}%"
        >
          <div class="biz-markdown-editor__pane-header">
            <slot name="label-slot"></slot>
            <slot name="editor-header-slot"></slot>
          </div>
          <textarea
            class="biz-markdown-editor__textarea"
            role="textbox"
            aria-multiline="true"
            aria-label="마크다운 에디터 입력창"
            .value="${host.value}"
            placeholder="${host.placeholder}"
            ?autofocus="${host.autofocus}"
            ?readonly="${host.readonly}"
            ?disabled="${host.disabled}"
            @input="${host.handleInput}"
            @focus="${host.handleFocus}"
            @blur="${host.handleBlur}"
            @keydown="${host.handleKeyDown}"
            @scroll="${host.handleScroll}"
          ></textarea>
        </div>

        <!-- Split Resizer -->
        <div
          class="biz-markdown-editor__resizer"
          role="separator"
          aria-orientation="vertical"
          aria-label="에디터 및 미리보기 크기 조절 바"
          @mousedown="${host.handleResizerMouseDown}"
        ></div>

        <!-- Preview Pane -->
        <div
          class="biz-markdown-editor__pane biz-markdown-editor__pane--preview"
          role="region"
          aria-label="미리보기"
        >
          <div class="biz-markdown-editor__pane-header">
            <slot name="preview-header-slot"></slot>
          </div>
          <div class="biz-markdown-editor__preview-content" @scroll="${host.handleScroll}">
            <slot name="custom-preview-slot">
              ${unsafeHTML(host.renderedHtml)}
            </slot>
          </div>
        </div>
      </div>

      <!-- Helper Text Slot -->
      <slot name="helper-text-slot"></slot>

      <!-- Status Bar -->
      <div class="biz-markdown-editor__statusbar">
        <slot name="statusbar-slot">
          <div class="biz-markdown-editor__statusbar-info">
            <span>Lines: ${host.lineCount}</span>
            <span>Words: ${host.wordCount}</span>
            <span>Chars: ${host.charCount}</span>
          </div>
          <div class="biz-markdown-editor__statusbar-info">
            <span>Ln: ${host.cursorLine}, Col: ${host.cursorCol}</span>
            <span>Mode: ${host.mode.toUpperCase()}</span>
          </div>
        </slot>
      </div>
    </div>
  `;
};