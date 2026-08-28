import { LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DialogTemplate, type DialogHost } from './Dialog.js';
import { dialogStyles } from './Dialog.css.js';

export type DialogCloseReason = 'backdrop' | 'escape' | 'close-button' | 'programmatic';

@customElement('biz-dialog')
export class BizDialog extends LitElement implements DialogHost {
  static styles = dialogStyles;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) heading = '';
  @property({ type: Boolean }) modal = true;
  @property({ type: Boolean, attribute: 'hide-close-button' }) hideCloseButton = false;
  @property({ type: Boolean, attribute: 'prevent-backdrop-close' }) preventBackdropClose = false;
  @property({ type: Boolean, attribute: 'prevent-escape-close' }) preventEscapeClose = false;
  @property({ type: String }) size: 'small' | 'medium' | 'large' | 'full-screen' = 'medium';
  @property({ type: Boolean }) centered = false;
  @property({ type: Boolean }) scrollable = false;
  @property({ type: String }) variant: 'modal' | 'non-modal' | 'alert' = 'modal';

  @query('dialog') private dialogElement!: HTMLDialogElement | null;
  private previousActiveElement: HTMLElement | null = null;

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this.handleDialogOpen();
      } else {
        this.handleDialogClose('programmatic');
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeKeydownListener();
  }

  private handleDialogOpen(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;

    if (this.dialogElement && !this.dialogElement.open) {
      if (this.modal) {
        this.dialogElement.showModal();
      } else {
        this.dialogElement.show();
      }
    }

    this.addKeydownListener();
    this.setInitialFocus();

    this.dispatchEvent(
      new CustomEvent('dialog-open', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleDialogClose(reason: DialogCloseReason = 'programmatic'): void {
    if (this.dialogElement && this.dialogElement.open) {
      this.dialogElement.close();
    }

    this.removeKeydownListener();

    if (this.previousActiveElement && typeof this.previousActiveElement.focus === 'function') {
      this.previousActiveElement.focus();
      this.previousActiveElement = null;
    }

    this.dispatchEvent(
      new CustomEvent<{ reason: DialogCloseReason }>('dialog-close', {
        bubbles: true,
        composed: true,
        detail: { reason },
      })
    );
  }

  private addKeydownListener(): void {
    this.addEventListener('keydown', this.handleKeydown);
  }

  private removeKeydownListener(): void {
    this.removeEventListener('keydown', this.handleKeydown);
  }

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      if (this.preventEscapeClose) {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      this.open = false;
      this.handleDialogClose('escape');
      return;
    }

    if (event.key === 'Tab') {
      this.trapFocus(event);
    }
  };

  private trapFocus(event: KeyboardEvent): void {
    if (!this.shadowRoot) return;

    const focusableSelector =
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])';
    
    const shadowFocusables = Array.from(
      this.shadowRoot.querySelectorAll<HTMLElement>(focusableSelector)
    ).filter((el) => !el.hasAttribute('disabled'));

    const slottedFocusables = Array.from(
      this.querySelectorAll<HTMLElement>(focusableSelector)
    ).filter((el) => !el.hasAttribute('disabled'));

    const allFocusables = [...shadowFocusables, ...slottedFocusables];

    if (allFocusables.length === 0) {
      event.preventDefault();
      return;
    }

    const firstElement = allFocusables[0];
    const lastElement = allFocusables[allFocusables.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  private setInitialFocus(): void {
    requestAnimationFrame(() => {
      if (!this.shadowRoot) return;

      const autoFocusElement = this.querySelector<HTMLElement>('[autofocus]');
      if (autoFocusElement) {
        autoFocusElement.focus();
        return;
      }

      const closeButton = this.shadowRoot.querySelector<HTMLElement>('.biz-dialog__close-button');
      if (closeButton) {
        closeButton.focus();
        return;
      }

      if (this.dialogElement) {
        this.dialogElement.focus();
      }
    });
  }

  handleDialogClick = (event: MouseEvent): void => {
    if (!this.dialogElement) return;

    const rect = this.dialogElement.getBoundingClientRect();
    const isOutsideClick =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isOutsideClick) {
      this.dispatchEvent(
        new CustomEvent<{ originalEvent: Event }>('backdrop-click', {
          bubbles: true,
          composed: true,
          detail: { originalEvent: event },
        })
      );

      if (!this.preventBackdropClose) {
        this.open = false;
        this.handleDialogClose('backdrop');
      }
    }
  };

  handleCancel = (event: Event): void => {
    event.preventDefault();
    if (!this.preventEscapeClose) {
      this.open = false;
      this.handleDialogClose('escape');
    }
  };

  handleCloseClick = (event: MouseEvent): void => {
    event.stopPropagation();
    this.open = false;
    this.handleDialogClose('close-button');
  };

  handleSlotChange = (): void => {
    this.requestUpdate();
  };

  public show(): void {
    this.open = true;
  }

  public close(reason: DialogCloseReason = 'programmatic'): void {
    this.open = false;
    this.handleDialogClose(reason);
  }

  render() {
    return DialogTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-dialog': BizDialog;
  }
}