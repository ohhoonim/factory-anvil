import { html } from "lit";

export type EditorDataType = 'select' | 'number' | 'date' | 'text';

export interface ValidationRule {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  custom?: (value: any) => boolean | string;
}

export interface SelectOption {
  label: string;
  value: any;
}

export interface GridEditorHost {
  columnKey: string;
  rowIndex: number;
  value: any;
  type: string;
  options: SelectOption[];
  validationRules: ValidationRule | null;
  editValue: any;
  isValid: boolean;
  errorMessage: string;
  handleInput: (e: Event) => void;
  handleChange: (e: Event) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleBlur: (e: FocusEvent) => void;
}

export const GridEditorTemplate = (host: GridEditorHost) => {
  const isInvalid = !host.isValid;

  const renderControl = () => {
    switch (host.type) {
      case 'select':
        return html`
          <select
            class="grid-editor__control"
            .value=${String(host.editValue ?? '')}
            @change=${host.handleChange}
            @keydown=${host.handleKeyDown}
            @blur=${host.handleBlur}
          >
            ${host.options.map(
              (opt) => html`
                <option value=${opt.value} ?selected=${opt.value === host.editValue}>
                  ${opt.label}
                </option>
              `
            )}
          </select>
        `;
      case 'number':
        return html`
          <input
            type="number"
            class="grid-editor__control"
            .value=${host.editValue ?? ''}
            @input=${host.handleInput}
            @keydown=${host.handleKeyDown}
            @blur=${host.handleBlur}
          />
        `;
      case 'date':
        return html`
          <input
            type="date"
            class="grid-editor__control"
            .value=${host.editValue ?? ''}
            @change=${host.handleChange}
            @keydown=${host.handleKeyDown}
            @blur=${host.handleBlur}
          />
        `;
      case 'text':
      default:
        return html`
          <input
            type="text"
            class="grid-editor__control"
            .value=${host.editValue ?? ''}
            @input=${host.handleInput}
            @keydown=${host.handleKeyDown}
            @blur=${host.handleBlur}
          />
        `;
    }
  };

  return html`
    <div
      class="grid-editor ${isInvalid ? 'grid-editor--invalid' : ''} grid-editor--${host.type}"
      role="gridcell"
    >
      <div class="grid-editor__host">
        <slot name="custom-input">
          ${renderControl()}
        </slot>
      </div>
      ${isInvalid && host.errorMessage
        ? html`
            <div class="grid-editor__validation-message" role="alert">
              ${host.errorMessage}
            </div>
          `
        : ''}
    </div>
  `;
};