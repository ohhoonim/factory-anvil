import { html, type TemplateResult } from 'lit';

export type ToastType = 'success' | 'info' | 'warning' | 'error';
export type ToastVariant = 'standard' | 'outlined' | 'filled';
export type ToastSize = 'small' | 'medium' | 'large';
export type ToastState = 'entering' | 'showing' | 'paused' | 'exiting';

export interface ToastHost {
  message: string;
  type: ToastType;
  variant: ToastVariant;
  size: ToastSize;
  duration: number;
  autoDismiss: boolean;
  dismissible: boolean;
  disabled: boolean;
  loading: boolean;
  readonly: boolean;
  state: ToastState;
  onActionClick: (event: Event) => void;
  onCloseClick: (event: Event) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: (event: KeyboardEvent) => void;
}

export const ToastTemplate = (host: ToastHost): TemplateResult => {
  const isAlert = host.type === 'error' || host.type === 'warning';
  const role = isAlert ? 'alert' : 'status';
  const ariaLive = isAlert ? 'assertive' : 'polite';

  return html`
    <div
      class="biz-toast biz-toast--${host.type} biz-toast--${host.variant} biz-toast--${host.size} biz-toast--${host.state} ${host.disabled ? 'biz-toast--disabled' : ''} ${host.loading ? 'biz-toast--loading' : ''} ${host.readonly ? 'biz-toast--readonly' : ''}"
      role="${role}"
      aria-live="${ariaLive}"
      aria-atomic="true"
      aria-disabled="${host.disabled ? 'true' : 'false'}"
      tabindex="${host.disabled ? '-1' : '0'}"
      @mouseenter="${!host.disabled ? host.onMouseEnter : null}"
      @mouseleave="${!host.disabled ? host.onMouseLeave : null}"
      @keydown="${!host.disabled ? host.onKeyDown : null}"
    >
      <div class="biz-toast__start">
        <slot name="start-slot">
          ${host.loading
            ? html`<span class="biz-toast__spinner" aria-hidden="true"></span>`
            : html`<span class="biz-toast__icon" aria-hidden="true"></span>`}
        </slot>
      </div>

      <div class="biz-toast__content">
        <slot>
          <span class="biz-toast__message">${host.message}</span>
        </slot>
      </div>

      <div class="biz-toast__action">
        <slot name="action-slot" @click="${!host.disabled ? host.onActionClick : null}"></slot>
      </div>

      ${host.dismissible
        ? html`
            <div class="biz-toast__close">
              <slot name="close-button-slot">
                <button
                  type="button"
                  class="biz-toast__close-btn"
                  aria-label="닫기"
                  ?disabled="${host.disabled}"
                  @click="${!host.disabled ? host.onCloseClick : null}"
                >
                  &times;
                </button>
              </slot>
            </div>
          `
        : ''}
    </div>
  `;
};