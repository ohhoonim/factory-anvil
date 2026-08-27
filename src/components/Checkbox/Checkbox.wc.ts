import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CheckboxTemplate, type CheckboxHost } from './Checkbox.js';
import { checkboxStyles } from './Checkbox.css.js';

@customElement('biz-checkbox')
export class BizCheckbox extends LitElement implements CheckboxHost {
  static override styles = checkboxStyles;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String })
  value: string | number = '';

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: String, attribute: 'label-position' })
  labelPosition: 'right' | 'left' = 'right';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  variant: 'standard' | 'button' | 'card' = 'standard';

  @state()
  descriptionId = `biz-checkbox-desc-${Math.random().toString(36).substring(2, 9)}`;

  handleInputChange(event: Event): void {
    if (this.disabled || this.readonly) {
      event.preventDefault();
      return;
    }

    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;

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

  handleFocus(event: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: event.relatedTarget,
      })
    );
  }

  handleBlur(event: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: event.relatedTarget,
      })
    );
  }

  override render() {
    return CheckboxTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-checkbox': BizCheckbox;
  }
}