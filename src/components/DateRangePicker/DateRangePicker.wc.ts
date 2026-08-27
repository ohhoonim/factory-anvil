import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dateRangePickerStyles } from './DateRangePicker.css.js';
import {
  DateRangePickerTemplate,
  type DateRangePickerHost,
  type PresetObject
} from './DateRangePicker.js';

@customElement('biz-date-range-picker')
export class BizDateRangePicker extends LitElement implements DateRangePickerHost {
  static override styles = dateRangePickerStyles;

  @property({ type: Array })
  value: [Date | string | null, Date | string | null] = [null, null];

  @property({ type: String })
  format = 'YYYY-MM-DD';

  @property({ type: String, attribute: 'calendar-mode' })
  calendarMode: 'dual' | 'single' = 'dual';

  @property({ type: String, attribute: 'input-mode' })
  inputMode: 'single' | 'double' = 'double';

  @property({ attribute: 'min-date' })
  minDate: string | Date | null = null;

  @property({ attribute: 'max-date' })
  maxDate: string | Date | null = null;

  @property({ type: Number, attribute: 'min-range' })
  minRange: number | null = null;

  @property({ type: Number, attribute: 'max-range' })
  maxRange: number | null = null;

  @property({ attribute: 'disabled-dates' })
  disabledDates: Array<string | Date> | ((date: Date) => boolean) = [];

  @property({ type: Array })
  presets: PresetObject[] = [];

  @property()
  placeholder: [string, string] | string = ['시작일', '종료일'];

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
  focusedInput: 'start' | 'end' | null = null;

  @state()
  currentDisplayMonth: Date = new Date();

  @state()
  hoveredDate: Date | null = null;

  @state()
  private tempValue: [Date | null, Date | null] = [null, null];

  override connectedCallback() {
    super.connectedCallback();
    this.syncValueToTemp();
    document.addEventListener('click', this.handleOutsideClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this.syncValueToTemp();
    }
  }

  private syncValueToTemp() {
    const parseDate = (d: Date | string | null): Date | null => {
      if (!d) return null;
      if (d instanceof Date) return isNaN(d.getTime()) ? null : d;
      const parsed = new Date(d);
      return isNaN(parsed.getTime()) ? null : parsed;
    };
    const start = parseDate(this.value?.[0]);
    const end = parseDate(this.value?.[1]);
    this.tempValue = [start, end];
    if (start) {
      this.currentDisplayMonth = new Date(start.getFullYear(), start.getMonth(), 1);
    }
  }

  private handleOutsideClick = (e: MouseEvent) => {
    if (this.isOpen && !e.composedPath().includes(this)) {
      this.closePopover();
    }
  };

  public handleInputFocus = (target: 'start' | 'end') => {
    if (this.disabled || this.readonly) return;
    this.focusedInput = target;
    if (!this.isOpen) {
      this.openPopover();
    }
  };

