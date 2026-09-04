import { html, type TemplateResult } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";

import type { EditorDataType } from "../Editor/GridEditor";

export interface GridRowHost {
  rowIndex: number;
  rowData: Record<string, any> | null;
  dataType?: Record<string, EditorDataType>;
  isActive: boolean;
  isDirty: boolean;
  isSelected: boolean;
  editable: boolean;
  handleRowClick: (e: MouseEvent) => void;
  handleRowDblClick: (e: MouseEvent) => void;
}

export const GridRowTemplate = (host: GridRowHost): TemplateResult => {
  const rowClasses = {
    'grid-row': true,
    'is-dirty': host.isDirty,
    'is-selected': host.isSelected,
    'is-active': host.isActive,
    'is-inactive': !host.isActive,
  };

  const rowStyles = {
    transform: host.rowIndex >= 0 
      ? `translate3d(0, calc(var(--grid-row-height, 36px) * ${host.rowIndex}), 0)` 
      : 'none',
  };

  const entries = host.rowData ? Object.entries(host.rowData) : [];

  return html`
    <div
      class="${classMap(rowClasses)}"
      style="${styleMap(rowStyles)}"
      @click="${host.handleRowClick}"
      @dblclick="${host.handleRowDblClick}"
    >
      <div class="grid-row__cells">
        <slot name="cells">
          ${entries.map(([key, value]) => {
            const cellDataType = host.dataType?.[key] ?? 'text';
            return html`
              <grid-cell
                .rowIndex="${host.rowIndex}"
                .columnKey="${key}"
                .rawValue="${value}"
                .dataType="${cellDataType}"
                .displayValue="${value !== null && value !== undefined ? String(value) : ''}"
                .editable="${host.editable}"
              ></grid-cell>
            `;
          })}
        </slot>
      </div>
      <div class="grid-row__overlay">
        <slot></slot>
      </div>
    </div>
  `;
};