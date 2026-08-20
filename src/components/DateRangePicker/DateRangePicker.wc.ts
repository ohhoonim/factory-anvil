import { LitElement, html, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { DateRangePickerTemplate, type DateRangePickerTemplateProps } from './DateRangePicker.ts';
import { dateRangePickerStyles } from './DateRangePicker.css.ts';

export interface PresetObject {
  label: string;
  range: [Date, Date];
}

/**
 * @element biz-date-range-picker
 * 
 * @slot label-slot
 * @slot prefix-slot
 * @slot start-slot
 * @slot separator-slot
 * @slot end-slot
 * @slot suffix-slot
 * @slot header-slot
 * @slot presets-slot
 * @slot footer-slot
 * @slot helper-text-slot
 */
@customElement('biz-date-range-picker')
export class DateRangePicker extends LitElement {
  static styles = dateRangePickerStyles;

  @property({ type: Array }) value: [Date | null, Date | null] = [null, null];
  @property({ type: String }) format = 'YYYY-MM-DD';
  @property({ type: String, attribute: 'calendar-mode' }) calendarMode: 'dual' | 'single' = 'dual';
  @property({ type: String, attribute: 'input-mode' }) inputMode: 'single' | 'double' = 'double';
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ attribute: 'min-date' }) minDate: Date | string | null = null;
  @property({ attribute: 'max-date' }) maxDate: Date | string | null = null;
  @property({ type: Number, attribute: 'min-range' }) minRange: number | null = null;
  @property({ type: Number, attribute: 'max-range' }) maxRange: number | null = null;
  @property({ attribute: 'disabled-dates' }) disabledDates: Array<Date | string> | ((date: Date) => boolean) = [];
  @property({ type: Array }) presets: PresetObject[] = [];
  @property() placeholder: string | [string, string] = ['시작일', '종료일'];
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: Boolean }) loading = false;

  @state() private _open = false;
  @state() private _selectingState: 'start' | 'end' | 'idle' = 'idle';
  @state() private _hoverDate: Date | null = null;
  @state() private _currentMonth: Date = new Date();
  @state() private _tempValue: [Date | null, Date | null] = [null, null];

  constructor() {
    super();
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value')) {
      this._tempValue = [...this.value];
    }
  }

  private _handleOutsideClick(e: MouseEvent) {
    if (this._open && !e.composedPath().includes(this)) {
      this._closePopover();
    }
  }

  private _togglePopover(e: Event) {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    if (this._open) {
      this._closePopover();
    } else {
      this._openPopover();
    }
  }

  private _openPopover() {
    this._open = true;
    this._selectingState = 'start';
    this._tempValue = [...this.value];
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private _closePopover() {
    this._open = false;
    this._selectingState = 'idle';
    this._hoverDate = null;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private _formatDate(date: Date | null): string {
    if (!date || isNaN(date.getTime())) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private _parseDate(str: string): Date | null {
    if (!str) return null;
    const date = new Date(str);
    return isNaN(date.getTime()) ? null : date;
  }

  private _handleStartInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const date = this._parseDate(input.value);
    this._tempValue = [date, this._tempValue[1]];
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { rawValue: input.value },
      })
    );
  }

  private _handleEndInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const date = this._parseDate(input.value);
    this._tempValue = [this._tempValue[0], date];
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { rawValue: input.value },
      })
    );
  }

  private _handleSingleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const parts = input.value.split('~').map((s) => s.trim());
    const startDate = this._parseDate(parts[0]);
    const endDate = parts[1] ? this._parseDate(parts[1]) : null;
    this._tempValue = [startDate, endDate];
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { rawValue: input.value },
      })
    );
  }

  private _handleClear(e: Event) {
    e.stopPropagation();
    this.value = [null, null];
    this._tempValue = [null, null];
    this.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: [null, null], formattedValue: ['', ''] },
      })
    );
  }

  private _handleDateClick(date: Date) {
    if (this._selectingState === 'start' || !this._tempValue[0]) {
      this._tempValue = [date, null];
      this._selectingState = 'end';
      this.dispatchEvent(
        new CustomEvent('range-start-select', {
          bubbles: true,
          composed: true,
          detail: { startDate: date },
        })
      );
    } else if (this._selectingState === 'end') {
      if (date < this._tempValue[0]) {
        this._tempValue = [date, null];
        this.dispatchEvent(
          new CustomEvent('range-start-select', {
            bubbles: true,
            composed: true,
            detail: { startDate: date },
          })
        );
      } else {
        this._tempValue = [this._tempValue[0], date];
        this._selectingState = 'idle';
        this.dispatchEvent(
          new CustomEvent('range-end-select', {
            bubbles: true,
            composed: true,
            detail: { endDate: date },
          })
        );
      }
    }
  }

  private _handleDateMouseEnter(date: Date) {
    if (this._selectingState === 'end' && this._tempValue[0]) {
      this._hoverDate = date;
    }
  }

  private _handleDateMouseLeave() {
    this._hoverDate = null;
  }

  private _handlePrevMonth() {
    this._currentMonth = new Date(this._currentMonth.getFullYear(), this._currentMonth.getMonth() - 1, 1);
  }

  private _handleNextMonth() {
    this._currentMonth = new Date(this._currentMonth.getFullYear(), this._currentMonth.getMonth() + 1, 1);
  }

  private _handleApply() {
    this.value = [...this._tempValue];
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          formattedValue: [this._formatDate(this.value[0]), this._formatDate(this.value[1])],
        },
      })
    );
    this._closePopover();
  }

  private _handleCancel() {
    this._tempValue = [...this.value];
    this._closePopover();
  }

  private _handlePresetClick(range: [Date, Date]) {
    this._tempValue = [...range];
    this.value = [...range];
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
          formattedValue: [this._formatDate(this.value[0]), this._formatDate(this.value[1])],
        },
      })
    );
    this._closePopover();
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    if (e.key === 'Escape' && this._open) {
      e.preventDefault();
      this._closePopover();
    }
  }

  private _renderCalendarGrid(monthOffset: number) {
    const targetMonth = new Date(this._currentMonth.getFullYear(), this._currentMonth.getMonth() + monthOffset, 1);
    const year = targetMonth.getFullYear();
    const month = targetMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return html`
      <div class="calendar-grid" role="grid" aria-label="${year}년 ${month + 1}월">
        <div class="calendar-header-title">${year}년 ${month + 1}월</div>
        <div class="weekdays-row">
          <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
        </div>
        <div class="days-matrix">
          ${days.map((date) => {
            if (!date) return html`<div class="empty-cell"></div>`;

            const isStart = this._tempValue[0] && date.toDateString() === this._tempValue[0].toDateString();
            const isEnd = this._tempValue[1] && date.toDateString() === this._tempValue[1].toDateString();
            const inRange =
              this._tempValue[0] &&
              this._tempValue[1] &&
              date > this._tempValue[0] &&
              date < this._tempValue[1];
            const isHoverRange =
              this._selectingState === 'end' &&
              this._tempValue[0] &&
              this._hoverDate &&
              date > this._tempValue[0] &&
              date <= this._hoverDate;

            return html`
              <button
                type="button"
                role="gridcell"
                class="day-cell ${isStart ? 'start' : ''} ${isEnd ? 'end' : ''} ${inRange || isHoverRange ? 'in-range' : ''}"
                aria-selected=${isStart || isEnd ? 'true' : 'false'}
                @click=${() => this._handleDateClick(date)}
                @mouseenter=${() => this._handleDateMouseEnter(date)}
                @mouseleave=${this._handleDateMouseLeave}
              >
                ${date.getDate()}
              </button>
            `;
          })}
        </div>
      </div>
    `;
  }

  render() {
    const templateProps: DateRangePickerTemplateProps = {
      value: this.value,
      format: this.format,
      calendarMode: this.calendarMode,
      inputMode: this.inputMode,
      variant: this.variant,
      size: this.size,
      minDate: typeof this.minDate === 'string' ? new Date(this.minDate) : this.minDate,
      maxDate: typeof this.maxDate === 'string' ? new Date(this.maxDate) : this.maxDate,
      placeholder: this.placeholder,
      clearable: this.clearable,
      readonly: this.readonly,
      disabled: this.disabled,
      error: this.error,
      loading: this.loading,
      open: this._open,
      selectingState: this._selectingState,
      hoverDate: this._hoverDate,
      currentMonth: this._currentMonth,
      presets: this.presets,
      formattedStart: this._formatDate(this.value[0]),
      formattedEnd: this._formatDate(this.value[1]),
      onStartInput: this._handleStartInput.bind(this),
      onEndInput: this._handleEndInput.bind(this),
      onSingleInput: this._handleSingleInput.bind(this),
      onTogglePopover: this._togglePopover.bind(this),
      onClear: this._handleClear.bind(this),
      onDateClick: this._handleDateClick.bind(this),
      onDateMouseEnter: this._handleDateMouseEnter.bind(this),
      onDateMouseLeave: this._handleDateMouseLeave.bind(this),
      onPrevMonth: this._handlePrevMonth.bind(this),
      onNextMonth: this._handleNextMonth.bind(this),
      onApply: this._handleApply.bind(this),
      onCancel: this._handleCancel.bind(this),
      onPresetClick: this._handlePresetClick.bind(this),
      onKeyDown: this._handleKeyDown.bind(this),
      renderCalendarGrid: this._renderCalendarGrid.bind(this),
    };

    return DateRangePickerTemplate(templateProps);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-date-range-picker': DateRangePicker;
  }
}