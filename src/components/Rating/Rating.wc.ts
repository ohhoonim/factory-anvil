import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ratingStyles } from './Rating.css';
import { RatingTemplate } from './Rating';

@customElement('biz-rating')
export class BizRating extends LitElement {
  static styles = ratingStyles;

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
  private hoverValue: number | null = null;

  @state()
  private focused = false;

  private calculateValueFromEvent(e: MouseEvent, index: number): number {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    let targetValue = index + 1;

    if (this.precision < 1) {
      const ratio = x / width;
      const steppedRatio = Math.ceil(ratio / this.precision) * this.precision;
      targetValue = index + steppedRatio;
    }

    return Math.min(Math.max(targetValue, 0), this.max);
  }

  private handleItemMouseMove(e: MouseEvent, index: number): void {
    if (this.disabled || this.readonly) return;
    const nextHoverValue = this.calculateValueFromEvent(e, index);
    if (this.hoverValue !== nextHoverValue) {
      this.hoverValue = nextHoverValue;
      this.dispatchEvent(
        new CustomEvent('hover-change', {
          detail: { value: this.hoverValue },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private handleItemMouseLeave(): void {
    if (this.disabled || this.readonly) return;
    if (this.hoverValue !== null) {
      this.hoverValue = null;
      this.dispatchEvent(
        new CustomEvent('hover-change', {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private handleItemClick(e: MouseEvent, index: number): void {
    if (this.disabled || this.readonly) return;
    const selectedValue = this.calculateValueFromEvent(e, index);
    this.setValue(selectedValue);
  }

  private setValue(newValue: number): void {
    if (this.allowClear && this.value === newValue) {
      this.value = 0;
      this.dispatchEvent(
        new CustomEvent('clear', {
          bubbles: true,
          composed: true,
        })
      );
    } else {
      this.value = newValue;
    }

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    const step = this.precision || 1;
    let handled = false;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        this.setValue(Math.min(this.max, this.value + step));
        handled = true;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        this.setValue(Math.max(0, this.value - step));
        handled = true;
        break;
      case 'Home':
        this.setValue(0);
        handled = true;
        break;
      case 'End':
        this.setValue(this.max);
        handled = true;
        break;
      case 'Escape':
        this.hoverValue = null;
        handled = true;
        break;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private handleFocus(): void {
    if (this.disabled) return;
    this.focused = true;
  }

  private handleBlur(): void {
    this.focused = false;
    this.hoverValue = null;
  }

  render() {
    return RatingTemplate({
      value: this.value,
      max: this.max,
      precision: this.precision,
      allowClear: this.allowClear,
      readonly: this.readonly,
      disabled: this.disabled,
      showTooltip: this.showTooltip,
      size: this.size,
      name: this.name,
      hoverValue: this.hoverValue,
      focused: this.focused,
      onItemMouseMove: this.handleItemMouseMove.bind(this),
      onItemMouseLeave: this.handleItemMouseLeave.bind(this),
      onItemClick: this.handleItemClick.bind(this),
      onKeyDown: this.handleKeyDown.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-rating': BizRating;
  }
}