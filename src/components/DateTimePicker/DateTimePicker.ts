import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface DateTimeCell {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  label: string;
}

export interface TimeOption {
  value: number;
  label: string;
  isSelected: boolean;
  isDisabled: boolean;
}

export interface DateTimePickerHost {
  value: string | Date | null;
  format: string;
  layoutMode: 'side-by-side' | 'tabbed';
  use12Hours: boolean;
  showSeconds: boolean;
  minDatetime: string | Date | null;
  maxDatetime: string | Date | null;
  disabledDates: Date[] | ((date: Date) => boolean);
  disabledHours: ((hour: number) => boolean) | null;
  disabledMinutes: ((minute: number) => boolean) | null;
  placeholder: string;
  clearable: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  labelLayout: 'vertical' | 'horizontal';
  isOpen: boolean;
  activeTab: 'date' | 'time';
  displayMonth: Date;
  selectedDate: Date | null;
  hours: number;
  minutes: number;
  seconds: number;
  ampm: 'AM' | 'PM';
  formattedValue: string;
  liveAnnounceText: string;

  calendarGrid: DateTimeCell[];
  hoursList: TimeOption[];
  minutesList: TimeOption[];
  secondsList: TimeOption[];
  ampmList: TimeOption[];

  handleInputClick(): void;
  handleInputKeydown(e: KeyboardEvent): void;
  handleClear(e: MouseEvent): void;
  handlePrevMonth(): void;
  handleNextMonth(): void;
  handleDateSelect(cell: DateTimeCell): void;
  handleTimeSelect(type: 'hour' | 'minute' | 'second' | 'ampm', option: TimeOption): void;
  handleTabChange(tab: 'date' | 'time'): void;
  handleNowClick(): void;
  handleConfirmClick(): void;
  handleCancelClick(): void;
}

