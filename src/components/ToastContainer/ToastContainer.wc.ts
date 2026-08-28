// src/components/ToastContainer/ToastContainer.wc.ts
import { LitElement } from 'lit';
import { customElement, property, state, queryAssignedNodes } from 'lit/decorators.js';
import { toastContainerStyles } from './ToastContainer.css.ts';
import {
  ToastContainerTemplate,
  type ToastContainerHost,
  type ToastPosition,
  type ToastSize,
} from './ToastContainer.ts';

@customElement('biz-toast-container')
export class BizToastContainer extends LitElement implements ToastContainerHost {
  static styles = toastContainerStyles;

  @property({ type: Number, attribute: 'max-visible-count', reflect: true })
  maxVisibleCount = 5;

  @property({ type: String, reflect: true })
  position: ToastPosition = 'top-right';

  @property({ type: Number, reflect: true })
  gap = 10;

  @property({ type: Boolean, attribute: 'newest-on-top', reflect: true })
  newestOnTop = true;

  @property({ type: Boolean, attribute: 'pause-on-hover', reflect: true })
  pauseOnHover = true;

  @property({ type: String, reflect: true })
  size: ToastSize = 'medium';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  focused = false;

  @property({ type: String, attribute: 'aria-invalid', reflect: true })
  override ariaInvalid: string | null = 'false';

  @property({ type: String, attribute: 'aria-required', reflect: true })
  override ariaRequired: string | null = 'false';

  @property({ type: String, attribute: 'aria-describedby', reflect: true })
  ariaDescribedby = '';

  @property({ type: String, attribute: 'aria-disabled', reflect: true })
  override ariaDisabled: string | null = 'false';

  @state()
  isHovered = false;

  @state()
  isOverflowing = false;

  @queryAssignedNodes({ flatten: true })
  private defaultSlotNodes!: Node[];

  private get toastElements(): HTMLElement[] {
    return this.defaultSlotNodes.filter(
      (node): node is HTMLElement =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.nodeName.toLowerCase().includes('toast')
    );
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleGlobalKeyDown);
    this.addEventListener('keydown', this.handleContainerKeyDown);
  }

  disconnectedCallback(): void {
    window.removeEventListener('keydown', this.handleGlobalKeyDown);
    this.removeEventListener('keydown', this.handleContainerKeyDown);
    super.disconnectedCallback();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);

    if (
      changedProperties.has('maxVisibleCount') ||
      changedProperties.has('newestOnTop')
    ) {
      this.updateToastVisibility();
    }

    if (changedProperties.has('gap')) {
      this.style.setProperty('--biz-toast-container-gap', `${this.gap}px`);
    }

    if (changedProperties.has('disabled')) {
      this.ariaDisabled = this.disabled ? 'true' : 'false';
    }

    if (changedProperties.has('error')) {
      this.ariaInvalid = this.error ? 'true' : 'false';
    }
  }

  handleSlotChange = (): void => {
    this.updateToastVisibility();
  };

  handleMouseEnter = (): void => {
    if (!this.pauseOnHover || this.disabled) return;
    this.isHovered = true;
    this.toastElements.forEach((toast) => {
      if ('pause' in toast && typeof (toast as any).pause === 'function') {
        (toast as any).pause();
      }
    });
  };

  handleMouseLeave = (): void => {
    if (!this.pauseOnHover || this.disabled) return;
    this.isHovered = false;
    this.toastElements.forEach((toast) => {
      if ('resume' in toast && typeof (toast as any).resume === 'function') {
        (toast as any).resume();
      }
    });
  };

  public add(element: HTMLElement): void {
    if (this.disabled) return;
    this.appendChild(element);
    this.updateToastVisibility();
  }

  public removeToast(element: HTMLElement): void {
    if (this.contains(element)) {
      this.removeChild(element);
      this.updateToastVisibility();
    }
  }

  public clear(): void {
    const toasts = [...this.toastElements];
    toasts.forEach((toast) => toast.remove());

    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
        detail: { count: toasts.length },
      })
    );

    this.updateToastVisibility();
  }

  private handleGlobalKeyDown = (e: KeyboardEvent): void => {
    if ((e.altKey && e.code === 'KeyT') || e.key === 'F6') {
      const firstToast = this.toastElements.find(
        (t) => !t.classList.contains('biz-toast-hidden')
      );
      if (firstToast) {
        e.preventDefault();
        firstToast.focus();
      }
    }
  };

  private handleContainerKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      const activeToasts = this.toastElements.filter(
        (t) => !t.classList.contains('biz-toast-hidden')
      );
      if (activeToasts.length > 0) {
        const lastToast = activeToasts[activeToasts.length - 1];
        this.removeToast(lastToast);
      }
    }
  };

  private updateToastVisibility(): void {
    const toasts = this.toastElements;
    const totalCount = toasts.length;
    const limit = this.maxVisibleCount;

    const visibleToasts = this.newestOnTop
      ? toasts.slice(-limit)
      : toasts.slice(0, limit);

    let overflowCount = 0;

    toasts.forEach((toast) => {
      const isVisible = visibleToasts.includes(toast);
      if (isVisible) {
        toast.classList.remove('biz-toast-hidden');
        toast.removeAttribute('aria-hidden');
      } else {
        toast.classList.add('biz-toast-hidden');
        toast.setAttribute('aria-hidden', 'true');
        overflowCount++;
      }
    });

    this.isOverflowing = overflowCount > 0;

    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { count: totalCount },
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { visibleCount: visibleToasts.length },
      })
    );

    this.dispatchEvent(
      new CustomEvent('container-change', {
        bubbles: true,
        composed: true,
        detail: {
          count: totalCount,
          visibleCount: visibleToasts.length,
        },
      })
    );

    this.dispatchEvent(
      new CustomEvent('overflow-change', {
        bubbles: true,
        composed: true,
        detail: { overflowCount },
      })
    );
  }

  render() {
    return ToastContainerTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-toast-container': BizToastContainer;
  }
}