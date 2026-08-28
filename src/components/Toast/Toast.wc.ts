import { LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ToastTemplate, type ToastHost, type ToastType, type ToastVariant, type ToastSize, type ToastState } from './Toast.js';
import { toastStyles } from './Toast.css.js';

@customElement('biz-toast')
export class BizToast extends LitElement implements ToastHost {
  static styles = toastStyles;

  @property({ type: String })
  message = '';

  @property({ type: String })
  type: ToastType = 'info';

  @property({ type: String })
  variant: ToastVariant = 'standard';

  @property({ type: String })
  size: ToastSize = 'medium';

  @property({ type: Number })
  duration = 4000;

  @property({ type: Boolean, attribute: 'auto-dismiss' })
  autoDismiss = true;

  @property({ type: Boolean })
  dismissible = true;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  readonly = false;

  @state()
  state: ToastState = 'entering';

  private timerId: number | null = null;
  private remainingTime = 0;
  private startTime = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.remainingTime = this.duration;
    this.showToast();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private startTimer(): void {
    if (!this.autoDismiss || this.duration <= 0 || this.disabled) {
      return;
    }

    this.clearTimer();
    this.startTime = Date.now();
    this.timerId = window.setTimeout(() => {
      this.closeToast('timeout');
    }, this.remainingTime);
  }

  private pauseTimer(): void {
    if (this.timerId === null) {
      return;
    }

    this.clearTimer();
    const elapsed = Date.now() - this.startTime;
    this.remainingTime = Math.max(0, this.remainingTime - elapsed);
    this.state = 'paused';
  }

  private resumeTimer(): void {
    if (!this.autoDismiss || this.duration <= 0 || this.remainingTime <= 0) {
      return;
    }

    this.state = 'showing';
    this.startTimer();
  }

  private showToast(): void {
    this.state = 'entering';
    
    requestAnimationFrame(() => {
      this.state = 'showing';
      this.dispatchEvent(
        new CustomEvent('toast-show', {
          bubbles: true,
          composed: true,
        })
      );
      this.startTimer();
    });
  }

  private closeToast(reason: 'timeout' | 'user' | 'programmatic'): void {
    this.clearTimer();
    this.state = 'exiting';

    this.dispatchEvent(
      new CustomEvent('toast-close', {
        bubbles: true,
        composed: true,
        detail: { reason },
      })
    );

    setTimeout(() => {
      this.remove();
    }, 300);
  }

  public dismiss(): void {
    this.closeToast('programmatic');
  }

  onActionClick = (event: Event): void => {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('action-click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: event },
      })
    );
  };

  onCloseClick = (event: Event): void => {
    if (this.disabled) {
      return;
    }

    event.stopPropagation();
    this.closeToast('user');
  };

  onMouseEnter = (): void => {
    if (this.disabled) {
      return;
    }

    this.pauseTimer();
  };

  onMouseLeave = (): void => {
    if (this.disabled) {
      return;
    }

    this.resumeTimer();
  };

  onKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Escape' && this.dismissible) {
      event.preventDefault();
      this.closeToast('user');
    }
  };

  render(): TemplateResult {
    return ToastTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-toast': BizToast;
  }
}