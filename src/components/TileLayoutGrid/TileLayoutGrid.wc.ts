import { LitElement } from 'lit';
import { customElement, property, state } from "lit/decorators.js";
import { TileLayoutGridTemplate } from "./TileLayoutGrid";
import { tileLayoutGridStyles } from "./TileLayoutGrid.css";

/**
 * @element biz-tile-layout-grid
 * 
 * @slot header-slot
 * @slot (default)
 * @slot empty-slot
 */
@customElement('biz-tile-layout-grid')
export class TileLayoutGrid extends LitElement {
  static styles = tileLayoutGridStyles;

  @property({ type: String, reflect: true })
  mode: 'fixed' | 'masonry' = 'fixed';

  @property({ type: String, reflect: true })
  columns: number | string = 'auto-fit';

  @property({ type: String, attribute: 'min-tile-width', reflect: true })
  minTileWidth: string = '280px';

  @property({ type: String, reflect: true })
  gap: 'small' | 'medium' | 'large' | string = 'medium';

  @property({ type: String, attribute: 'aspect-ratio', reflect: true })
  aspectRatio: string = '1/1';

  @property({ type: Boolean, reflect: true })
  loading: boolean = false;

  @state()
  private _isEmpty: boolean = false;

  private _resizeObserver: ResizeObserver | null = null;
  private _previousCalculatedColumns: number = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this._setupResizeObserver();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  private _setupResizeObserver(): void {
    this._resizeObserver = new ResizeObserver(() => {
      this._handleResize();
    });
    this._resizeObserver.observe(this);
  }

  private _handleResize(): void {
    const computedColumns = this._calculateCurrentColumns();
    if (computedColumns !== this._previousCalculatedColumns) {
      this._previousCalculatedColumns = computedColumns;
      this.dispatchEvent(
        new CustomEvent('layout-change', {
          bubbles: true,
          composed: true,
          detail: {
            columns: computedColumns,
            mode: this.mode,
          },
        })
      );
    }
  }

  private _calculateCurrentColumns(): number {
    if (typeof this.columns === 'number') {
      return this.columns;
    }
    const containerWidth = this.getBoundingClientRect().width;
    const minWidthPx = parseFloat(this.minTileWidth) || 280;
    const computed = Math.floor(containerWidth / minWidthPx);
    return computed > 0 ? computed : 1;
  }

  private _handleSlotChange(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    const assignedElements = slot.assignedElements({ flatten: true });
    this._isEmpty = assignedElements.length === 0;
    this._updateAriaAttributes(assignedElements.length);
  }

  private _updateAriaAttributes(itemCount: number): void {
    const cols = this._calculateCurrentColumns();
    const rows = cols > 0 ? Math.ceil(itemCount / cols) : 0;
    this.setAttribute('aria-rowcount', String(rows));
    this.setAttribute('aria-colcount', String(cols));
  }

  private _handleTileClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const defaultSlot = this.shadowRoot?.querySelector('main slot') as HTMLSlotElement;
    if (!defaultSlot) return;

    const assignedNodes = defaultSlot.assignedElements({ flatten: true });
    const clickedItem = assignedNodes.find((node) => node.contains(target) || node === target);

    if (clickedItem) {
      const index = assignedNodes.indexOf(clickedItem);
      this.dispatchEvent(
        new CustomEvent('tile-click', {
          bubbles: true,
          composed: true,
          detail: {
            item: clickedItem as HTMLElement,
            index,
          },
        })
      );
    }
  }

  private _handleKeyDown(e: KeyboardEvent): void {
    const defaultSlot = this.shadowRoot?.querySelector('main slot') as HTMLSlotElement;
    if (!defaultSlot) return;

    const assignedNodes = defaultSlot.assignedElements({ flatten: true }) as HTMLElement[];
    if (assignedNodes.length === 0) return;

    const activeElement = document.activeElement as HTMLElement;
    let currentIndex = assignedNodes.findIndex(
      (node) => node === activeElement || node.contains(activeElement)
    );

    if (currentIndex === -1) return;

    const cols = this._calculateCurrentColumns();
    let targetIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        targetIndex = Math.min(currentIndex + 1, assignedNodes.length - 1);
        break;
      case 'ArrowLeft':
        targetIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'ArrowDown':
        targetIndex = Math.min(currentIndex + cols, assignedNodes.length - 1);
        break;
      case 'ArrowUp':
        targetIndex = Math.max(currentIndex - cols, 0);
        break;
      case 'Home':
        targetIndex = 0;
        break;
      case 'End':
        targetIndex = assignedNodes.length - 1;
        break;
      default:
        return;
    }

    if (targetIndex !== currentIndex) {
      e.preventDefault();
      assignedNodes[targetIndex].focus();
    }
  }

  render() {
    return TileLayoutGridTemplate({
      mode: this.mode,
      columns: this.columns,
      minTileWidth: this.minTileWidth,
      gap: this.gap,
      aspectRatio: this.aspectRatio,
      loading: this.loading,
      isEmpty: this._isEmpty,
      onSlotChange: this._handleSlotChange.bind(this),
      onTileClick: this._handleTileClick.bind(this),
      onKeyDown: this._handleKeyDown.bind(this),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-tile-layout-grid': TileLayoutGrid;
  }
}