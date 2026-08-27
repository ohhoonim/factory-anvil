import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dateTimePickerStyles } from './DateTimePicker.css.js';
import {
  DateTimePickerTemplate,
  type DateTimePickerHost,
  type DateTimeCell,
  type TimeOption,
} from './DateTimePicker.js';

@customElement('biz-date-time-picker')
export class BizDateTimePicker extends LitElement implements DateTimePickerHost {
  static override styles = dateTimePickerStyles;

  /* Properties */
  @property({ type: String }) value: string | Date | null = null;
  @property({ type: String }) format = 'YYYY-MM-DD HH:mm';
  @property({ type: String, attribute: 'layout-mode' }) layoutMode: 'side-by-side' | 'tabbed' = 'side-by-side';
  @property({ type: Boolean, attribute: 'use12-hours' }) use12Hours = false;
  @property({ type: Boolean, attribute: 'show-seconds' }) showSeconds = false;
  @property({ type: String }) minDatetime: string | Date | null = null;
  @property({ type: String }) maxDatetime: string | Date | null = null;
  @property({ type: Array }) disabledDates: Date[] | ((date: Date) => boolean) = [];
  @property({ type: Object }) disabledHours: ((hour: number) => boolean) | null = null;
  @property({ type: Object }) disabledMinutes: ((minute: number) => boolean) | null = null;
  @property({ type: String }) placeholder = 'YYYY-MM-DD HH:mm';
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property({ type: String, attribute: 'label-layout' }) labelLayout: 'vertical' | 'horizontal' = 'vertical';

  /* States */
  @state() isOpen = false;
  @state() activeTab: 'date' | 'time' = 'date';
  @state() displayMonth = new Date();
  @state() selectedDate: Date | null = null;
  @state() hours = 0;
  @state() minutes = 0;
  @state() seconds = 0;
  @state() ampm: 'AM' | 'PM' = 'AM';
  @state() liveAnnounceText = '';

  override connectedCallback(): void {
    super.connectedCallback();
    this.initSelectedState();
    window.addEventListener('keydown', this.handleGlobalKeydown);
    window.addEventListener('click', this.handleOutsideClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleGlobalKeydown);
    window.removeEventListener('click', this.handleOutsideClick);
  }

  private initSelectedState(): void {
    if (this.value) {
      const parsed = new Date(this.value);
      if (!isNaN(parsed.getTime())) {
        this.selectedDate = parsed;
        this.displayMonth = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
        let h = parsed.getHours();
        if (this.use12Hours) {
          this.ampm = h >= 12 ? 'PM' : 'AM';
          h = h % 12 || 12;
        }
        this.hours = h;
        this.minutes = parsed.getMinutes();
        this.seconds = parsed.getSeconds();
      }
    }
  }

  get formattedValue(): string {
    if (!this.selectedDate) return '';
    const yyyy = this.selectedDate.getFullYear();
    const mm = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(this.selectedDate.getDate()).padStart(2, '0');
    let hh = this.hours;
    if (this.use12Hours) {
      hh = this.hours;
    }
    const hhStr = String(hh).padStart(2, '0');
    const minStr = String(this.minutes).padStart(2, '0');
    const secStr = String(this.seconds).padStart(2, '0');

    let res = `${yyyy}-${mm}-${dd} ${hhStr}:${minStr}`;
    if (this.showSeconds) res += `:${secStr}`;
    if (this.use12Hours) res += ` ${this.ampm}`;
    return res;
  }

  get calendarGrid(): DateTimeCell[] {
    const year = this.displayMonth.getFullYear();
    const month = this.displayMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = firstDay.getDay();

    const cells: DateTimeCell[] = [];
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    for (let i = startWeekday - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDay - i);
      cells.push(this.createCell(d, false));
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      cells.push(this.createCell(d, true));
    }

