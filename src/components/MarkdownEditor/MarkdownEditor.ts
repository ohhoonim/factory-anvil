import { html } from 'lit';
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface MarkdownEditorTemplateProps {
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
  parsedHtml: string;
  wordCount: number;
  charCount: number;
  lineCount: number;
  cursorLine: number;
  cursorCol: number;
  onInput: (e: Event) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onScroll: (e: Event) => void;
  onToolbarAction: (action: string) => void;
  onModeChange: (mode: 'split' | 'edit' | 'preview') => void;
  onMouseDownResizer: (e: MouseEvent) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onDrop: (e: DragEvent) => void;
}

export const MarkdownEditorTemplate = (props: MarkdownEditorTemplateProps) => html`
  <div
    class=${classMap({
      'biz-markdown-editor': true,
      'biz-markdown-editor--split': props.mode === 'split',
      'biz-markdown-editor--edit': props.mode === 'edit',
      'biz-markdown-editor--preview': props.mode === 'preview',
      'biz-markdown-editor--disabled': props.disabled,
      'biz-markdown-editor--readonly': props.readonly,
    })}
    style=${styleMap({
      height: props.height,
      maxHeight: props.maxHeight || 'none',
    })}
  >
    <div
      role="toolbar"
      aria-label="마크다운 에디터 도구 모음"
      class="biz-markdown-editor__toolbar"
    >
      <div class="biz-markdown-editor__toolbar-group">
        <slot name="toolbar-left-slot">
          <button
            type="button"
            aria-label="굵게"
            ?disabled=${props.disabled || props.readonly}
            @click=${() => props.onToolbarAction('bold')}
          >
            B
          </button>
          <button
            type="button"
            aria-label="기울임"
            ?disabled=${props.disabled || props.readonly}
            @click=${() => props.onToolbarAction('italic')}
          >
            I
          </button>
          <button
            type="button"
            aria-label="제목"
            ?disabled=${props.disabled || props.readonly}
            @click=${() => props.onToolbarAction('heading')}
          >
            H
          </button>
          <button
            type="button"
            aria-label="링크 삽입"
            ?disabled=${props.disabled || props.readonly}
            @click=${() => props.onToolbarAction('link')}
          >
            Link
          </button>
          <button
            type="button"
            aria-label="이미지 주입"
            ?disabled=${props.disabled || props.readonly}
            @click=${() => props.onToolbarAction('image')}
          >
            Image
          </button>
          <button
            type="button"
            aria-label="목록"
            ?disabled=${props.disabled || props.readonly}
            @click=${() => props.onToolbarAction('list')}
          >
            List
          </button>
        </slot>
      </div>

      <div class="biz-markdown-editor__toolbar-group">
        <slot name="toolbar-right-slot">
          <button
            type="button"
            aria-label="분할 뷰 모드"
            class=${classMap({ active: props.mode === 'split' })}
            ?disabled=${props.disabled}
            @click=${() => props.onModeChange('split')}
          >
            Split
          </button>
          <button
            type="button"
            aria-label="에디터 전용 모드"
            class=${classMap({ active: props.mode === 'edit' })}
            ?disabled=${props.disabled}
            @click=${() => props.onModeChange('edit')}
          >
            Edit
          </button>
          <button
            type="button"
            aria-label="미리보기 전용 모드"
            class=${classMap({ active: props.mode === 'preview' })}
            ?disabled=${props.disabled}
            @click=${() => props.onModeChange('preview')}
          >
            Preview
          </button>
        </slot>
      </div>
    </div>

    <div class="biz-markdown-editor__body">
      ${props.mode !== 'preview'
        ? html`
            <div class="biz-markdown-editor__editor-container">
              <slot name="editor-header-slot"></slot>
              <textarea
                id="editor-textarea"
                class="biz-markdown-editor__textarea"
                role="textbox"
                aria-multiline="true"
                aria-label="마크다운 에디터"
                .value=${props.value}
                placeholder=${props.placeholder}
                ?autofocus=${props.autofocus}
                ?readonly=${props.readonly}
                ?disabled=${props.disabled}
                @input=${props.onInput}
                @keydown=${props.onKeyDown}
                @scroll=${props.onScroll}
                @focus=${props.onFocus}
                @blur=${props.onBlur}
                @drop=${props.onDrop}
              ></textarea>
            </div>
          `
        : ''}
      ${props.mode === 'split'
        ? html`
            <div
              role="separator"
              aria-orientation="vertical"
              aria-label="화면 분할 조절바"
              class="biz-markdown-editor__resizer"
              @mousedown=${props.onMouseDownResizer}
            ></div>
          `
        : ''}
      ${props.mode !== 'edit'
        ? html`
            <div
              class="biz-markdown-editor__preview-container"
              role="region"
              aria-label="미리보기"
              @scroll=${props.onScroll}
            >
              <slot name="preview-header-slot"></slot>
              <slot name="custom-preview-slot">
                <div class="biz-markdown-editor__preview-content">
                  ${unsafeHTML(props.parsedHtml)}
                </div>
              </slot>
            </div>
          `
        : ''}
    </div>

    <div class="biz-markdown-editor__statusbar">
      <slot name="statusbar-slot">
        <span class="biz-markdown-editor__status-item">
          Ln ${props.cursorLine}, Col ${props.cursorCol}
        </span>
        <span class="biz-markdown-editor__status-item">
          Lines: ${props.lineCount}
        </span>
        <span class="biz-markdown-editor__status-item">
          Words: ${props.wordCount}
        </span>
        <span class="biz-markdown-editor__status-item">
          Chars: ${props.charCount}
        </span>
        <span class="biz-markdown-editor__status-item">
          Mode: ${props.mode}
        </span>
      </slot>
    </div>

    <div aria-live="polite" class="biz-markdown-editor__sr-only">
      현재 ${props.mode} 모드입니다.
    </div>
  </div>
`;