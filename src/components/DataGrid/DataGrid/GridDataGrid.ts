import { html, type TemplateResult } from "lit";

export interface ColumnDef {
  key: string;
  label: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  formatter?: (value: any) => string;
}

export interface VirtualRange {
  start: number;
  end: number;
}

export interface SortState {
  key: string;
  direction: "asc" | "desc" | null;
}

export interface SelectionRange {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
}

export interface GridDataGridHost {
  data: Array<Record<string, any>>;
  columns: Array<ColumnDef>;
  rowHeight: number;
  pageSize: number;
  currentPage: number;
  storageKey: string;
  variant: "default" | "bordered" | "borderless";
  size: "sm" | "md" | "lg";
  width: string;
  height: string;

  shadowTable: Array<Record<string, any>>;
  colOffsets: number[];
  vRange: VirtualRange;
  hRange: VirtualRange;
  sortState: SortState;
  filterState: Record<string, any>;
  dirtyMap: Map<string, any>;
  selectionRange: SelectionRange | null;

  handleScroll: (e: Event) => void;
  handleHeaderClick: (e: CustomEvent) => void;
  handleColumnResize: (e: CustomEvent) => void;
  handleCellEditStart: (e: CustomEvent) => void;
  handleFooterCellClick: (e: CustomEvent) => void;
  handlePageChange: (e: CustomEvent) => void;
}

export const GridDataGridTemplate = (host: GridDataGridHost): TemplateResult => {
  const phantomHeight = host.shadowTable.length * host.rowHeight;
  const phantomWidth =
    host.colOffsets.length > 0
      ? host.colOffsets[host.colOffsets.length - 1] +
        (host.columns[host.columns.length - 1]?.width ?? 100)
      : 800;

  const totalCount = host.data.length;
  const startItem = totalCount > 0 ? (host.currentPage - 1) * host.pageSize + 1 : 0;
  const endItem = Math.min(host.currentPage * host.pageSize, totalCount);

  const element = host as unknown as Element;
  const hasFooterContent =
    (host.columns && host.columns.some((col: any) => col.footerTemplate !== undefined)) ||
    (typeof element.querySelector === "function" && element.querySelector('[slot="footer"]') !== null);

  return html`
    <div
      class="grid-data-grid grid-data-grid--${host.variant} grid-data-grid--${host.size}"
      style="--grid-data-grid-width: ${host.width}; --grid-data-grid-height: ${host.height}; --grid-data-grid-row-height: ${host.rowHeight}px;"
    >
      <slot name="header">
        <grid-header
          .columns=${host.columns}
          .colOffsets=${host.colOffsets}
          .sortState=${host.sortState}
          @header-cell-click=${host.handleHeaderClick}
          @column-resize=${host.handleColumnResize}
        ></grid-header>
      </slot>

      <slot name="viewport">
        <grid-viewport
          .phantomWidth=${phantomWidth}
          .phantomHeight=${phantomHeight}
          .rowHeight=${host.rowHeight}
          @cell-edit-start=${host.handleCellEditStart}
        >
          <!-- .selectionRange=${host.selectionRange} -->
          @scroll=${host.handleScroll}
          ${host.shadowTable
            .slice(host.vRange.start, host.vRange.end)
            .map((rowData, idx) => {
              const actualIndex = host.vRange.start + idx;
              return html`
                <grid-row
                  .rowIndex=${actualIndex}
                  .rowData=${rowData}
                  .columns=${host.columns}
                  .colOffsets=${host.colOffsets}
                  .isActive=${true}
                  .isDirty=${host.dirtyMap.has(`${actualIndex}`)}
                  @cell-edit-start=${host.handleCellEditStart}
                ></grid-row>
              `;
            })}
        </grid-viewport>
      </slot>

      ${hasFooterContent
        ? html`
            <slot name="footer">
              <grid-footer
                .columns=${host.columns}
                .colOffsets=${host.colOffsets}
                @footer-cell-click=${host.handleFooterCellClick}
              ></grid-footer>
            </slot>
          `
        : ""}

      <div class="grid-data-grid__toolbar">
        <slot name="info">
          <grid-info
            .totalCount=${totalCount}
            .startItem=${startItem}
            .endItem=${endItem}
            .dirtyCount=${host.dirtyMap.size}
          ></grid-info>
        </slot>
        <slot name="pagination">
          <grid-pagination
            .currentPage=${host.currentPage}
            .pageSize=${host.pageSize}
            .totalCount=${totalCount}
            @page-change=${host.handlePageChange}
          ></grid-pagination>
        </slot>
        <slot></slot>
      </div>
    </div>
  `;
};