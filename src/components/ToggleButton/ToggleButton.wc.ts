import { LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ToggleButtonTemplate, type ToggleButtonHost } from './ToggleButton.js';
import { toggleButtonStyles } from './ToggleButton.css.js';

@customElement('biz-toggle-button')
export class BizToggleButton extends LitElement implements ToggleButtonHost {
  static styles = toggleButtonStyles;

  @property({ type: String, reflect: true })
  value: string = '';

  @property({ type: Boolean, reflect: true })
  pressed: boolean = false;

  @property({ type: Boolean, attribute: 'multiple', reflect: true })
  multiple: boolean = false;

  @property({ type: Boolean, attribute: 'enforce-selection', reflect: true })
  enforceSelection: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: String, reflect: true })
  variant: 'standard' | 'outlined' | 'contained' = 'standard';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth: boolean = false;

  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.toggle();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  private toggle(): void {
    const nextPressed = !this.pressed;
    this.pressed = nextPressed;

    this.dispatchEvent(
      new CustomEvent<{ pressed: boolean; value: string }>('change', {
        detail: {
          pressed: this.pressed,
          value: this.value
        },
        bubbles: true,
        composed: true
      })
    );
  }

  override render(): TemplateResult {
    return ToggleButtonTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-toggle-button': BizToggleButton;
  }
}