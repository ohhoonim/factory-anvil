import { LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { GridHeaderCellTemplate, type GridHeaderCellHost } from './GridHeaderCell';
import { GridheaderCellStyles } from './GridHeaderCell.css';

@customElement('grid-header-cell')
export class GridHeaderCell extends LitElement implements GridHeaderCellHost {
  static override styles = GridheaderCellStyles;

  @property({ type: String }) columnKey: string = '';
  @property({ type: String }) label: string = '';
  @property({ type: Boolean }) sortable: boolean = true;
  @property({ type: String }) sortDirection: 'ASC' | 'DESC' | null = null;
  @property({ type: Boolean }) filterable: boolean = false;
  @property({ type: Boolean }) isFiltered: boolean = false;
  @property({ type: Boolean }) reorderable: boolean = true;
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: String }) align: 'left' | 'center' | 'right' = 'left';
  @property({ type: String }) width: string = '';

  @state() isDragging: boolean = false;

  handleCellClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).closest('.grid-header-cell__filter-trigger')) {
      return;
    }

    if (!this.sortable) return;

    let nextDirection: 'ASC' | 'DESC' | null = null;
    if (this.sortDirection === null) {
      nextDirection = 'ASC';
    } else if (this.sortDirection === 'ASC') {
      nextDirection = 'DESC';
    } else {
      nextDirection = null;
    }

    this.sortDirection = nextDirection;

    this.dispatchEvent(
      new CustomEvent('header-cell-click', {
        detail: {
          columnKey: this.columnKey,
          sortDirection: this.sortDirection,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleFilterClick(e: MouseEvent): void {
    e.stopPropagation();
    const anchorEl = e.currentTarget as HTMLElement;

    this.dispatchEvent(
      new CustomEvent('filter-trigger-click', {
        detail: {
          columnKey: this.columnKey,
          anchorEl,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleDragStart(e: DragEvent): void {
    const path = e.composedPath ? e.composedPath() : [];

    const isDragHandle = path.some(
      el => (el as HTMLElement).classList?.contains('grid-header-cell__drag-handle')
    );

    if (!this.reorderable || !isDragHandle) {
      e.preventDefault();
      return;
    }

    const draggableParent = path.find(
      el => (el as HTMLElement).classList?.contains('grid-header-cell')
    ) as HTMLElement | undefined;

    if (!draggableParent) {
      e.preventDefault();
      return;
    }

    this.isDragging = true;

    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', this.columnKey);

      // 부모 전체 요소를 고스트 이미지로 사용하되, 클릭 위치에 맞게 오프셋 계산
      const rect = draggableParent.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      e.dataTransfer.setDragImage(draggableParent, offsetX, offsetY);
    }

    this.dispatchEvent(
      new CustomEvent('column-drag-start', {
        detail: {
          columnKey: this.columnKey,
          clientX: e.clientX,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleDragOver(e: DragEvent): void {
    const target = e.target as HTMLElement;
    if (
      !this.reorderable ||
      target.closest('grid-column-resizer') ||
      (e.composedPath && e.composedPath().some(el => (el as HTMLElement).tagName?.toLowerCase() === 'grid-column-resizer'))
    ) {
      return;
    }

    e.preventDefault();
    const rect = this.getBoundingClientRect();
    const midpoint = rect.left + rect.width / 2;
    const position: 'before' | 'after' = e.clientX < midpoint ? 'before' : 'after';

    this.dispatchEvent(
      new CustomEvent('column-drag-over', {
        detail: {
          targetColumnKey: this.columnKey,
          position,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.dispatchEvent(
      new CustomEvent('column-drop', {
        detail: {
          targetColumnKey: this.columnKey,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleDragEnd(_e: DragEvent): void {
    this.isDragging = false;
    this.dispatchEvent(
      new CustomEvent('column-drag-end', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleResize(e: CustomEvent): void {
    e.stopPropagation();
    const widthVal = Number(e.detail?.width) || 0;
    this.width = `${Math.floor(widthVal)}px`;
  }

  override render(): TemplateResult {
    return GridHeaderCellTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-header-cell': GridHeaderCell;
  }
}