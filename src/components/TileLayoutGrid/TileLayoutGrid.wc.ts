import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TileLayoutGridTemplate, type TileLayoutGridHost } from './TileLayoutGrid';
import { tileLayoutGridStyles } from './TileLayoutGrid.css';

@customElement('biz-tile-layout-grid')
export class TileLayoutGrid extends LitElement implements TileLayoutGridHost {
  static styles = tileLayoutGridStyles;

  @property({ type: String, reflect: true })
  mode: 'fixed' | 'masonry' = 'fixed';

  @property({ type: String })
  columns: number | string = 'auto-fit';

  @property({ type: String, attribute: 'min-tile-width' })
  minTileWidth: string = '280px';

  @property({ type: String })
  gap: string = 'medium';

  @property({ type: String, attribute: 'aspect-ratio' })
  aspectRatio: string = '1/1';

  @property({ type: Boolean, reflect: true })
  loading: boolean = false;

  @state()
  isEmpty: boolean = false;

  private resizeObserver: ResizeObserver | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.setupResizeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('mode') || changedProperties.has('columns')) {
      this.dispatchEvent(
        new CustomEvent('layout-change', {
          detail: {
            columns: this.computedColumnCount(),
            mode: this.mode,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  handleSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements({ flatten: true });
    this.isEmpty = assignedElements.length === 0;

    assignedElements.forEach((element, index) => {
      element.setAttribute('data-grid-index', String(index));
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', index === 0 ? '0' : '-1');
      }
    });
  }

  handleTileClick(e: MouseEvent): void {
    const path = e.composedPath();
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return;

    const assignedElements = slot.assignedElements({ flatten: true }) as HTMLElement[];
    const clickedItem = path.find((target) =>
      assignedElements.includes(target as HTMLElement)
    ) as HTMLElement | undefined;

    if (clickedItem) {
      const index = assignedElements.indexOf(clickedItem);
      this.dispatchEvent(
        new CustomEvent('tile-click', {
          detail: {
            item: clickedItem,
            index,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  handleKeyDown(e: KeyboardEvent): void {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    if (!slot) return;

    const items = slot.assignedElements({ flatten: true }) as HTMLElement[];
    if (items.length === 0) return;

    const activeElement = (document.activeElement ||
      this.shadowRoot?.activeElement) as HTMLElement;
    const currentIndex = items.indexOf(activeElement);

    if (currentIndex === -1) return;

    const cols = this.computedColumnCount();
    let targetIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        targetIndex = (currentIndex + 1) % items.length;
        e.preventDefault();
        break;
      case 'ArrowLeft':
        targetIndex = (currentIndex - 1 + items.length) % items.length;
        e.preventDefault();
        break;
      case 'ArrowDown':
        if (currentIndex + cols < items.length) {
          targetIndex = currentIndex + cols;
          e.preventDefault();
        }
        break;
      case 'ArrowUp':
        if (currentIndex - cols >= 0) {
          targetIndex = currentIndex - cols;
          e.preventDefault();
        }
        break;
      case 'Home':
        targetIndex = 0;
        e.preventDefault();
        break;
      case 'End':
        targetIndex = items.length - 1;
        e.preventDefault();
        break;
      default:
        return;
    }

    if (targetIndex !== currentIndex && items[targetIndex]) {
      items.forEach((item) => item.setAttribute('tabindex', '-1'));
      items[targetIndex].setAttribute('tabindex', '0');
      items[targetIndex].focus();
    }
  }

  private computedColumnCount(): number {
    if (typeof this.columns === 'number') {
      return this.columns;
    }
    const parsedNum = Number(this.columns);
    if (!isNaN(parsedNum) && this.columns !== '') {
      return parsedNum;
    }

    const containerWidth = this.clientWidth || 1024;
    const minWidthNum = parseInt(this.minTileWidth, 10) || 280;
    return Math.max(1, Math.floor(containerWidth / minWidthNum));
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.requestUpdate();
      });
      this.resizeObserver.observe(this);
    }
  }

  render() {
    return TileLayoutGridTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-tile-layout-grid': TileLayoutGrid;
  }
}