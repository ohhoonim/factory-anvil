import { html, type TemplateResult } from "lit";

export interface ColumnDef {
  key: string;
  label: string;
  width?: string | number;
  sortable?: boolean;
  sortDirection?: 'ASC' | 'DESC' | null;
  filterable?: boolean;
  isFiltered?: boolean;
  reorderable?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface GridHeaderHost {
  columns: ColumnDef[];
  colOffsets: number[];
  totalWidth: number;
  scrollLeft: number;
  variant: 'default' | 'sticky';
  size: 'sm' | 'md' | 'lg';
  dragColumnKey: string | null;
  targetColumnKey: string | null;
  handleHeaderCellClick: (e: CustomEvent) => void;
  handleFilterClick: (e: CustomEvent) => void;
  handleDragStart: (e: DragEvent, columnKey: string) => void;
  handleDragOver: (e: DragEvent, columnKey: string) => void;
  handleDrop: (e: CustomEvent, columnKey: string) => void;
  handleResize: (e: CustomEvent) => void;
}

export const GridHeaderTemplate = (host: GridHeaderHost): TemplateResult => {
  const containerStyle = `
    width: ${host.totalWidth ? `${host.totalWidth}px` : '100%'};
    transform: translate3d(-${host.scrollLeft}px, 0, 0);
  `;

  return html`
    <div 
      class="grid-header grid-header--${host.variant} grid-header--${host.size}" 
      role="rowgroup"
    >
      <div 
        class="grid-header__transform-layer"
        style="${containerStyle}"
        role="row"
      >
        <div class="grid-header__cell-group">
          ${host.columns.map((col) => {
            const isDragging = host.dragColumnKey === col.key;
            const isTarget = host.targetColumnKey === col.key;

            return html`
              <grid-header-cell
                class="${isDragging ? 'is-dragging' : ''} ${isTarget ? 'is-target' : ''}"
                .columnKey="${col.key}"
                .label="${col.label}"
                .sortable="${Boolean(col.sortable)}"
                .sortDirection="${col.sortDirection ?? null}"
                .filterable="${Boolean(col.filterable)}"
                .isFiltered="${Boolean(col.isFiltered)}"
                .reorderable="${Boolean(col.reorderable)}"
                .size="${host.size}"
                .align="${col.align ?? 'left'}"
                .width="${typeof col.width === 'number' ? `${col.width}px` : col.width ?? 'auto'}"
                .isDragging="${isDragging}"
                @click="${host.handleHeaderCellClick}"
                @filter-click="${host.handleFilterClick}"
                @dragstart="${(e: DragEvent) => host.handleDragStart(e, col.key)}"
                @dragover="${(e: DragEvent) => host.handleDragOver(e, col.key)}"
                @column-drop="${(e: CustomEvent) => host.handleDrop(e, col.key)}"
                @column-resize="${host.handleResize}"
              ></grid-header-cell>
            `;
          })}
        </div>
        <slot></slot>
      </div>
    </div>
  `;
};