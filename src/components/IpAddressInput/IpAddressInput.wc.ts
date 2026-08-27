import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ipAddressInputStyles } from './IpAddressInput.css.js';
import { IpAddressInputTemplate, type IpAddressInputHost } from './IpAddressInput.js';

@customElement('biz-ip-address-input')
export class BizIpAddressInput extends LitElement implements IpAddressInputHost {
  static styles = ipAddressInputStyles;

  @property({ type: String })
  type: 'ipv4' | 'ipv6' = 'ipv4';

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String })
  value = '';

  @property({ type: Boolean, attribute: 'auto-focus-next' })
  autoFocusNext = true;

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  error = false;

  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  @state()
  segments: string[] = [];

  @state()
  activeSegmentIndex = -1;

  private initialValue = '';

  constructor() {
    super();
    this.segments = this.getSegmentCount() === 8 ? Array(8).fill('') : Array(4).fill('');
  }

  willUpdate(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('type')) {
      const targetLength = this.getSegmentCount();
      if (this.segments.length !== targetLength) {
        this.segments = Array(targetLength).fill('');
        this.syncValueFromSegments();
      }
    }

    if (changedProperties.has('value')) {
      this.syncSegmentsFromValue();
    }
  }

  private getSegmentCount(): number {
    return this.type === 'ipv6' ? 8 : 4;
  }

  private getSeparator(): string {
    return this.type === 'ipv6' ? ':' : '.';
  }

  private syncSegmentsFromValue(): void {
    const separator = this.getSeparator();
    const parsed = this.value ? this.value.split(separator) : [];
    const count = this.getSegmentCount();
    const newSegments = Array(count).fill('');

    for (let i = 0; i < count; i++) {
      newSegments[i] = parsed[i] || '';
    }
    this.segments = newSegments;
  }

  private syncValueFromSegments(): void {
    const separator = this.getSeparator();
    this.value = this.segments.join(separator);
  }

  private getInputs(): HTMLInputElement[] {
    return Array.from(this.shadowRoot?.querySelectorAll('.biz-ip-address-input__segment') || []);
  }

  private focusSegment(index: number): void {
    const inputs = this.getInputs();
    if (inputs[index]) {
      inputs[index].focus();
      inputs[index].select();
    }
  }

  handleSegmentInput(event: InputEvent, index: number): void {
    const inputEl = event.target as HTMLInputElement;
    let val = inputEl.value;

    if (this.type === 'ipv4') {
      val = val.replace(/[^0-9]/g, '');
      if (val !== '' && Number(val) > 255) {
        val = '255';
      }
    } else {
      val = val.replace(/[^0-9a-fA-F]/g, '');
    }

    const nextSegments = [...this.segments];
    nextSegments[index] = val;
    this.segments = nextSegments;
    this.syncValueFromSegments();

    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value, segments: [...this.segments] },
        bubbles: true,
        composed: true,
      })
    );

    if (this.autoFocusNext) {
      const maxLength = this.type === 'ipv6' ? 4 : 3;
      if (val.length >= maxLength && index < this.getSegmentCount() - 1) {
        this.focusSegment(index + 1);
      }
    }
  }

  handleSegmentKeyDown(event: KeyboardEvent, index: number): void {
    const inputEl = event.target as HTMLInputElement;
    const separator = this.getSeparator();

    if (event.key === separator) {
      event.preventDefault();
      if (this.autoFocusNext && index < this.getSegmentCount() - 1) {
        this.focusSegment(index + 1);
      }
      return;
    }

    if (event.key === 'ArrowRight') {
      if (inputEl.selectionEnd === inputEl.value.length && index < this.getSegmentCount() - 1) {
        event.preventDefault();
        this.focusSegment(index + 1);
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      if (inputEl.selectionStart === 0 && index > 0) {
        event.preventDefault();
        this.focusSegment(index - 1);
      }
      return;
    }

    if (event.key === 'Backspace') {
      if (inputEl.value === '' && index > 0) {
        event.preventDefault();
        const prevIndex = index - 1;
        const nextSegments = [...this.segments];
        const prevVal = nextSegments[prevIndex];
        if (prevVal.length > 0) {
          nextSegments[prevIndex] = prevVal.slice(0, -1);
          this.segments = nextSegments;
          this.syncValueFromSegments();
        }
        this.focusSegment(prevIndex);
      }
    }
  }

  handleSegmentPaste(event: ClipboardEvent, index: number): void {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text') || '';
    if (!clipboardData) return;

    const separator = this.getSeparator();
    const pastedParts = clipboardData.split(separator);
    const count = this.getSegmentCount();
    const nextSegments = [...this.segments];

    let targetIdx = index;
    for (let i = 0; i < pastedParts.length && targetIdx < count; i++) {
      let part = pastedParts[i].trim();
      if (this.type === 'ipv4') {
        part = part.replace(/[^0-9]/g, '');
        if (part !== '' && Number(part) > 255) {
          part = '255';
        }
      } else {
        part = part.replace(/[^0-9a-fA-F]/g, '');
        part = part.slice(0, 4);
      }
      nextSegments[targetIdx] = part;
      targetIdx++;
    }

    this.segments = nextSegments;
    this.syncValueFromSegments();

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

    const nextFocusIdx = Math.min(targetIdx, count - 1);
    this.focusSegment(nextFocusIdx);
  }

  handleSegmentFocus(event: FocusEvent, index: number): void {
    if (this.activeSegmentIndex === -1) {
      this.initialValue = this.value;
      this.dispatchEvent(
        new CustomEvent('focus', {
          detail: event,
          bubbles: true,
          composed: true,
        })
      );
    }
    this.activeSegmentIndex = index;
  }

  handleContainerBlur(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as Node | null;
    if (relatedTarget && this.shadowRoot?.contains(relatedTarget)) {
      return;
    }

    this.activeSegmentIndex = -1;

    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    );

    if (this.value !== this.initialValue) {
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value, segments: [...this.segments] },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return IpAddressInputTemplate(this);
  }
}