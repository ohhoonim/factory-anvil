import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { markdownEditorStyles } from './MarkdownEditor.css.js';
import { MarkdownEditorTemplate, type MarkdownEditorHost } from './MarkdownEditor.js';

@customElement('biz-markdown-editor')
export class BizMarkdownEditor extends LitElement implements MarkdownEditorHost {
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
  @property({ type: String }) variant?: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size?: 'small' | 'medium' | 'large' = 'medium';

  @state() isFocused = false;
  @state() isResizing = false;
  @state() isError = false;
  @state() isLoading = false;
  @state() splitRatio = 50;
  @state() charCount = 0;
  @state() wordCount = 0;
  @state() lineCount = 1;
  @state() cursorLine = 1;
  @state() cursorCol = 1;
  @state() renderedHtml = '';

  @query('.biz-markdown-editor__textarea') textareaEl?: HTMLTextAreaElement;
  @query('.biz-markdown-editor__preview-content') previewEl?: HTMLDivElement;

  private isSyncingScroll = false;

  connectedCallback() {
    super.connectedCallback();
    this.updateStatsAndRender(this.value);
  }

  firstUpdated() {
    if (this.autofocus && this.textareaEl) {
      this.textareaEl.focus();
    }
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this.updateStatsAndRender(this.value);
    }
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  private parseMarkdown(text: string): string {
    let raw = text;
    if (this.sanitize) {
      raw = this.escapeHtml(raw);
    }

    const htmlStr = raw
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/gim, '<br />');

