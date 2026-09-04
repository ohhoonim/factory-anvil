import { html, type TemplateResult } from 'lit';

export interface GridHeaderCellHost {
  columnKey: string;
  label: string;
  sortable: boolean;
  sortDirection: 'ASC' | 'DESC' | null;
  filterable: boolean;
  isFiltered: boolean;
  reorderable: boolean;
  size: 'sm' | 'md' | 'lg';
  align: 'left' | 'center' | 'right';
  width: string;
  isDragging: boolean;
  handleCellClick: (e: MouseEvent) => void;
  handleFilterClick: (e: MouseEvent) => void;
  handleDragStart: (e: DragEvent) => void;
  handleDragOver: (e: DragEvent) => void;
  handleDrop: (e: DragEvent) => void;
  handleDragEnd: (e: DragEvent) => void;
  handleResize: (e: CustomEvent) => void;
}

export const GridHeaderCellTemplate = (host: GridHeaderCellHost): TemplateResult => {
  const isSortable = host.sortable;
  const isFiltered = host.isFiltered;
  const filterable = host.filterable;
  const reorderable = host.reorderable;

  const renderSortIndicator = () => {
    if (!isSortable) return null;
    let icon = '▲/▼';
    if (host.sortDirection === 'ASC') icon = '▲';
    if (host.sortDirection === 'DESC') icon = '▼';

    return html`
      <span class="grid-header-cell__sort-indicator ${host.sortDirection ? 'is-active' : ''}">
        ${icon}
      </span>
    `;
  };

  const renderFilterTrigger = () => {
    if (!filterable) return null;

    return html`
      <button
        type="button"
        class="grid-header-cell__filter-trigger ${isFiltered ? 'is-filtered' : ''}"
        @click="${host.handleFilterClick}"
        aria-label="Filter"
      >
        <slot name="filter-icon">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .354.854L10 6.5V12.5a.5.5 0 0 1-.146.354l-3 3A.5.5 0 0 1 6 15.5V6.5L1.646 1.854A.5.5 0 0 1 1.5 1.5z"/>
          </svg>
        </slot>
      </button>
    `;
  };

  return html`
    <div
      class="grid-header-cell grid-header-cell--${host.size} grid-header-cell--align-${host.align} ${isSortable ? 'grid-header-cell--sortable' : ''} ${isFiltered ? 'grid-header-cell--filtered' : ''} ${host.isDragging ? 'grid-header-cell--dragging' : ''}"
      style="${host.width ? `width: ${host.width};` : ''}"
      @click="${host.handleCellClick}"
      @dragstart="${host.handleDragStart}"
      @dragover="${host.handleDragOver}"
      @drop="${host.handleDrop}"
      @dragend="${host.handleDragEnd}"
    >
      ${reorderable
        ? html`
            <span 
              class="grid-header-cell__drag-handle" 
              draggable="true"
              aria-hidden="true">
              ⋮⋮
            </span>
          `
        : null}

      <div class="grid-header-cell__title">
        <slot name="title">${host.label}</slot>
      </div>

      ${renderSortIndicator()}
      ${renderFilterTrigger()}

      <slot name="filter"></slot>
      <slot></slot>

      <grid-column-resizer 
        class="grid-header-cell__resizer" 
        .currentWidth="${Number.parseInt(host.width.replace('px', ''))}"
        @column-resize="${host.handleResize}"
        columnKey="${host.columnKey}"></grid-column-resizer>
    </div>
  `;
};