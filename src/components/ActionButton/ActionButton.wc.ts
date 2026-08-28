import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { ActionButtonHost, ActionButtonItem } from './ActionButton.js';
import { ActionButtonTemplate } from './ActionButton.js';
import { actionButtonStyles } from './ActionButton.css.js';

@customElement('biz-action-button')
export class BizActionButton extends LitElement implements ActionButtonHost {
  static override styles = actionButtonStyles;

  @property({ type: String })
  label = '';

  @property({ type: String })
  variant: 'solid' | 'outlined' | 'text' | 'split' = 'solid';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Array })
  items: ActionButtonItem[] = [];

  @property({ type: Boolean, reflect: true })
  split = false;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @property({ type: String })
  placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start';

  @state()
  private focusedIndex = -1;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focusout', this.handleFocusOut);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('focusout', this.handleFocusOut);
  }

  private handleFocusOut = (event: FocusEvent): void => {
    if (!this.contains(event.relatedTarget as Node)) {
      this.open = false;
      this.focusedIndex = -1;
    }
  };

  handleMainClick(event: MouseEvent): void {
    if (this.disabled || this.loading) return;

    if (this.split || this.variant === 'split') {
      this.dispatchEvent(
        new CustomEvent('action-click', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: event },
        })
      );
    } else {
      if (this.items.length > 0) {
        this.toggleDropdown();
      } else {
        this.dispatchEvent(
          new CustomEvent('action-click', {
            bubbles: true,
            composed: true,
            detail: { originalEvent: event },
          })
        );
      }
    }
  }

  handleTriggerClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.disabled || this.loading) return;
    this.toggleDropdown();
  }

  handleItemClick(item: ActionButtonItem, event: MouseEvent): void {
    event.stopPropagation();
    if (item.disabled) return;

    this.dispatchEvent(
      new CustomEvent('item-select', {
        bubbles: true,
        composed: true,
        detail: {
          item,
          id: item.id,
          originalEvent: event,
        },
      })
    );

    this.open = false;
    this.focusedIndex = -1;
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.loading) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.open) {
          this.openDropdown();
          this.focusedIndex = 0;
        } else {
          this.focusNextItem();
        }
        break;

      case 'ArrowUp':
        event.preventDefault();
        if (this.open) {
          this.focusPreviousItem();
        }
        break;

      case 'Escape':
        if (this.open) {
          event.preventDefault();
          this.closeDropdown();
          this.focusTrigger();
        }
        break;

      case 'Enter':
      case ' ':
        if (this.open && this.focusedIndex >= 0 && this.focusedIndex < this.items.length) {
          event.preventDefault();
          const targetItem = this.items[this.focusedIndex];
          if (targetItem && !targetItem.disabled) {
            this.handleItemClick(targetItem, event as unknown as MouseEvent);
          }
        }
        break;
    }
  }

  private toggleDropdown(): void {
    if (this.open) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  private openDropdown(): void {
    this.open = true;
    this.dispatchEvent(
      new CustomEvent('dropdown-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: true },
      })
    );
  }

  private closeDropdown(): void {
    this.open = false;
    this.focusedIndex = -1;
    this.dispatchEvent(
      new CustomEvent('dropdown-toggle', {
        bubbles: true,
        composed: true,
        detail: { open: false },
      })
    );
  }

  private focusNextItem(): void {
    if (this.items.length === 0) return;
    this.focusedIndex = (this.focusedIndex + 1) % this.items.length;
    this.updateMenuItemFocus();
  }

  private focusPreviousItem(): void {
    if (this.items.length === 0) return;
    this.focusedIndex = (this.focusedIndex - 1 + this.items.length) % this.items.length;
    this.updateMenuItemFocus();
  }

  private updateMenuItemFocus(): void {
    this.updateComplete.then(() => {
      const menuItems = this.shadowRoot?.querySelectorAll<HTMLButtonElement>(
        '.biz-action-button__menu-item'
      );
      if (menuItems && menuItems[this.focusedIndex]) {
        menuItems[this.focusedIndex].focus();
      }
    });
  }

  private focusTrigger(): void {
    this.updateComplete.then(() => {
      const triggerBtn = this.shadowRoot?.querySelector<HTMLButtonElement>(
        this.split || this.variant === 'split'
          ? '.biz-action-button__trigger'
          : '.biz-action-button__main'
      );
      triggerBtn?.focus();
    });
  }

  override render() {
    return ActionButtonTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-action-button': BizActionButton;
  }
}