    return htmlStr;
  }

  private updateStatsAndRender(val: string) {
    this.charCount = val.length;
    this.wordCount = val.trim() ? val.trim().split(/\s+/).length : 0;
    const lines = val.split('\n');
    this.lineCount = lines.length;
    this.renderedHtml = this.parseMarkdown(val);
  }

  private updateCursorStats() {
    if (!this.textareaEl) return;
    const pos = this.textareaEl.selectionStart;
    const val = this.textareaEl.value;
    const lines = val.substring(0, pos).split('\n');
    this.cursorLine = lines.length;
    this.cursorCol = lines[lines.length - 1].length + 1;
  }

  handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.updateCursorStats();

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { markdown: this.value, html: this.renderedHtml }
      })
    );
  }

  handleFocus(e: FocusEvent) {
    this.isFocused = true;
    this.dispatchEvent(
      new CustomEvent('focus', {
        bubbles: true,
        composed: true,
        detail: e
      })
    );
  }

  handleBlur(e: FocusEvent) {
    this.isFocused = false;
    this.dispatchEvent(
      new CustomEvent('blur', {
        bubbles: true,
        composed: true,
        detail: e
      })
    );
  }

  handleKeyDown(e: KeyboardEvent) {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    if (cmdOrCtrl && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      this.insertFormat('bold');
      return;
    }
    if (cmdOrCtrl && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      this.insertFormat('italic');
      return;
    }
    if (cmdOrCtrl && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.insertFormat('link');
      return;
    }

    if (e.key === 'Escape') {
      if (this.textareaEl) {
        this.textareaEl.focus();
      }
      return;
    }

    const pairs: Record<string, string> = {
      '*': '*',
      '`': '`',
      '[': ']',
      '(': ')'
    };

    if (pairs[e.key] && this.textareaEl) {
      const start = this.textareaEl.selectionStart;
      const end = this.textareaEl.selectionEnd;
      if (start !== end) {
        e.preventDefault();
        const selected = this.value.substring(start, end);
        const replacement = `${e.key}${selected}${pairs[e.key]}`;
        this.value = this.value.substring(0, start) + replacement + this.value.substring(end);
        this.requestUpdate();
        setTimeout(() => {
          if (this.textareaEl) {
            this.textareaEl.setSelectionRange(start + 1, end + 1);
          }
        }, 0);
        return;
      }
    }

    if (e.key === 'Enter' && this.textareaEl) {
      const start = this.textareaEl.selectionStart;
      const currentLine = this.value.substring(0, start).split('\n').pop() || '';
      const listMatch = currentLine.match(/^(\s*(-|\*|\d+\.)\s+)/);
      if (listMatch) {
        e.preventDefault();
        const prefix = listMatch[1];
        const insertion = `\n${prefix}`;
        this.value = this.value.substring(0, start) + insertion + this.value.substring(start);
        this.requestUpdate();
        setTimeout(() => {
          if (this.textareaEl) {
            const newPos = start + insertion.length;
            this.textareaEl.setSelectionRange(newPos, newPos);
          }
        }, 0);
        return;
      }
    }

    setTimeout(() => this.updateCursorStats(), 0);
  }

  handleScroll(e: Event) {
    if (!this.syncScroll || this.mode !== 'split' || this.isSyncingScroll) return;

    const target = e.target as HTMLElement;
    this.isSyncingScroll = true;

    if (target === this.textareaEl && this.previewEl) {
      const percentage = target.scrollTop / (target.scrollHeight - target.clientHeight || 1);
      this.previewEl.scrollTop = percentage * (this.previewEl.scrollHeight - this.previewEl.clientHeight);
    } else if (target === this.previewEl && this.textareaEl) {
      const percentage = target.scrollTop / (target.scrollHeight - target.clientHeight || 1);
      this.textareaEl.scrollTop = percentage * (this.textareaEl.scrollHeight - this.textareaEl.clientHeight);
    }

    requestAnimationFrame(() => {
      this.isSyncingScroll = false;
    });
  }

  handleResizerMouseDown(e: MouseEvent) {
    e.preventDefault();
    this.isResizing = true;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (!this.isResizing) return;
      const rect = this.getBoundingClientRect();
      const offsetX = moveEvent.clientX - rect.left;
      let ratio = (offsetX / rect.width) * 100;
      if (ratio < 15) ratio = 15;
      if (ratio > 85) ratio = 85;
      this.splitRatio = ratio;
    };

    const onMouseUp = () => {
      this.isResizing = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  handleModeChange(newMode: 'split' | 'edit' | 'preview') {
    this.mode = newMode;
    this.dispatchEvent(
      new CustomEvent('mode-change', {
        bubbles: true,
        composed: true,
        detail: { mode: this.mode }
      })
    );
  }

  insertFormat(type: string) {
    if (!this.textareaEl || this.readonly || this.disabled) return;

    const start = this.textareaEl.selectionStart;
    const end = this.textareaEl.selectionEnd;
    const selected = this.value.substring(start, end);

    let formatted = '';
    let cursorOffset = 0;

    switch (type) {
      case 'bold':
        formatted = `**${selected || 'bold text'}**`;
        cursorOffset = selected ? formatted.length : 2;
        break;
      case 'italic':
        formatted = `*${selected || 'italic text'}*`;
        cursorOffset = selected ? formatted.length : 1;
        break;
      case 'link':
        formatted = `[${selected || 'link text'}](https://)`;
        cursorOffset = selected ? formatted.length - 1 : 1;
        break;
      case 'image':
        formatted = `![${selected || 'alt text'}](https://)`;
        cursorOffset = selected ? formatted.length - 1 : 2;
        break;
      default:
        return;
    }

    this.value = this.value.substring(0, start) + formatted + this.value.substring(end);
    this.updateStatsAndRender(this.value);

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { markdown: this.value, html: this.renderedHtml }
      })
    );

    setTimeout(() => {
      if (this.textareaEl) {
        this.textareaEl.focus();
        this.textareaEl.setSelectionRange(start + cursorOffset, start + cursorOffset);
      }
    }, 0);
  }

  public clear() {
    this.value = '';
    this.updateStatsAndRender('');
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
        detail: null
      })
    );
  }

  render() {
    return html`${MarkdownEditorTemplate(this)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-markdown-editor': BizMarkdownEditor;
  }
}