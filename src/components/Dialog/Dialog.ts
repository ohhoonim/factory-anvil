import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface DialogHost {
  open: boolean;
  heading: string;
  modal: boolean;
  hideCloseButton: boolean;
  preventBackdropClose: boolean;
  preventEscapeClose: boolean;
  size?: 'small' | 'medium' | 'large' | 'full-screen';
  centered?: boolean;
  scrollable?: boolean;
  variant?: 'modal' | 'non-modal' | 'alert';
  
  handleDialogClick: (event: MouseEvent) => void;
  handleCancel: (event: Event) => void;
  handleCloseClick: (event: MouseEvent) => void;
  handleSlotChange: () => void;
}

export const DialogTemplate = (host: DialogHost) => {
  const isAlert = host.variant === 'alert';
  const role = isAlert ? 'alertdialog' : 'dialog';

  return html`
    <dialog
      class=${classMap({
        'biz-dialog': true,
        'biz-dialog--open': host.open,
        'biz-dialog--modal': host.modal,
        'biz-dialog--non-modal': !host.modal,
        'biz-dialog--alert': isAlert,
        'biz-dialog--centered': Boolean(host.centered),
        'biz-dialog--scrollable': Boolean(host.scrollable),
        [`biz-dialog--size-${host.size || 'medium'}`]: true,
      })}
      .open=${host.open}
      role=${role}
      aria-modal=${host.modal ? 'true' : 'false'}
      aria-labelledby="biz-dialog-title"
      aria-describedby="biz-dialog-body"
      @click=${host.handleDialogClick}
      @cancel=${host.handleCancel}
    >
      <div class="biz-dialog__container">
        <header class="biz-dialog__header">
          <slot name="header-slot" @slotchange=${host.handleSlotChange}>
            ${host.heading ? html`<h2 id="biz-dialog-title" class="biz-dialog__title">${host.heading}</h2>` : ''}
          </slot>
          ${!host.hideCloseButton
            ? html`
                <button
                  type="button"
                  class="biz-dialog__close-button"
                  aria-label="Close dialog"
                  @click=${host.handleCloseClick}
                >
                  <slot name="close-icon-slot">
                    <svg class="biz-dialog__close-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </slot>
                </button>
              `
            : ''}
        </header>

        <section id="biz-dialog-body" class="biz-dialog__body">
          <slot></slot>
        </section>

        <footer class="biz-dialog__footer">
          <slot name="footer-slot" @slotchange=${host.handleSlotChange}></slot>
        </footer>
      </div>
    </dialog>
  `;
};