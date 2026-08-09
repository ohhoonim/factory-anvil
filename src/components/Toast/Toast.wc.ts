import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ToastManagerTemplate, type ToastMessage } from './Toast';
import { toastStyles } from './Toast.css';

@customElement('biz-toast-manager')
export class ToastManagerWC extends LitElement {
  static styles = toastStyles;

  @property({ type: Array }) toasts: ToastMessage[] = [];

  render() {
    return ToastManagerTemplate({
      toasts: this.toasts
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-toast-manager': ToastManagerWC;
  }
}
