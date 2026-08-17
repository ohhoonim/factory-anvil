import { LitElement, html, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { datePickerStyles } from './DatePicker.css.js';
import { DatePickerTemplate } from './DatePicker.js';

@customElement('biz-date-picker')
export class BizDatePicker extends LitElement {
  static styles = datePickerStyles;

  @property({ type: Object }) value: string | Date | (string | Date)[] | null = null;
  @property({ type: String }) format: string = 'YYYY-MM-DD';
  @property({ type: String }) mode: 'single' | 'range' = 'single';
  @property({ type: Object, attribute: 'min-date' }) minDate: string | Date | null = null;
  @property({ type: Object, attribute: 'max-date' }) maxDate: string | Date | null = null;
  @property({ type: Object, attribute: 'disabled-dates' }) disabledDates: (string | Date)[] | ((date: Date) => boolean) = [];
  @property({ type: String }) placeholder: string = 'YYYY-MM-DD';
  @property({ type: Boolean }) clearable: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) error: boolean = false;
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: boolean = false;

  @state() private isOpen: boolean = false;
  @state() private currentYear: number = new Date().getFullYear();
  @state() private currentMonth: number = new Date().getMonth();
  @state() private hoveredDate: Date | null = null;
  @state() private inputValue: string = '';
  @state() private focusedDate: Date | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusout', this.handleFocusOut);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('focusout', this.handleFocusOut);
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value') || changedProperties.has('format')) {
      this.syncInputValueFromProps();
    }
  }

  private handleFocusOut = (e: FocusEvent) => {
    const relatedTarget = e.relatedTarget as Node | null;
    if (!this.contains(relatedTarget) && !this.shadowRoot?.contains(relatedTarget)) {
      if (this.isOpen) {
        this.closePopover();
      }
    }
  };

  private formatDateString(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return this.format
      .replace('YYYY', String(yyyy))
      .replace('MM', mm)
      .replace('DD', dd);
  }

  private parseDateString(str: string): Date | null {
    if (!str) return null;
    const parts = str.split(/[-./]/);
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const parsed = new Date(year, month, day);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
    }
    const directParsed = new Date(str);
    return isNaN(directParsed.getTime()) ? null : directParsed;
  }

  private syncInputValueFromProps() {
    if (!this.value) {
      this.inputValue = '';
      return;
    }

    if (this.mode === 'single') {
      const d = this.value instanceof Date ? this.value : this.parseDateString(String(this.value));
      if (d) {
        this.inputValue = this.formatDateString(d);
        this.currentYear = d.getFullYear();
        this.currentMonth = d.getMonth();
      } else {
        this.inputValue = String(this.value);
      }
    } else if (Array.isArray(this.value)) {
      const start = this.value[0] instanceof Date ? this.value[0] : this.parseDateString(String(this.value[0]));
      const end = this.value[1] instanceof Date ? this.value[1] : this.parseDateString(String(this.value[1]));

      const startStr = start ? this.formatDateString(start) : '';
      const endStr = end ? this.formatDateString(end) : '';

      if (startStr || endStr) {
        this.inputValue = `${startStr} ~ ${endStr}`;
      } else {
        this.inputValue = '';
      }

      if (start) {
        this.currentYear = start.getFullYear();
        this.currentMonth = start.getMonth();
      }
    }
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.inputValue = target.value;

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { rawValue: this.inputValue },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const val = target.value;

    if (this.mode === 'single') {
      const parsed = this.parseDateString(val);
      if (parsed) {
        this.value = parsed;
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: { value: this.formatDateString(parsed), date: parsed },
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  };

  private handleTogglePopover = () => {
    if (this.disabled || this.readonly) return;
    if (this.isOpen) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  };

  private openPopover() {
    this.isOpen = true;
    this.dispatchEvent(
      new CustomEvent('open', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private closePopover() {
    this.isOpen = false;
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleClear = (e: Event) => {
    e.stopPropagation();
    this.value = null;
    this.inputValue = '';
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: null, date: null },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handlePrevMonth = () => {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
    this.emitMonthChange();
  };

  private handleNextMonth = () => {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }
    this.emitMonthChange();
  };

  private emitMonthChange() {
    this.dispatchEvent(
      new CustomEvent('month-change', {
        detail: { year: this.currentYear, month: this.currentMonth + 1 },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleSelectDate = (date: Date) => {
    if (this.mode === 'single') {
      this.value = date;
      this.inputValue = this.formatDateString(date);
      this.closePopover();

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.inputValue, date },
          bubbles: true,
          composed: true,
        })
      );
    } else if (this.mode === 'range') {
      if (!Array.isArray(this.value) || this.value.length === 0 || this.value.length === 2) {
        this.value = [date];
      } else if (this.value.length === 1) {
        const start = this.value[0] instanceof Date ? this.value[0] : new Date(this.value[0]);
        if (date < start) {
          this.value = [date, start];
        } else {
          this.value = [start, date];
        }
        this.closePopover();
      }

      this.syncInputValueFromProps();
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value, date },
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private handleDateHover = (date: Date | null) => {
    this.hoveredDate = date;
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    if (e.key === 'Escape' && this.isOpen) {
      e.stopPropagation();
      this.closePopover();
      const inputEl = this.shadowRoot?.querySelector('input');
      inputEl?.focus();
      return;
    }

    if (!this.isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        this.openPopover();
      }
      return;
    }

    const currentFocus = this.focusedDate || new Date(this.currentYear, this.currentMonth, 1);
    let newFocus: Date | null = null;

    switch (e.key) {
      case 'ArrowLeft':
        newFocus = new Date(currentFocus.getFullYear(), currentFocus.getMonth(), currentFocus.getDate() - 1);
        break;
      case 'ArrowRight':
        newFocus = new Date(currentFocus.getFullYear(), currentFocus.getMonth(), currentFocus.getDate() + 1);
        break;
      case 'ArrowUp':
        newFocus = new Date(currentFocus.getFullYear(), currentFocus.getMonth(), currentFocus.getDate() - 7);
        break;
      case 'ArrowDown':
        newFocus = new Date(currentFocus.getFullYear(), currentFocus.getMonth(), currentFocus.getDate() + 7);
        break;
      case 'PageUp':
        if (e.shiftKey) {
          newFocus = new Date(currentFocus.getFullYear() - 1, currentFocus.getMonth(), currentFocus.getDate());
        } else {
          newFocus = new Date(currentFocus.getFullYear(), currentFocus.getMonth() - 1, currentFocus.getDate());
        }
        break;
      case 'PageDown':
        if (e.shiftKey) {
          newFocus = new Date(currentFocus.getFullYear() + 1, currentFocus.getMonth(), currentFocus.getDate());
        } else {
          newFocus = new Date(currentFocus.getFullYear(), currentFocus.getMonth() + 1, currentFocus.getDate());
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (this.focusedDate) {
          this.handleSelectDate(this.focusedDate);
        }
        return;
      default:
        return;
    }

    if (newFocus) {
      e.preventDefault();
      this.focusedDate = newFocus;
      this.currentYear = newFocus.getFullYear();
      this.currentMonth = newFocus.getMonth();
    }
  };

  render() {
    return DatePickerTemplate({
      value: this.value,
      format: this.format,
      mode: this.mode,
      minDate: this.minDate,
      maxDate: this.maxDate,
      disabledDates: this.disabledDates,
      placeholder: this.placeholder,
      clearable: this.clearable,
      readonly: this.readonly,
      disabled: this.disabled,
      error: this.error,
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      isOpen: this.isOpen,
      currentYear: this.currentYear,
      currentMonth: this.currentMonth,
      hoveredDate: this.hoveredDate,
      inputValue: this.inputValue,
      focusedDate: this.focusedDate,
      onInput: this.handleInput,
      onChange: this.handleChange,
      onTogglePopover: this.handleTogglePopover,
      onClear: this.handleClear,
      onPrevMonth: this.handlePrevMonth,
      onNextMonth: this.handleNextMonth,
      onSelectDate: this.handleSelectDate,
      onDateHover: this.handleDateHover,
      onKeyDown: this.handleKeyDown,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-date-picker': BizDatePicker;
  }
}