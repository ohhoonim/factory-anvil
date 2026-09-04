// src/components/DataGrid/DataGrid.ts

import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

export interface ColumnDef {
  key: string;
  path: string;
  width?: number;
}

export interface ShadowCellData {
  displayStr: string;
  type: string;
  raw: unknown;
}

export interface ShadowRowData {
  _raw: Record<string, unknown>;
  _rowKey: number;
  [key: string]: ShadowCellData | Record<string, unknown> | number;
}

export interface PoolCellItem {
  element: HTMLElement;
}

export interface PoolRowItem {
  element: HTMLElement;
  cells: Map<string, HTMLElement>;
  activeRowIndex: number;
}

export interface RenderRange {
  start: number;
  end: number;
}

export interface DataGridHost extends HTMLElement {
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  disabled: boolean;
  readonly: boolean;
  error: boolean;
  loading: boolean;
  
  rawData: Array<Record<string, unknown>>;
  columns: Array<ColumnDef>;
  rowHeight: number;
  vBuffer: number;
  hBuffer: number;

  phantomHeight: number;
  phantomWidth: number;
  contentTransform: string;
  
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
  }>;

  handleScroll: (e: Event) => void;
  handleMouseOver: (e: MouseEvent) => void;
}

export const DataGridTemplate = (host: DataGridHost) => html`
  <div
    class=${classMap({
      'biz-data-grid': true,
      'full-width': host.fullWidth,
      'is-disabled': host.disabled,
      'is-readonly': host.readonly,
      'is-error': host.error,
      'is-loading': host.loading,
    })}
    aria-disabled=${host.disabled ? 'true' : 'false'}
    aria-readonly=${host.readonly ? 'true' : 'false'}
    aria-invalid=${host.error ? 'true' : 'false'}
    aria-busy=${host.loading ? 'true' : 'false'}
  >
    <div class="grid-header-container">
      <div class="grid-header">
        ${host.columns.map(
          (col) => html`
            <div
              class="grid-header-cell"
              style=${styleMap({
                width: `${col.width || 120}px`,
              })}
              role="columnheader"
            >
              ${col.key}
            </div>
          `
        )}
      </div>
    </div>
    <div
      id="grid-viewport"
      class="biz-data-grid__viewport"
      @scroll=${host.handleScroll}
      role="grid"
    >
      <div
        class="biz-data-grid__phantom"
        style=${styleMap({
          height: `${host.phantomHeight}px`,
          width: `${host.phantomWidth}px`,
        })}
      ></div>
      <div
        class="biz-data-grid__content"
        style=${styleMap({
          transform: host.contentTransform,
        })}
      >
        ${host.renderedRows.map(
          (row) => html`
            <div
              class="biz-data-grid__row"
              style=${styleMap({
                transform: row.transform,
                height: `${host.rowHeight}px`,
              })}
              data-row-index=${row.rowIndex}
              role="row"
            >
              ${row.cells.map(
                (cell) => html`
                  <div
                    class=${classMap({
                      'biz-data-grid__cell': true,
                      [`type-${cell.type}`]: Boolean(cell.type),
                      'has-icon': Boolean(cell.type),
                    })}
                    style=${styleMap({
                      transform: cell.transform,
                      width: `${cell.width}px`,
                    })}
                    data-raw=${cell.raw}
                    @mouseover=${host.handleMouseOver}
                    role="gridcell"
                  >
                    <span class="biz-data-grid__cell-content">
                      ${cell.displayStr}
                    </span>
                  </div>
                `
              )}
            </div>
          `
        )}
      </div>
    </div>
  </div>
`;