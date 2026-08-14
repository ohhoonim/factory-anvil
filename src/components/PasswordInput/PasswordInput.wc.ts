import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { PasswordInputTemplate } from "./PasswordInput";
import { passwordInputStyles } from "./PasswordInput.css";

@customElement('biz-password-input')
export class BizPasswordInput extends LitElement {
  static styles = passwordInputStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean, reflect: true }) visible = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, reflect: true }) clearable = false;
  @property({ type: String, reflect: true }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false;

  handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  handleChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  handleToggleVisibility() {
    if (this.disabled || this.readonly) return;
    this.visible = !this.visible;
    this.dispatchEvent(
      new CustomEvent('toggle-visibility', {
        bubbles: true,
        composed: true,
        detail: { visible: this.visible },
      })
    );
  }

  handleClear() {
    if (this.disabled || this.readonly) return;
    this.value = '';
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
        detail: { value: '' },
      })
    );
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: '' },
      })
    );
  }

  handleFocus(event: FocusEvent) {
    this.dispatchEvent(
      new CustomEvent('focus', {
        bubbles: true,
        composed: true,
        detail: event,
      })
    );
  }

  handleBlur(event: FocusEvent) {
    this.dispatchEvent(
      new CustomEvent('blur', {
        bubbles: true,
        composed: true,
        detail: event,
      })
    );
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.clearable && this.value) {
      this.handleClear();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  render() {
    return PasswordInputTemplate(this);
  }
}