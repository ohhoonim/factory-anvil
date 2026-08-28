import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BreadcrumbTemplate, type BreadcrumbHost, type BreadcrumbItem } from './Breadcrumb';
import { breadcrumbStyles } from './Breadcrumb.css';

@customElement('biz-breadcrumb')
export class BizBreadcrumb extends LitElement implements BreadcrumbHost {
  static styles = breadcrumbStyles;

  @property({ type: Array })
  items: BreadcrumbItem[] = [];

  @property({ type: String })
  variant: 'standard' | 'contained' | 'standard-icon' = 'standard';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Number, attribute: 'max-items' })
  maxItems = 0;

  @property({ type: Number, attribute: 'items-before-collapse' })
  itemsBeforeCollapse = 1;

  @property({ type: Number, attribute: 'items-after-collapse' })
  itemsAfterCollapse = 1;

  @property({ type: String })
  separator = '/';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @property({ type: Boolean, reflect: true })
  wrap = false;

  handleItemClick = (item: BreadcrumbItem, index: number, event: MouseEvent | KeyboardEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('breadcrumb-click', {
        detail: {
          item,
          index,
          originalEvent: event
        },
        bubbles: true,
        composed: true
      })
    );
  };

  handleOverflowClick = (collapsedItems: BreadcrumbItem[], event: MouseEvent | KeyboardEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    this.dispatchEvent(
      new CustomEvent('overflow-click', {
        detail: {
          collapsedItems,
          originalEvent: event
        },
        bubbles: true,
        composed: true
      })
    );
  };

  private _handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      if (target && target.classList.contains('biz-breadcrumb__link')) {
        target.click();
      }
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this._handleKeyDown);
  }

  disconnectedCallback(): void {
    this.removeEventListener('keydown', this._handleKeyDown);
    super.disconnectedCallback();
  }

  render() {
    return BreadcrumbTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-breadcrumb': BizBreadcrumb;
  }
}