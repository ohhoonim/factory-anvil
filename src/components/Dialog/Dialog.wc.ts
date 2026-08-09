import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DialogTemplate } from './Dialog';
import { dialogStyles } from './Dialog.css';

@customElement('biz-dialog')
export class DialogWC extends LitElement {
  static styles = dialogStyles;

  @property({ type: Boolean }) open = false;
  @property({ type: Boolean }) modal = true;

  private _handleClose = () => {
    this.dispatchEvent(new CustomEvent('close'));
  };

  private _handleBackdropClick = (e: MouseEvent) => {
    this.dispatchEvent(new CustomEvent('backdrop-click', { detail: { originalEvent: e } }));
  };

  render() {
    return DialogTemplate({
      open: this.open,
      modal: this.modal,
      onClose: this._handleClose,
      onBackdropClick: this._handleBackdropClick,
      children: html`<slot></slot>`
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-dialog': DialogWC;
  }
}
