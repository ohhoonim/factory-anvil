import { html } from "lit";

export interface GridPaginationHost {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  pageSizeOptions: number[];
  maxPageButtons: number;
  disabled: boolean;
  variant: 'default' | 'compact';
  size: 'sm' | 'md';
  align: 'left' | 'center' | 'right' | 'space-between';
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export const GridPaginationTemplate = (host: GridPaginationHost) => {
  const totalPages = Math.max(1, Math.ceil(host.totalCount / host.pageSize));
  const currentPage = Math.min(Math.max(1, host.currentPage), totalPages);

  const isFirst = currentPage === 1 || host.disabled;
  const isLast = currentPage === totalPages || host.disabled;

  const startItem = host.totalCount === 0 ? 0 : (currentPage - 1) * host.pageSize + 1;
  const endItem = Math.min(currentPage * host.pageSize, host.totalCount);

  let startPage = Math.max(1, currentPage - Math.floor(host.maxPageButtons / 2));
  let endPage = startPage + host.maxPageButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - host.maxPageButtons + 1);
  }

  const pageNumbers: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page: number) => {
    if (host.disabled || page === currentPage || page < 1 || page > totalPages) return;
    host.onPageChange(page);
  };

  const handlePageSizeSelect = (e: Event) => {
    if (host.disabled) return;
    const target = e.target as HTMLSelectElement;
    const newSize = Number(target.value);
    host.onPageSizeChange(newSize);
  };

  return html`
    <div
      class="grid-pagination grid-pagination--${host.size} grid-pagination--align-${host.align} ${host.disabled ? 'is-disabled' : ''}"
    >
      <div class="grid-pagination__prefix">
        <slot name="prefix"></slot>
      </div>

      <div class="grid-pagination__body">
        ${host.variant !== 'compact'
          ? html`
              <div class="grid-pagination__size-selector">
                <select
                  class="grid-pagination__select"
                  .value="${String(host.pageSize)}"
                  ?disabled="${host.disabled}"
                  @change="${handlePageSizeSelect}"
                >
                  ${host.pageSizeOptions.map(
                    (opt) => html`
                      <option value="${opt}" ?selected="${opt === host.pageSize}">
                        ${opt} / page
                      </option>
                    `
                  )}
                </select>
              </div>
            `
          : ''}

        <div class="grid-pagination__info">
          ${startItem}-${endItem} of ${host.totalCount} items
        </div>

        <div class="grid-pagination__nav">
          <button
            type="button"
            class="grid-pagination__btn"
            ?disabled="${isFirst}"
            @click="${() => handlePageClick(1)}"
            aria-label="First page"
          >
            &lt;&lt;
          </button>
          <button
            type="button"
            class="grid-pagination__btn"
            ?disabled="${isFirst}"
            @click="${() => handlePageClick(currentPage - 1)}"
            aria-label="Previous page"
          >
            &lt;
          </button>

          ${host.variant !== 'compact'
            ? html`
                <div class="grid-pagination__pages">
                  ${pageNumbers.map(
                    (p) => html`
                      <button
                        type="button"
                        class="grid-pagination__btn grid-pagination__btn--page ${p === currentPage ? 'is-active' : ''}"
                        ?disabled="${host.disabled}"
                        @click="${() => handlePageClick(p)}"
                      >
                        ${p}
                      </button>
                    `
                  )}
                </div>
              `
            : ''}

          <button
            type="button"
            class="grid-pagination__btn"
            ?disabled="${isLast}"
            @click="${() => handlePageClick(currentPage + 1)}"
            aria-label="Next page"
          >
            &gt;
          </button>
          <button
            type="button"
            class="grid-pagination__btn"
            ?disabled="${isLast}"
            @click="${() => handlePageClick(totalPages)}"
            aria-label="Last page"
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      <div class="grid-pagination__suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
  `;
};