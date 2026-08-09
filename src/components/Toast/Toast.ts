import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastProps {
  toasts: ToastMessage[];
}

/** Component for individual toast message */
export const ToastItem = ({ message, type }: { message: string, type: ToastType }) => {
  return html`
    <div class="biz-toast-item biz-toast-item--${type}" role="alert">
      ${message}
    </div>
  `;
};

/** Manager component for multiple toast messages template */
export const ToastManagerTemplate = ({ toasts }: ToastProps) => {
  return html`
    <div class="biz-toast-manager">
      ${repeat(toasts, (t) => t.id, (t) => ToastItem({ message: t.message, type: t.type }))}
    </div>
  `;
};
