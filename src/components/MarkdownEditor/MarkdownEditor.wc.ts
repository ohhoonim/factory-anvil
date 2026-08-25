import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from "lit/decorators.js";
import { MarkdownEditorTemplate } from "./MarkdownEditor";
import { markdownEditorStyles } from "./MarkdownEditor.css";

/**
 * @element biz-markdown-editor
 * 
 * @slot toolbar-left-slot
 * @slot toolbar-right-slot
 * @slot editor-header-slot
 * @slot preview-header-slot
 * @slot custom-preview-slot
 * @slot statusbar-slot
 */
@customElement('biz-markdown-editor')
export class BizMarkdownEditor extends LitElement {
  static styles = markdownEditorStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) mode: 'split' | 'edit' | 'preview' = 'split';
  @property({ type: String }) placeholder = '마크다운을 입력하세요...';
  @property({ type: Boolean, attribute: 'sync-scroll' }) syncScroll = true;
  @property({ type: String }) height = '500px';
  @property({ type: String, attribute: 'max-height' }) maxHeight: string | null = null;
  @property({ type: Boolean }) autofocus = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) sanitize = true;

  @state() private parsedHtml = '';
  @state() private wordCount = 0;
  @state() private charCount = 0;
  @state() private lineCount = 1;
  @state() private cursorLine = 1;
  @state() private cursorCol = 1;

  private isSyncingScroll = false;

  firstUpdated() {
    this.updateParsedContent();
    if (this.autofocus) {
      const textarea = this.shadowRoot?.querySelector('#editor-textarea') as HTMLTextAreaElement;
      textarea?.focus();
    }
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value') || changedProperties.has('sanitize')) {
      this.updateParsedContent();
    }
  }

  private parseMarkdown(input: string): string {
    let html = input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (!this.sanitize) {
      html = input;
    }

    html = html
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.* animate?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.* animate?)\*/gim, '<i>$1</i>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" referrerpolicy="no-referrer" width="400px" height="300px"/>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/gim, '<br />');

    return html;
  }

  private updateParsedContent() {
    this.parsedHtml = this.parseMarkdown(this.value);
    this.calculateStats();
  }

  private calculateStats() {
    const text = this.value || '';
    this.charCount = text.length;
    this.wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text.split('\n');
    this.lineCount = lines.length;
  }

  private updateCursorPosition(textarea: HTMLTextAreaElement) {
    const start = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, start);
    const lines = textBeforeCursor.split('\n');
    this.cursorLine = lines.length;
    this.cursorCol = lines[lines.length - 1].length + 1;
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.updateCursorPosition(target);

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { markdown: this.value, html: this.parsedHtml },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    const target = e.target as HTMLTextAreaElement;
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;

    if (modifier && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      this.applyFormatting('**', '**');
      return;
    }

    if (modifier && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      this.applyFormatting('*', '*');
      return;
    }

    if (modifier && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.applyFormatting('[', '](url)');
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const start = target.selectionStart;
      const end = target.selectionEnd;
      this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
      this.updateComplete.then(() => {
        target.selectionStart = target.selectionEnd = start + 2;
        this.updateCursorPosition(target);
      });
      return;
    }

    if (e.key === 'Escape') {
      target.blur();
      return;
    }

    const pairMap: Record<string, string> = {
      '*': '*',
      '`': '`',
      '[': ']',
      '(': ')',
    };

    if (pairMap[e.key]) {
      const start = target.selectionStart;
      const end = target.selectionEnd;
      if (start !== end) {
        e.preventDefault();
        const selected = this.value.substring(start, end);
        const closing = pairMap[e.key];
        this.value =
          this.value.substring(0, start) +
          e.key +
          selected +
          closing +
          this.value.substring(end);
        this.updateComplete.then(() => {
          target.selectionStart = start + 1;
          target.selectionEnd = end + 1;
        });
      }
    }

    setTimeout(() => this.updateCursorPosition(target), 0);
  }

  private applyFormatting(prefix: string, suffix: string) {
    const textarea = this.shadowRoot?.querySelector('#editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = this.value.substring(start, end);
    const replacement = `${prefix}${selectedText}${suffix}`;

    this.value = this.value.substring(0, start) + replacement + this.value.substring(end);

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { markdown: this.value, html: this.parsedHtml },
        bubbles: true,
        composed: true,
      })
    );

    this.updateComplete.then(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      this.updateCursorPosition(textarea);
    });
  }

  private handleToolbarAction(action: string) {
    switch (action) {
      case 'bold':
        this.applyFormatting('**', '**');
        break;
      case 'italic':
        this.applyFormatting('*', '*');
        break;
      case 'heading':
        this.applyFormatting('# ', '');
        break;
      case 'link':
        this.applyFormatting('[', '](https://)');
        break;
      case 'image':
        this.applyFormatting('![alt](', ')');
        break;
      case 'list':
        this.applyFormatting('- ', '');
        break;
    }
  }

  private handleModeChange(newMode: 'split' | 'edit' | 'preview') {
    this.mode = newMode;
    this.dispatchEvent(
      new CustomEvent('mode-change', {
        detail: { mode: this.mode },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleScroll(e: Event) {
    if (!this.syncScroll || this.isSyncingScroll || this.mode !== 'split') return;

    const source = e.target as HTMLElement;
    const isEditor = source.classList.contains('biz-markdown-editor__textarea');

    const editorEl = this.shadowRoot?.querySelector('.biz-markdown-editor__textarea') as HTMLElement;
    const previewEl = this.shadowRoot?.querySelector('.biz-markdown-editor__preview-container') as HTMLElement;

    if (!editorEl || !previewEl) return;

    this.isSyncingScroll = true;

    if (isEditor) {
      const percentage = editorEl.scrollTop / (editorEl.scrollHeight - editorEl.clientHeight || 1);
      previewEl.scrollTop = percentage * (previewEl.scrollHeight - previewEl.clientHeight);
    } else {
      const percentage = previewEl.scrollTop / (previewEl.scrollHeight - previewEl.clientHeight || 1);
      editorEl.scrollTop = percentage * (editorEl.scrollHeight - editorEl.clientHeight);
    }

    requestAnimationFrame(() => {
      this.isSyncingScroll = false;
    });
  }

  private handleMouseDownResizer(e: MouseEvent) {
    e.preventDefault();
    const body = this.shadowRoot?.querySelector('.biz-markdown-editor__body') as HTMLElement;
    const editor = this.shadowRoot?.querySelector('.biz-markdown-editor__editor-container') as HTMLElement;
    if (!body || !editor) return;

    const startX = e.clientX;
    const startWidth = editor.getBoundingClientRect().width;
    const totalWidth = body.getBoundingClientRect().width;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(100, Math.min(totalWidth - 100, startWidth + deltaX));
      const flexBasis = `${(newWidth / totalWidth) * 100}%`;
      editor.style.flex = `0 0 ${flexBasis}`;
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  private handleFocus(e: FocusEvent) {
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: e,
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleBlur(e: FocusEvent) {
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: e,
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleDrop(e: DragEvent) {
    if (!e.dataTransfer?.files || e.dataTransfer.files.length === 0) return;

    const file = e.dataTransfer.files[0];
    if (file.type.startsWith('image/')) {
      e.preventDefault();
      const insert = (url: string) => {
        this.applyFormatting(`![${file.name}](`, `${url})`);
      };

      this.dispatchEvent(
        new CustomEvent('upload-image', {
          detail: { file, insert },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  public clear() {
    this.value = '';
    this.updateParsedContent();
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return MarkdownEditorTemplate({
      value: this.value,
      mode: this.mode,
      placeholder: this.placeholder,
      syncScroll: this.syncScroll,
      height: this.height,
      maxHeight: this.maxHeight,
      autofocus: this.autofocus,
      readonly: this.readonly,
      disabled: this.disabled,
      sanitize: this.sanitize,
      parsedHtml: this.parsedHtml,
      wordCount: this.wordCount,
      charCount: this.charCount,
      lineCount: this.lineCount,
      cursorLine: this.cursorLine,
      cursorCol: this.cursorCol,
      onInput: this.handleInput.bind(this),
      onKeyDown: this.handleKeyDown.bind(this),
      onScroll: this.handleScroll.bind(this),
      onToolbarAction: this.handleToolbarAction.bind(this),
      onModeChange: this.handleModeChange.bind(this),
      onMouseDownResizer: this.handleMouseDownResizer.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      onDrop: this.handleDrop.bind(this),
    });
  }
}