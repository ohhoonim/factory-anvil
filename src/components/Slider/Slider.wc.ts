import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SliderTemplate, type SliderHost } from './Slider.js';
import { sliderStyles } from './Slider.css.js';

@customElement('biz-slider')
export class BizSlider extends LitElement implements SliderHost {
  static override styles = sliderStyles;

  @property({
    type: Object,
    converter: {
      fromAttribute: (value: string | null) => {
        if (!value) return 0;
        try {
          return JSON.parse(value);
        } catch {
          return Number(value) || 0;
        }
      },
      toAttribute: (value: unknown) => {
        return typeof value === 'object' ? JSON.stringify(value) : String(value);
      },
    },
  })
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
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'standard';

  @state()
  draggingIndex: number | null = null;

  @state()
  activeThumbIndex: number | null = null;

  private _boundMouseMove?: (e: MouseEvent) => void;
  private _boundMouseUp?: (e: MouseEvent) => void;

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._removeDragListeners();
  }

  private _clamp(val: number): number {
    const stepped = Math.round((val - this.min) / this.step) * this.step + this.min;
    const precision = (this.step.toString().split('.')[1] || '').length;
    const fixedVal = Number(stepped.toFixed(precision));
    return Math.max(this.min, Math.min(this.max, fixedVal));
  }

  private _getValueArray(): number[] {
    if (this.mode === 'range') {
      if (Array.isArray(this.value)) {
        return [this._clamp(this.value[0] ?? this.min), this._clamp(this.value[1] ?? this.max)];
      }
      return [this.min, this._clamp(typeof this.value === 'number' ? this.value : this.max)];
    }
    return [this._clamp(typeof this.value === 'number' ? this.value : this.min)];
  }

  private _updateValue(newValue: number | number[], isFinal = false): void {
    if (this.disabled || this.readonly) return;

    this.value = newValue;
    const eventName = isFinal ? 'change' : 'input';

    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _calculateValueFromClientPos(clientX: number, clientY: number): number {
    const trackEl = this.shadowRoot?.querySelector('.biz-slider__track-container');
    if (!trackEl) return this.min;

    const rect = trackEl.getBoundingClientRect();
    let ratio = 0;

    if (this.orientation === 'vertical') {
      ratio = (rect.bottom - clientY) / rect.height;
    } else {
      ratio = (clientX - rect.left) / rect.width;
    }

    ratio = Math.max(0, Math.min(1, ratio));
    const rawVal = this.min + ratio * (this.max - this.min);
    return this._clamp(rawVal);
  }

  handleTrackClick = (e: MouseEvent): void => {
    if (this.disabled || this.readonly) return;

    const clickVal = this._calculateValueFromClientPos(e.clientX, e.clientY);
    const currentValues = this._getValueArray();

    if (this.mode === 'range') {
      const dist0 = Math.abs(currentValues[0] - clickVal);
      const dist1 = Math.abs(currentValues[1] - clickVal);
      const targetIndex = dist0 <= dist1 ? 0 : 1;

      const nextValues = [...currentValues];
      nextValues[targetIndex] = clickVal;

      if (targetIndex === 0 && nextValues[0] > nextValues[1]) {
        nextValues[1] = nextValues[0];
      } else if (targetIndex === 1 && nextValues[1] < nextValues[0]) {
        nextValues[0] = nextValues[1];
      }

      this._updateValue(nextValues, true);
    } else {
      this._updateValue(clickVal, true);
    }
  };

  handleThumbMouseDown = (index: number, e: MouseEvent): void => {
    if (this.disabled || this.readonly) return;
    e.stopPropagation();

    this.draggingIndex = index;
    this.activeThumbIndex = index;

    this._boundMouseMove = (event: MouseEvent) => this._handleDragMove(event);
    this._boundMouseUp = () => this._handleDragEnd();

    window.addEventListener('mousemove', this._boundMouseMove);
    window.addEventListener('mouseup', this._boundMouseUp);
  };

  private _handleDragMove(e: MouseEvent): void {
    if (this.draggingIndex === null) return;

    const newVal = this._calculateValueFromClientPos(e.clientX, e.clientY);
    const currentValues = this._getValueArray();

    if (this.mode === 'range') {
      const nextValues = [...currentValues];
      nextValues[this.draggingIndex] = newVal;

      if (this.draggingIndex === 0 && nextValues[0] > nextValues[1]) {
        nextValues[0] = nextValues[1];
      } else if (this.draggingIndex === 1 && nextValues[1] < nextValues[0]) {
        nextValues[1] = nextValues[0];
      }

      this._updateValue(nextValues, false);
    } else {
      this._updateValue(newVal, false);
    }
  }

  private _handleDragEnd(): void {
    if (this.draggingIndex !== null) {
      this.draggingIndex = null;
      this._updateValue(this.value, true);
    }
    this._removeDragListeners();
  }

  private _removeDragListeners(): void {
    if (this._boundMouseMove) {
      window.removeEventListener('mousemove', this._boundMouseMove);
      this._boundMouseMove = undefined;
    }
    if (this._boundMouseUp) {
      window.removeEventListener('mouseup', this._boundMouseUp);
      this._boundMouseUp = undefined;
    }
  }

  handleThumbKeyDown = (index: number, e: KeyboardEvent): void => {
    if (this.disabled || this.readonly) return;

    let delta = 0;
    const largeStep = this.step * 10 || 10;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        delta = this.step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -this.step;
        break;
      case 'PageUp':
        delta = largeStep;
        break;
      case 'PageDown':
        delta = -largeStep;
        break;
      case 'Home': {
        const currentValues = this._getValueArray();
        if (this.mode === 'range') {
          const nextValues = [...currentValues];
          nextValues[index] = this.min;
          if (index === 1 && nextValues[1] < nextValues[0]) {
            nextValues[0] = this.min;
          }
          this._updateValue(nextValues, true);
        } else {
          this._updateValue(this.min, true);
        }
        e.preventDefault();
        return;
      }
      case 'End': {
        const currentValues = this._getValueArray();
        if (this.mode === 'range') {
          const nextValues = [...currentValues];
          nextValues[index] = this.max;
          if (index === 0 && nextValues[0] > nextValues[1]) {
            nextValues[1] = this.max;
          }
          this._updateValue(nextValues, true);
        } else {
          this._updateValue(this.max, true);
        }
        e.preventDefault();
        return;
      }
      case 'Escape':
        this.blur();
        return;
      default:
        return;
    }

    if (delta !== 0) {
      e.preventDefault();
      const currentValues = this._getValueArray();
      const currentVal = currentValues[index] ?? this.min;
      const targetVal = this._clamp(currentVal + delta);

      if (this.mode === 'range') {
        const nextValues = [...currentValues];
        nextValues[index] = targetVal;

        if (index === 0 && nextValues[0] > nextValues[1]) {
          nextValues[0] = nextValues[1];
        } else if (index === 1 && nextValues[1] < nextValues[0]) {
          nextValues[1] = nextValues[0];
        }

        this._updateValue(nextValues, true);
      } else {
        this._updateValue(targetVal, true);
      }
    }
  };

  handleThumbFocus = (index: number, e: FocusEvent): void => {
    this.activeThumbIndex = index;
    this.dispatchEvent(new FocusEvent('focus', e));
  };

  handleThumbBlur = (index: number, e: FocusEvent): void => {
    if (this.activeThumbIndex === index) {
      this.activeThumbIndex = null;
    }
    this.dispatchEvent(new FocusEvent('blur', e));
  };

  handleThumbMouseEnter = (index: number): void => {
    if (this.showTooltip === 'hover') {
      this.activeThumbIndex = index;
    }
  };

  handleThumbMouseLeave = (_index: number): void => {
    if (this.showTooltip === 'hover' && this.shadowRoot?.activeElement === null) {
      this.activeThumbIndex = null;
    }
  };

  public clear(): void {
    if (this.disabled || this.readonly) return;
    const clearedValue = this.mode === 'range' ? [this.min, this.min] : this.min;
    this._updateValue(clearedValue, true);
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`${SliderTemplate(this)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-slider': BizSlider;
  }
}