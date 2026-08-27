import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ratingStyles } from './Rating.css.js';
import { RatingTemplate, type RatingHost } from './Rating.js';

@customElement('biz-rating')
export class BizRating extends LitElement implements RatingHost {
  static override styles = ratingStyles;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  max = 5;

  @property({ type: Number })
  precision = 1;

  @property({ type: Boolean, attribute: 'allow-clear' })
  allowClear = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: 'show-tooltip' })
  showTooltip = false;

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' = 'md';

  @property({ type: String })
  name: string | null = null;

  @state()
  hoverValue: number | null = null;

  private calculateValueFromEvent(event: MouseEvent, index: number): number {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const isHalf = x < width / 2;

    let calculatedValue = index + 1;

    if (this.precision === 0.5 && isHalf) {
      calculatedValue -= 0.5;
    } else if (this.precision < 1 && this.precision > 0) {
      const ratio = x / width;
      const roundedRatio = Math.ceil(ratio / this.precision) * this.precision;
      calculatedValue = index + Math.min(Math.max(roundedRatio, this.precision), 1);
    }

    return parseFloat(calculatedValue.toFixed(2));
  }

  handleMouseMove(event: MouseEvent, index: number): void {
    if (this.disabled || this.readonly) return;

    const nextHoverValue = this.calculateValueFromEvent(event, index);
    if (this.hoverValue !== nextHoverValue) {
      this.hoverValue = nextHoverValue;
      this.dispatchEvent(
        new CustomEvent('hover-change', {
          bubbles: true,
          composed: true,
          detail: { value: this.hoverValue },
        })
      );
    }
  }

  handleMouseLeave(): void {
    if (this.disabled || this.readonly) return;

    if (this.hoverValue !== null) {
      this.hoverValue = null;
      this.dispatchEvent(
        new CustomEvent('hover-change', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        })
      );
    }
  }

  handleClick(event: MouseEvent, index: number): void {
    if (this.disabled || this.readonly) return;

    const selectedValue = this.calculateValueFromEvent(event, index);

    if (this.allowClear && this.value === selectedValue) {
      this.value = 0;
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
          detail: { value: 0 },
        })
      );
      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: 0 },
        })
      );
      return;
    }

    this.value = selectedValue;
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    const step = this.precision > 0 ? this.precision : 1;
    let newValue = this.value;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        newValue = Math.min(this.max, parseFloat((this.value + step).toFixed(2)));
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        newValue = Math.max(0, parseFloat((this.value - step).toFixed(2)));
        break;
      case 'Home':
        event.preventDefault();
        newValue = 0;
        break;
      case 'End':
        event.preventDefault();
        newValue = this.max;
        break;
      default:
        return;
    }

    if (newValue !== this.value) {
      if (this.allowClear && newValue === 0) {
        this.value = 0;
        this.dispatchEvent(
          new CustomEvent('clear', {
            bubbles: true,
            composed: true,
            detail: { value: 0 },
          })
        );
      } else {
        this.value = newValue;
      }

      this.dispatchEvent(
        new CustomEvent('change', {
          bubbles: true,
          composed: true,
          detail: { value: this.value },
        })
      );
    }
  }

  override render() {
    return RatingTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-rating': BizRating;
  }
}