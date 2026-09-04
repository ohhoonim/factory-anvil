import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GridRowTemplate, type GridRowHost } from "./GridRow";
import { GridrowStyles } from "./GridRow.css";
import type { EditorDataType } from "../Editor/GridEditor";

@customElement('grid-row')
export class GridRow extends LitElement implements GridRowHost {
  static styles = GridrowStyles;

  @property({ type: Number })
  rowIndex: number = -1;

  @property({ type: Object })
  rowData: Record<string, any> | null = null;

  @property({ type: Object })
  dataType?: Record<string, EditorDataType>;

  @property({ type: Boolean, reflect: true })
  isActive: boolean = false;

  @property({ type: Boolean, reflect: true })
  isDirty: boolean = false;

  @property({ type: Boolean, reflect: true })
  isSelected: boolean = false;

  @property({ type: Boolean, reflect: true })
  editable: boolean = false;

  handleRowClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (target.closest('grid-editor')) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('row-click', {
        detail: {
          rowIndex: this.rowIndex,
          rowData: this.rowData,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  handleRowDblClick = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    // grid-editor 내부 이벤트를 제외하고는 row-dblclick 이벤트를 전파합니다.
    if (target.closest('grid-editor')) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent('row-dblclick', {
        detail: {
          rowIndex: this.rowIndex,
          rowData: this.rowData,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  render() {
    return GridRowTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-row': GridRow;
  }
}