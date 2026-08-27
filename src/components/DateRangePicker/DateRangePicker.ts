import { html } from "lit";

export interface PresetObject {
  label: string;
  value: [Date | string, Date | string];
}

export interface DateRangePickerHost {
  value: [Date | string | null, Date | string | null];
  format: string;
  calendarMode: 'dual' | 'single';
  inputMode: 'single' | 'double';
  minDate: string | Date | null;
  maxDate: string | Date | null;
  minRange: number | null;
  maxRange: number | null;
  disabledDates: Array<string | Date> | ((date: Date) => boolean);
  presets: PresetObject[];
  placeholder: [string, string] | string;
  clearable: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  isOpen: boolean;
  focusedInput: 'start' | 'end' | null;
  currentDisplayMonth: Date;
  hoveredDate: Date | null;

  handleInputFocus: (target: 'start' | 'end') => void;
  handleInputChange: (e: Event, target: 'start' | 'end') => void;
  handleTogglePopover: (e: Event) => void;
  handleClear: (e: Event) => void;
  handlePresetClick: (preset: PresetObject) => void;
  handleDateClick: (date: Date) => void;
  handleDateMouseEnter: (date: Date) => void;
  handleDateMouseLeave: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  handleApply: () => void;
  handleCancel: () => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  formatDateValue: (date: Date | string | null) => string;
  isDateDisabled: (date: Date) => boolean;
  isDateSelected: (date: Date) => boolean;
  isDateInRange: (date: Date) => boolean;
  isRangeStart: (date: Date) => boolean;
  isRangeEnd: (date: Date) => boolean;
  renderCalendarGrid: (monthOffset: number) => unknown;
}

