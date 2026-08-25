import { html } from 'lit';

export interface DatePickerTemplateOptions {
  value: string | Date | (string | Date)[] | null;
  format: string;
  mode: 'single' | 'range';
  minDate: string | Date | null;
  maxDate: string | Date | null;
  disabledDates: (string | Date)[] | ((date: Date) => boolean);
  placeholder: string;
  clearable: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  isOpen: boolean;
  currentYear: number;
  currentMonth: number;
  hoveredDate: Date | null;
  inputValue: string;
  focusedDate: Date | null;
  onInput: (e: Event) => void;
  onChange: (e: Event) => void;
  onTogglePopover: () => void;
  onClear: (e: Event) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
  onDateHover: (date: Date | null) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

export const DatePickerTemplate = (options: DatePickerTemplateOptions) => {
  const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const parseDate = (val: string | Date | null): Date | null => {
    if (!val) return null;
    if (val instanceof Date) return val;
    const parsed = new Date(val);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const isDateDisabled = (date: Date): boolean => {
    const min = parseDate(options.minDate);
    const max = parseDate(options.maxDate);

    if (min && date < new Date(min.setHours(0, 0, 0, 0))) return true;
    if (max && date > new Date(max.setHours(23, 59, 59, 999))) return true;

    if (typeof options.disabledDates === 'function') {
      return options.disabledDates(date);
    }
    if (Array.isArray(options.disabledDates)) {
      return options.disabledDates.some((d) => {
        const parsedD = parseDate(d);
        return parsedD ? isSameDay(parsedD, date) : false;
      });
    }

    return false;
  };

  const renderCalendarCells = () => {
    const daysInMonth = getDaysInMonth(options.currentYear, options.currentMonth);
    const firstDay = getFirstDayOfMonth(options.currentYear, options.currentMonth);
    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(html`<div class="biz-date-picker__cell biz-date-picker__cell--empty"></div>`);
    }

    let selectedStart: Date | null = null;
    let selectedEnd: Date | null = null;

    if (options.mode === 'single') {
      selectedStart = parseDate(options.value as string | Date);
    } else if (Array.isArray(options.value)) {
      selectedStart = parseDate(options.value[0]);
      selectedEnd = parseDate(options.value[1]);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(options.currentYear, options.currentMonth, day);
      const isDisabled = isDateDisabled(date);
      const isSelected =
        isSameDay(date, selectedStart) || isSameDay(date, selectedEnd);
      const isToday = isSameDay(date, new Date());
      const isFocused = isSameDay(date, options.focusedDate);

      let inRange = false;
      if (options.mode === 'range') {
        if (selectedStart && selectedEnd) {
          inRange = date > selectedStart && date < selectedEnd;
        } else if (selectedStart && options.hoveredDate) {
          const start = selectedStart < options.hoveredDate ? selectedStart : options.hoveredDate;
          const end = selectedStart < options.hoveredDate ? options.hoveredDate : selectedStart;
          inRange = date > start && date < end;
        }
      }

      const cellClasses = [
        'biz-date-picker__cell',
        isSelected ? 'biz-date-picker__cell--selected' : '',
        isDisabled ? 'biz-date-picker__cell--disabled' : '',
        isToday ? 'biz-date-picker__cell--today' : '',
        inRange ? 'biz-date-picker__cell--range' : '',
        isFocused ? 'biz-date-picker__cell--focused' : '',
      ]
        .filter(Boolean)
        .join(' ');

      const fullDateLabel = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

      cells.push(html`
        <button
          type="button"
          role="gridcell"
          class="${cellClasses}"
          ?disabled="${isDisabled}"
          aria-selected="${isSelected ? 'true' : 'false'}"
          aria-disabled="${isDisabled ? 'true' : 'false'}"
          aria-label="${fullDateLabel}"
          tabindex="${isFocused ? '0' : '-1'}"
          @click="${() => !isDisabled && options.onSelectDate(date)}"
          @mouseenter="${() => options.onDateHover(date)}"
          @mouseleave="${() => options.onDateHover(null)}"
        >
          <slot name="date-cell-slot" .date="${date}">${day}</slot>
        </button>
      `);
    }

    return cells;
  };

  const showClearBtn =
    options.clearable &&
    !options.disabled &&
    !options.readonly &&
    Boolean(options.inputValue || options.value);

  const rootClasses = [
    'biz-date-picker',
    `biz-date-picker--${options.variant}`,
    `biz-date-picker--${options.size}`,
    options.fullWidth ? 'biz-date-picker--full-width' : '',
    options.disabled ? 'biz-date-picker--disabled' : '',
    options.readonly ? 'biz-date-picker--readonly' : '',
    options.error ? 'biz-date-picker--error' : '',
    options.isOpen ? 'biz-date-picker--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return html`
    <div class="${rootClasses}" @keydown="${options.onKeyDown}">
      <div class="biz-date-picker__label-area">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-date-picker__input-container">
        <div class="biz-date-picker__prefix">
          <slot name="prefix-slot"></slot>
        </div>

        <input
          type="text"
          class="biz-date-picker__input"
          role="combobox"
          .value="${options.inputValue}"
          placeholder="${options.placeholder}"
          ?disabled="${options.disabled}"
          ?readonly="${options.readonly}"
          aria-expanded="${options.isOpen ? 'true' : 'false'}"
          aria-haspopup="dialog"
          @input="${options.onInput}"
          @change="${options.onChange}"
        />

        ${showClearBtn
          ? html`
              <button
                type="button"
                class="biz-date-picker__clear-btn"
                aria-label="입력값 초기화"
                @click="${options.onClear}"
              >
                &times;
              </button>
            `
          : ''}

        <div class="biz-date-picker__suffix">
          <slot name="suffix-slot">
            <button
              type="button"
              class="biz-date-picker__trigger-btn"
              aria-label="달력 열기"
              ?disabled="${options.disabled || options.readonly}"
              @click="${options.onTogglePopover}"
            >
              <svg
                class="biz-date-picker__calendar-icon"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </button>
          </slot>
        </div>
      </div>

      <div class="biz-date-picker__helper-area">
        <slot name="helper-text-slot"></slot>
      </div>

      ${options.isOpen
        ? html`
            <div
              class="biz-date-picker__popover"
              role="dialog"
              aria-modal="true"
              aria-label="달력"
            >
              <div class="biz-date-picker__popover-header-slot">
                <slot name="header-slot"></slot>
              </div>

              <div class="biz-date-picker__header">
                <button
                  type="button"
                  class="biz-date-picker__nav-btn"
                  aria-label="이전 달"
                  @click="${options.onPrevMonth}"
                >
                  &lt;
                </button>
                <div class="biz-date-picker__current-month" aria-live="polite">
                  ${options.currentYear}년 ${options.currentMonth + 1}월
                </div>
                <button
                  type="button"
                  class="biz-date-picker__nav-btn"
                  aria-label="다음 달"
                  @click="${options.onNextMonth}"
                >
                  &gt;
                </button>
              </div>

              <div class="biz-date-picker__grid" role="grid">
                <div class="biz-date-picker__weekdays" role="row">
                  ${DAYS_OF_WEEK.map(
                    (day) => html`
                      <div class="biz-date-picker__weekday" role="columnheader">
                        ${day}
                      </div>
                    `
                  )}
                </div>
                <div class="biz-date-picker__days" role="row">
                  ${renderCalendarCells()}
                </div>
              </div>

              <div class="biz-date-picker__popover-footer-slot">
                <slot name="footer-slot"></slot>
              </div>
            </div>
          `
        : ''}
    </div>
  `;
};