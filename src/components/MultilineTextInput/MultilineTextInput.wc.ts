import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MultilineTextInputTemplate, type MultilineTextInputHost } from './MultilineTextInput.js';
import { multilineTextInputStyles } from './MultilineTextInput.css.js';

@customElement('biz-multiline-text-input')
export class BizMultilineTextInput extends LitElement implements MultilineTextInputHost {
  static styles = multilineTextInputStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Number }) rows = 3;
  @property({ type: Number, attribute: 'max-rows' }) maxRows = 0;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Boolean, attribute: 'show-count' }) showCount = false;
  @property({ type: Boolean, attribute: 'auto-resize' }) autoResize = false;
  @property({ type: String }) resize: 'none' | 'both' | 'horizontal' | 'vertical' = 'vertical';
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;

  @query('textarea') private textareaElement?: HTMLTextAreaElement;

  updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('value') || changedProperties.has('autoResize')) {
      this.adjustHeight();
    }
  }

  private adjustHeight(): void {
    if (!this.autoResize || !this.textareaElement) return;

    this.textareaElement.style.height = 'auto';
    const computedStyle = window.getComputedStyle(this.textareaElement);
    const lineHeight = parseInt(computedStyle.lineHeight, 10) || 20;
    const paddingTop = parseInt(computedStyle.paddingTop, 10) || 0;
    const paddingBottom = parseInt(computedStyle.paddingBottom, 10) || 0;
    const borderTop = parseInt(computedStyle.borderTopWidth, 10) || 0;
    const borderBottom = parseInt(computedStyle.borderBottomWidth, 10) || 0;

    const contentHeight = this.textareaElement.scrollHeight;
    let targetHeight = contentHeight;

    if (this.maxRows > 0) {
      const maxHeight = (lineHeight * this.maxRows) + paddingTop + paddingBottom + borderTop + borderBottom;
      if (targetHeight > maxHeight) {
        targetHeight = maxHeight;
        this.textareaElement.style.overflowY = 'auto';
      } else {
        this.textareaElement.style.overflowY = 'hidden';
      }
    } else {
      this.textareaElement.style.overflowY = 'hidden';
    }

    this.textareaElement.style.height = `${targetHeight}px`;
  }

  handleInput(event: InputEvent): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.adjustHeight();

    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      })
    );
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      })
    );
  }

  handleFocus(event: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: event.relatedTarget
      })
    );
  }

  handleBlur(event: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: event.relatedTarget
      })
    );
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