import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface DateTimePickerTemplateOptions {
  value: string | Date | null;
  format: string;
  layoutMode: 'side-by-side' | 'tabbed';
  use12Hours: boolean;
  showSeconds: boolean;
  minDatetime: string | Date | null;
  maxDatetime: string | Date | null;
  disabledDates: any[] | ((date: Date) => boolean);
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
  isOpen: boolean;
  activeTab: 'date' | 'time';
  viewDate: Date;
  selectedDate: Date | null;
  selectedTime: { hour: number; minute: number; second: number; period: 'AM' | 'PM' };
  displayValue: string;
  liveMessage: string;
  onInputClick: (e: Event) => void;
  onInputType: (e: InputEvent) => void;
  onClearClick: (e: Event) => void;
  onPrevMonth: (e: Event) => void;
  onNextMonth: (e: Event) => void;
  onDateSelect: (date: Date) => void;
  onHourSelect: (hour: number) => void;
  onMinuteSelect: (minute: number) => void;
  onSecondSelect: (second: number) => void;
  onPeriodSelect: (period: 'AM' | 'PM') => void;
  onTabChange: (tab: 'date' | 'time') => void;
  onNowClick: (e: Event) => void;
  onConfirmClick: (e: Event) => void;
  onCancelClick: (e: Event) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

export const DateTimePickerTemplate = (options: DateTimePickerTemplateOptions) => {
  const years = options.viewDate.getFullYear();
  const months = options.viewDate.getMonth();

  const firstDay = new Date(years, months, 1).getDay();
  const daysInMonth = new Date(years, months + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(years, months, i));
  }

  const hoursList = Array.from({ length: options.use12Hours ? 12 : 24 }, (_, i) => options.use12Hours ? i + 1 : i);
  const minutesList = Array.from({ length: 60 }, (_, i) => i);
  const secondsList = Array.from({ length: 60 }, (_, i) => i);

  return html`
    <div
      class=${classMap({
        'biz-date-time-picker': true,
        [`biz-date-time-picker--${options.variant}`]: true,
        [`biz-date-time-picker--${options.size}`]: true,
        'biz-date-time-picker--disabled': options.disabled,
        'biz-date-time-picker--readonly': options.readonly,
        'biz-date-time-picker--error': options.error,
        'biz-date-time-picker--open': options.isOpen,
        'biz-date-time-picker--full-width': options.fullWidth,
      })}
      @keydown=${options.onKeyDown}
    >
      <div class="biz-date-time-picker__label">
        <slot name="label-slot"></slot>
      </div>

      <div
        class="biz-date-time-picker__control"
        role="combobox"
        aria-expanded=${options.isOpen ? 'true' : 'false'}
        aria-haspopup="dialog"
        aria-disabled=${options.disabled ? 'true' : 'false'}
        @click=${options.onInputClick}
      >
        <span class="biz-date-time-picker__prefix">
          <slot name="prefix-slot"></slot>
        </span>

        <input
          type="text"
          class="biz-date-time-picker__input"
          .value=${options.displayValue}
          placeholder=${options.placeholder}
          ?disabled=${options.disabled}
          ?readonly=${options.readonly}
          @input=${options.onInputType}
        />

        ${options.clearable && options.value && !options.disabled && !options.readonly
          ? html`
              <button
                type="button"
                class="biz-date-time-picker__clear-btn"
                aria-label="Clear value"
                @click=${options.onClearClick}
              >
                &times;
              </button>
            `
          : ''}

        <span class="biz-date-time-picker__suffix">
          <slot name="suffix-slot">
            <svg class="biz-date-time-picker__icon" viewBox="0 0 24 24" width="18" height="18">
              <path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
            </svg>
          </slot>
        </span>
      </div>

      <div class="biz-date-time-picker__helper-text">
        <slot name="helper-text-slot"></slot>
      </div>

      ${options.isOpen
        ? html`
            <div class="biz-date-time-picker__popover" role="dialog" aria-modal="true">
              <div class="biz-date-time-picker__header">
                <slot name="header-slot"></slot>
              </div>

              ${options.layoutMode === 'tabbed'
                ? html`
                    <div class="biz-date-time-picker__tabs" role="tablist">
                      <button
                        type="button"
                        role="tab"
                        class=${classMap({
                          'biz-date-time-picker__tab': true,
                          'biz-date-time-picker__tab--active': options.activeTab === 'date',
                        })}
                        aria-selected=${options.activeTab === 'date' ? 'true' : 'false'}
                        @click=${() => options.onTabChange('date')}
                      >
                        Date
                      </button>
                      <button
                        type="button"
                        role="tab"
                        class=${classMap({
                          'biz-date-time-picker__tab': true,
                          'biz-date-time-picker__tab--active': options.activeTab === 'time',
                        })}
                        aria-selected=${options.activeTab === 'time' ? 'true' : 'false'}
                        @click=${() => options.onTabChange('time')}
                      >
                        Time
                      </button>
                    </div>
                  `
                : ''}

              <div
                class=${classMap({
                  'biz-date-time-picker__body': true,
                  'biz-date-time-picker__body--side-by-side': options.layoutMode === 'side-by-side',
                  'biz-date-time-picker__body--tabbed': options.layoutMode === 'tabbed',
                })}
              >
                ${options.layoutMode === 'side-by-side' || options.activeTab === 'date'
                  ? html`
                      <div class="biz-date-time-picker__calendar-view">
                        <div class="biz-date-time-picker__calendar-header">
                          <button type="button" class="biz-date-time-picker__nav-btn" @click=${options.onPrevMonth}>&lt;</button>
                          <span class="biz-date-time-picker__current-month">
                            ${years}.${String(months + 1).padStart(2, '0')}
                          </span>
                          <button type="button" class="biz-date-time-picker__nav-btn" @click=${options.onNextMonth}>&gt;</button>
                        </div>

                        <div class="biz-date-time-picker__grid" role="grid">
                          <div class="biz-date-time-picker__weekdays" role="row">
                            <span role="columnheader">Su</span>
                            <span role="columnheader">Mo</span>
                            <span role="columnheader">Tu</span>
                            <span role="columnheader">We</span>
                            <span role="columnheader">Th</span>
                            <span role="columnheader">Fr</span>
                            <span role="columnheader">Sa</span>
                          </div>
                          <div class="biz-date-time-picker__days" role="row">
                            ${calendarDays.map((date) => {
                              if (!date) {
                                return html`<div class="biz-date-time-picker__cell biz-date-time-picker__cell--empty" role="gridcell"></div>`;
                              }

                              const isSelected =
                                options.selectedDate &&
                                options.selectedDate.getFullYear() === date.getFullYear() &&
                                options.selectedDate.getMonth() === date.getMonth() &&
                                options.selectedDate.getDate() === date.getDate();

                              return html`
                                <div
                                  class=${classMap({
                                    'biz-date-time-picker__cell': true,
                                    'biz-date-time-picker__cell--selected': !!isSelected,
                                  })}
                                  role="gridcell"
                                  aria-selected=${isSelected ? 'true' : 'false'}
                                  tabindex="0"
                                  @click=${() => options.onDateSelect(date)}
                                >
                                  <slot name="date-cell-slot">
                                    ${date.getDate()}
                                  </slot>
                                </div>
                              `;
                            })}
                          </div>
                        </div>
                      </div>
                    `
                  : ''}

                ${options.layoutMode === 'side-by-side' || options.activeTab === 'time'
                  ? html`
                      <div class="biz-date-time-picker__time-view">
                        ${options.use12Hours
                          ? html`
                              <div class="biz-date-time-picker__time-column" role="listbox">
                                ${['AM', 'PM'].map(
                                  (period) => html`
                                    <div
                                      class=${classMap({
                                        'biz-date-time-picker__time-option': true,
                                        'biz-date-time-picker__time-option--selected': options.selectedTime.period === period,
                                      })}
                                      role="option"
                                      aria-selected=${options.selectedTime.period === period ? 'true' : 'false'}
                                      @click=${() => options.onPeriodSelect(period as 'AM' | 'PM')}
                                    >
                                      ${period}
                                    </div>
                                  `
                                )}
                              </div>
                            `
                          : ''}

                        <div class="biz-date-time-picker__time-column" role="listbox">
                          ${hoursList.map(
                            (hour) => html`
                              <div
                                class=${classMap({
                                  'biz-date-time-picker__time-option': true,
                                  'biz-date-time-picker__time-option--selected': options.selectedTime.hour === hour,
                                })}
                                role="option"
                                aria-selected=${options.selectedTime.hour === hour ? 'true' : 'false'}
                                @click=${() => options.onHourSelect(hour)}
                              >
                                <slot name="time-option-slot">
                                  ${String(hour).padStart(2, '0')}
                                </slot>
                              </div>
                            `
                          )}
                        </div>

                        <div class="biz-date-time-picker__time-column" role="listbox">
                          ${minutesList.map(
                            (minute) => html`
                              <div
                                class=${classMap({
                                  'biz-date-time-picker__time-option': true,
                                  'biz-date-time-picker__time-option--selected': options.selectedTime.minute === minute,
                                })}
                                role="option"
                                aria-selected=${options.selectedTime.minute === minute ? 'true' : 'false'}
                                @click=${() => options.onMinuteSelect(minute)}
                              >
                                <slot name="time-option-slot">
                                  ${String(minute).padStart(2, '0')}
                                </slot>
                              </div>
                            `
                          )}
                        </div>

                        ${options.showSeconds
                          ? html`
                              <div class="biz-date-time-picker__time-column" role="listbox">
                                ${secondsList.map(
                                  (second) => html`
                                    <div
                                      class=${classMap({
                                        'biz-date-time-picker__time-option': true,
                                        'biz-date-time-picker__time-option--selected': options.selectedTime.second === second,
                                      })}
                                      role="option"
                                      aria-selected=${options.selectedTime.second === second ? 'true' : 'false'}
                                      @click=${() => options.onSecondSelect(second)}
                                    >
                                      <slot name="time-option-slot">
                                        ${String(second).padStart(2, '0')}
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
                  <div class="biz-date-time-picker__default-footer">
                    <button type="button" class="biz-date-time-picker__action-btn" @click=${options.onNowClick}>Now</button>
                    <div class="biz-date-time-picker__action-group">
                      <button type="button" class="biz-date-time-picker__action-btn" @click=${options.onCancelClick}>Cancel</button>
                      <button type="button" class="biz-date-time-picker__action-btn biz-date-time-picker__action-btn--primary" @click=${options.onConfirmClick}>OK</button>
                    </div>
                  </div>
                </slot>
              </div>
            </div>
          `
        : ''}

      <div class="biz-date-time-picker__sr-live" aria-live="polite" aria-atomic="true">
        ${options.liveMessage}
      </div>
    </div>
  `;
};