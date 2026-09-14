import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DblToggleButtonTemplate, type DblToggleButtonHost } from './DblToggleButton';
import { dblToggleButtonStyles } from './DblToggleButton.css';

@customElement('biz-dbl-toggle-button')
export class BizDblToggleButton extends LitElement implements DblToggleButtonHost {
  static styles = dblToggleButtonStyles;

  @property({ type: String })
  value = '';

  @property({ type: String, attribute: 'left-value' })
  leftValue = 'left';

  @property({ type: String, attribute: 'right-value' })
  rightValue = 'right';

  @property({ type: String })
  variant: 'contained' | 'outlined' | 'standard' = 'contained';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('tabindex', this.disabled ? '-1' : '0');
    this.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  onSelect = (side: 'left' | 'right', val: string) => {
    if (this.disabled || this.readonly) return;
    this.value = val;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, side },
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  };

  onFocus = (e: FocusEvent) => {
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  };

  onBlur = (e: FocusEvent) => {
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  };

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextSide = e.key === 'ArrowLeft' ? 'left' : 'right';
      const nextVal = nextSide === 'left' ? this.leftValue : this.rightValue;
      this.onSelect(nextSide, nextVal);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      const currentSide = this.value === this.rightValue ? 'right' : 'left';
      const targetSide = currentSide === 'left' ? 'right' : 'left';
      const targetVal = targetSide === 'left' ? this.leftValue : this.rightValue;
      this.onSelect(targetSide, targetVal);
    }
  };

  render() {
    return DblToggleButtonTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-dbl-toggle-button': BizDblToggleButton;
  }
}