    const remaining = 42 - cells.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      cells.push(this.createCell(d, false));
    }

    return cells;
  }

  private createCell(d: Date, isCurrentMonth: boolean): DateTimeCell {
    const today = new Date();
    const isToday =
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate();

    const isSelected = !!(
      this.selectedDate &&
      d.getFullYear() === this.selectedDate.getFullYear() &&
      d.getMonth() === this.selectedDate.getMonth() &&
      d.getDate() === this.selectedDate.getDate()
    );

    let isDisabled = false;
    if (typeof this.disabledDates === 'function') {
      isDisabled = this.disabledDates(d);
    } else if (Array.isArray(this.disabledDates)) {
      isDisabled = this.disabledDates.some(
        (disabledDate) =>
          disabledDate.getFullYear() === d.getFullYear() &&
          disabledDate.getMonth() === d.getMonth() &&
          disabledDate.getDate() === d.getDate()
      );
    }

    const label = `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;

    return {
      date: d,
      day: d.getDate(),
      isCurrentMonth,
      isSelected,
      isToday,
      isDisabled,
      label,
    };
  }

  get hoursList(): TimeOption[] {
    const max = this.use12Hours ? 12 : 23;
    const min = this.use12Hours ? 1 : 0;
    const options: TimeOption[] = [];
    for (let i = min; i <= max; i++) {
      const isDisabled = this.disabledHours ? this.disabledHours(i) : false;
      options.push({
        value: i,
        label: String(i).padStart(2, '0'),
        isSelected: this.hours === i,
        isDisabled,
      });
    }
    return options;
  }

  get minutesList(): TimeOption[] {
    const options: TimeOption[] = [];
    for (let i = 0; i < 60; i++) {
      const isDisabled = this.disabledMinutes ? this.disabledMinutes(i) : false;
      options.push({
        value: i,
        label: String(i).padStart(2, '0'),
        isSelected: this.minutes === i,
        isDisabled,
      });
    }
    return options;
  }

  get secondsList(): TimeOption[] {
    const options: TimeOption[] = [];
    for (let i = 0; i < 60; i++) {
      options.push({
        value: i,
        label: String(i).padStart(2, '0'),
        isSelected: this.seconds === i,
        isDisabled: false,
      });
    }
    return options;
  }

  get ampmList(): TimeOption[] {
    return [
      { value: 0, label: 'AM', isSelected: this.ampm === 'AM', isDisabled: false },
      { value: 1, label: 'PM', isSelected: this.ampm === 'PM', isDisabled: false },
    ];
  }

  /* Handlers */
  handleInputClick(): void {
    if (this.disabled || this.readonly) return;
    this.isOpen ? this.closePopover() : this.openPopover();
  }

  handleInputKeydown(e: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleInputClick();
    } else if (e.key === 'Escape' && this.isOpen) {
      e.preventDefault();
      this.closePopover();
    }
  }

  private handleGlobalKeydown = (e: KeyboardEvent): void => {
    if (this.isOpen && e.key === 'Escape') {
      this.closePopover();
    }
  };

  private handleOutsideClick = (e: MouseEvent): void => {
    if (!this.isOpen) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.closePopover();
    }
  };

  openPopover(): void {
    this.isOpen = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  closePopover(): void {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  handleClear(e: MouseEvent): void {
    e.stopPropagation();
    this.value = null;
    this.selectedDate = null;
    this.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: '', date: null },
      })
    );
  }

  handlePrevMonth(): void {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() - 1, 1);
  }

  handleNextMonth(): void {
    this.displayMonth = new Date(this.displayMonth.getFullYear(), this.displayMonth.getMonth() + 1, 1);
  }

  handleDateSelect(cell: DateTimeCell): void {
    this.selectedDate = new Date(cell.date);
    this.announceSelection();
    this.dispatchEvent(
      new CustomEvent('date-change', {
        bubbles: true,
        composed: true,
        detail: { date: this.selectedDate },
      })
    );
  }

  handleTimeSelect(type: 'hour' | 'minute' | 'second' | 'ampm', option: TimeOption): void {
    if (type === 'hour') this.hours = option.value;
    if (type === 'minute') this.minutes = option.value;
    if (type === 'second') this.seconds = option.value;
    if (type === 'ampm') this.ampm = option.label as 'AM' | 'PM';

    this.announceSelection();
    this.dispatchEvent(
      new CustomEvent('time-change', {
        bubbles: true,
        composed: true,
        detail: { time: `${this.hours}:${this.minutes}:${this.seconds}` },
      })
    );
  }

  handleTabChange(tab: 'date' | 'time'): void {
    this.activeTab = tab;
  }

  handleNowClick(): void {
    const now = new Date();
    this.selectedDate = now;
    let h = now.getHours();
    if (this.use12Hours) {
      this.ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
    }
    this.hours = h;
    this.minutes = now.getMinutes();
    this.seconds = now.getSeconds();
    this.handleConfirmClick();
  }

  handleConfirmClick(): void {
    this.value = this.formattedValue;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value, date: this.selectedDate },
      })
    );
    this.closePopover();
  }

  handleCancelClick(): void {
    this.closePopover();
  }

  private announceSelection(): void {
    if (!this.selectedDate) return;
    const year = this.selectedDate.getFullYear();
    const month = this.selectedDate.getMonth() + 1;
    const date = this.selectedDate.getDate();
    this.liveAnnounceText = `${year}년 ${month}월 ${date}일 ${this.ampm} ${this.hours}시 ${this.minutes}분 선택됨`;
  }

  override render() {
    return DateTimePickerTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-date-time-picker': BizDateTimePicker;
  }
}