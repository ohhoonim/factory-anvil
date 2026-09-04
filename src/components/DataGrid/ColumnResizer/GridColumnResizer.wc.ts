import { customElement, property, state } from "lit/decorators.js";
import { GridColumnResizerTemplate, type GridColumnResizerHost } from "./GridColumnResizer";
import { GridColumnResizerStyles } from "./GridColumnResizer.css";
import { LitElement } from "lit";

@customElement('grid-column-resizer')
export class GridColumnResizer extends LitElement implements GridColumnResizerHost {
  static styles = GridColumnResizerStyles;

  @property({ type: String }) columnKey: string = '';
  @property({ type: Number }) currentWidth: number = 100;
  @property({ type: Number }) minWidth: number = 80;
  @property({ type: Number }) maxWidth: number = 1000;

  @state() isResizing: boolean = false;
  @state() deltaX: number = 0;

  private startX: number = 0;
  private initialWidth: number = 0;

  private handlePointerMove = (e: PointerEvent) => {
    if (!this.isResizing) return;

    const rawDeltaX = e.clientX - this.startX;
    let calculatedWidth = this.initialWidth + rawDeltaX;

    if (calculatedWidth < this.minWidth) {
      calculatedWidth = this.minWidth;
    } else if (calculatedWidth > this.maxWidth) {
      calculatedWidth = this.maxWidth;
    }

    this.deltaX = calculatedWidth - this.initialWidth;

    this.dispatchEvent(
      new CustomEvent('resize-move', {
        bubbles: true,
        composed: true,
        detail: {
          columnKey: this.columnKey,
          currentWidth: calculatedWidth,
          deltaX: this.deltaX,
        },
      })
    );
  };

  private handlePointerUp = () => {
    if (!this.isResizing) return;

    const finalWidth = this.initialWidth + this.deltaX;

    this.dispatchEvent(
      new CustomEvent('column-resize', {
        bubbles: true,
        composed: true,
        detail: {
          columnKey: this.columnKey,
          width: finalWidth,
        },
      })
    );

    this.isResizing = false;
    this.deltaX = 0;

    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
  };

  handlePointerDown = (e: PointerEvent) => {
    this.isResizing = true;
    this.startX = e.clientX;
    this.initialWidth = this.currentWidth;
    this.deltaX = 0;

    this.dispatchEvent(
      new CustomEvent('resize-start', {
        bubbles: true,
        composed: true,
        detail: {
          columnKey: this.columnKey,
          startX: this.startX,
          initialWidth: this.initialWidth,
        },
      })
    );

    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
  }

  render() {
    return GridColumnResizerTemplate(this);
  }
}