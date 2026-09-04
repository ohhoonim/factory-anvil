import { LitElement } from "lit";
import { GridPaginationTemplate, type GridPaginationHost } from "./GridPagination";
import { GridpaginationStyles } from "./GridPagination.css";
import { customElement, property } from "lit/decorators.js";

@customElement('grid-pagination')
export class GridPagination extends LitElement implements GridPaginationHost {
  static styles = GridpaginationStyles;

  @property({ type: Number })
  currentPage = 1;

  @property({ type: Number })
  pageSize = 20;

  @property({ type: Number })
  totalCount = 0;

  @property({ type: Array })
  pageSizeOptions: number[] = [10, 20, 50, 100];

  @property({ type: Number })
  maxPageButtons = 5;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: String })
  variant: 'default' | 'compact' = 'default';

  @property({ type: String })
  size: 'sm' | 'md' = 'md';

  @property({ type: String })
  align: 'left' | 'center' | 'right' | 'space-between' = 'space-between';

  onPageChange = (page: number): void => {
    this.currentPage = page;
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {
          page: this.currentPage,
          pageSize: this.pageSize
        },
        bubbles: true,
        composed: true
      })
    );
  };

  onPageSizeChange = (newPageSize: number): void => {
    const previousPageSize = this.pageSize;
    this.pageSize = newPageSize;

    const totalPages = Math.max(1, Math.ceil(this.totalCount / this.pageSize));
    if (this.currentPage > totalPages) {
      this.currentPage = totalPages;
    }

    this.dispatchEvent(
      new CustomEvent('page-size-change', {
        detail: {
          pageSize: this.pageSize,
          previousPageSize
        },
        bubbles: true,
        composed: true
      })
    );

    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: {
          page: this.currentPage,
          pageSize: this.pageSize
        },
        bubbles: true,
        composed: true
      })
    );
  };

  render() {
    return GridPaginationTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-pagination': GridPagination;
  }
}