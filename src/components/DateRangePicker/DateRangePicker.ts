import { html } from 'lit';

export interface DateRangePickerTemplateProps {
  value: [Date | null, Date | null];
  format: string;
  calendarMode: 'dual' | 'single';
  inputMode: 'single' | 'double';
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  minDate: Date | null;
  maxDate: Date | null;
  placeholder: string | [string, string];
  clearable: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  loading: boolean;
  open: boolean;
  selectingState: 'start' | 'end' | 'idle';
  hoverDate: Date | null;
  currentMonth: Date;
  presets: Array<{ label: string; range: [Date, Date] }>;
  formattedStart: string;
  formattedEnd: string;
  onStartInput: (e: Event) => void;
  onEndInput: (e: Event) => void;
  onSingleInput: (e: Event) => void;
  onTogglePopover: (e: Event) => void;
  onClear: (e: Event) => void;
  onDateClick: (date: Date) => void;
  onDateMouseEnter: (date: Date) => void;
  onDateMouseLeave: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onApply: () => void;
  onCancel: () => void;
  onPresetClick: (range: [Date, Date]) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  renderCalendarGrid: (monthOffset: number) => unknown;
}

export const DateRangePickerTemplate = (props: DateRangePickerTemplateProps) => {
  const startPlaceholder = Array.isArray(props.placeholder) ? props.placeholder[0] : props.placeholder;
  const endPlaceholder = Array.isArray(props.placeholder) ? props.placeholder[1] : props.placeholder;

  return html`
    <div
      class="biz-date-range-picker ${props.variant} ${props.size} ${props.disabled ? 'disabled' : ''} ${props.readonly ? 'readonly' : ''} ${props.error ? 'error' : ''} ${props.loading ? 'loading' : ''} ${props.open ? 'open' : ''}"
      @keydown=${props.onKeyDown}
    >
      <div class="label-container">
        <slot name="label-slot"></slot>
      </div>

      <div
        class="control-container"
        role="combobox"
        aria-expanded=${props.open ? 'true' : 'false'}
        aria-haspopup="dialog"
        aria-disabled=${props.disabled ? 'true' : 'false'}
        @click=${props.onTogglePopover}
      >
        <span class="prefix">
          <slot name="prefix-slot"></slot>
        </span>

        ${props.inputMode === 'single'
          ? html`
              <input
                type="text"
                class="input-field single-input"
                .value=${props.formattedStart && props.formattedEnd ? `${props.formattedStart} ~ ${props.formattedEnd}` : ''}
                placeholder=${Array.isArray(props.placeholder) ? props.placeholder.join(' ~ ') : props.placeholder}
                ?disabled=${props.disabled}
                ?readonly=${props.readonly}
                @input=${props.onSingleInput}
              />
            `
          : html`
              <div class="double-input-group">
                <slot name="start-slot">
                  <input
                    type="text"
                    class="input-field start-input"
                    .value=${props.formattedStart}
                    placeholder=${startPlaceholder}
                    ?disabled=${props.disabled}
                    ?readonly=${props.readonly}
                    @input=${props.onStartInput}
                  />
                </slot>

                <span class="separator">
                  <slot name="separator-slot">~</slot>
                </span>

                <slot name="end-slot">
                  <input
                    type="text"
                    class="input-field end-input"
                    .value=${props.formattedEnd}
                    placeholder=${endPlaceholder}
                    ?disabled=${props.disabled}
                    ?readonly=${props.readonly}
                    @input=${props.onEndInput}
                  />
                </slot>
              </div>
            `}

        ${props.clearable && (props.value[0] || props.value[1]) && !props.disabled && !props.readonly
          ? html`
              <button type="button" class="clear-button" @click=${props.onClear} aria-label="Clear date range">
                &times;
              </button>
            `
          : ''}

        <span class="suffix">
          <slot name="suffix-slot">
            <span class="calendar-icon" aria-hidden="true">📅</span>
          </slot>
        </span>

        ${props.loading ? html`<span class="loading-spinner" aria-hidden="true"></span>` : ''}
      </div>

      ${props.open
        ? html`
            <div class="popover-panel ${props.calendarMode}" role="dialog" aria-modal="true">
              <div class="popover-header">
                <slot name="header-slot"></slot>
              </div>

              <div class="popover-body">
                ${props.presets && props.presets.length > 0
                  ? html`
                      <div class="presets-sidebar">
                        <slot name="presets-slot">
                          ${props.presets.map(
                            (preset) => html`
                              <button type="button" class="preset-button" @click=${() => props.onPresetClick(preset.range)}>
                                ${preset.label}
                              </button>
                            `
                          )}
                        </slot>
                      </div>
                    `
                  : ''}

                <div class="calendars-container">
                  <div class="calendar-navigation-bar">
                    <button type="button" class="nav-prev" @click=${props.onPrevMonth} aria-label="이전 달">&lt;</button>
                    <button type="button" class="nav-next" @click=${props.onNextMonth} aria-label="다음 달">&gt;</button>
                  </div>
                  <div class="grids-wrapper">
                    ${props.renderCalendarGrid(0)}
                    ${props.calendarMode === 'dual' ? props.renderCalendarGrid(1) : ''}
                  </div>
                </div>
              </div>

              <div class="popover-footer">
                <slot name="footer-slot">
                  <button type="button" class="action-button cancel" @click=${props.onCancel}>취소</button>
                  <button type="button" class="action-button apply" @click=${props.onApply}>확인</button>
                </slot>
              </div>
            </div>
          `
        : ''}

      <div class="helper-text-container">
        <slot name="helper-text-slot"></slot>
      </div>

      <div class="sr-only" aria-live="polite">
        ${props.value[0] && props.value[1]
          ? `선택된 기간: ${props.formattedStart} 부터 ${props.formattedEnd} 까지`
          : props.value[0]
          ? `시작일 ${props.formattedStart} 선택됨. 종료일을 선택하세요.`
          : '날짜 범위를 선택하세요.'}
      </div>
    </div>
  `;
};