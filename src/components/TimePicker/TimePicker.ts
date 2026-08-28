import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export interface TimeOption {
  value: number;
  label: string;
  disabled: boolean;
}

export interface TimePickerHost {
  value: string | Date | null;
  format: string;
  use12Hours: boolean;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
  showSeconds: boolean;
  disabledHours: ((hour: number) => boolean) | null;
  disabledMinutes: ((hour: number, minute: number) => boolean) | null;
  disabledSeconds: ((hour: number, minute: number, second: number) => boolean) | null;
  placeholder: string;
  clearable: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  open: boolean;
  focusedColumn: 'hour' | 'minute' | 'second' | 'ampm';
  selectedHour: number | null;
  selectedMinute: number | null;
  selectedSecond: number | null;
  selectedAmPm: 'AM' | 'PM' | null;
  inputValue: string;
  hasLabel: boolean;
  handleLabelSlotChange: (e: Event) => void;
  handleInputKeydown: (e: KeyboardEvent) => void;
  handleInput: (e: Event) => void;
  handleInputFocus: (e: FocusEvent) => void;
  handleInputBlur: (e: FocusEvent) => void;
  togglePanel: (e: MouseEvent) => void;
  handleClear: (e: MouseEvent) => void;
  handleOptionSelect: (type: 'hour' | 'minute' | 'second' | 'ampm', value: number | string) => void;
  handleColumnKeydown: (e: KeyboardEvent, type: 'hour' | 'minute' | 'second' | 'ampm') => void;
  handleNowClick: () => void;
  handleConfirmClick: () => void;
  getHourOptions: () => TimeOption[];
  getMinuteOptions: () => TimeOption[];
  getSecondOptions: () => TimeOption[];
  getAmPmOptions: () => Array<{ value: 'AM' | 'PM'; label: string; disabled: boolean }>;
}

