import { LitElement, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  GridDataGridTemplate,
  type GridDataGridHost,
  type ColumnDef,
  type VirtualRange,
  type SortState,
  type SelectionRange
} from "./GridDataGrid";
import { GriddataGridStyles } from "./GridDataGrid.css";

@customElement("grid-data-grid")
export class GridDataGrid extends LitElement implements GridDataGridHost {
  static override styles = GriddataGridStyles;

  @property({ type: Array })
  data: Array<Record<string, any>> = [];

  @property({ type: Array })
  columns: Array<ColumnDef> = [];

  @property({ type: Number })
  rowHeight: number = 40;

  @property({ type: Number })
  pageSize: number = 50;

  @property({ type: Number })
  currentPage: number = 1;

  @property({ type: String })
  storageKey: string = "";

  @property({ type: String })
  variant: "default" | "bordered" | "borderless" = "default";

  @property({ type: String })
  size: "sm" | "md" | "lg" = "md";

  @property({ type: String })
  width: string = "100%";

  @property({ type: String })
  height: string = "600px";

  @state()
  shadowTable: Array<Record<string, any>> = [];

  @state()
  colOffsets: number[] = [];

  @state()
  vRange: VirtualRange = { start: 0, end: 0 };

  @state()
  hRange: VirtualRange = { start: 0, end: 0 };

  @state()
  sortState: SortState = { key: "", direction: null };

  @state()
  filterState: Record<string, any> = {};

  @state()
  dirtyMap: Map<string, any> = new Map();

  @state()
  selectionRange: SelectionRange | null = null;

  override willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
    let needsVRangeRecalculation = false;

    if (changedProperties.has("data") || changedProperties.has("currentPage") || changedProperties.has("pageSize")) {
      this.updatePagedShadowTable();
      needsVRangeRecalculation = true;
    }

    if (changedProperties.has("height") || changedProperties.has("rowHeight")) {
      needsVRangeRecalculation = true;
    }

    if (changedProperties.has("columns")) {
      this.recalculateColOffsets();
    }

    if (needsVRangeRecalculation) {
      this.recalculateVRange();
    }
  }

  private updatePagedShadowTable(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.shadowTable = this.data.slice(startIndex, endIndex);
  }

  private recalculateVRange(): void {
    const parsedHeight = parseInt(this.height, 10) || 600;
    const visibleCount = Math.ceil(parsedHeight / this.rowHeight) + 3;
    const end = Math.min(this.shadowTable.length, visibleCount);
    this.vRange = { start: 0, end };
  }

  private recalculateColOffsets(): void {
    let currentOffset = 0;
    this.colOffsets = this.columns.map((col) => {
      const offset = currentOffset;
      currentOffset += col.width ?? 100;
      return offset;
    });
  }

  handleScroll = (e: Event): void => {
    const target = e.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const start = Math.floor(scrollTop / this.rowHeight);
    const visibleCount = Math.ceil(target.clientHeight / this.rowHeight);
    this.vRange = { start, end: Math.min(this.shadowTable.length, start + visibleCount + 3) };
  };

  handleHeaderClick = (e: CustomEvent): void => {
    const { key } = e.detail;
    let direction: "asc" | "desc" | null = "asc";

    if (this.sortState.key === key) {
      if (this.sortState.direction === "asc") direction = "desc";
      else if (this.sortState.direction === "desc") direction = null;
    }

    this.sortState = { key, direction };
    this.dispatchEvent(
      new CustomEvent("config-save", {
        bubbles: true,
        composed: true,
        detail: { key: this.storageKey, config: { sortState: this.sortState } }
      })
    );
  };

  handleColumnResize = (e: CustomEvent): void => {
    const { key, width } = e.detail;
    this.columns = this.columns.map((col) =>
      col.key === key ? { ...col, width } : col
    );
    this.recalculateColOffsets();
    this.requestUpdate("colOffsets");

    this.dispatchEvent(
      new CustomEvent("config-save", {
        bubbles: true,
        composed: true,
        detail: { key: this.storageKey, config: { columns: this.columns } }
      })
    );
  };

  handleCellEditStart = (e: CustomEvent): void => {
    const { rowIndex, key, value } = e.detail;
    const updatedMap = new Map(this.dirtyMap);
    updatedMap.set(`${rowIndex}-${key}`, value);
    this.dirtyMap = updatedMap;

    this.dispatchEvent(
      new CustomEvent("data-change", {
        bubbles: true,
        composed: true,
        detail: { updatedData: this.shadowTable, dirtyMap: this.dirtyMap }
      })
    );
  };

  handleFooterCellClick = (e: CustomEvent): void => {
    this.dispatchEvent(
      new CustomEvent("footer-cell-click", {
        bubbles: true,
        composed: true,
        detail: e.detail
      })
    );
  };

  handlePageChange = (e: CustomEvent): void => {
    const { page, pageSize } = e.detail;
    this.currentPage = page;
    this.pageSize = pageSize;
    this.updatePagedShadowTable();
    this.recalculateVRange();

    this.dispatchEvent(
      new CustomEvent("page-change", {
        bubbles: true,
        composed: true,
        detail: { page: this.currentPage, pageSize: this.pageSize }
      })
    );
  };

  override render(): TemplateResult {
    return GridDataGridTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "grid-data-grid": GridDataGrid;
  }
}