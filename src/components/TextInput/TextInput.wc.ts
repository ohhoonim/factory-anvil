import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TextInputTemplate } from './TextInput.js';
import { textInputStyles } from './TextInput.css.js';

@customElement('biz-text-input')
export class BizTextInput extends LitElement {
  static styles = textInputStyles;

  @property({ type: String })
  value = '';

  @property({ type: String })
  type = 'text';

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: Boolean })
  clearable = false;

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  @property({ type: Boolean })
  loading = false;

  @state()
  private isFocused = false;

  handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleFocus(event: FocusEvent) {
    this.isFocused = true;
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleBlur(event: FocusEvent) {
    this.isFocused = false;
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleClear(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.value = '';
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: '' },
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: '' },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.clearable && !this.disabled && !this.readonly && this.value) {
      this.handleClear(event as unknown as MouseEvent);
    }
  }

  render() {
    return TextInputTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-text-input': BizTextInput;
  }
}