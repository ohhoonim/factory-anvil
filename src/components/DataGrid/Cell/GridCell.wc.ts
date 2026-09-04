import { LitElement, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GridCellTemplate, type GridCellHost } from "./GridCell";
import { GridcellStyles } from "./GridCell.css";
import type { EditorDataType, SelectOption, ValidationRule } from "../Editor/GridEditor";

@customElement('grid-cell')
export class GridCell extends LitElement implements GridCellHost {
  static styles = GridcellStyles;

  @property({ type: String })
  columnKey: string = '';

  @property({ type: Number })
  rowIndex: number = -1;

  @property({ attribute: false })
  rawValue: any = null;

  @property({ type: String })
  displayValue: string = '';

  @property({ type: String })
  dataType: EditorDataType = 'text';

  @property({ type: Boolean })
  editable: boolean = false;

  @property({ type: Boolean, reflect: true })
  isDirty: boolean = false;

  @property({ type: Boolean })
  isSelected: boolean = false;

  @property({ type: String })
  align?: 'left' | 'center' | 'right';

  @property({ type: String })
  width?: string;

  @property({type: Object} )
  valiedateRules?: ValidationRule ;

  @property({type: Array})
  options?: SelectOption[];

  @state()
  isEditing: boolean = false;

  private originalValue: any = null;
  private isCommitUpdate: boolean = false;

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('rawValue')) {
      if (this.isCommitUpdate) {
        // 내부 commit으로 인한 rawValue 변경 시 플래그 재설정
        this.isCommitUpdate = false;
      } else {
        // 외부에서 rawValue가 변경되어 주입된 경우 원본 값 및 더티 상태 초기화
        this.originalValue = this.rawValue;
        this.isDirty = false;
      }
    }
  }

  private isEqual(val1: any, val2: any): boolean {
    if (val1 === val2) return true;
    if ((val1 === null || val1 === undefined) && (val2 === null || val2 === undefined)) return true;
    if (typeof val1 === 'object' && typeof val2 === 'object' && val1 !== null && val2 !== null) {
      return JSON.stringify(val1) === JSON.stringify(val2);
    }
    return String(val1) === String(val2);
  }

  handleDblClick = (e: MouseEvent) => {
    if (!this.editable || this.isEditing) return;

    e.stopPropagation();

    this.isEditing = true;
    this.dispatchEvent(
      new CustomEvent('cell-edit-start', {
        detail: {
          rowIndex: this.rowIndex,
          columnKey: this.columnKey,
          rawValue: this.rawValue,
        },
        bubbles: true,
        composed: true,
      })
    );
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if (this.isEditing) return;

    if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
      this.dispatchEvent(
        new CustomEvent('cell-copy', {
          detail: {
            rowIndex: this.rowIndex,
            columnKey: this.columnKey,
            value: this.rawValue,
          },
          bubbles: true,
          composed: true,
        })
      );
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      navigator.clipboard?.readText().then((clipText) => {
        this.dispatchEvent(
          new CustomEvent('cell-paste', {
            detail: {
              rowIndex: this.rowIndex,
              columnKey: this.columnKey,
              pasteData: clipText,
            },
            bubbles: true,
            composed: true,
          })
        );
      });
    }
  };

  handleCellCommit = (e: CustomEvent) => {
    this.isEditing = false;
    const newValue = e.detail.newValue;

    // 내부 commit 플래그 설정 후 더티 여부 판정 및 값 반영
    this.isCommitUpdate = true;
    this.isDirty = !this.isEqual(this.originalValue, newValue);
    this.rawValue = newValue;
    this.displayValue = newValue !== null && newValue !== undefined ? String(newValue) : '';
  };

  handleCellCancel = (_e: CustomEvent) => {
    this.isEditing = false;
  };

  render() {
    return GridCellTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-cell': GridCell;
  }
}