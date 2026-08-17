import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SliderTemplate } from './Slider';
import { sliderStyles } from './Slider.css';

@customElement('biz-slider')
export class BizSlider extends LitElement {
  static styles = sliderStyles;

  @property({ type: Object })
  value: number | number[] = 0;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: String })
  mode: 'single' | 'range' = 'single';

  @property({ type: String })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: Boolean, attribute: 'show-ticks' })
  showTicks = false;

  @property({ type: String, attribute: 'show-tooltip' })
  showTooltip: 'always' | 'hover' | 'drag' | 'never' = 'hover';

  @property({ attribute: false })
  formatTooltip: ((value: number) => string) | null = null;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String })
  variant: 'standard' | 'outlined' | 'filled' = 'standard';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String })
  name = '';

  @state()
  activeThumb: 'start' | 'end' | null = null;

  private isDragging = false;

  private handleDocumentPointerMove = (e: PointerEvent) => {
    if (!this.isDragging || !this.activeThumb || this.disabled || this.readonly) return;
    this.updateValueFromPointer(e, this.activeThumb, true);
  };

  private handleDocumentPointerUp = (e: PointerEvent) => {
    if (!this.isDragging) return;
    this.isDragging = false;
    const currentActive = this.activeThumb;
    this.activeThumb = null;

    window.removeEventListener('pointermove', this.handleDocumentPointerMove);
    window.removeEventListener('pointerup', this.handleDocumentPointerUp);

    if (currentActive) {
      this.updateValueFromPointer(e, currentActive, false);
      this.dispatchChangeEvent();
    }
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('pointermove', this.handleDocumentPointerMove);
    window.removeEventListener('pointerup', this.handleDocumentPointerUp);
  }

  private getValueArray(): [number, number] {
    if (Array.isArray(this.value)) {
      return [this.value[0] ?? this.min, this.value[1] ?? this.max];
    }
    return [this.min, typeof this.value === 'number' ? this.value : this.min];
  }

  private clampAndSnap(val: number): number {
    let clamped = Math.max(this.min, Math.min(this.max, val));
    if (this.step > 0) {
      const steps = Math.round((clamped - this.min) / this.step);
      clamped = this.min + steps * this.step;
    }
    return Math.max(this.min, Math.min(this.max, Number(clamped.toFixed(10))));
  }

  private updateValueFromPointer(e: PointerEvent, targetThumb: 'start' | 'end', isInput: boolean) {
    const track = this.shadowRoot?.querySelector('.biz-slider__track-container');
    if (!track) return;

    const rect = track.getBoundingClientRect();
    let ratio = 0;

    if (this.orientation === 'vertical') {
      ratio = (rect.bottom - e.clientY) / rect.height;
    } else {
      ratio = (e.clientX - rect.left) / rect.width;
    }

    ratio = Math.max(0, Math.min(1, ratio));
    const rawVal = this.min + ratio * (this.max - this.min);
    const newValue = this.clampAndSnap(rawVal);

    if (this.mode === 'range') {
      const [startVal, endVal] = this.getValueArray();
      let updatedStart = startVal;
      let updatedEnd = endVal;

      if (targetThumb === 'start') {
        updatedStart = Math.min(newValue, endVal);
      } else {
        updatedEnd = Math.max(newValue, startVal);
      }

      const nextVal: [number, number] = [updatedStart, updatedEnd];
      if (startVal !== updatedStart || endVal !== updatedEnd) {
        this.value = nextVal;
        if (isInput) this.dispatchInputEvent();
      }
    } else {
      if (this.value !== newValue) {
        this.value = newValue;
        if (isInput) this.dispatchInputEvent();
      }
    }
  }

  public handleTrackPointerDown(e: PointerEvent) {
    if (this.disabled || this.readonly) return;
    const target = e.target as HTMLElement;
    if (target.classList.contains('biz-slider__thumb')) return;

    const track = this.shadowRoot?.querySelector('.biz-slider__track-container');
    if (!track) return;

    const rect = track.getBoundingClientRect();
    let ratio = 0;

    if (this.orientation === 'vertical') {
      ratio = (rect.bottom - e.clientY) / rect.height;
    } else {
      ratio = (e.clientX - rect.left) / rect.width;
    }

    ratio = Math.max(0, Math.min(1, ratio));
    const clickVal = this.clampAndSnap(this.min + ratio * (this.max - this.min));

    let chosenThumb: 'start' | 'end' = 'end';
    if (this.mode === 'range') {
      const [sVal, eVal] = this.getValueArray();
      const distStart = Math.abs(clickVal - sVal);
      const distEnd = Math.abs(clickVal - eVal);
      chosenThumb = distStart < distEnd ? 'start' : 'end';
    }

    this.activeThumb = chosenThumb;
    this.isDragging = true;
    this.updateValueFromPointer(e, chosenThumb, true);
    this.dispatchChangeEvent();

    window.addEventListener('pointermove', this.handleDocumentPointerMove);
    window.addEventListener('pointerup', this.handleDocumentPointerUp);
  }

  public handleThumbPointerDown(e: PointerEvent, thumb: 'start' | 'end') {
    if (this.disabled || this.readonly) return;
    e.stopPropagation();
    this.activeThumb = thumb;
    this.isDragging = true;

    window.addEventListener('pointermove', this.handleDocumentPointerMove);
    window.addEventListener('pointerup', this.handleDocumentPointerUp);
  }

  public handleFocus(_e: FocusEvent, thumb: 'start' | 'end') {
    this.dispatchEvent(new CustomEvent('focus', { bubbles: true, composed: true }));
  }

  public handleBlur(_e: FocusEvent, thumb: 'start' | 'end') {
    this.dispatchEvent(new CustomEvent('blur', { bubbles: true, composed: true }));
  }

  public handleKeyDown(e: KeyboardEvent, thumb: 'start' | 'end') {
    if (this.disabled || this.readonly) return;

    const isRange = this.mode === 'range';
    const [startVal, endVal] = this.getValueArray();
    let current = isRange ? (thumb === 'start' ? startVal : endVal) : (typeof this.value === 'number' ? this.value : startVal);
    let handled = true;

    const pageStep = this.step * 10;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        current += this.step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        current -= this.step;
        break;
      case 'PageUp':
        current += pageStep;
        break;
      case 'PageDown':
        current -= pageStep;
        break;
      case 'Home':
        current = this.min;
        break;
      case 'End':
        current = this.max;
        break;
      default:
        handled = false;
        break;
    }

    if (handled) {
      e.preventDefault();
      const nextVal = this.clampAndSnap(current);

      if (isRange) {
        let nextStart = startVal;
        let nextEnd = endVal;
        if (thumb === 'start') {
          nextStart = Math.min(nextVal, endVal);
        } else {
          nextEnd = Math.max(nextVal, startVal);
        }
        this.value = [nextStart, nextEnd];
      } else {
        this.value = nextVal;
      }

      this.dispatchInputEvent();
      this.dispatchChangeEvent();
    }
  }

  public clear() {
    if (this.disabled || this.readonly) return;
    if (this.mode === 'range') {
      this.value = [this.min, this.min];
    } else {
      this.value = this.min;
    }
    this.dispatchInputEvent();
    this.dispatchChangeEvent();
    this.dispatchEvent(new CustomEvent('clear', { bubbles: true, composed: true }));
  }

  private dispatchInputEvent() {
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      })
    );
  }

  private dispatchChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value }
      })
    );
  }

  renderTicks() {
    if (!this.showTicks) return null;
    const ticksCount = Math.floor((this.max - this.min) / this.step);
    if (ticksCount <= 0 || ticksCount > 100) return null;

    const ticks = [];
    for (let i = 0; i <= ticksCount; i++) {
      const pct = (i / ticksCount) * 100;
      const tickStyle = this.orientation === 'vertical' ? `bottom: ${pct}%` : `left: ${pct}%`;
      ticks.push(html`<span class="biz-slider__tick" style="${tickStyle}"></span>`);
    }
    return ticks;
  }

  render() {
    return SliderTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-slider': BizSlider;
  }
}