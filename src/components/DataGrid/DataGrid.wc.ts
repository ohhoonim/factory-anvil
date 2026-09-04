// src/components/DataGrid/DataGrid.wc.ts
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DataGridTemplate } from './DataGrid.js';
import type { DataGridHost, ColumnDef, ShadowRowData } from './DataGrid.js';
import { dataGridStyles } from './DataGrid.css.js';

@customElement('biz-data-grid')
export class BizDataGrid extends LitElement implements DataGridHost {
  static override styles = dataGridStyles;

  @property({ type: String, reflect: true })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Array })
  rawData: Array<Record<string, unknown>> = [];

  @property({ type: Array })
  columns: Array<ColumnDef> = [];

  @property({ type: Number })
  rowHeight = 40;

  @property({ type: Number })
  vBuffer = 5;

  @property({ type: Number })
  hBuffer = 200;

  @state()
  phantomHeight = 0;

  @state()
  phantomWidth = 0;

  @state()
  contentTransform = 'translate3d(0, 0, 0)';

  @state()
  renderedRows: Array<{
    slot: number;
    transform: string;
    rowIndex: number;
    cells: Array<{
      key: string;
      type: string;
      transform: string;
      width: number;
      displayStr: string;
      raw: string;
    }>;
  }> = [];

  private shadowTable: ShadowRowData[] = [];
  private colWidths: number[] = [];
  private colOffsets: number[] = [];
  private totalWidth = 0;

  private lastScrollTop = -1;
  private lastScrollLeft = -1;
  private lastScrollTime = performance.now();
  private isTicking = false;

  private renderedVRange = { start: -1, end: -1 };
  private renderedHRange = { start: -1, end: -1 };

  private visibleRowsCount = 0;

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  protected override willUpdate(changedProperties: PropertyValues): void {
    if (
      changedProperties.has('rawData') ||
      changedProperties.has('columns') ||
      changedProperties.has('rowHeight')
    ) {
      this.rebuildGridData();
    }
  }

  private rebuildGridData(): void {
    this.shadowTable = this.buildShadowTable(this.rawData, this.columns);
    this.colWidths = this.columns.map((c) => c.width || 120);
    this.buildColumnOffsets();

    this.phantomHeight = this.shadowTable.length * this.rowHeight;
    this.phantomWidth = this.totalWidth;

    const viewportHeight = 400; // default height matching CSS token
    this.visibleRowsCount =
      Math.ceil(viewportHeight / this.rowHeight) + this.vBuffer * 2;

    this.renderedVRange = { start: -1, end: -1 };
    this.renderedHRange = { start: -1, end: -1 };
  }

  private buildShadowTable(
    rawData: Array<Record<string, unknown>>,
    columns: ColumnDef[]
  ): ShadowRowData[] {
    return rawData.map((doc, rowIndex) => {
      const shadowRow: ShadowRowData = { _raw: doc, _rowKey: rowIndex };
      for (const col of columns) {
        const rawVal = this.getValueByPath(doc, col.path);
        const type = this.detectType(rawVal);
        shadowRow[col.key] = {
          displayStr: this.formatDisplayString(rawVal, type),
          type: type,
          raw: rawVal,
        };
      }
      return shadowRow;
    });
  }

  private getValueByPath(obj: Record<string, unknown>, path: string): unknown {
    if (!path) return undefined;
    return path.split('.').reduce<unknown>((acc, key) => {
      if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj);
  }

  private detectType(val: unknown): string {
    if (val === null || val === undefined) return 'null';
    if (typeof val === 'number') return 'number';
    if (typeof val === 'string') {
      if (/^[0-9a-fA-F]{24}$/.test(val)) return 'objectId';
      return 'string';
    }
    if (typeof val === 'object') return 'object';
    return typeof val;
  }

  private formatDisplayString(val: unknown, type: string): string {
    if (val === null || val === undefined) return '';
    if (type === 'object') return JSON.stringify(val).slice(0, 50);
    const str = String(val);
    return str.length > 100 ? str.slice(0, 100) + '...' : str;
  }

  private buildColumnOffsets(): void {
    this.colOffsets = new Array(this.colWidths.length);
    let acc = 0;
    for (let i = 0; i < this.colWidths.length; i++) {
      this.colOffsets[i] = acc;
      acc += this.colWidths[i];
    }
    this.totalWidth = acc;
  }

  private binarySearchColumn(x: number): number {
    let low = 0;
    let high = this.colOffsets.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const offset = this.colOffsets[mid];
      const width = this.colWidths[mid];

      if (x >= offset && x < offset + width) {
        return mid;
      } else if (x < offset) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return Math.max(0, Math.min(low, this.colOffsets.length - 1));
  }

  public handleScroll = (e: Event): void => {
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const scrollLeft = target.scrollLeft;

    this.dispatchEvent(
      new CustomEvent('scroll', {
        bubbles: true,
        composed: true,
        detail: { scrollTop, scrollLeft },
      })
    );

    if (!this.isTicking) {
      requestAnimationFrame((timestamp) => {
        this.onScroll(timestamp, target);
        this.isTicking = false;
      });
      this.isTicking = true;
    }
  };

  private onScroll(timestamp: number, target: HTMLElement): void {
    const scrollTop = target.scrollTop;
    const scrollLeft = target.scrollLeft;

    const dt = Math.max(1, timestamp - this.lastScrollTime);
    const dy = Math.abs(scrollTop - this.lastScrollTop);
    const velocity = dy / dt;

    this.lastScrollTime = timestamp;
    this.lastScrollTop = scrollTop;
    this.lastScrollLeft = scrollLeft;

    if (velocity > 10) {
      return;
    }

    this.performVirtualRender(target, false);
  }

  public handleMouseOver = (e: MouseEvent): void => {
    const cell = (e.target as HTMLElement).closest('.grid-cell') as HTMLElement;
    if (cell && cell.dataset.raw) {
      cell.title = cell.dataset.raw;
      this.dispatchEvent(
        new CustomEvent('mouseover', {
          bubbles: true,
          composed: true,
          detail: { targetCell: cell, rawData: cell.dataset.raw },
        })
      );
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (this.disabled) return;

    if (e.key === 'Escape') {
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
          detail: undefined,
        })
      );
    } else if (e.key === 'Enter') {
      const form = this.closest('form');
      if (form) {
        form.requestSubmit();
      }
    }
  }

  private performVirtualRender(viewportEl: HTMLElement, force: boolean): void {
    if (!this.columns.length || !this.shadowTable.length) {
      this.renderedRows = [];
      return;
    }

    const scrollTop = viewportEl.scrollTop;
    const scrollLeft = viewportEl.scrollLeft;
    const viewportHeight = viewportEl.clientHeight || 400;
    const viewportWidth = viewportEl.clientWidth || 800;

    const startRow = Math.max(
      0,
      Math.floor(scrollTop / this.rowHeight) - this.vBuffer
    );
    const endRow = Math.min(
      this.shadowTable.length - 1,
      Math.ceil((scrollTop + viewportHeight) / this.rowHeight) + this.vBuffer
    );

    const startCol = this.binarySearchColumn(
      Math.max(0, scrollLeft - this.hBuffer)
    );
    const endCol = this.binarySearchColumn(
      Math.min(
        this.totalWidth,
        scrollLeft + viewportWidth + this.hBuffer
      )
    );

    if (
      !force &&
      startRow >= this.renderedVRange.start &&
      endRow <= this.renderedVRange.end &&
      startCol >= this.renderedHRange.start &&
      endCol <= this.renderedHRange.end
    ) {
      return;
    }

    this.renderedVRange = { start: startRow, end: endRow };
    this.renderedHRange = { start: startCol, end: endCol };

    this.contentTransform = `translate3d(${
      this.colOffsets[startCol] || 0
    }px, ${startRow * this.rowHeight}px, 0)`;

    const totalRowsToRender = endRow - startRow + 1;
    const newRenderedRows = [];

    for (let slot = 0; slot < this.visibleRowsCount; slot++) {
      if (slot < totalRowsToRender) {
        const targetRowIndex = startRow + slot;
        const rowData = this.shadowTable[targetRowIndex];
        if (!rowData) continue;

        const cells = [];
        for (let colIdx = startCol; colIdx <= endCol; colIdx++) {
          const col = this.columns[colIdx];
          if (!col) continue;

          const cellKey = col.key;
          const cellData = rowData[cellKey] as {
            displayStr: string;
            type: string;
            raw: unknown;
          };

          const relativeLeft =
            this.colOffsets[colIdx] - this.colOffsets[startCol];

          cells.push({
            key: cellKey,
            type: cellData ? cellData.type : 'string',
            transform: `translate3d(${relativeLeft}px, 0, 0)`,
            width: this.colWidths[colIdx],
            displayStr: cellData ? cellData.displayStr : '',
            raw: cellData ? String(cellData.raw) : '',
          });
        }

        newRenderedRows.push({
          slot,
          transform: `translate3d(0, ${slot * this.rowHeight}px, 0)`,
          rowIndex: targetRowIndex,
          cells,
        });
      }
    }

    this.renderedRows = newRenderedRows;
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);
    if (
      changedProperties.has('rawData') ||
      changedProperties.has('columns') ||
      changedProperties.has('rowHeight')
    ) {
      const viewportEl = this.shadowRoot?.getElementById('grid-viewport');
      if (viewportEl) {
        this.performVirtualRender(viewportEl, true);
      }
    }
  }

  override render() {
    return DataGridTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-data-grid': BizDataGrid;
  }
}