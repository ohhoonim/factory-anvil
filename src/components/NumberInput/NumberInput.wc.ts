import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from "lit/decorators.js";
import { NumberInputTemplate } from "./NumberInput";
import { numberInputStyles } from "./NumberInput.css";

/**
 * @element biz-number-input
 * 
 * @slot decrement-icon-slot
 * @slot increment-icon-slot
 * @slot label-slot
 * @slot prefix-slot
 * @slot suffix-slot
 * @slot helper-text-slot
 */
@customElement('biz-number-input')
export class BizNumberInput extends LitElement {
  static styles = numberInputStyles;

  @property({ type: Number }) value: number | null = null;
  @property({ type: Number }) min = -Infinity;
  @property({ type: Number }) max = Infinity;
  @property({ type: Number }) step = 1;
  @property({ type: Number }) precision?: number;
  @property({ type: Boolean }) controls = true;
  @property({ type: String, attribute: 'controls-position' })
  controlsPosition: 'end' | 'stacked' | 'split' = 'end';
  @property({ type: Boolean, attribute: 'use-grouping' })
  useGrouping = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: String, reflect: true })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String, reflect: true })
  size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @state() private inputValue = '';

  willUpdate(changedProperties: PropertyValues) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('precision') ||
      changedProperties.has('useGrouping')
    ) {
      this.inputValue = this.formatValue(this.value);
    }
  }

  private formatValue(val: number | null): string {
    if (val === null || isNaN(val)) return '';

    let formattedNumber = val;
    if (this.precision !== undefined) {
      formattedNumber = Number(val.toFixed(this.precision));
    }

    if (this.useGrouping) {
      return formattedNumber.toLocaleString();
    }

    return String(formattedNumber);
  }

  private parseInputValue(str: string): number | null {
    if (!str.trim()) return null;
    const cleanStr = str.replace(/,/g, '');
    const parsed = Number(cleanStr);
    return isNaN(parsed) ? null : parsed;
  }

  private clampValue(val: number): number {
    let clamped = Math.min(Math.max(val, this.min), this.max);
    if (this.precision !== undefined) {
      clamped = Number(clamped.toFixed(this.precision));
    }
    return clamped;
  }

  private dispatchCustomEvent(eventName: string, detail: object = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  private updateValue(newValue: number | null, isInputEvent = true) {
    let finalValue = newValue;
    if (finalValue !== null) {
      finalValue = this.clampValue(finalValue);
    }

    this.value = finalValue;
    this.inputValue = this.formatValue(finalValue);

    if (isInputEvent) {
      this.dispatchCustomEvent('input', { value: this.value });
    } else {
      this.dispatchCustomEvent('change', { value: this.value });
    }
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const parsed = this.parseInputValue(target.value);
    this.value = parsed;
    this.inputValue = target.value;
    this.dispatchCustomEvent('input', { value: this.value });
  }

  private handleFocus(e: FocusEvent) {
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  private handleBlur(e: FocusEvent) {
    if (this.value !== null) {
      this.updateValue(this.value, false);
    } else {
      this.dispatchCustomEvent('change', { value: null });
    }
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  private stepUp(amount = this.step) {
    if (this.disabled || this.readonly) return;
    const current = this.value ?? 0;
    const nextValue = this.clampValue(current + amount);
    this.updateValue(nextValue, true);
    this.dispatchCustomEvent('step-up', { value: nextValue });
  }

  private stepDown(amount = this.step) {
    if (this.disabled || this.readonly) return;
    const current = this.value ?? 0;
    const nextValue = this.clampValue(current - amount);
    this.updateValue(nextValue, true);
    this.dispatchCustomEvent('step-down', { value: nextValue });
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        this.stepUp();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.stepDown();
        break;
      case 'Home':
        if (this.min !== -Infinity) {
          e.preventDefault();
          this.updateValue(this.min, true);
        }
        break;
      case 'End':
        if (this.max !== Infinity) {
          e.preventDefault();
          this.updateValue(this.max, true);
        }
        break;
      case 'PageUp':
        e.preventDefault();
        this.stepUp(this.step * 10);
        break;
      case 'PageDown':
        e.preventDefault();
        this.stepDown(this.step * 10);
        break;
      case 'Enter':
        if (this.value !== null) {
          this.updateValue(this.value, false);
        }
        break;
      case 'Escape':
        this.inputValue = this.formatValue(this.value);
        break;
    }
  }

  render() {
    return NumberInputTemplate({
      value: this.value,
      min: this.min,
      max: this.max,
      step: this.step,
      precision: this.precision,
      controls: this.controls,
      controlsPosition: this.controlsPosition,
      useGrouping: this.useGrouping,
      required: this.required,
      readonly: this.readonly,
      disabled: this.disabled,
      error: this.error,
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      inputValue: this.inputValue,
      onInputChange: this.handleInput.bind(this),
      onInputBlur: this.handleBlur.bind(this),
      onInputFocus: this.handleFocus.bind(this),
      onKeyDown: this.handleKeyDown.bind(this),
      onDecrement: () => this.stepDown(),
      onIncrement: () => this.stepUp(),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-number-input': BizNumberInput;
  }
}