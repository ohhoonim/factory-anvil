import { LitElement, html, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { RadioButtonTemplate } from './RadioButton.ts';
import { radioButtonStyles } from './RadioButton.css.ts';

/**
 * @element biz-radio-button
 * 
 * @slot icon-slot
 * @slot (default)
 * @slot description-slot
 */
@customElement('biz-radio-button')
export class RadioButton extends LitElement {
  static styles = radioButtonStyles;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String })
  value: string | number | boolean = '';

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  variant: 'standard' | 'button' | 'card' = 'standard';

  @property({ type: String, attribute: 'label-position', reflect: true })
  labelPosition: 'right' | 'left' = 'right';

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @state()
  private descriptionId = `biz-radio-desc-${Math.random().toString(36).substring(2, 9)}`;

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
    }
    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    }
    if (changedProperties.has('error')) {
      this.setAttribute('aria-invalid', this.error ? 'true' : 'false');
    }
  }

  private handleInput(e: Event): void {
    if (this.disabled || this.readonly) {
      e.preventDefault();
      return;
    }
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;

    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked, value: this.value },
      })
    );
  }

  private handleChange(e: Event): void {
    if (this.disabled || this.readonly) {
      e.preventDefault();
      return;
    }
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { checked: this.checked, value: this.value },
      })
    );
  }

  private handleFocus(e: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  private handleBlur(e: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    if (e.code === 'Space') {
      e.preventDefault();
      if (!this.checked) {
        this.checked = true;
        this.dispatchEvent(
          new CustomEvent('change', {
            bubbles: true,
            composed: true,
            detail: { checked: this.checked, value: this.value },
          })
        );
      }
    }
  }

  public clear(): void {
    this.checked = false;
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
        detail: { checked: false, value: this.value },
      })
    );
  }

  render() {
    return html`
      <div @keydown=${this.handleKeyDown}>
        ${RadioButtonTemplate({
          checked: this.checked,
          value: this.value,
          name: this.name,
          size: this.size,
          variant: this.variant,
          labelPosition: this.labelPosition,
          readonly: this.readonly,
          disabled: this.disabled,
          error: this.error,
          descriptionId: this.descriptionId,
          onInput: this.handleInput.bind(this),
          onChange: this.handleChange.bind(this),
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this),
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-radio-button': RadioButton;
  }
}