export const TimePickerTemplate = (host: TimePickerHost) => html`
  <div
    class=${classMap({
      'biz-time-picker': true,
      [`biz-time-picker--${host.variant}`]: true,
      [`biz-time-picker--${host.size}`]: true,
      'biz-time-picker--full-width': host.fullWidth,
      'biz-time-picker--open': host.open,
      'biz-time-picker--disabled': host.disabled,
      'biz-time-picker--readonly': host.readonly,
      'biz-time-picker--error': host.error,
    })}
  >
    <div class="biz-time-picker__label-container">
      <slot name="label-slot" @slotchange=${host.handleLabelSlotChange}></slot>
    </div>

    <div class="biz-time-picker__input-container">
      <div class="biz-time-picker__prefix">
        <slot name="prefix-slot"></slot>
      </div>

      <input
        type="text"
        class="biz-time-picker__input"
        .value=${host.inputValue}
        placeholder=${host.placeholder}
        ?disabled=${host.disabled}
        ?readonly=${host.readonly}
        role="combobox"
        aria-expanded=${host.open ? 'true' : 'false'}
        aria-haspopup="listbox"
        aria-invalid=${host.error ? 'true' : 'false'}
        @input=${host.handleInput}
        @keydown=${host.handleInputKeydown}
        @focus=${host.handleInputFocus}
        @blur=${host.handleInputBlur}
      />

      ${host.clearable && host.inputValue && !host.disabled && !host.readonly
        ? html`
            <button
              type="button"
              class="biz-time-picker__clear-btn"
              aria-label="Clear time"
              @click=${host.handleClear}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          `
        : null}

      <div class="biz-time-picker__suffix" @click=${host.togglePanel}>
        <slot name="suffix-slot">
          <button
            type="button"
            class="biz-time-picker__icon-btn"
            aria-label="Toggle time panel"
            ?disabled=${host.disabled || host.readonly}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
          </button>
        </slot>
      </div>
    </div>

    ${host.open
      ? html`
          <div class="biz-time-picker__dropdown">
            <div class="biz-time-picker__header">
              <slot name="header-slot"></slot>
            </div>

            <div class="biz-time-picker__columns">
              <!-- Hour Column -->
              <div
                class=${classMap({
                  'biz-time-picker__column': true,
                  'biz-time-picker__column--focused': host.focusedColumn === 'hour',
                })}
                role="listbox"
                aria-label="Hour selection"
                tabindex="0"
                @keydown=${(e: KeyboardEvent) => host.handleColumnKeydown(e, 'hour')}
              >
                ${host.getHourOptions().map(
                  (opt) => html`
                    <div
                      class=${classMap({
                        'biz-time-picker__option': true,
                        'biz-time-picker__option--selected': host.selectedHour === opt.value,
                        'biz-time-picker__option--disabled': opt.disabled,
                      })}
                      role="option"
                      aria-selected=${host.selectedHour === opt.value ? 'true' : 'false'}
                      aria-disabled=${opt.disabled ? 'true' : 'false'}
                      @click=${() => !opt.disabled && host.handleOptionSelect('hour', opt.value)}
                    >
                      <slot name="option-item-slot" .option=${opt}>
                        ${opt.label}
                      </slot>
                    </div>
                  `
                )}
              </div>

              <!-- Minute Column -->
              <div
                class=${classMap({
                  'biz-time-picker__column': true,
                  'biz-time-picker__column--focused': host.focusedColumn === 'minute',
                })}
                role="listbox"
                aria-label="Minute selection"
                tabindex="0"
                @keydown=${(e: KeyboardEvent) => host.handleColumnKeydown(e, 'minute')}
              >
                ${host.getMinuteOptions().map(
                  (opt) => html`
                    <div
                      class=${classMap({
                        'biz-time-picker__option': true,
                        'biz-time-picker__option--selected': host.selectedMinute === opt.value,
                        'biz-time-picker__option--disabled': opt.disabled,
                      })}
                      role="option"
                      aria-selected=${host.selectedMinute === opt.value ? 'true' : 'false'}
                      aria-disabled=${opt.disabled ? 'true' : 'false'}
                      @click=${() => !opt.disabled && host.handleOptionSelect('minute', opt.value)}
                    >
                      <slot name="option-item-slot" .option=${opt}>
                        ${opt.label}
                      </slot>
                    </div>
                  `
                )}
              </div>

              <!-- Second Column -->
              ${host.showSeconds
                ? html`
                    <div
                      class=${classMap({
                        'biz-time-picker__column': true,
                        'biz-time-picker__column--focused': host.focusedColumn === 'second',
                      })}
                      role="listbox"
                      aria-label="Second selection"
                      tabindex="0"
                      @keydown=${(e: KeyboardEvent) => host.handleColumnKeydown(e, 'second')}
                    >
                      ${host.getSecondOptions().map(
                        (opt) => html`
                          <div
                            class=${classMap({
                              'biz-time-picker__option': true,
                              'biz-time-picker__option--selected': host.selectedSecond === opt.value,
                              'biz-time-picker__option--disabled': opt.disabled,
                            })}
                            role="option"
                            aria-selected=${host.selectedSecond === opt.value ? 'true' : 'false'}
                            aria-disabled=${opt.disabled ? 'true' : 'false'}
                            @click=${() => !opt.disabled && host.handleOptionSelect('second', opt.value)}
                          >
                            <slot name="option-item-slot" .option=${opt}>
                              ${opt.label}
                            </slot>
                          </div>
                        `
                      )}
                    </div>
                  `
                : null}

              <!-- AM/PM Column -->
              ${host.use12Hours
                ? html`
                    <div
                      class=${classMap({
                        'biz-time-picker__column': true,
                        'biz-time-picker__column--focused': host.focusedColumn === 'ampm',
                      })}
                      role="listbox"
                      aria-label="AM or PM selection"
                      tabindex="0"
                      @keydown=${(e: KeyboardEvent) => host.handleColumnKeydown(e, 'ampm')}
                    >
                      ${host.getAmPmOptions().map(
                        (opt) => html`
                          <div
                            class=${classMap({
                              'biz-time-picker__option': true,
                              'biz-time-picker__option--selected': host.selectedAmPm === opt.value,
                              'biz-time-picker__option--disabled': opt.disabled,
                            })}
                            role="option"
                            aria-selected=${host.selectedAmPm === opt.value ? 'true' : 'false'}
                            aria-disabled=${opt.disabled ? 'true' : 'false'}
                            @click=${() => !opt.disabled && host.handleOptionSelect('ampm', opt.value)}
                          >
                            ${opt.label}
                          </div>
                        `
                      )}
                    </div>
                  `
                : null}
            </div>

            <div class="biz-time-picker__footer">
              <slot name="footer-slot">
                <div class="biz-time-picker__action-footer">
                  <button type="button" class="biz-time-picker__now-btn" @click=${host.handleNowClick}>
                    Now
                  </button>
                  <button type="button" class="biz-time-picker__confirm-btn" @click=${host.handleConfirmClick}>
                    OK
                  </button>
                </div>
              </slot>
            </div>
          </div>
        `
      : null}

    <div class="biz-time-picker__helper-text">
      <slot name="helper-text-slot"></slot>
    </div>
  </div>
`;