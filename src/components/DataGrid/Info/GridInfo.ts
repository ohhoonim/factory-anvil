import { html, type TemplateResult } from 'lit';

export interface SortItem {
  columnKey: string;
  direction: 'asc' | 'desc';
}

export interface RenderedRange {
  start: number;
  end: number;
}

export interface GridInfoHost {
  totalCount: number;
  filteredCount: number;
  renderedRange: RenderedRange;
  selectedRowCount: number;
  selectedCellCount: number;
  dirtyRowCount: number;
  dirtyCellCount: number;
  sortState: SortItem[];
  variant: 'default' | 'compact';
  size: 'sm' | 'md';
  position: 'top' | 'bottom';
  handleInfoClick: (type: 'count' | 'sort' | 'selection' | 'dirty') => void;
}

export const GridInfoTemplate = (host: GridInfoHost): TemplateResult => {
  const isFiltered = host.filteredCount > 0 && host.filteredCount < host.totalCount;
  const isSelected = host.selectedRowCount > 0 || host.selectedCellCount > 0;
  const isDirty = host.dirtyRowCount > 0 || host.dirtyCellCount > 0;
  const isCompact = host.variant === 'compact';

  const formatCountSummary = (): string => {
    const totalFormatted = host.totalCount.toLocaleString();
    const rangeStart = host.renderedRange.start.toLocaleString();
    const rangeEnd = host.renderedRange.end.toLocaleString();

    if (isFiltered) {
      const filteredFormatted = host.filteredCount.toLocaleString();
      return `전체 ${totalFormatted}개 (필터링 ${filteredFormatted}개) 중 ${rangeStart}~${rangeEnd}번째 표시`;
    }
    return `전체 ${totalFormatted}개 중 ${rangeStart}~${rangeEnd}번째 표시`;
  };

  const formatSortSummary = (): string => {
    if (!host.sortState || host.sortState.length === 0) {
      return '';
    }
    return host.sortState
      .map((item) => `${item.columnKey} ${item.direction.toUpperCase()}`)
      .join(', ');
  };

  return html`
    <div
      class="grid-info grid-info--${host.variant} grid-info--${host.size} grid-info--${host.position}"
      role="status"
      aria-live="polite"
    >
      <div class="grid-info__slot grid-info__slot--prefix">
        <slot name="prefix"></slot>
      </div>

      <div class="grid-info__body">
        <div
          class="grid-info__section grid-info__section--counter"
          @click=${() => host.handleInfoClick('count')}
        >
          <span class="grid-info__text">${formatCountSummary()}</span>
        </div>

        ${!isCompact
          ? html`
              ${host.sortState && host.sortState.length > 0
                ? html`
                    <div
                      class="grid-info__section grid-info__section--sort"
                      @click=${() => host.handleInfoClick('sort')}
                    >
                      <span class="grid-info__label">정렬:</span>
                      <span class="grid-info__text">${formatSortSummary()}</span>
                    </div>
                  `
                : ''}
              ${isSelected
                ? html`
                    <div
                      class="grid-info__section grid-info__section--selection grid-info__section--active"
                      @click=${() => host.handleInfoClick('selection')}
                    >
                      <span class="grid-info__text">
                        선택: 행 ${host.selectedRowCount.toLocaleString()}개 / 셀 ${host.selectedCellCount.toLocaleString()}개
                      </span>
                    </div>
                  `
                : ''}
              ${isDirty
                ? html`
                    <div
                      class="grid-info__section grid-info__section--dirty grid-info__section--active"
                      @click=${() => host.handleInfoClick('dirty')}
                    >
                      <span class="grid-info__text">
                        수정됨: 행 ${host.dirtyRowCount.toLocaleString()}개 / 셀 ${host.dirtyCellCount.toLocaleString()}개
                      </span>
                    </div>
                  `
                : ''}
            `
          : ''}
      </div>

      <div class="grid-info__slot grid-info__slot--suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
  `;
};