export const DateTimePickerTemplate = (host: DateTimePickerHost) => html`
  <div
    class=${classMap({
      'biz-date-time-picker': true,
      [`biz-date-time-picker--${host.variant}`]: true,
      [`biz-date-time-picker--${host.size}`]: true,
      [`biz-date-time-picker--label-${host.labelLayout}`]: true,
      'biz-date-time-picker--full-width': host.fullWidth,
      'biz-date-time-picker--open': host.isOpen,
      'biz-date-time-picker--disabled': host.disabled,
      'biz-date-time-picker--readonly': host.readonly,
      'biz-date-time-picker--error': host.error,
    })}
  >
    <label class="biz-date-time-picker__label" for="input-control">
      <slot name="label-slot"></slot>
    </label>

    <div class="biz-date-time-picker__field-wrapper">
      <div
        id="input-control"
        class="biz-date-time-picker__control"
        role="combobox"
        aria-expanded=${host.isOpen ? 'true' : 'false'}
        aria-haspopup="dialog"
        aria-disabled=${host.disabled ? 'true' : 'false'}
        aria-readonly=${host.readonly ? 'true' : 'false'}
        tabindex=${host.disabled ? '-1' : '0'}
        @click=${host.handleInputClick}
        @keydown=${host.handleInputKeydown}
      >
        <div class="biz-date-time-picker__prefix">
          <slot name="prefix-slot"></slot>
        </div>

        <input
          type="text"
          class="biz-date-time-picker__input"
          .value=${host.formattedValue}
          placeholder=${host.placeholder}
          ?disabled=${host.disabled}
          ?readonly=${true}
          tabindex="-1"
        />

        ${host.clearable && host.value && !host.disabled && !host.readonly
          ? html`
              <button
                type="button"
                class="biz-date-time-picker__clear-btn"
                aria-label="Clear value"
                @click=${host.handleClear}
              >
                ✕
              </button>
            `
          : ''}

        <div class="biz-date-time-picker__suffix">
          <slot name="suffix-slot">
            <svg class="biz-date-time-picker__icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </slot>
        </div>
      </div>

      ${host.isOpen
        ? html`
            <div class="biz-date-time-picker__popover" role="dialog" aria-modal="true">
              <div class="biz-date-time-picker__header">
                <slot name="header-slot"></slot>
                ${host.layoutMode === 'tabbed'
                  ? html`
                      <div class="biz-date-time-picker__tabs">
                        <button
                          type="button"
                          class=${classMap({
                            'biz-date-time-picker__tab': true,
                            'biz-date-time-picker__tab--active': host.activeTab === 'date',
                          })}
                          @click=${() => host.handleTabChange('date')}
                        >
                          Date
                        </button>
                        <button
                          type="button"
                          class=${classMap({
                            'biz-date-time-picker__tab': true,
                            'biz-date-time-picker__tab--active': host.activeTab === 'time',
                          })}
                          @click=${() => host.handleTabChange('time')}
                        >
                          Time
                        </button>
                      </div>
                    `
                  : ''}
              </div>

              <div
                class=${classMap({
                  'biz-date-time-picker__body': true,
                  [`biz-date-time-picker__body--${host.layoutMode}`]: true,
                })}
              >
                ${host.layoutMode === 'side-by-side' || host.activeTab === 'date'
                  ? html`
                      <div class="biz-date-time-picker__calendar">
                        <div class="biz-date-time-picker__calendar-header">
                          <button
                            type="button"
                            class="biz-date-time-picker__nav-btn"
                            @click=${host.handlePrevMonth}
                            aria-label="Previous Month"
                          >
                            ‹
                          </button>
                          <span class="biz-date-time-picker__current-month">
                            ${host.displayMonth.getFullYear()}년 ${host.displayMonth.getMonth() + 1}월
                          </span>
                          <button
                            type="button"
                            class="biz-date-time-picker__nav-btn"
                            @click=${host.handleNextMonth}
                            aria-label="Next Month"
                          >
                            ›
                          </button>
                        </div>

                        <div class="biz-date-time-picker__weekdays">
                          <span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>
                        </div>

                        <div class="biz-date-time-picker__grid" role="grid">
                          ${host.calendarGrid.map(
                            (cell) => html`
                              <div
                                role="gridcell"
                                class=${classMap({
                                  'biz-date-time-picker__cell': true,
                                  'biz-date-time-picker__cell--other-month': !cell.isCurrentMonth,
                                  'biz-date-time-picker__cell--selected': cell.isSelected,
                                  'biz-date-time-picker__cell--today': cell.isToday,
                                  'biz-date-time-picker__cell--disabled': cell.isDisabled,
                                })}
                                aria-selected=${cell.isSelected ? 'true' : 'false'}
                                aria-disabled=${cell.isDisabled ? 'true' : 'false'}
                                aria-label=${cell.label}
                                tabindex=${cell.isSelected ? '0' : '-1'}
                                @click=${() => !cell.isDisabled && host.handleDateSelect(cell)}
                              >
                                <slot name="date-cell-slot" .cell=${cell}>
                                  ${cell.day}
                                </slot>
                              </div>
                            `
                          )}
                        </div>
                      </div>
                    `
                  : ''}

                ${host.layoutMode === 'side-by-side' || host.activeTab === 'time'
                  ? html`
                      <div class="biz-date-time-picker__time-panel">
                        ${host.use12Hours
                          ? html`
                              <div class="biz-date-time-picker__time-column" role="listbox" aria-label="AM/PM">
                                ${host.ampmList.map(
                                  (opt) => html`
                                    <div
                                      role="option"
                                      class=${classMap({
                                        'biz-date-time-picker__time-option': true,
                                        'biz-date-time-picker__time-option--selected': opt.isSelected,
                                        'biz-date-time-picker__time-option--disabled': opt.isDisabled,
                                      })}
                                      aria-selected=${opt.isSelected ? 'true' : 'false'}
                                      @click=${() => !opt.isDisabled && host.handleTimeSelect('ampm', opt)}
                                    >
                                      <slot name="time-option-slot" .option=${opt}>
                                        ${opt.label}
                                      </slot>
                                    </div>
                                  `
                                )}
                              </div>
                            `
                          : ''}

                        <div class="biz-date-time-picker__time-column" role="listbox" aria-label="Hours">
                          ${host.hoursList.map(
                            (opt) => html`
                              <div
                                role="option"
                                class=${classMap({
                                  'biz-date-time-picker__time-option': true,
                                  'biz-date-time-picker__time-option--selected': opt.isSelected,
                                  'biz-date-time-picker__time-option--disabled': opt.isDisabled,
                                })}
                                aria-selected=${opt.isSelected ? 'true' : 'false'}
                                @click=${() => !opt.isDisabled && host.handleTimeSelect('hour', opt)}
                              >
                                <slot name="time-option-slot" .option=${opt}>
                                  ${opt.label}
                                </slot>
                              </div>
                            `
                          )}
                        </div>

                        <div class="biz-date-time-picker__time-column" role="listbox" aria-label="Minutes">
                          ${host.minutesList.map(
                            (opt) => html`
                              <div
                                role="option"
                                class=${classMap({
                                  'biz-date-time-picker__time-option': true,
                                  'biz-date-time-picker__time-option--selected': opt.isSelected,
                                  'biz-date-time-picker__time-option--disabled': opt.isDisabled,
                                })}
                                aria-selected=${opt.isSelected ? 'true' : 'false'}
                                @click=${() => !opt.isDisabled && host.handleTimeSelect('minute', opt)}
                              >
                                <slot name="time-option-slot" .option=${opt}>
                                  ${opt.label}
                                </slot>
                              </div>
                            `
                          )}
                        </div>

                        ${host.showSeconds
                          ? html`
                              <div class="biz-date-time-picker__time-column" role="listbox" aria-label="Seconds">
                                ${host.secondsList.map(
                                  (opt) => html`
                                    <div
                                      role="option"
                                      class=${classMap({
                                        'biz-date-time-picker__time-option': true,
                                        'biz-date-time-picker__time-option--selected': opt.isSelected,
                                        'biz-date-time-picker__time-option--disabled': opt.isDisabled,
                                      })}
                                      aria-selected=${opt.isSelected ? 'true' : 'false'}
                                      @click=${() => !opt.isDisabled && host.handleTimeSelect('second', opt)}
                                    >
                                      <slot name="time-option-slot" .option=${opt}>
                                        ${opt.label}
                                      </slot>
                                    </div>
                                  `
                                )}
                              </div>
                            `
                          : ''}
                      </div>
                    `
                  : ''}
              </div>

              <div class="biz-date-time-picker__footer">
                <slot name="footer-slot">
                  <div class="biz-date-time-picker__action-bar">
                    <button type="button" class="biz-date-time-picker__btn biz-date-time-picker__btn--now" @click=${host.handleNowClick}>
                      Now
                    </button>
                    <div class="biz-date-time-picker__action-right">
                      <button type="button" class="biz-date-time-picker__btn biz-date-time-picker__btn--cancel" @click=${host.handleCancelClick}>
                        Cancel
                      </button>
                      <button type="button" class="biz-date-time-picker__btn biz-date-time-picker__btn--confirm" @click=${host.handleConfirmClick}>
                        OK
                      </button>
                    </div>
                  </div>
                </slot>
              </div>
            </div>
          `
        : ''}

      <div class="biz-date-time-picker__helper-text">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>

    <div class="biz-date-time-picker__sr-live" aria-live="polite" aria-atomic="true">
      ${host.liveAnnounceText}
    </div>
  </div>
`;