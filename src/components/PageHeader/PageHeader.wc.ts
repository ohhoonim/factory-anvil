import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { PageHeaderTemplate } from "./PageHeader";
import { pageHeaderStyles } from "./PageHeader.css";

/**
 * @element biz-page-header
 * 
 * @slot breadcrumb-slot
 * @slot title-slot
 * @slot meta-status-slot
 * @slot extra-actions-slot
 * @slot subtitle-slot
 */
@customElement('biz-page-header')
export class PageHeader extends LitElement {
  static styles = pageHeaderStyles;

  @property({ type: String })
  title = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: String })
  variant: 'standard' | 'filled' | 'ghost' = 'standard';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  @property({ type: Boolean })
  compact = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: String })
  titleId = 'title-slot';

  @property({ type: String })
  subtitleId = 'subtitle-slot';

  @state()
  private loading = false;

  private handleActionClick = (e: MouseEvent) => {
    if (this.disabled) return;

    const target = (e.target as HTMLElement).closest('[data-action-id]') as HTMLElement;
    if (target) {
      const actionId = target.dataset.actionId || '';
      this.dispatchEvent(
        new CustomEvent('action-click', {
          bubbles: true,
          composed: true,
          detail: { actionId },
        })
      );
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled) return;

    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement;
      const actionId = target.dataset.actionId;
      if (actionId) {
        e.preventDefault();
        this.dispatchEvent(
          new CustomEvent('action-click', {
            bubbles: true,
            composed: true,
            detail: { actionId },
          })
        );
      }
    } else if (e.key === 'Escape') {
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
          detail: {},
        })
      );
    }
  };

  private handleSlotChange = (e: Event) => {
    this.dispatchEvent(
      new CustomEvent('slot-change', {
        bubbles: true,
        composed: true,
        detail: { targetSlot: (e.target as HTMLSlotElement).name },
      })
    );
  };

  render() {
    return PageHeaderTemplate({
      title: this.title,
      subtitle: this.subtitle,
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      compact: this.compact,
      loading: this.loading,
      disabled: this.disabled,
      error: this.error,
      titleId: this.titleId,
      subtitleId: this.subtitleId,
      handleActionClick: this.handleActionClick,
      handleKeyDown: this.handleKeyDown,
      handleSlotChange: this.handleSlotChange,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-page-header': PageHeader;
  }
}