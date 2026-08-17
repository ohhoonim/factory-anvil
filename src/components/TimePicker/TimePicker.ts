import { html, type TemplateResult } from 'lit';
import { ref } from 'lit/directives/ref.js';

export interface TimeOption {
  value: number;
  label: string;
  disabled: boolean;
}

export interface PeriodOption {
  value: 'AM' | 'PM';
  label: string;
  disabled: boolean;
}

export interface TimePickerTemplateContext {
  // Properties
  value: string | Date | null;
  displayValue: string;
  format: string;
  use12Hours: boolean;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
  showSeconds: boolean;
  placeholder: string;
  clearable: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  
  // States
  isOpen: boolean;
  activeColumn: 'hour' | 'minute' | 'second' | 'period';
  selectedHour: number | null;
  selectedMinute: number | null;
  selectedSecond: number | null;
  selectedPeriod: 'AM' | 'PM' | null;

  // Options Data
  hours: TimeOption[];
  minutes: TimeOption[];
  seconds: TimeOption[];
  periods: PeriodOption[];

  // Event Handlers
  onInput: (e: Event) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onKeydown: (e: KeyboardEvent) => void;
  onTogglePanel: (e: MouseEvent) => void;
  onClear: (e: MouseEvent) => void;
  onSelectOption: (type: 'hour' | 'minute' | 'second' | 'period', val: number | string) => void;
  onSelectNow: () => void;
  onConfirm: () => void;
  onCancel: () => void;

  // Element Refs
  inputRef?: (el?: Element) => void;
  panelRef?: (el?: Element) => void;
}

