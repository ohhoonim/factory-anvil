import { LitElement, type PropertyValues } from 'lit';
import { customElement, property } from "lit/decorators.js";
import { type ContentContainerHost, ContentContainerTemplate } from "./ContentContainer";
import { contentContainerStyles } from "./ContentContainer.css";

@customElement('biz-content-container')
export class ContentContainer extends LitElement implements ContentContainerHost {
  static styles = contentContainerStyles;

  @property({ type: String }) variant: 'standard' | 'fluid' | 'card' = 'standard';
  @property({ type: String }) size: 'small' | 'medium' | 'large' | 'full' = 'medium';
  @property({ type: Boolean }) centered = false;
  @property({ type: Boolean }) scrollable = false;
  @property({ type: Boolean }) padding = true;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) empty = false;

  public handleScroll = (event: Event): void => {
    const target = event.target as HTMLElement;
    this.dispatchEvent(
      new CustomEvent('scroll', {
        detail: { scrollTop: target.scrollTop },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.scrollable) return;

    const mainElement = this.shadowRoot?.querySelector('main');
    if (!mainElement) return;

    const scrollAmount = 40;
    switch (event.key) {
      case 'PageUp':
        mainElement.scrollTop -= mainElement.clientHeight;
        break;
      case 'PageDown':
        mainElement.scrollTop += mainElement.clientHeight;
        break;
      case 'ArrowUp':
        mainElement.scrollTop -= scrollAmount;
        break;
      case 'ArrowDown':
        mainElement.scrollTop += scrollAmount;
        break;
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (changedProperties.has('scrollable')) {
      if (this.scrollable) {
        this.setAttribute('tabindex', '0');
      } else {
        this.removeAttribute('tabindex');
      }
    }
  }

  render() {
    return ContentContainerTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-content-container': ContentContainer;
  }
}