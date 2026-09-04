import { LitElement } from "lit";
import { GridHeaderTemplate, type ColumnDef, type GridHeaderHost } from "./GridHeader";
import { GridheaderStyles } from "./GridHeader.css";
import { customElement, property, state } from "lit/decorators.js";

@customElement('grid-header')
export class GridHeader extends LitElement implements GridHeaderHost {
  static styles = GridheaderStyles;

  @property({ type: Array })
  columns: ColumnDef[] = [];

  @property({ type: Array })
  colOffsets: number[] = [];

  @property({ type: Number })
  totalWidth: number = 0;

  @property({ type: Number })
  scrollLeft: number = 0;

  @property({ type: String })
  variant: 'default' | 'sticky' = 'default';

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  @state()
  dragColumnKey: string | null = null;

  @state()
  targetColumnKey: string | null = null;

  handleHeaderCellClick = (e: CustomEvent): void => {
    const detail = e.detail;
    if (!detail || !detail.columnKey) return;

    this.dispatchEvent(
      new CustomEvent('header-cell-click', {
        bubbles: true,
        composed: true,
        detail: {
          columnKey: detail.columnKey,
          sortDirection: detail.sortDirection ?? null,
        },
      })
    );
  };

  handleFilterClick = (e: CustomEvent): void => {
    const detail = e.detail;
    if (!detail || !detail.columnKey) return;

    this.dispatchEvent(
      new CustomEvent('filter-open', {
        bubbles: true,
        composed: true,
        detail: {
          columnKey: detail.columnKey,
          anchorEl: (e.target as HTMLElement) || this,
        },
      })
    );
  };

  handleDragStart = (e: DragEvent, columnKey: string): void => {
    this.dragColumnKey = columnKey;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', columnKey);
    }
  };

  handleDragOver = (e: DragEvent, columnKey: string): void => {
    e.preventDefault();
    if (this.dragColumnKey && this.dragColumnKey !== columnKey) {
      this.targetColumnKey = columnKey;
    }
  };
  /**
     * 변경된 columns 상태를 바탕으로 각 컬럼의 X축 누적 오프셋(colOffsets)을 재계산합니다.
     */
  private recalculateColOffsets(columns: ColumnDef[]): number[] {
    let currentOffset = 0;
    return columns.map((col) => {
      const offset = currentOffset;
      const widthPx = typeof col.width === 'number'
        ? col.width
        : Number.parseInt(col.width?.replace('px', '') || '0', 10);

      currentOffset += widthPx;
      return offset;
    });
  }

  handleDrop = (e: CustomEvent, columnKey: string): void => {
    e.preventDefault();
    if (!this.dragColumnKey || this.dragColumnKey === columnKey) {
      this.resetDragState();
      return;
    }

    const fromIndex = this.columns.findIndex((col) => col.key === this.dragColumnKey);
    const toIndex = this.columns.findIndex((col) => col.key === columnKey);

    if (fromIndex !== -1 && toIndex !== -1) {
      const updatedColumns = [...this.columns];
      const [movedColumn] = updatedColumns.splice(fromIndex, 1);

      const targetIndex = fromIndex < toIndex ? toIndex - 1 : toIndex;
      updatedColumns.splice(targetIndex, 0, movedColumn);

      this.columns = updatedColumns;
      // 컬럼 순서 변경에 맞춰 colOffsets 배열 재계산 및 업데이트
      this.colOffsets = this.recalculateColOffsets(updatedColumns);

      this.dispatchEvent(
        new CustomEvent('column-reorder', {
          bubbles: true,
          composed: true,
          detail: {
            fromIndex,
            toIndex: targetIndex,
            columnKey: this.dragColumnKey,
            columns: this.columns,
            colOffsets: this.colOffsets,
          },
        })
      );
    }

    this.resetDragState();
  };

  handleResize = (e: CustomEvent): void => {
    e.stopPropagation();
  };

  private resetDragState(): void {
    this.dragColumnKey = null;
    this.targetColumnKey = null;
  }

  protected render() {
    return GridHeaderTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-header': GridHeader;
  }
}