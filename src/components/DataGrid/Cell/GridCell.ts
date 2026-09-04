import { html, nothing } from "lit";
import type { ValidationRule, SelectOption, EditorDataType } from "../Editor/GridEditor";
import { ifDefined } from "lit/directives/if-defined.js";


export interface GridCellHost {
  columnKey: string;
  rowIndex: number;
  rawValue: any;
  displayValue: string;
  dataType: EditorDataType;
  editable: boolean;
  isDirty: boolean;
  isSelected: boolean;
  isEditing: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string;
  handleDblClick: (e: MouseEvent) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleCellCommit: (e: CustomEvent) => void;
  handleCellCancel: (e: CustomEvent) => void;
  options?: SelectOption[];
  valiedateRules?: ValidationRule | null;
}

export const GridCellTemplate = (host: GridCellHost) => {
  const containerClasses = [
    'grid-cell',
    host.isDirty ? 'grid-cell--dirty' : '',
    host.isSelected ? 'grid-cell--selected' : '',
    host.isEditing ? 'grid-cell--editing' : '',
    host.align ? `grid-cell--align-${host.align}` : ''
  ].filter(Boolean).join(' ');

  const containerStyle = host.width ? `width: ${host.width};` : '';

  return html`
    <div
      class="${containerClasses}"
      style="${containerStyle}"
      tabindex="0"
      title="${host.rawValue !== null && host.rawValue !== undefined ? String(host.rawValue) : ''}"
      @dblclick="${host.handleDblClick}"
      @keydown="${host.handleKeyDown}"
    >
      ${host.isDirty ? html`<span class="grid-cell__dirty-indicator"></span>` : nothing}
      
      ${host.isEditing
        ? html`
            <grid-editor
              .columnKey="${host.columnKey}"
              .rowIndex="${host.rowIndex}"
              .value="${host.rawValue}"
              .type="${host.dataType}"
              .options="${host.options ?? []}"
              .validationRules="${host.valiedateRules ?? null}"
              @cell-commit="${host.handleCellCommit}"
              @cell-cancel="${host.handleCellCancel}"
            ></grid-editor>
          `
        : html`
            <div class="grid-cell__content">
              <span class="grid-cell__type-icon grid-cell__type-icon--${host.dataType}"></span>
              <span class="grid-cell__display-text">${host.displayValue}</span>
              <slot></slot>
            </div>
          `}
    </div>
  `;
};