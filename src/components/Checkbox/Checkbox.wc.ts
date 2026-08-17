import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CheckboxTemplate } from './Checkbox.ts';
import { checkboxStyles } from './Checkbox.css.ts';

@customElement('biz-checkbox')
export class BizCheckbox extends LitElement {
  static styles = checkboxStyles;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: String })
  value: string | number = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, attribute: 'label-position' })
  labelPosition: 'left' | 'right' = 'right';

  @property({ type: String })
  variant: 'standard' | 'outlined' | 'filled' = 'standard';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @state()
  private isFocused = false;

  private uniqueDescriptionId = `biz-checkbox-desc-${Math.random().toString(36).substring(2, 9)}`;

  private handleInput(event: Event): void {
    if (this.disabled || this.readonly) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false;
  }

  private handleChange(event: Event): void {
    if (this.disabled || this.readonly) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

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

  private handleFocus(event: FocusEvent): void {
    if (this.disabled) return;
    this.isFocused = true;

    this.dispatchEvent(
      new CustomEvent('focus', {
        bubbles: true,
        composed: true,
        detail: event,
      })
    );
  }

  private handleBlur(event: FocusEvent): void {
    if (this.disabled) return;
    this.isFocused = false;

    this.dispatchEvent(
      new CustomEvent('blur', {
        bubbles: true,
        composed: true,
        detail: event,
      })
    );
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    if (event.code === 'Space') {
      event.preventDefault();
      this.checked = !this.checked;
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
  }

  protected firstUpdated(): void {
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return CheckboxTemplate({
      checked: this.checked,
      indeterminate: this.indeterminate,
      disabled: this.disabled,
      readonly: this.readonly,
      required: this.required,
      error: this.error,
      value: this.value,
      labelPosition: this.labelPosition,
      variant: this.variant,
      size: this.size,
      descriptionId: this.uniqueDescriptionId,
      onInput: this.handleInput.bind(this),
      onChange: this.handleChange.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-checkbox': BizCheckbox;
  }
}