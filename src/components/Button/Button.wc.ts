import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ButtonTemplate, type ButtonHost } from './Button';
import { buttonStyles } from './Button.css';

@customElement('biz-button')
export class BizButton extends LitElement implements ButtonHost {
  static override styles = buttonStyles;

  @property({ type: String, reflect: true })
  variant: 'filled' | 'outlined' | 'text' = 'filled';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, reflect: true })
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  handleClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.loading) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (event.key === ' ') {
        event.preventDefault();
      }
      this.click();
    }
  }

  override render() {
    return ButtonTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-button': BizButton;
  }
}