export const DateRangePickerTemplate = (host: DateRangePickerHost) => {
  const [startDate, endDate] = host.value;
  const startText = host.formatDateValue(startDate);
  const endText = host.formatDateValue(endDate);

  const startPlaceholder = Array.isArray(host.placeholder)
    ? host.placeholder[0]
    : host.placeholder;
  const endPlaceholder = Array.isArray(host.placeholder)
    ? host.placeholder[1] || host.placeholder[0]
    : host.placeholder;

  const containerClasses = [
    'biz-date-range-picker',
    `biz-date-range-picker--variant-${host.variant || 'outlined'}`,
    `biz-date-range-picker--size-${host.size || 'medium'}`,
    host.disabled ? 'biz-date-range-picker--disabled' : '',
    host.readonly ? 'biz-date-range-picker--readonly' : '',
    host.error ? 'biz-date-range-picker--error' : '',
    host.isOpen ? 'biz-date-range-picker--open' : '',
    host.fullWidth ? 'biz-date-range-picker--full-width' : ''
  ].filter(Boolean).join(' ');

  return html`
    <div class="${containerClasses}">
      <div class="biz-date-range-picker__label">
        <slot name="label-slot"></slot>
      </div>

      <div
        class="biz-date-range-picker__control"
        role="combobox"
        aria-expanded="${host.isOpen ? 'true' : 'false'}"
        aria-haspopup="dialog"
        aria-disabled="${host.disabled ? 'true' : 'false'}"
        @keydown="${host.handleKeyDown}"
      >
        <span class="biz-date-range-picker__prefix">
          <slot name="prefix-slot"></slot>
        </span>

        ${host.inputMode === 'single'
          ? html`
              <input
                type="text"
                class="biz-date-range-picker__input biz-date-range-picker__input--single"
                .value="${startText || endText ? `${startText} ~ ${endText}` : ''}"
                placeholder="${typeof host.placeholder === 'string' ? host.placeholder : `${startPlaceholder} ~ ${endPlaceholder}`}"
                ?disabled="${host.disabled}"
                ?readonly="${host.readonly}"
                @focus="${() => host.handleInputFocus('start')}"
                @input="${(e: Event) => host.handleInputChange(e, 'start')}"
              />
            `
          : html`
              <input
                type="text"
                class="biz-date-range-picker__input biz-date-range-picker__input--start"
                .value="${startText}"
                placeholder="${startPlaceholder}"
                ?disabled="${host.disabled}"
                ?readonly="${host.readonly}"
                @focus="${() => host.handleInputFocus('start')}"
                @input="${(e: Event) => host.handleInputChange(e, 'start')}"
              />
              <span class="biz-date-range-picker__separator">
                <slot name="separator-slot">~</slot>
              </span>
              <input
                type="text"
                class="biz-date-range-picker__input biz-date-range-picker__input--end"
                .value="${endText}"
                placeholder="${endPlaceholder}"
                ?disabled="${host.disabled}"
                ?readonly="${host.readonly}"
                @focus="${() => host.handleInputFocus('end')}"
                @input="${(e: Event) => host.handleInputChange(e, 'end')}"
              />
            `}

        ${host.clearable && (startDate || endDate) && !host.disabled && !host.readonly
          ? html`
              <button
                type="button"
                class="biz-date-range-picker__clear-btn"
                aria-label="Clear range"
                @click="${host.handleClear}"
              >
                &times;
              </button>
            `
          : ''}

        <button
          type="button"
          class="biz-date-range-picker__trigger"
          aria-label="Toggle calendar popover"
          ?disabled="${host.disabled || host.readonly}"
          @click="${host.handleTogglePopover}"
        >
          <slot name="suffix-slot">
            <svg
              class="biz-date-range-picker__calendar-icon"
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
          </slot>
        </button>
      </div>

      <div class="biz-date-range-picker__helper-text">
        <slot name="helper-text-slot"></slot>
      </div>

      ${host.isOpen
        ? html`
            <div
              class="biz-date-range-picker__popover"
              role="dialog"
              aria-modal="false"
            >
              <div class="biz-date-range-picker__popover-header">
                <slot name="header-slot"></slot>
              </div>

              <div class="biz-date-range-picker__popover-body">
                <div class="biz-date-range-picker__presets">
                  <slot name="presets-slot">
                    ${host.presets && host.presets.length > 0
                      ? html`
                          <div class="biz-date-range-picker__presets-list">
                            ${host.presets.map(
                              (preset) => html`
                                <button
                                  type="button"
                                  class="biz-date-range-picker__preset-btn"
                                  @click="${() => host.handlePresetClick(preset)}"
                                >
                                  ${preset.label}
                                </button>
                              `
                            )}
                          </div>
                        `
                      : ''}
                  </slot>
                </div>

                <div class="biz-date-range-picker__calendars">
                  <div class="biz-date-range-picker__calendar-nav">
                    <button
                      type="button"
                      class="biz-date-range-picker__nav-btn biz-date-range-picker__nav-btn--prev"
                      @click="${host.handlePrevMonth}"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      class="biz-date-range-picker__nav-btn biz-date-range-picker__nav-btn--next"
                      @click="${host.handleNextMonth}"
                    >
                      &gt;
                    </button>
                  </div>

                  <div class="biz-date-range-picker__grids">
                    ${host.renderCalendarGrid(0)}
                    ${host.calendarMode === 'dual'
                      ? host.renderCalendarGrid(1)
                      : ''}
                  </div>
                </div>
              </div>

              <div class="biz-date-range-picker__popover-footer">
                <slot name="footer-slot">
                  <div class="biz-date-range-picker__action-buttons">
                    <button
                      type="button"
                      class="biz-date-range-picker__btn biz-date-range-picker__btn--cancel"
                      @click="${host.handleCancel}"
                    >
                      취소
                    </button>
                    <button
                      type="button"
                      class="biz-date-range-picker__btn biz-date-range-picker__btn--apply"
                      @click="${host.handleApply}"
                    >
                      확인
                    </button>
                  </div>
                </slot>
              </div>

              <div
                class="biz-date-range-picker__aria-live"
                aria-live="polite"
                aria-atomic="true"
              >
                ${startDate && endDate
                  ? `선택된 기간: ${startText} 부터 ${endText} 까지`
                  : startDate
                  ? `시작일 선택됨: ${startText}. 종료일을 선택하세요.`
                  : ''}
              </div>
            </div>
          `
        : ''}
    </div>
  `;
};