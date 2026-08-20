import { LitElement, html, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { timePickerStyles } from './TimePicker.css.ts';
import type {
  TimePickerTemplateContext,
  TimeOption,
  PeriodOption
} from './TimePicker.ts';
import { TimePickerTemplate } from './TimePicker.ts';

/**
 * @element biz-time-picker
 * 
 * @slot label-slot
 * @slot prefix-slot
 * @slot suffix-slot
 * @slot header-slot
 * @slot option-item-slot
 * @slot footer-slot
 * @slot helper-text-slot
 */
@customElement('biz-time-picker')
export class BizTimePicker extends LitElement {
  static styles = timePickerStyles;

  @property({ type: String, reflect: true }) value: string | Date | null = null;
  @property({ type: String }) format = 'HH:mm';
  @property({ type: Boolean, attribute: 'use12-hours' }) use12Hours = false;
  @property({ type: Number, attribute: 'hour-step' }) hourStep = 1;
  @property({ type: Number, attribute: 'minute-step' }) minuteStep = 1;
  @property({ type: Number, attribute: 'second-step' }) secondStep = 1;
  @property({ type: Boolean, attribute: 'show-seconds' }) showSeconds = false;
  @property({ type: Function }) disabledHours: ((hour: number) => boolean) | null = null;
  @property({ type: Function }) disabledMinutes: ((minute: number, hour: number | null) => boolean) | null = null;
  @property({ type: Function }) disabledSeconds: ((second: number, hour: number | null, minute: number | null) => boolean) | null = null;
  @property({ type: String }) placeholder = 'HH:mm';
  @property({ type: Boolean }) clearable = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false;

  @state() private isOpen = false;
  @state() private activeColumn: 'hour' | 'minute' | 'second' | 'period' = 'hour';
  @state() private selectedHour: number | null = null;
  @state() private selectedMinute: number | null = null;
  @state() private selectedSecond: number | null = null;
  @state() private selectedPeriod: 'AM' | 'PM' | null = null;
  @state() private displayValue = '';

  private inputEl?: HTMLInputElement;
  private panelEl?: HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.handleGlobalKeydown);
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleGlobalKeydown);
    document.removeEventListener('click', this.handleOutsideClick);
  }

  willUpdate(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('value') || changedProperties.has('format') || changedProperties.has('use12Hours')) {
      this.syncValueToState();
    }
  }

  private syncValueToState(): void {
    if (!this.value) {
      this.displayValue = '';
      this.selectedHour = null;
      this.selectedMinute = null;
      this.selectedSecond = null;
      this.selectedPeriod = null;
      return;
    }

    let dateObj: Date | null = null;

    if (this.value instanceof Date) {
      dateObj = this.value;
    } else if (typeof this.value === 'string') {
      const parts = this.value.split(':');
      if (parts.length >= 2) {
        const h = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        const s = parts[2] ? parseInt(parts[2], 10) : 0;
        if (!isNaN(h) && !isNaN(m)) {
          dateObj = new Date();
          dateObj.setHours(h, m, isNaN(s) ? 0 : s, 0);
        }
      }
    }

    if (dateObj) {
      const rawHour = dateObj.getHours();
      const rawMinute = dateObj.getMinutes();
      const rawSecond = dateObj.getSeconds();

      this.selectedMinute = rawMinute;
      this.selectedSecond = rawSecond;

      if (this.use12Hours) {
        this.selectedPeriod = rawHour >= 12 ? 'PM' : 'AM';
        let h12 = rawHour % 12;
        if (h12 === 0) h12 = 12;
        this.selectedHour = h12;
      } else {
        this.selectedHour = rawHour;
        this.selectedPeriod = null;
      }

      this.displayValue = this.formatTimeDisplay(rawHour, rawMinute, rawSecond);
    } else if (typeof this.value === 'string') {
      this.displayValue = this.value;
    }
  }

  private formatTimeDisplay(h24: number, m: number, s: number): string {
    const pad = (n: number) => String(n).padStart(2, '0');

    if (this.use12Hours) {
      const period = h24 >= 12 ? 'PM' : 'AM';
      let h12 = h24 % 12;
      if (h12 === 0) h12 = 12;

      let formatted = `${pad(h12)}:${pad(m)}`;
      if (this.showSeconds) {
        formatted += `:${pad(s)}`;
      }
      return `${formatted} ${period}`;
    }

    let formatted = `${pad(h24)}:${pad(m)}`;
    if (this.showSeconds) {
      formatted += `:${pad(s)}`;
    }
    return formatted;
  }

  private handleOutsideClick = (e: MouseEvent): void => {
    if (!this.isOpen) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.closePanel();
    }
  };

  private handleGlobalKeydown = (e: KeyboardEvent): void => {
    if (this.disabled || this.readonly) return;

    if (e.key === 'Escape' && this.isOpen) {
      e.stopPropagation();
      this.closePanel();
      this.inputEl?.focus();
      return;
    }

    if (!this.isOpen) return;

    const columns: ('period' | 'hour' | 'minute' | 'second')[] = [];
    if (this.use12Hours) columns.push('period');
    columns.push('hour', 'minute');
    if (this.showSeconds) columns.push('second');

    const currentIndex = columns.indexOf(this.activeColumn);

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % columns.length;
      this.activeColumn = columns[nextIndex];
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + columns.length) % columns.length;
      this.activeColumn = columns[prevIndex];
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.navigateColumnOptions(e.key === 'ArrowDown' ? 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      this.confirmSelection();
    }
  };

  private navigateColumnOptions(direction: number): void {
    if (this.activeColumn === 'hour') {
      const options = this.generateHourOptions();
      const currentVal = this.selectedHour ?? options[0]?.value ?? 0;
      const idx = options.findIndex(o => o.value === currentVal);
      const nextIdx = (idx + direction + options.length) % options.length;
      if (!options[nextIdx].disabled) {
        this.selectedHour = options[nextIdx].value;
      }
    } else if (this.activeColumn === 'minute') {
      const options = this.generateMinuteOptions();
      const currentVal = this.selectedMinute ?? options[0]?.value ?? 0;
      const idx = options.findIndex(o => o.value === currentVal);
      const nextIdx = (idx + direction + options.length) % options.length;
      if (!options[nextIdx].disabled) {
        this.selectedMinute = options[nextIdx].value;
      }
    } else if (this.activeColumn === 'second') {
      const options = this.generateSecondOptions();
      const currentVal = this.selectedSecond ?? options[0]?.value ?? 0;
      const idx = options.findIndex(o => o.value === currentVal);
      const nextIdx = (idx + direction + options.length) % options.length;
      if (!options[nextIdx].disabled) {
        this.selectedSecond = options[nextIdx].value;
      }
    } else if (this.activeColumn === 'period') {
      const options = this.generatePeriodOptions();
      const currentVal = this.selectedPeriod ?? 'AM';
      const idx = options.findIndex(o => o.value === currentVal);
      const nextIdx = (idx + direction + options.length) % options.length;
      if (!options[nextIdx].disabled) {
        this.selectedPeriod = options[nextIdx].value;
      }
    }
  }

  private togglePanel = (e?: MouseEvent): void => {
    if (e) e.stopPropagation();
    if (this.disabled || this.readonly) return;

    if (this.isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  };

  private openPanel(): void {
    if (this.isOpen) return;
    this.isOpen = true;
    this.activeColumn = this.use12Hours ? 'period' : 'hour';
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  private closePanel(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private handleInput = (e: Event): void => {
    const input = e.target as HTMLInputElement;
    this.displayValue = input.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { rawValue: input.value }
      })
    );
  };

  private handleFocus = (e: FocusEvent): void => {
    this.dispatchEvent(new CustomEvent('focus', { bubbles: true, composed: true, detail: e }));
  };

  private handleBlur = (e: FocusEvent): void => {
    this.dispatchEvent(new CustomEvent('blur', { bubbles: true, composed: true, detail: e }));
  };

  private handleClear = (e: MouseEvent): void => {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;

    this.value = null;
    this.displayValue = '';
    this.selectedHour = null;
    this.selectedMinute = null;
    this.selectedSecond = null;
    this.selectedPeriod = null;

    this.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true }));
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: '', time: null }
      })
    );
  };

  private handleSelectOption = (type: 'hour' | 'minute' | 'second' | 'period', val: number | string): void => {
    this.activeColumn = type;
    if (type === 'hour') this.selectedHour = val as number;
    if (type === 'minute') this.selectedMinute = val as number;
    if (type === 'second') this.selectedSecond = val as number;
    if (type === 'period') this.selectedPeriod = val as 'AM' | 'PM';
  };

  private handleSelectNow = (): void => {
    const now = new Date();
    this.commitTimeSelection(now.getHours(), now.getMinutes(), now.getSeconds());
  };

  private handleConfirm = (): void => {
    this.confirmSelection();
  };

  private handleCancel = (): void => {
    this.syncValueToState();
    this.closePanel();
  };

  private confirmSelection(): void {
    let h = this.selectedHour ?? 0;
    const m = this.selectedMinute ?? 0;
    const s = this.selectedSecond ?? 0;

    if (this.use12Hours) {
      if (this.selectedPeriod === 'PM' && h < 12) h += 12;
      if (this.selectedPeriod === 'AM' && h === 12) h = 0;
    }

    this.commitTimeSelection(h, m, s);
  }

  private commitTimeSelection(h24: number, m: number, s: number): void {
    const dateObj = new Date();
    dateObj.setHours(h24, m, s, 0);

    const formattedStr = this.formatTimeDisplay(h24, m, s);
    this.displayValue = formattedStr;
    this.value = formattedStr;

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          value: formattedStr,
          time: dateObj
        }
      })
    );

    this.closePanel();
  }

  private generateHourOptions(): TimeOption[] {
    const max = this.use12Hours ? 12 : 23;
    const start = this.use12Hours ? 1 : 0;
    const options: TimeOption[] = [];

    for (let i = start; i <= max; i += this.hourStep) {
      const isDisabled = this.disabledHours ? this.disabledHours(i) : false;
      const label = String(i).padStart(2, '0');
      options.push({ value: i, label, disabled: isDisabled });
    }
    return options;
  }

  private generateMinuteOptions(): TimeOption[] {
    const options: TimeOption[] = [];
    for (let i = 0; i < 60; i += this.minuteStep) {
      const isDisabled = this.disabledMinutes ? this.disabledMinutes(i, this.selectedHour) : false;
      const label = String(i).padStart(2, '0');
      options.push({ value: i, label, disabled: isDisabled });
    }
    return options;
  }

  private generateSecondOptions(): TimeOption[] {
    const options: TimeOption[] = [];
    for (let i = 0; i < 60; i += this.secondStep) {
      const isDisabled = this.disabledSeconds ? this.disabledSeconds(i, this.selectedHour, this.selectedMinute) : false;
      const label = String(i).padStart(2, '0');
      options.push({ value: i, label, disabled: isDisabled });
    }
    return options;
  }

  private generatePeriodOptions(): PeriodOption[] {
    return [
      { value: 'AM', label: 'AM', disabled: false },
      { value: 'PM', label: 'PM', disabled: false }
    ];
  }

  render(): TemplateResult {
    const context: TimePickerTemplateContext = {
      value: this.value,
      displayValue: this.displayValue,
      format: this.format,
      use12Hours: this.use12Hours,
      hourStep: this.hourStep,
      minuteStep: this.minuteStep,
      secondStep: this.secondStep,
      showSeconds: this.showSeconds,
      placeholder: this.placeholder,
      clearable: this.clearable,
      readonly: this.readonly,
      disabled: this.disabled,
      error: this.error,
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      isOpen: this.isOpen,
      activeColumn: this.activeColumn,
      selectedHour: this.selectedHour,
      selectedMinute: this.selectedMinute,
      selectedSecond: this.selectedSecond,
      selectedPeriod: this.selectedPeriod,
      hours: this.generateHourOptions(),
      minutes: this.generateMinuteOptions(),
      seconds: this.generateSecondOptions(),
      periods: this.generatePeriodOptions(),
      onInput: this.handleInput,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeydown: this.handleGlobalKeydown,
      onTogglePanel: this.togglePanel,
      onClear: this.handleClear,
      onSelectOption: this.handleSelectOption,
      onSelectNow: this.handleSelectNow,
      onConfirm: this.handleConfirm,
      onCancel: this.handleCancel,
      inputRef: (el) => { this.inputEl = el as HTMLInputElement; },
      panelRef: (el) => { this.panelEl = el as HTMLElement; }
    };

    return TimePickerTemplate(context);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-time-picker': BizTimePicker;
  }
}