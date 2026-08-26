import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { PageHeaderTemplate } from './PageHeader.js';
import type { PageHeaderHost } from './PageHeader.js';
import { pageHeaderStyles } from './PageHeader.css.js';

@customElement('biz-page-header')
export class BizPageHeader extends LitElement implements PageHeaderHost {
  static styles = pageHeaderStyles;

  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';
  @property({ type: String }) variant: 'standard' | 'filled' | 'ghost' | 'outlined' = 'standard';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, reflect: true }) compact = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;

  @state() private activeFocusIndex = -1;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.handleKeyDown);
    super.disconnectedCallback();
  }

  handleActionClick = (actionId: string, originalEvent: Event) => {
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('action-click', {
        detail: { actionId, originalEvent },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;

    const focusableElements = Array.from(
      this.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );

    if (event.key === 'Tab') {
      if (focusableElements.length > 0) {
        if (event.shiftKey) {
          if (this.activeFocusIndex > 0) {
            this.activeFocusIndex--;
          } else {
            this.activeFocusIndex = focusableElements.length - 1;
          }
        } else {
          if (this.activeFocusIndex < focusableElements.length - 1) {
            this.activeFocusIndex++;
          } else {
            this.activeFocusIndex = 0;
          }
        }
      }
    } else if (event.key === 'Enter' || event.key === ' ') {
      const target = event.target as HTMLElement;
      const actionId = target.getAttribute('data-action-id');
      if (actionId) {
        event.preventDefault();
        this.handleActionClick(actionId, event);
      }
    } else if (event.key === 'Escape') {
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  render() {
    return html`
      <div
        aria-disabled="${this.disabled ? 'true' : 'false'}"
        aria-busy="${this.loading ? 'true' : 'false'}"
        aria-invalid="${this.error ? 'true' : 'false'}"
      >
        ${PageHeaderTemplate(this)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-page-header': BizPageHeader;
  }
}