  public handleInputChange = (e: Event, target: 'start' | 'end') => {
    const input = e.target as HTMLInputElement;
    const rawValue = input.value;

    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { rawValue, target }
      })
    );

    const parsedDate = new Date(rawValue);
    if (!isNaN(parsedDate.getTime()) && !this.isDateDisabled(parsedDate)) {
      const nextTemp: [Date | null, Date | null] = [...this.tempValue];
      if (target === 'start') {
        nextTemp[0] = parsedDate;
      } else {
        nextTemp[1] = parsedDate;
      }
      this.tempValue = nextTemp;
      this.requestUpdate();
    }
  };

  public handleTogglePopover = (e: Event) => {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    if (this.isOpen) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  };

  private openPopover() {
    this.isOpen = true;
    this.focusedInput = this.focusedInput || 'start';
    this.dispatchEvent(
      new CustomEvent('open', { bubbles: true, composed: true })
    );
  }

  private closePopover() {
    this.isOpen = false;
    this.focusedInput = null;
    this.hoveredDate = null;
    this.dispatchEvent(
      new CustomEvent('close', { bubbles: true, composed: true })
    );
  }

  public handleClear = (e: Event) => {
    e.stopPropagation();
    this.value = [null, null];
    this.tempValue = [null, null];
    this.dispatchEvent(
      new CustomEvent('clear', { bubbles: true, composed: true })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          value: [null, null],
          formattedValue: ['', '']
        }
      })
    );
  };

  public handlePresetClick = (preset: PresetObject) => {
    const parsePreset = (val: Date | string): Date => {
      return val instanceof Date ? val : new Date(val);
    };
    const start = parsePreset(preset.value[0]);
    const end = parsePreset(preset.value[1]);
    this.tempValue = [start, end];
    this.handleApply();
  };

  public handleDateClick = (date: Date) => {
    if (this.isDateDisabled(date)) return;

    const [start, end] = this.tempValue;

    if (!start || (start && end)) {
      this.tempValue = [date, null];
      this.focusedInput = 'end';
      this.dispatchEvent(
        new CustomEvent('range-start-select', {
          bubbles: true,
          composed: true,
          detail: { startDate: date }
        })
      );
    } else if (start && !end) {
      if (date < start) {
        this.tempValue = [date, null];
        this.dispatchEvent(
          new CustomEvent('range-start-select', {
            bubbles: true,
            composed: true,
            detail: { startDate: date }
          })
        );
      } else {
        this.tempValue = [start, date];
        this.dispatchEvent(
          new CustomEvent('range-end-select', {
            bubbles: true,
            composed: true,
            detail: { endDate: date }
          })
        );
      }
    }
    this.requestUpdate();
  };

  public handleDateMouseEnter = (date: Date) => {
    if (this.tempValue[0] && !this.tempValue[1]) {
      this.hoveredDate = date;
    }
  };

  public handleDateMouseLeave = () => {
    this.hoveredDate = null;
  };

  public handlePrevMonth = () => {
    this.currentDisplayMonth = new Date(
      this.currentDisplayMonth.getFullYear(),
      this.currentDisplayMonth.getMonth() - 1,
      1
    );
  };

  public handleNextMonth = () => {
    this.currentDisplayMonth = new Date(
      this.currentDisplayMonth.getFullYear(),
      this.currentDisplayMonth.getMonth() + 1,
      1
    );
  };

  public handleApply = () => {
    const [start, end] = this.tempValue;
    this.value = [start, end];
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          value: [start, end],
          formattedValue: [
            this.formatDateValue(start),
            this.formatDateValue(end)
          ]
        }
      })
    );
    this.closePopover();
  };

  public handleCancel = () => {
    this.syncValueToTemp();
    this.closePopover();
  };

  public handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    switch (e.key) {
      case 'Escape':
        if (this.isOpen) {
          e.preventDefault();
          this.closePopover();
        }
        break;
      case 'Enter':
      case ' ':
        if (!this.isOpen) {
          e.preventDefault();
          this.openPopover();
        }
        break;
    }
  };

  public formatDateValue = (date: Date | string | null): string => {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return '';

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return this.format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day);
  };

  public isDateDisabled = (date: Date): boolean => {
    const time = date.getTime();

    if (this.minDate) {
      const min = this.minDate instanceof Date ? this.minDate : new Date(this.minDate);
      if (time < min.setHours(0, 0, 0, 0)) return true;
    }

    if (this.maxDate) {
      const max = this.maxDate instanceof Date ? this.maxDate : new Date(this.maxDate);
      if (time > max.setHours(23, 59, 59, 999)) return true;
    }

    if (typeof this.disabledDates === 'function') {
      return this.disabledDates(date);
    }

    if (Array.isArray(this.disabledDates)) {
      return this.disabledDates.some((d) => {
        const target = d instanceof Date ? d : new Date(d);
        return target.toDateString() === date.toDateString();
      });
    }

    return false;
  };

  public isDateSelected = (date: Date): boolean => {
    const [start, end] = this.tempValue;
    return (
      (!!start && start.toDateString() === date.toDateString()) ||
      (!!end && end.toDateString() === date.toDateString())
    );
  };

  public isRangeStart = (date: Date): boolean => {
    const [start] = this.tempValue;
    return !!start && start.toDateString() === date.toDateString();
  };

  public isRangeEnd = (date: Date): boolean => {
    const [, end] = this.tempValue;
    return !!end && end.toDateString() === date.toDateString();
  };

  public isDateInRange = (date: Date): boolean => {
    const [start, end] = this.tempValue;
    const targetTime = date.getTime();

    if (start && end) {
      return targetTime > start.getTime() && targetTime < end.getTime();
    }

    if (start && !end && this.hoveredDate) {
      return targetTime > start.getTime() && targetTime < this.hoveredDate.getTime();
    }

    return false;
  };

  public renderCalendarGrid = (monthOffset: number): TemplateResult => {
    const displayDate = new Date(
      this.currentDisplayMonth.getFullYear(),
      this.currentDisplayMonth.getMonth() + monthOffset,
      1
    );

    const year = displayDate.getFullYear();
    const month = displayDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    const weeks: (Date | null)[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return html`
      <table class="biz-date-range-picker__grid" role="grid">
        <caption>
          ${year}년 ${month + 1}월
        </caption>
        <thead>
          <tr>
            <th scope="col">일</th>
            <th scope="col">월</th>
            <th scope="col">화</th>
            <th scope="col">수</th>
            <th scope="col">목</th>
            <th scope="col">금</th>
            <th scope="col">토</th>
          </tr>
        </thead>
        <tbody>
          ${weeks.map(
            (week) => html`
              <tr>
                ${week.map((date) => {
                  if (!date) {
                    return html`<td class="biz-date-range-picker__cell biz-date-range-picker__cell--empty"></td>`;
                  }

                  const isDisabled = this.isDateDisabled(date);
                  const isStart = this.isRangeStart(date);
                  const isEnd = this.isRangeEnd(date);
                  const isInRange = this.isDateInRange(date);

                  const cellClasses = [
                    'biz-date-range-picker__cell',
                    isStart ? 'biz-date-range-picker__cell--selected-start' : '',
                    isEnd ? 'biz-date-range-picker__cell--selected-end' : '',
                    isInRange ? 'biz-date-range-picker__cell--in-range' : '',
                    isDisabled ? 'biz-date-range-picker__cell--disabled' : ''
                  ].filter(Boolean).join(' ');

                  return html`
                    <td
                      class="${cellClasses}"
                      role="gridcell"
                      aria-selected="${isStart || isEnd ? 'true' : 'false'}"
                      aria-disabled="${isDisabled ? 'true' : 'false'}"
                      @click="${() => this.handleDateClick(date)}"
                      @mouseenter="${() => this.handleDateMouseEnter(date)}"
                      @mouseleave="${this.handleDateMouseLeave}"
                    >
                      <slot name="date-cell-slot">
                        ${date.getDate()}
                      </slot>
                    </td>
                  `;
                })}
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  };

  override render() {
    return DateRangePickerTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-date-range-picker': BizDateRangePicker;
  }
}