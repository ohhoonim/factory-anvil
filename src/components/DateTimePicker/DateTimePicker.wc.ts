import { LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { DateTimePickerTemplate } from "./DateTimePicker";
import { dateTimePickerStyles } from "./DateTimePicker.css";

@customElement('biz-date-time-picker')
export class BizDateTimePicker extends LitElement {
  static styles = dateTimePickerStyles;

  @property({ type: String, reflect: true }) value: string | Date | null = null;
  @property({ type: String }) format = 'YYYY-MM-DD HH:mm';
  @property({ type: String, attribute: 'layout-mode' }) layoutMode: 'side-by-side' | 'tabbed' = 'side-by-side';
  @property({ type: Boolean, attribute: 'use12-hours' }) use12Hours = false;
  @property({ type: Boolean, attribute: 'show-seconds' }) showSeconds = false;
  @property({ type: String, attribute: 'min-datetime' }) minDatetime: string | Date | null = null;
  @property({ type: String, attribute: 'max-datetime' }) maxDatetime: string | Date | null = null;
  @property({ type: Array }) disabledDates: any[] | ((date: Date) => boolean) = [];
  @property({ attribute: false }) disabledHours: ((hour: number) => boolean) | null = null;
  @property({ attribute: false }) disabledMinutes: ((minute: number) => boolean) | null = null;
  @property({ type: String }) placeholder = 'YYYY-MM-DD HH:mm';
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;

  @state() private isOpen = false;
  @state() private activeTab: 'date' | 'time' = 'date';
  @state() private viewDate = new Date();
  @state() private selectedDate: Date | null = null;
  @state() private selectedTime = { hour: 0, minute: 0, second: 0, period: 'AM' as 'AM' | 'PM' };
  @state() private displayValue = '';
  @state() private liveMessage = '';

  connectedCallback() {
    super.connectedCallback();
    this.initValue();
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>) {
    if (changedProperties.has('value')) {
      this.initValue();
    }
  }

  private initValue() {
    if (!this.value) {
      this.displayValue = '';
      this.selectedDate = null;
      return;
    }
    const d = new Date(this.value);
    if (!isNaN(d.getTime())) {
      this.selectedDate = d;
      this.viewDate = new Date(d);
      let hour = d.getHours();
      let period: 'AM' | 'PM' = 'AM';
      if (this.use12Hours) {
        period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
      }
      this.selectedTime = {
        hour,
        minute: d.getMinutes(),
        second: d.getSeconds(),
        period,
      };
      this.updateDisplayValue();
    }
  }

  private updateDisplayValue() {
    if (!this.selectedDate) {
      this.displayValue = '';
      return;
    }
    const year = this.selectedDate.getFullYear();
    const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.selectedDate.getDate()).padStart(2, '0');
    let h = this.selectedTime.hour;
    if (this.use12Hours && this.selectedTime.period === 'PM' && h < 12) h += 12;
    if (this.use12Hours && this.selectedTime.period === 'AM' && h === 12) h = 0;

    const hourStr = String(this.use12Hours ? this.selectedTime.hour : h).padStart(2, '0');
    const minStr = String(this.selectedTime.minute).padStart(2, '0');
    const secStr = String(this.selectedTime.second).padStart(2, '0');

    let formatted = this.format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', String(h).padStart(2, '0'))
      .replace('hh', hourStr)
      .replace('mm', minStr)
      .replace('ss', secStr);

    if (this.use12Hours) {
      formatted = formatted.replace('A', this.selectedTime.period);
    }

    this.displayValue = formatted;
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (this.isOpen && !e.composedPath().includes(this)) {
      this.closePopover();
    }
  };

  private togglePickerPopover() {
    if (this.disabled || this.readonly) return;
    if (this.isOpen) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  private openPopover() {
    this.isOpen = true;
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private closePopover() {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private handleInputType(e: InputEvent) {
    const rawValue = (e.target as HTMLInputElement).value;
    this.displayValue = rawValue;
    this.dispatchEvent(new CustomEvent('input', { detail: { rawValue }, bubbles: true, composed: true }));
  }

  private handleClearClick(e: Event) {
    e.stopPropagation();
    this.value = null;
    this.selectedDate = null;
    this.displayValue = '';
    this.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true }));
    this.dispatchEvent(new CustomEvent('change', { detail: { value: null, date: null }, bubbles: true, composed: true }));
  }

  private handlePrevMonth(e: Event) {
    e.stopPropagation();
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
  }

  private handleNextMonth(e: Event) {
    e.stopPropagation();
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
  }

  private handleDateSelect(date: Date) {
    this.selectedDate = date;
    this.updateDisplayValue();
    this.liveMessage = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 선택됨`;
    this.dispatchEvent(new CustomEvent('date-change', { detail: { date }, bubbles: true, composed: true }));
  }

  private handleHourSelect(hour: number) {
    this.selectedTime = { ...this.selectedTime, hour };
    this.updateDisplayValue();
    this.dispatchEvent(new CustomEvent('time-change', { detail: { time: this.getTimeString() }, bubbles: true, composed: true }));
  }

  private handleMinuteSelect(minute: number) {
    this.selectedTime = { ...this.selectedTime, minute };
    this.updateDisplayValue();
    this.dispatchEvent(new CustomEvent('time-change', { detail: { time: this.getTimeString() }, bubbles: true, composed: true }));
  }

  private handleSecondSelect(second: number) {
    this.selectedTime = { ...this.selectedTime, second };
    this.updateDisplayValue();
    this.dispatchEvent(new CustomEvent('time-change', { detail: { time: this.getTimeString() }, bubbles: true, composed: true }));
  }

  private handlePeriodSelect(period: 'AM' | 'PM') {
    this.selectedTime = { ...this.selectedTime, period };
    this.updateDisplayValue();
    this.dispatchEvent(new CustomEvent('time-change', { detail: { time: this.getTimeString() }, bubbles: true, composed: true }));
  }

  private getTimeString(): string {
    return `${String(this.selectedTime.hour).padStart(2, '0')}:${String(this.selectedTime.minute).padStart(2, '0')}:${String(this.selectedTime.second).padStart(2, '0')}`;
  }

  private handleTabChange(tab: 'date' | 'time') {
    this.activeTab = tab;
  }

  private handleNowClick(e: Event) {
    e.stopPropagation();
    const now = new Date();
    this.selectedDate = now;
    let hour = now.getHours();
    let period: 'AM' | 'PM' = 'AM';
    if (this.use12Hours) {
      period = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
    }
    this.selectedTime = {
      hour,
      minute: now.getMinutes(),
      second: now.getSeconds(),
      period,
    };
    this.updateDisplayValue();
    this.confirmSelection();
  }

  private handleConfirmClick(e: Event) {
    e.stopPropagation();
    this.confirmSelection();
  }

  private handleCancelClick(e: Event) {
    e.stopPropagation();
    this.closePopover();
  }

  private confirmSelection() {
    if (!this.selectedDate) return;
    let h = this.selectedTime.hour;
    if (this.use12Hours && this.selectedTime.period === 'PM' && h < 12) h += 12;
    if (this.use12Hours && this.selectedTime.period === 'AM' && h === 12) h = 0;

    const finalDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth(),
      this.selectedDate.getDate(),
      h,
      this.selectedTime.minute,
      this.selectedTime.second
    );

    this.value = finalDate.toISOString();
    this.updateDisplayValue();
    this.closePopover();
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.displayValue, date: finalDate },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.isOpen) {
      e.preventDefault();
      this.closePopover();
    } else if (e.key === 'Enter' && this.isOpen) {
      e.preventDefault();
      this.confirmSelection();
    }
  }

  render() {
    return DateTimePickerTemplate({
      value: this.value,
      format: this.format,
      layoutMode: this.layoutMode,
      use12Hours: this.use12Hours,
      showSeconds: this.showSeconds,
      minDatetime: this.minDatetime,
      maxDatetime: this.maxDatetime,
      disabledDates: this.disabledDates,
      disabledHours: this.disabledHours,
      disabledMinutes: this.disabledMinutes,
      placeholder: this.placeholder,
      clearable: this.clearable,
      readonly: this.readonly,
      disabled: this.disabled,
      error: this.error,
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      isOpen: this.isOpen,
      activeTab: this.activeTab,
      viewDate: this.viewDate,
      selectedDate: this.selectedDate,
      selectedTime: this.selectedTime,
      displayValue: this.displayValue,
      liveMessage: this.liveMessage,
      onInputClick: () => this.togglePickerPopover(),
      onInputType: (e) => this.handleInputType(e),
      onClearClick: (e) => this.handleClearClick(e),
      onPrevMonth: (e) => this.handlePrevMonth(e),
      onNextMonth: (e) => this.handleNextMonth(e),
      onDateSelect: (d) => this.handleDateSelect(d),
      onHourSelect: (h) => this.handleHourSelect(h),
      onMinuteSelect: (m) => this.handleMinuteSelect(m),
      onSecondSelect: (s) => this.handleSecondSelect(s),
      onPeriodSelect: (p) => this.handlePeriodSelect(p),
      onTabChange: (t) => this.handleTabChange(t),
      onNowClick: (e) => this.handleNowClick(e),
      onConfirmClick: (e) => this.handleConfirmClick(e),
      onCancelClick: (e) => this.handleCancelClick(e),
      onKeyDown: (e) => this.handleKeyDown(e),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-date-time-picker': BizDateTimePicker;
  }
}