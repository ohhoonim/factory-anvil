import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SplitPaneTemplate, type SplitPaneHost } from './SplitPane.js';
import { splitPaneStyles } from './SplitPane.css.js';

@customElement('biz-split-pane')
export class BizSplitPane extends LitElement implements SplitPaneHost {
  static override styles = splitPaneStyles;

  @property({ type: String, reflect: true })
  direction: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: String, reflect: true })
  variant: 'line' | 'grip' | 'invisible' = 'line';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Array })
  sizes: number[] = [50, 50];

  @property({ type: Array, attribute: 'min-sizes' })
  minSizes: number[] = [100, 100];

  @property({ type: Array, attribute: 'max-sizes' })
  maxSizes: number[] = [];

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  collapsible: boolean = false;

  @state()
  collapsed: boolean = false;

  @state()
  isDragging: boolean = false;

  private startPosition: number = 0;
  private startSizes: number[] = [];
  private previousSizes: number[] = [50, 50];

  override connectedCallback(): void {
    super.connectedCallback();
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeDragListeners();
  }

  handleMouseDown = (event: MouseEvent): void => {
    if (this.disabled) return;
    event.preventDefault();

    this.isDragging = true;
    this.startPosition = this.direction === 'horizontal' ? event.clientX : event.clientY;
    this.startSizes = [...this.sizes];

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.dispatchEvent(
      new CustomEvent('resize-start', {
        bubbles: true,
        composed: true,
        detail: { sizes: [...this.sizes] },
      })
    );
  };

  private handleMouseMove = (event: MouseEvent): void => {
    if (!this.isDragging) return;

    const currentPos = this.direction === 'horizontal' ? event.clientX : event.clientY;
    const delta = currentPos - this.startPosition;
    const rect = this.getBoundingClientRect();
    const totalSize = this.direction === 'horizontal' ? rect.width : rect.height;

    if (totalSize === 0) return;

    const deltaPercent = (delta / totalSize) * 100;
    const initialSize0 = this.startSizes[0] ?? 50;
    const initialSize1 = this.startSizes[1] ?? 50;

    let newSize0 = initialSize0 + deltaPercent;
    let newSize1 = initialSize1 - deltaPercent;

    const min0Percent = ((this.minSizes[0] ?? 0) / totalSize) * 100;
    const min1Percent = ((this.minSizes[1] ?? 0) / totalSize) * 100;

    if (newSize0 < min0Percent) {
      newSize0 = min0Percent;
      newSize1 = 100 - min0Percent;
    } else if (newSize1 < min1Percent) {
      newSize1 = min1Percent;
      newSize0 = 100 - min1Percent;
    }

    if (this.maxSizes[0] !== undefined) {
      const max0Percent = (this.maxSizes[0] / totalSize) * 100;
      if (newSize0 > max0Percent) {
        newSize0 = max0Percent;
        newSize1 = 100 - max0Percent;
      }
    }

    this.sizes = [newSize0, newSize1];
    if (this.collapsed) {
      this.collapsed = false;
    }

    this.dispatchEvent(
      new CustomEvent('resize', {
        bubbles: true,
        composed: true,
        detail: { sizes: [...this.sizes] },
      })
    );
  };

  private handleMouseUp = (): void => {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.removeDragListeners();

    this.dispatchEvent(
      new CustomEvent('resize-end', {
        bubbles: true,
        composed: true,
        detail: { sizes: [...this.sizes] },
      })
    );
  };

  private removeDragListeners(): void {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) return;

    const step = 5;
    let primary = this.sizes[0] ?? 50;
    let isHandled = false;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        primary = Math.max(0, primary - step);
        isHandled = true;
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        primary = Math.min(100, primary + step);
        isHandled = true;
        break;
      case 'Home':
        primary = 0;
        isHandled = true;
        break;
      case 'End':
        primary = 100;
        isHandled = true;
        break;
      case 'Enter':
        if (this.collapsible) {
          this.handleDoubleClick();
          isHandled = true;
        }
        break;
    }

    if (isHandled) {
      event.preventDefault();
      if (event.key !== 'Enter') {
        this.sizes = [primary, 100 - primary];
        this.dispatchEvent(
          new CustomEvent('resize', {
            bubbles: true,
            composed: true,
            detail: { sizes: [...this.sizes] },
          })
        );
      }
    }
  };

  handleDoubleClick = (): void => {
    if (this.disabled || !this.collapsible) return;

    this.collapsed = !this.collapsed;

    if (this.collapsed) {
      this.previousSizes = [...this.sizes];
      this.sizes = [0, 100];
    } else {
      this.sizes = [...this.previousSizes];
    }

    this.dispatchEvent(
      new CustomEvent('collapse', {
        bubbles: true,
        composed: true,
        detail: {
          paneIndex: 0,
          collapsed: this.collapsed,
        },
      })
    );
  };

  override render() {
    return SplitPaneTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-split-pane': BizSplitPane;
  }
}