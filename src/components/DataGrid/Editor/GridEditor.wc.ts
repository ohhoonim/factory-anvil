import { LitElement, type PropertyValues } from "lit";
import { GridEditorTemplate, type GridEditorHost, type SelectOption, type ValidationRule } from "./GridEditor";
import { GrideditorStyles } from "./GridEditor.css";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement('grid-editor')
export class GridEditor extends LitElement implements GridEditorHost {
  static styles = GrideditorStyles;

  @property({ type: String })
  columnKey: string = '';

  @property({ type: Number })
  rowIndex: number = -1;

  @property({ attribute: false })
  value: any = null;

  @property({ type: String })
  type: string = 'text';

  @property({ type: Array })
  options: SelectOption[] = [];

  @property({ type: Object })
  validationRules: ValidationRule | null = null;

  @state()
  editValue: any = null;

  @state()
  isValid: boolean = true;

  @state()
  errorMessage: string = '';

  @query('.grid-editor__control')
  private controlElement?: HTMLInputElement | HTMLSelectElement;

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      this.editValue = this.value;
      this.validate(this.editValue);
    }
  }

  firstUpdated() {
    this.focusAndSelect();
  }

  private focusAndSelect() {
    if (this.controlElement) {
      this.controlElement.focus();
      if (this.controlElement instanceof HTMLInputElement) {
        this.controlElement.select();
      }
    }
  }

  private validate(val: any): boolean {
    if (!this.validationRules) {
      this.isValid = true;
      this.errorMessage = '';
      return true;
    }

    const { required, min, max, pattern, custom } = this.validationRules;

    if (required && (val === null || val === undefined || val === '')) {
      this.isValid = false;
      this.errorMessage = '필수 입력 항목입니다.';
      this.dispatchValidationError();
      return false;
    }

    if (typeof val === 'number') {
      if (min !== undefined && val < min) {
        this.isValid = false;
        this.errorMessage = `최소값은 ${min}입니다.`;
        this.dispatchValidationError();
        return false;
      }
      if (max !== undefined && val > max) {
        this.isValid = false;
        this.errorMessage = `최대값은 ${max}입니다.`;
        this.dispatchValidationError();
        return false;
      }
    }

    if (pattern && typeof val === 'string') {
      const regex = new RegExp(pattern);
      if (!regex.test(val)) {
        this.isValid = false;
        this.errorMessage = '유효하지 않은 형식입니다.';
        this.dispatchValidationError();
        return false;
      }
    }

    if (custom) {
      const result = custom(val);
      if (typeof result === 'string') {
        this.isValid = false;
        this.errorMessage = result;
        this.dispatchValidationError();
        return false;
      } else if (!result) {
        this.isValid = false;
        this.errorMessage = '유효성 검증에 실패했습니다.';
        this.dispatchValidationError();
        return false;
      }
    }

    this.isValid = true;
    this.errorMessage = '';
    return true;
  }

  private dispatchValidationError() {
    this.dispatchEvent(
      new CustomEvent('validation-error', {
        detail: {
          columnKey: this.columnKey,
          errorMessage: this.errorMessage,
          value: this.editValue,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private commit() {
    if (!this.validate(this.editValue)) return;

    this.dispatchEvent(
      new CustomEvent('cell-commit', {
        detail: {
          rowIndex: this.rowIndex,
          columnKey: this.columnKey,
          newValue: this.editValue,
          oldValue: this.value,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  private cancel() {
    this.dispatchEvent(
      new CustomEvent('cell-cancel', {
        detail: {
          rowIndex: this.rowIndex,
          columnKey: this.columnKey,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const rawValue = target.value;
    this.editValue = this.type === 'number' ? (rawValue === '' ? null : Number(rawValue)) : rawValue;
    this.validate(this.editValue);
  };

  handleChange = (e: Event) => {
    const target = e.target as HTMLSelectElement | HTMLInputElement;
    this.editValue = target.value;
    this.validate(this.editValue);
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.cancel();
    }
  };

  handleBlur = (_e: FocusEvent) => {
    this.commit();
  };

  render() {
    return GridEditorTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-editor': GridEditor;
  }
}