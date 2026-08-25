import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from "lit/decorators.js";
import { IpAddressInputTemplate } from "./IpAddressInput";
import { ipAddressInputStyles } from "./IpAddressInput.css";

/**
 * @element biz-ip-address-input
 * 
 * @slot separator-slot
 * @slot label-slot
 * @slot prefix-slot
 * @slot suffix-slot
 * @slot helper-text-slot
 * 
 */
@customElement('biz-ip-address-input')
export class BizIpAddressInput extends LitElement {
  static styles = ipAddressInputStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) type: 'ipv4' | 'ipv6' = 'ipv4';
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'auto-focus-next' }) autoFocusNext = true;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false;
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  @state() private segments: string[] = [];

  private isFocused = false;

  connectedCallback() {
    super.connectedCallback();
    this.updateSegmentsFromValue();
  }

  willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('value') || changedProperties.has('type')) {
      this.updateSegmentsFromValue();
    }
  }

  private updateSegmentsFromValue() {
    const segmentCount = this.type === 'ipv6' ? 8 : 4;
    const separator = this.type === 'ipv6' ? ':' : '.';
    
    if (this.value) {
      const splitValues = this.value.split(separator);
      this.segments = Array.from({ length: segmentCount }, (_, i) => splitValues[i] || '');
    } else {
      this.segments = Array.from({ length: segmentCount }, () => '');
    }
  }

  private updateValueFromSegments() {
    const separator = this.type === 'ipv6' ? ':' : '.';
    this.value = this.segments.join(separator);
  }

  private handleSegmentInput = (index: number, event: InputEvent) => {
    if (this.disabled || this.readonly) return;

    const inputEl = event.target as HTMLInputElement;
    let inputValue = inputEl.value;

    if (this.type === 'ipv4') {
      inputValue = inputValue.replace(/[^0-9]/g, '');
      if (inputValue !== '') {
        const num = parseInt(inputValue, 10);
        if (num > 255) {
          inputValue = '255';
        }
      }
    } else {
      inputValue = inputValue.replace(/[^0-9a-fA-F]/g, '');
    }

    inputEl.value = inputValue;
    const newSegments = [...this.segments];
    newSegments[index] = inputValue;
    this.segments = newSegments;
    this.updateValueFromSegments();

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value, segments: [...this.segments] },
        bubbles: true,
        composed: true,
      })
    );

    const maxLength = this.type === 'ipv6' ? 4 : 3;
    if (this.autoFocusNext && inputValue.length === maxLength && index < this.segments.length - 1) {
      this.focusSegment(index + 1);
    }
  };

  private handleSegmentKeyDown = (index: number, event: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    const inputEl = event.target as HTMLInputElement;
    const separator = this.type === 'ipv6' ? ':' : '.';

    if (event.key === separator || (event.key === 'Dot' || event.key === 'Decimal') || (this.type === 'ipv4' && event.key === '.')) {
      event.preventDefault();
      if (this.autoFocusNext && index < this.segments.length - 1) {
        this.focusSegment(index + 1);
      }
      return;
    }

    if (event.key === 'ArrowRight') {
      if (inputEl.selectionStart === inputEl.value.length && index < this.segments.length - 1) {
        event.preventDefault();
        this.focusSegment(index + 1, 'start');
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      if (inputEl.selectionStart === 0 && index > 0) {
        event.preventDefault();
        this.focusSegment(index - 1, 'end');
      }
      return;
    }

    if (event.key === 'Backspace') {
      if (inputEl.value === '' && index > 0) {
        event.preventDefault();
        const prevInput = this.getSegmentInput(index - 1);
        if (prevInput) {
          prevInput.focus();
          const prevVal = prevInput.value;
          if (prevVal.length > 0) {
            const updatedVal = prevVal.slice(0, -1);
            prevInput.value = updatedVal;
            const newSegments = [...this.segments];
            newSegments[index - 1] = updatedVal;
            this.segments = newSegments;
            this.updateValueFromSegments();

            this.dispatchEvent(
              new CustomEvent('input', {
                detail: { value: this.value, segments: [...this.segments] },
                bubbles: true,
                composed: true,
              })
            );
          }
        }
      }
    }
  };

  private handleSegmentPaste = (index: number, event: ClipboardEvent) => {
    if (this.disabled || this.readonly) return;

    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text') || '';
    const separator = this.type === 'ipv6' ? ':' : '.';
    
    const parsedSegments = clipboardData
      .trim()
      .split(separator)
      .map((seg) => {
        if (this.type === 'ipv4') {
          const clean = seg.replace(/[^0-9]/g, '').slice(0, 3);
          if (!clean) return '';
          const num = parseInt(clean, 10);
          return num > 255 ? '255' : clean;
        } else {
          return seg.replace(/[^0-9a-fA-F]/g, '').slice(0, 4);
        }
      });

    const newSegments = [...this.segments];
    let lastFilledIndex = index;

    for (let i = 0; i < parsedSegments.length; i++) {
      const targetIndex = index + i;
      if (targetIndex < newSegments.length) {
        newSegments[targetIndex] = parsedSegments[i];
        lastFilledIndex = targetIndex;
      }
    }

    this.segments = newSegments;
    this.updateValueFromSegments();

    this.dispatchEvent(
      new CustomEvent('paste', {
        detail: { pastedValue: clipboardData, parsedSegments: [...this.segments] },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value, segments: [...this.segments] },
        bubbles: true,
        composed: true,
      })
    );

    this.focusSegment(lastFilledIndex, 'end');
  };

  private handleSegmentFocus = (index: number, event: FocusEvent) => {
    if (!this.isFocused) {
      this.isFocused = true;
      this.dispatchEvent(
        new CustomEvent('focus', {
          detail: event,
          bubbles: true,
          composed: true,
        })
      );
    }
  };

  private handleSegmentBlur = (_index: number, event: FocusEvent) => {
    requestAnimationFrame(() => {
      const activeElement = this.shadowRoot?.activeElement;
      const isStillFocused = activeElement && activeElement.classList.contains('biz-ip-address-input__segment');

      if (!isStillFocused) {
        this.isFocused = false;
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: { value: this.value, segments: [...this.segments] },
            bubbles: true,
            composed: true,
          })
        );
        this.dispatchEvent(
          new CustomEvent('blur', {
            detail: event,
            bubbles: true,
            composed: true,
          })
        );
      }
    });
  };

  public clear() {
    this.segments = this.segments.map(() => '');
    this.updateValueFromSegments();

    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value, segments: [...this.segments] },
        bubbles: true,
        composed: true,
      })
    );
  }

  private getSegmentInput(index: number): HTMLInputElement | null {
    return this.shadowRoot?.querySelector(`input[data-index="${index}"]`) || null;
  }

  private focusSegment(index: number, cursorPosition?: 'start' | 'end') {
    const input = this.getSegmentInput(index);
    if (input) {
      input.focus();
      if (cursorPosition === 'start') {
        input.setSelectionRange(0, 0);
      } else if (cursorPosition === 'end') {
        const len = input.value.length;
        input.setSelectionRange(len, len);
      }
    }
  }

  render() {
    return IpAddressInputTemplate({
      value: this.value,
      type: this.type,
      variant: this.variant,
      size: this.size,
      autoFocusNext: this.autoFocusNext,
      required: this.required,
      readonly: this.readonly,
      disabled: this.disabled,
      error: this.error,
      fullWidth: this.fullWidth,
      segments: this.segments,
      helperText: this.helperText,
      label: this.label,
      onSegmentInput: this.handleSegmentInput,
      onSegmentKeyDown: this.handleSegmentKeyDown,
      onSegmentPaste: this.handleSegmentPaste,
      onSegmentFocus: this.handleSegmentFocus,
      onSegmentBlur: this.handleSegmentBlur,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-ip-address-input': BizIpAddressInput;
  }
}