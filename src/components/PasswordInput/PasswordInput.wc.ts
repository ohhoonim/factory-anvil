import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PasswordInputTemplate, type PasswordInputHost } from './PasswordInput.ts';
import { passwordInputStyles } from './PasswordInput.css.ts';

@customElement('biz-password-input')
export class BizPasswordInput extends LitElement implements PasswordInputHost {
  static override styles = passwordInputStyles;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: Boolean, reflect: true })
  visible = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: Boolean, reflect: true })
  clearable = false;

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  handleInput(event: InputEvent): void {
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

  handleChange(event: Event): void {
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

  handleToggleVisibility(event: MouseEvent): void {
    event.preventDefault();
    if (this.disabled || this.readonly) return;

    this.visible = !this.visible;
    this.dispatchEvent(
      new CustomEvent('toggle-visibility', {
        detail: { visible: this.visible },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleClear(event: MouseEvent): void {
    event.preventDefault();
    if (this.disabled || this.readonly) return;

    this.value = '';
    this.dispatchEvent(
      new CustomEvent('clear', {
        detail: { value: '' },
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
  }

  handleFocus(event: FocusEvent): void {
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleBlur(event: FocusEvent): void {
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.clearable && this.value && !this.disabled && !this.readonly) {
      this.handleClear(event as unknown as MouseEvent);
    }
  }

  @state() hasLabel = false;

  handleLabelSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    this.hasLabel = nodes.length > 0;
  }

  override render() {
    return PasswordInputTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-password-input': BizPasswordInput;
  }
}