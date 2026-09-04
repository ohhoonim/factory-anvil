import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GridViewportTemplate, type GridViewportHost, type SelectionRange } from "./GridViewport";
import { GridviewportStyles } from "./GridViewport.css";

@customElement('grid-viewport')
export class GridViewport extends LitElement implements GridViewportHost {
  static styles = GridviewportStyles;

  @property({ type: Number })
  phantomWidth: number = 0;

  @property({ type: Number })
  phantomHeight: number = 0;

  @property({ type: Number })
  rowHeight: number = 40;

  @property({ type: Boolean })
  striped: boolean = false;

  @state()
  scrollTop: number = 0;

  @state()
  scrollLeft: number = 0;

  @state()
  selectionRange: SelectionRange | null = null;

  @state()
  isDragging: boolean = false;

  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private startRowIndex: number = 0;
  private startColIndex: number = 0;

  handleScroll = (e: Event): void => {
    const target = e.target as HTMLElement;
    this.scrollTop = target.scrollTop;
    this.scrollLeft = target.scrollLeft;

    this.dispatchEvent(
      new CustomEvent('grid-scroll', {
        detail: {
          scrollTop: this.scrollTop,
          scrollLeft: this.scrollLeft,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  handleMouseDown = (e: MouseEvent): void => {
    if (e.button !== 0) return;

    const target = e.target as HTMLElement;
    if (target.closest('grid-editor')) return;

    const rect = this.getBoundingClientRect();
    this.dragStartX = e.clientX - rect.left + this.scrollLeft;
    this.dragStartY = e.clientY - rect.top + this.scrollTop;

    this.startRowIndex = Math.floor(this.dragStartY / this.rowHeight);
    this.startColIndex = 0;

    this.isDragging = true;
    this.selectionRange = {
      top: this.dragStartY,
      left: this.dragStartX,
      width: 0,
      height: 0,
    };

    this.dispatchEvent(
      new CustomEvent('selection-start', {
        detail: {
          startRowIndex: this.startRowIndex,
          startColIndex: this.startColIndex,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  handleMouseMove = (e: MouseEvent): void => {
    if (!this.isDragging) return;

    const rect = this.getBoundingClientRect();
    const currentX = e.clientX - rect.left + this.scrollLeft;
    const currentY = e.clientY - rect.top + this.scrollTop;

    const left = Math.min(this.dragStartX, currentX);
    const top = Math.min(this.dragStartY, currentY);
    const width = Math.abs(currentX - this.dragStartX);
    const height = Math.abs(currentY - this.dragStartY);

    this.selectionRange = { top, left, width, height };

    this.dispatchEvent(
      new CustomEvent('selection-change', {
        detail: {
          range: this.selectionRange,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  handleMouseUp = (_e: MouseEvent): void => {
    if (!this.isDragging) return;

    this.isDragging = false;

    if (this.selectionRange) {
      this.dispatchEvent(
        new CustomEvent('selection-end', {
          detail: {
            range: this.selectionRange,
          },
          bubbles: true,
          composed: true,
        }),
      );
    }
  };

  render() {
    return GridViewportTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-viewport': GridViewport;
  }
}