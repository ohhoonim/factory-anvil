import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { RadioButtonTemplate } from './RadioButton.js';
import type { RadioButtonHost } from './RadioButton.js';
import { radioButtonStyles } from './RadioButton.css.js';

@customElement('biz-radio-button')
export class BizRadioButton extends LitElement implements RadioButtonHost {
  static override styles = radioButtonStyles;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String })
  value: string | number | boolean = '';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String })
  variant: 'standard' | 'button' | 'card' | 'outlined' | 'filled' = 'standard';

  @property({ type: String, attribute: 'label-position' })
  labelPosition: 'right' | 'left' = 'right';

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @state()
  helperTextId = `biz-radio-helper-${Math.random().toString(36).substring(2, 9)}`;

  handleInputChange(e: Event): void {
    if (this.disabled || this.readonly) {
      e.preventDefault();
      return;
    }

    const input = e.target as HTMLInputElement;
    this.checked = input.checked;

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          checked: this.checked,
          value: this.value,
        },
      })
    );
  }

  handleFocus(e: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  handleBlur(e: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  override render() {
    return RadioButtonTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-radio-button': BizRadioButton;
  }
}