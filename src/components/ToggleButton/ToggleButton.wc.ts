import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ToggleButtonTemplate, type ToggleButtonTemplateProps } from './ToggleButton.js';
import { toggleButtonStyles } from './ToggleButton.css.js';

@customElement('biz-toggle-button')
export class BizToggleButton extends LitElement {
  static styles = toggleButtonStyles;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: String })
  variant: 'standard' | 'filled' | 'outlined' = 'standard';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, attribute: 'label-position' })
  labelPosition: 'left' | 'right' = 'right';

  private _handleToggle = (e: Event) => {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;

    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this._handleToggle(e);
    }
  };

  private _handleFocus = (e: FocusEvent) => {
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: e,
        bubbles: false,
        composed: true,
      })
    );
  };

  private _handleBlur = (e: FocusEvent) => {
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: e,
        bubbles: false,
        composed: true,
      })
    );
  };

  render() {
    const templateProps: ToggleButtonTemplateProps = {
      checked: this.checked,
      disabled: this.disabled,
      readonly: this.readonly,
      variant: this.variant,
      size: this.size,
      labelPosition: this.labelPosition,
      onToggle: this._handleToggle,
      onKeyDown: this._handleKeyDown,
      onFocus: this._handleFocus,
      onBlur: this._handleBlur,
    };

    return ToggleButtonTemplate(templateProps);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-toggle-button': BizToggleButton;
  }
}