import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface DateCell {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
  formattedDate: string;
  ariaLabel: string;
}

export interface DatePickerHost {
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
  inputValue: string;
  currentYear: number;
  currentMonth: number;
  calendarGrid: DateCell[];
  weekdays: string[];
  liveAnnouncement: string;

  handleInput(e: Event): void;
  handleKeydown(e: KeyboardEvent): void;
  toggleCalendarPopover(e: Event): void;
  clearValue(e: Event): void;
  prevMonth(): void;
  nextMonth(): void;
  selectDate(cell: DateCell, e: Event): void;
  handleCellHover(cell: DateCell): void;
  handleCellMouseLeave(): void;
  selectToday(): void;
  confirmSelection(): void;
  closePopover(): void;
}

export const DatePickerTemplate = (host: DatePickerHost) => {
  const isRange = host.mode === 'range';
  const showClear = host.clearable && !host.disabled && !host.readonly && host.value !== null && host.value !== '';

  return html`
    <div
      class=${classMap({
        'biz-date-picker': true,
        [`biz-date-picker--${host.variant}`]: true,
        [`biz-date-picker--${host.size}`]: true,
        'biz-date-picker--full-width': host.fullWidth,
        'biz-date-picker--disabled': host.disabled,
        'biz-date-picker--readonly': host.readonly,
        'biz-date-picker--error': host.error,
        'biz-date-picker--open': host.isOpen,
      })}
    >
      <div class="biz-date-picker__label-container">
        <slot name="label-slot"></slot>
      </div>

      <div
        class="biz-date-picker__control"
        role="combobox"
        aria-expanded=${host.isOpen ? 'true' : 'false'}
        aria-haspopup="dialog"
        aria-disabled=${host.disabled ? 'true' : 'false'}
        aria-readonly=${host.readonly ? 'true' : 'false'}
      >
        <slot name="prefix-slot"></slot>

        <input
          type="text"
          class="biz-date-picker__input"
          .value=${host.inputValue}
          placeholder=${host.placeholder}
          ?disabled=${host.disabled}
          ?readonly=${host.readonly}
          @input=${host.handleInput}
          @keydown=${host.handleKeydown}
          @click=${host.toggleCalendarPopover}
        />

        ${showClear
          ? html`
              <button
                type="button"
                class="biz-date-picker__clear-btn"
                aria-label="초기화"
                @click=${host.clearValue}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `
          : ''}

        <slot name="suffix-slot">
          <button
            type="button"
            class="biz-date-picker__toggle-btn"
            tabindex="-1"
            ?disabled=${host.disabled || host.readonly}
            @click=${host.toggleCalendarPopover}
            aria-label="달력 열기"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </button>
        </slot>
      </div>

      <div class="biz-date-picker__sr-live" aria-live="polite" aria-atomic="true">
        ${host.liveAnnouncement}
      </div>

      ${host.isOpen
        ? html`
            <div
              class="biz-date-picker__popover"
              role="dialog"
              aria-modal="false"
              aria-label="달력"
              @keydown=${host.handleKeydown}
            >
              <slot name="header-slot">
                <div class="biz-date-picker__header">
                  <button
                    type="button"
                    class="biz-date-picker__nav-btn"
                    @click=${host.prevMonth}
                    aria-label="이전 달"
                  >
                    ‹
                  </button>
                  <span class="biz-date-picker__current-month">
                    ${host.currentYear}년 ${host.currentMonth + 1}월
                  </span>
                  <button
                    type="button"
                    class="biz-date-picker__nav-btn"
                    @click=${host.nextMonth}
                    aria-label="다음 달"
                  >
                    ›
                  </button>
                </div>
              </slot>

              <div class="biz-date-picker__grid" role="grid">
                <div class="biz-date-picker__weekdays" role="row">
                  ${host.weekdays.map(
                    (day) => html`
                      <div class="biz-date-picker__weekday" role="columnheader" aria-label=${day}>
                        ${day}
                      </div>
                    `
                  )}
                </div>

                <div class="biz-date-picker__days" role="row">
                  ${host.calendarGrid.map(
                    (cell) => html`
                      <div
                        class=${classMap({
                          'biz-date-picker__cell': true,
                          'biz-date-picker__cell--other-month': !cell.isCurrentMonth,
                          'biz-date-picker__cell--today': cell.isToday,
                          'biz-date-picker__cell--selected': cell.isSelected,
                          'biz-date-picker__cell--in-range': cell.isInRange,
                          'biz-date-picker__cell--range-start': cell.isRangeStart,
                          'biz-date-picker__cell--range-end': cell.isRangeEnd,
                          'biz-date-picker__cell--disabled': cell.isDisabled,
                        })}
                        role="gridcell"
                        aria-selected=${cell.isSelected ? 'true' : 'false'}
                        aria-disabled=${cell.isDisabled ? 'true' : 'false'}
                        aria-label=${cell.ariaLabel}
                        tabindex=${cell.isSelected ? '0' : '-1'}
                        @click=${(e: Event) => !cell.isDisabled && host.selectDate(cell, e)}
                        @mouseenter=${() => !cell.isDisabled && host.handleCellHover(cell)}
                        @mouseleave=${() => host.handleCellMouseLeave()}
                      >
                        <slot name="date-cell-slot">
                          <span class="biz-date-picker__cell-day">${cell.day}</span>
                        </slot>
                      </div>
                    `
                  )}
                </div>
              </div>

              <slot name="footer-slot">
                <div class="biz-date-picker__footer">
                  <button type="button" class="biz-date-picker__today-btn" @click=${host.selectToday}>
                    오늘
                  </button>
                  ${isRange
                    ? html`
                        <button type="button" class="biz-date-picker__confirm-btn" @click=${host.confirmSelection}>
                          확인
                        </button>
                      `
                    : ''}
                </div>
              </slot>
            </div>
          `
        : ''}

      <div class="biz-date-picker__helper-container">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};