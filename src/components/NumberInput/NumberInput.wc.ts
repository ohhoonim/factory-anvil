import { LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { numberInputStyles } from './NumberInput.css.js';
import { NumberInputTemplate, type NumberInputHost } from './NumberInput.js';

@customElement('biz-number-input')
export class BizNumberInput extends LitElement implements NumberInputHost {
  static styles = numberInputStyles;

  @property({ type: Number })
  value: number | null = null;

  @property({ type: Number })
  min: number = -Infinity;

  @property({ type: Number })
  max: number = Infinity;

  @property({ type: Number })
  step: number = 1;

  @property({ type: Number })
  precision?: number;

  @property({ type: Boolean })
  controls: boolean = true;

  @property({ type: String, attribute: 'controls-position' })
  controlsPosition: 'end' | 'stacked' | 'split' = 'end';

  @property({ type: Boolean, attribute: 'use-grouping' })
  useGrouping: boolean = false;

  @property({ type: Boolean, reflect: true })
  required: boolean = false;

  @property({ type: Boolean, reflect: true })
  readonly: boolean = false;

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  @property({ type: Boolean, reflect: true })
  error: boolean = false;

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth: boolean = false;

  @property({ type: String })
  placeholder?: string;

  @state()
  private rawInputValue: string = '';

  get isMinReached(): boolean {
    return this.value !== null && this.value <= this.min;
  }

  get isMaxReached(): boolean {
    return this.value !== null && this.value >= this.max;
  }

  get formattedValue(): string {
    if (this.rawInputValue !== '') {
      return this.rawInputValue;
    }
    if (this.value === null || Number.isNaN(this.value)) {
      return '';
    }

    let valStr = this.precision !== undefined 
      ? this.value.toFixed(this.precision) 
      : this.value.toString();

    if (this.useGrouping) {
      const parts = valStr.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      valStr = parts.join('.');
    }

    return valStr;
  }

  private clampValue(val: number): number {
    let clamped = Math.min(Math.max(val, this.min), this.max);
    if (this.precision !== undefined) {
      clamped = Number(clamped.toFixed(this.precision));
    }
    return clamped;
  }

  private emitCustomEvent(eventName: string, detail: Record<string, unknown> = {}): void {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail,
      })
    );
  }

  handleInput(e: InputEvent): void {
    const inputEl = e.target as HTMLInputElement;
    const rawVal = inputEl.value.replace(/,/g, '');
    this.rawInputValue = inputEl.value;

    if (rawVal === '' || rawVal === '-') {
      this.value = null;
      this.emitCustomEvent('input', { value: null });
      return;
    }

    const parsed = Number(rawVal);
    if (!Number.isNaN(parsed)) {
      this.value = parsed;
      this.emitCustomEvent('input', { value: this.value });
    }
  }

  handleChange(e: Event): void {
    const inputEl = e.target as HTMLInputElement;
    const rawVal = inputEl.value.replace(/,/g, '');
    this.rawInputValue = '';

    if (rawVal === '' || rawVal === '-') {
      this.value = null;
    } else {
      const parsed = Number(rawVal);
      if (Number.isNaN(parsed)) {
        this.value = null;
      } else {
        this.value = this.clampValue(parsed);
      }
    }

    this.requestUpdate();
    this.emitCustomEvent('change', { value: this.value });
  }

  handleFocus(e: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  handleBlur(e: FocusEvent): void {
    this.rawInputValue = '';
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    const currentVal = this.value ?? 0;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.handleStepUp();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.handleStepDown();
        break;
      case 'Home':
        if (this.min !== -Infinity) {
          e.preventDefault();
          this.updateValueAndEmit(this.min);
        }
        break;
      case 'End':
        if (this.max !== Infinity) {
          e.preventDefault();
          this.updateValueAndEmit(this.max);
        }
        break;
      case 'PageUp':
        e.preventDefault();
        this.updateValueAndEmit(currentVal + this.step * 10);
        break;
      case 'PageDown':
        e.preventDefault();
        this.updateValueAndEmit(currentVal - this.step * 10);
        break;
      case 'Escape':
        this.rawInputValue = '';
        this.requestUpdate();
        break;
    }
  }

  handleStepUp(): void {
    if (this.disabled || this.readonly || this.isMaxReached) return;
    const currentVal = this.value ?? 0;
    const nextVal = this.clampValue(currentVal + this.step);
    this.value = nextVal;
    this.rawInputValue = '';
    this.emitCustomEvent('step-up', { value: this.value });
    this.emitCustomEvent('input', { value: this.value });
    this.emitCustomEvent('change', { value: this.value });
  }

  handleStepDown(): void {
    if (this.disabled || this.readonly || this.isMinReached) return;
    const currentVal = this.value ?? 0;
    const nextVal = this.clampValue(currentVal - this.step);
    this.value = nextVal;
    this.rawInputValue = '';
    this.emitCustomEvent('step-down', { value: this.value });
    this.emitCustomEvent('input', { value: this.value });
    this.emitCustomEvent('change', { value: this.value });
  }

  private updateValueAndEmit(newValue: number): void {
    const clamped = this.clampValue(newValue);
    this.value = clamped;
    this.rawInputValue = '';
    this.emitCustomEvent('input', { value: this.value });
    this.emitCustomEvent('change', { value: this.value });
  }

  override render(): TemplateResult {
    return NumberInputTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-number-input': BizNumberInput;
  }
}