import { LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MultilineTextInputTemplate } from './MultilineTextInput.js';
import { multilineTextInputStyles } from './MultilineTextInput.css.js';

@customElement('biz-multiline-text-input')
export class BizMultilineTextInput extends LitElement {
  static styles = multilineTextInputStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Number }) rows = 3;
  @property({ type: Number, attribute: 'max-rows' }) maxRows = 0;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Boolean, attribute: 'show-count' }) showCount = false;
  @property({ type: Boolean, attribute: 'auto-resize' }) autoResize = false;
  @property({ type: String }) resize = 'vertical';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) variant = 'outlined';
  @property({ type: String }) size = 'medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;

  @query('textarea') textareaElement?: HTMLTextAreaElement;

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (this.autoResize && (changedProperties.has('value') || changedProperties.has('autoResize'))) {
      this.adjustHeight();
    }
  }

  firstUpdated() {
    if (this.autoResize) {
      this.adjustHeight();
    }
  }

  adjustHeight() {
    if (!this.textareaElement) return;

    this.textareaElement.style.height = 'auto';
    let newHeight = this.textareaElement.scrollHeight;

    if (this.maxRows > 0) {
      const lineHeight = parseFloat(getComputedStyle(this.textareaElement).lineHeight) || 21;
      const maxHeight = lineHeight * this.maxRows;
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        this.textareaElement.style.overflowY = 'auto';
      } else {
        this.textareaElement.style.overflowY = 'hidden';
      }
    } else {
      this.textareaElement.style.overflowY = 'hidden';
    }

    this.textareaElement.style.height = `${newHeight}px`;
  }

  handleInput(event: InputEvent) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;

    if (this.autoResize) {
      this.adjustHeight();
    }

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }

  handleChange(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      })
    );
  }

  handleFocus(event: FocusEvent) {
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: event.relatedTarget
      })
    );
  }

  handleBlur(event: FocusEvent) {
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: event.relatedTarget
      })
    );
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.dispatchEvent(
        new CustomEvent('clear', {
          detail: { value: this.value },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  render() {
    return MultilineTextInputTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-multiline-text-input': BizMultilineTextInput;
  }
}