export const TimePickerTemplate = (context: TimePickerTemplateContext): TemplateResult => {
  const {
    displayValue,
    placeholder,
    clearable,
    readonly,
    disabled,
    error,
    variant,
    size,
    fullWidth,
    isOpen,
    activeColumn,
    selectedHour,
    selectedMinute,
    selectedSecond,
    selectedPeriod,
    showSeconds,
    use12Hours,
    hours,
    minutes,
    seconds,
    periods,
    onInput,
    onFocus,
    onBlur,
    onKeydown,
    onTogglePanel,
    onClear,
    onSelectOption,
    onSelectNow,
    onConfirm,
    onCancel,
    inputRef,
    panelRef
  } = context;

  const rootClasses = [
    'biz-time-picker',
    `biz-time-picker--${variant}`,
    `biz-time-picker--${size}`,
    isOpen ? 'biz-time-picker--open' : '',
    disabled ? 'biz-time-picker--disabled' : '',
    readonly ? 'biz-time-picker--readonly' : '',
    error ? 'biz-time-picker--error' : '',
    fullWidth ? 'biz-time-picker--full-width' : ''
  ].filter(Boolean).join(' ');

  return html`
    <div class=${rootClasses}>
      <!-- Label Slot -->
      <div class="biz-time-picker__label-wrapper">
        <slot name="label-slot"></slot>
      </div>

      <!-- Main Input Control Container -->
      <div 
        class="biz-time-picker__control"
        role="combobox"
        aria-expanded=${isOpen ? 'true' : 'false'}
        aria-haspopup="listbox"
        aria-disabled=${disabled ? 'true' : 'false'}
        @click=${readonly || disabled ? null : onTogglePanel}
      >
        <!-- Prefix Slot -->
        <span class="biz-time-picker__prefix">
          <slot name="prefix-slot"></slot>
        </span>

        <!-- Input Element -->
        <input
          ${inputRef ? ref(inputRef) : ''}
          type="text"
          class="biz-time-picker__input"
          .value=${displayValue}
          placeholder=${placeholder}
          ?disabled=${disabled}
          ?readonly=${readonly}
          @input=${onInput}
          @focus=${onFocus}
          @blur=${onBlur}
          @keydown=${onKeydown}
        />

        <!-- Clear Button -->
        ${clearable && displayValue && !disabled && !readonly ? html`
          <button
            type="button"
            class="biz-time-picker__clear-button"
            aria-label="Clear time"
            @click=${onClear}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        ` : ''}

        <!-- Suffix Slot / Time Icon Trigger -->
        <span class="biz-time-picker__suffix">
          <slot name="suffix-slot">
            <button
              type="button"
              class="biz-time-picker__trigger-icon"
              tabindex="-1"
              ?disabled=${disabled}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
            </button>
          </slot>
        </span>
      </div>

      <!-- Time Dropdown Panel -->
      ${isOpen ? html`
        <div 
          ${panelRef ? ref(panelRef) : ''}
          class="biz-time-picker__panel"
          tabindex="-1"
        >
          <!-- Header Slot -->
          <div class="biz-time-picker__header">
            <slot name="header-slot"></slot>
          </div>

          <!-- Time Columns List Container -->
          <div class="biz-time-picker__columns">
            <!-- Period Column (12-Hour System) -->
            ${use12Hours ? html`
              <div 
                class="biz-time-picker__column ${activeColumn === 'period' ? 'biz-time-picker__column--active' : ''}"
                role="listbox"
                aria-label="Period"
              >
                ${periods.map(item => html`
                  <div
                    class="biz-time-picker__option ${selectedPeriod === item.value ? 'biz-time-picker__option--selected' : ''} ${item.disabled ? 'biz-time-picker__option--disabled' : ''}"
                    role="option"
                    aria-selected=${selectedPeriod === item.value ? 'true' : 'false'}
                    aria-disabled=${item.disabled ? 'true' : 'false'}
                    @click=${item.disabled ? null : () => onSelectOption('period', item.value)}
                  >
                    <slot name="option-item-slot">${item.label}</slot>
                  </div>
                `)}
              </div>
            ` : ''}

            <!-- Hour Column -->
            <div 
              class="biz-time-picker__column ${activeColumn === 'hour' ? 'biz-time-picker__column--active' : ''}"
              role="listbox"
              aria-label="Hour"
            >
              ${hours.map(item => html`
                <div
                  class="biz-time-picker__option ${selectedHour === item.value ? 'biz-time-picker__option--selected' : ''} ${item.disabled ? 'biz-time-picker__option--disabled' : ''}"
                  role="option"
                  aria-selected=${selectedHour === item.value ? 'true' : 'false'}
                  aria-disabled=${item.disabled ? 'true' : 'false'}
                  @click=${item.disabled ? null : () => onSelectOption('hour', item.value)}
                >
                  <slot name="option-item-slot">${item.label}</slot>
                </div>
              `)}
            </div>

            <!-- Minute Column -->
            <div 
              class="biz-time-picker__column ${activeColumn === 'minute' ? 'biz-time-picker__column--active' : ''}"
              role="listbox"
              aria-label="Minute"
            >
              ${minutes.map(item => html`
                <div
                  class="biz-time-picker__option ${selectedMinute === item.value ? 'biz-time-picker__option--selected' : ''} ${item.disabled ? 'biz-time-picker__option--disabled' : ''}"
                  role="option"
                  aria-selected=${selectedMinute === item.value ? 'true' : 'false'}
                  aria-disabled=${item.disabled ? 'true' : 'false'}
                  @click=${item.disabled ? null : () => onSelectOption('minute', item.value)}
                >
                  <slot name="option-item-slot">${item.label}</slot>
                </div>
              `)}
            </div>

            <!-- Second Column -->
            ${showSeconds ? html`
              <div 
                class="biz-time-picker__column ${activeColumn === 'second' ? 'biz-time-picker__column--active' : ''}"
                role="listbox"
                aria-label="Second"
              >
                ${seconds.map(item => html`
                  <div
                    class="biz-time-picker__option ${selectedSecond === item.value ? 'biz-time-picker__option--selected' : ''} ${item.disabled ? 'biz-time-picker__option--disabled' : ''}"
                    role="option"
                    aria-selected=${selectedSecond === item.value ? 'true' : 'false'}
                    aria-disabled=${item.disabled ? 'true' : 'false'}
                    @click=${item.disabled ? null : () => onSelectOption('second', item.value)}
                  >
                    <slot name="option-item-slot">${item.label}</slot>
                  </div>
                `)}
              </div>
            ` : ''}
          </div>

          <!-- Footer Area & Slot -->
          <div class="biz-time-picker__footer">
            <slot name="footer-slot">
              <div class="biz-time-picker__action-footer">
                <button type="button" class="biz-time-picker__btn-now" @click=${onSelectNow}>Now</button>
                <div class="biz-time-picker__action-btns">
                  <button type="button" class="biz-time-picker__btn-cancel" @click=${onCancel}>Cancel</button>
                  <button type="button" class="biz-time-picker__btn-confirm" @click=${onConfirm}>OK</button>
                </div>
              </div>
            </slot>
          </div>
        </div>
      ` : ''}

      <!-- Helper Text Slot -->
      <div class="biz-time-picker__helper-wrapper">
        <slot name="helper-text-slot"></slot>
      </div>

      <!-- Live Region for Screen Readers -->
      <div class="biz-time-picker__sr-live" aria-live="polite" aria-atomic="true">
        ${displayValue ? `Selected time is ${displayValue}` : ''}
      </div>
    </div>
  `;
};