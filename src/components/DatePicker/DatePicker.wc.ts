import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { datePickerStyles } from './DatePicker.css.js';
import { DatePickerTemplate, type DatePickerHost, type DateCell } from './DatePicker.js';

@customElement('biz-date-picker')
export class BizDatePicker extends LitElement implements DatePickerHost {
  static styles = datePickerStyles;

  @property({ type: Object })
  value: string | Date | (string | Date)[] | null = null;

  @property({ type: String })
  format = 'YYYY-MM-DD';

  @property({ type: String })
  mode: 'single' | 'range' = 'single';

  @property({ attribute: 'min-date' })
  minDate: string | Date | null = null;

  @property({ attribute: 'max-date' })
  maxDate: string | Date | null = null;

  @property({ attribute: 'disabled-dates' })
  disabledDates: (string | Date)[] | ((date: Date) => boolean) = [];

  @property({ type: String })
  placeholder = 'YYYY-MM-DD';

  @property({ type: Boolean })
  clearable = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  @state()
  isOpen = false;

  @state()
  inputValue = '';

  @state()
  currentYear = new Date().getFullYear();

  @state()
  currentMonth = new Date().getMonth();

  @state()
  hoveredDate: Date | null = null;

  @state()
  rangeStart: Date | null = null;

  @state()
  rangeEnd: Date | null = null;

  @state()
  liveAnnouncement = '';

  weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  connectedCallback(): void {
    super.connectedCallback();
    this.syncInputValueFromProps();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('value')) {
      this.syncInputValueFromProps();
    }
  }

  get calendarGrid(): DateCell[] {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    
    const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
    
    const cells: DateCell[] = [];
    const today = new Date();

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(this.currentYear, this.currentMonth - 1, day);
      cells.push(this.createDateCell(date, day, false, today));
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(this.currentYear, this.currentMonth, day);
      cells.push(this.createDateCell(date, day, true, today));
    }

    const remainingCells = 42 - cells.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(this.currentYear, this.currentMonth + 1, day);
      cells.push(this.createDateCell(date, day, false, today));
    }

    return cells;
  }

  private createDateCell(date: Date, day: number, isCurrentMonth: boolean, today: Date): DateCell {
    const formattedDate = this.formatDate(date);
    const isToday = this.isSameDay(date, today);
    const isDisabled = this.checkIsDisabled(date);
    const isSelected = this.checkIsSelected(date);
    const { isInRange, isRangeStart, isRangeEnd } = this.checkRangeState(date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dayOfWeek = this.weekdays[date.getDay()];
    const ariaLabel = `${year}년 ${month}월 ${day}일 ${dayOfWeek}요일`;

    return {
      date,
      day,
      isCurrentMonth,
      isToday,
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isDisabled,
      formattedDate,
      ariaLabel,
    };
  }

  private formatDate(date: Date | null): string {
    if (!date || isNaN(date.getTime())) return '';
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return this.format
      .replace('YYYY', String(yyyy))
      .replace('MM', mm)
      .replace('DD', dd);
  }

  private parseDate(str: string): Date | null {
    if (!str) return null;
    const parts = str.match(/\d+/g);
    if (!parts || parts.length < 3) return null;
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return isNaN(date.getTime()) ? null : date;
  }

  private isSameDay(d1: Date | null, d2: Date | null): boolean {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  private syncInputValueFromProps(): void {
    if (this.mode === 'single') {
      const date = typeof this.value === 'string' ? this.parseDate(this.value) : (this.value as Date);
      this.inputValue = date ? this.formatDate(date) : '';
      if (date) {
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth();
      }
    } else if (Array.isArray(this.value)) {
      const [start, end] = this.value;
      const startDate = typeof start === 'string' ? this.parseDate(start) : start;
      const endDate = typeof end === 'string' ? this.parseDate(end) : end;
      this.rangeStart = startDate || null;
      this.rangeEnd = endDate || null;
      
      const startStr = startDate ? this.formatDate(startDate) : '';
      const endStr = endDate ? this.formatDate(endDate) : '';
      this.inputValue = startStr || endStr ? `${startStr} ~ ${endStr}` : '';
      
      if (startDate) {
        this.currentYear = startDate.getFullYear();
        this.currentMonth = startDate.getMonth();
      }
    }
  }

  private checkIsDisabled(date: Date): boolean {
    if (this.minDate) {
      const min = typeof this.minDate === 'string' ? this.parseDate(this.minDate) : this.minDate;
      if (min && date < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
    }
    if (this.maxDate) {
      const max = typeof this.maxDate === 'string' ? this.parseDate(this.maxDate) : this.maxDate;
      if (max && date > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
    }
    if (typeof this.disabledDates === 'function') {
      return this.disabledDates(date);
    }
    if (Array.isArray(this.disabledDates)) {
      return this.disabledDates.some((d) => {
        const disabledDate = typeof d === 'string' ? this.parseDate(d) : d;
        return this.isSameDay(date, disabledDate);
      });
    }
    return false;
  }

  private checkIsSelected(date: Date): boolean {
    if (this.mode === 'single') {
      const selected = typeof this.value === 'string' ? this.parseDate(this.value) : (this.value as Date);
      return this.isSameDay(date, selected);
    }
    return this.isSameDay(date, this.rangeStart) || this.isSameDay(date, this.rangeEnd);
  }

  private checkRangeState(date: Date) {
    if (this.mode !== 'range' || !this.rangeStart) {
      return { isInRange: false, isRangeStart: false, isRangeEnd: false };
    }

    const isRangeStart = this.isSameDay(date, this.rangeStart);
    const isRangeEnd = this.isSameDay(date, this.rangeEnd);
    
    let isInRange = false;
    const targetEnd = this.rangeEnd || this.hoveredDate;

    if (this.rangeStart && targetEnd) {
      const start = this.rangeStart < targetEnd ? this.rangeStart : targetEnd;
      const end = this.rangeStart < targetEnd ? targetEnd : this.rangeStart;
      isInRange = date >= start && date <= end;
    }

    return { isInRange, isRangeStart, isRangeEnd };
  }

  private handleOutsideClick = (e: MouseEvent): void => {
    if (this.isOpen && !e.composedPath().includes(this)) {
      this.closePopover();
    }
  };

  handleInput(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.inputValue = target.value;

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { rawValue: this.inputValue },
        bubbles: true,
        composed: true,
      })
    );

    if (this.mode === 'single') {
      const parsed = this.parseDate(this.inputValue);
      if (parsed && !this.checkIsDisabled(parsed)) {
        this.value = parsed;
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: { value: this.formatDate(parsed), date: parsed },
            bubbles: true,
            composed: true,
          })
        );
      }
    }
  }

  handleKeydown(e: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    switch (e.key) {
      case 'Escape':
        if (this.isOpen) {
          e.preventDefault();
          this.closePopover();
        }
        break;
      case 'ArrowDown':
        if (!this.isOpen) {
          e.preventDefault();
          this.toggleCalendarPopover(e);
        }
        break;
      case 'PageUp':
        if (this.isOpen) {
          e.preventDefault();
          if (e.shiftKey) {
            this.currentYear--;
          } else {
            this.prevMonth();
          }
        }
        break;
      case 'PageDown':
        if (this.isOpen) {
          e.preventDefault();
          if (e.shiftKey) {
            this.currentYear++;
          } else {
            this.nextMonth();
          }
        }
        break;
    }
  }

  toggleCalendarPopover(e: Event): void {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.isOpen ? this.closePopover() : this.openPopover();
  }

  openPopover(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.liveAnnouncement = `${this.currentYear}년 ${this.currentMonth + 1}월 달력이 열렸습니다.`;
    this.dispatchEvent(
      new CustomEvent('open', {
        bubbles: true,
        composed: true,
      })
    );
  }

  closePopover(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.liveAnnouncement = '';
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  clearValue(e: Event): void {
    e.stopPropagation();
    this.value = null;
    this.inputValue = '';
    this.rangeStart = null;
    this.rangeEnd = null;

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
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.announceMonthChange();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.announceMonthChange();
  }

  private announceMonthChange(): void {
    this.liveAnnouncement = `${this.currentYear}년 ${this.currentMonth + 1}월로 변경되었습니다.`;
    this.dispatchEvent(
      new CustomEvent('month-change', {
        detail: { year: this.currentYear, month: this.currentMonth + 1 },
        bubbles: true,
        composed: true,
      })
    );
  }

  selectDate(cell: DateCell, e: Event): void {
    e.stopPropagation();
    if (cell.isDisabled) return;

    if (this.mode === 'single') {
      this.value = cell.date;
      this.inputValue = cell.formattedDate;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: cell.formattedDate, date: cell.date },
          bubbles: true,
          composed: true,
        })
      );
      this.closePopover();
    } else {
      if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
        this.rangeStart = cell.date;
        this.rangeEnd = null;
      } else if (this.rangeStart && !this.rangeEnd) {
        if (cell.date < this.rangeStart) {
          this.rangeEnd = this.rangeStart;
          this.rangeStart = cell.date;
        } else {
          this.rangeEnd = cell.date;
        }
        this.confirmSelection();
      }
    }
  }

  handleCellHover(cell: DateCell): void {
    if (this.mode === 'range' && this.rangeStart && !this.rangeEnd) {
      this.hoveredDate = cell.date;
    }
  }

  handleCellMouseLeave(): void {
    this.hoveredDate = null;
  }

  selectToday(): void {
    const today = new Date();
    if (this.checkIsDisabled(today)) return;

    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();

    const formatted = this.formatDate(today);

    if (this.mode === 'single') {
      this.value = today;
      this.inputValue = formatted;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: formatted, date: today },
          bubbles: true,
          composed: true,
        })
      );
      this.closePopover();
    } else {
      this.rangeStart = today;
      this.rangeEnd = today;
      this.confirmSelection();
    }
  }

  confirmSelection(): void {
    if (this.mode === 'range' && this.rangeStart && this.rangeEnd) {
      const startStr = this.formatDate(this.rangeStart);
      const endStr = this.formatDate(this.rangeEnd);
      this.value = [startStr, endStr];
      this.inputValue = `${startStr} ~ ${endStr}`;

      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            value: [startStr, endStr],
            date: [this.rangeStart, this.rangeEnd],
          },
          bubbles: true,
          composed: true,
        })
      );
      this.closePopover();
    }
  }

  render() {
    return DatePickerTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-date-picker': BizDatePicker;
  }
}