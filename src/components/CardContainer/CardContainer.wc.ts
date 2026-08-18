import { LitElement } from "lit";
import { CardContainerTemplate } from "./CardContainer";
import { customElement, property } from "lit/decorators.js";
import { cardContainerStyles } from "./CardContainer.css";

@customElement('biz-card-container')
export class CardContainer extends LitElement {
  static styles = cardContainerStyles;

  @property({ type: String, reflect: true })
  variant: 'outlined' | 'filled' | 'elevated' = 'outlined';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @property({ type: Boolean, attribute: 'bordered-divider', reflect: true })
  borderedDivider = false;

  @property({ type: Boolean, reflect: true })
  hoverable = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String, attribute: 'aria-labelledby' })
  ariaLabelledby?: string;

  private _handleCardClick(event: MouseEvent) {
    if (this.disabled || this.loading) return;

    this.dispatchEvent(
      new CustomEvent('card-click', {
        detail: { originalEvent: event },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return CardContainerTemplate({
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      borderedDivider: this.borderedDivider,
      hoverable: this.hoverable,
      disabled: this.disabled,
      loading: this.loading,
      ariaLabelledby: this.ariaLabelledby,
      onCardClick: this._handleCardClick.bind(this),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-card-container': CardContainer;
  }
}