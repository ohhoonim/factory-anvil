import { customElement, property, state } from "lit/decorators.js";
import { ChipTemplate } from "./Chip";
import { LitElement } from 'lit';
import { chipStyles } from "./Chip.css";
/**
 * @element biz-chip
 * 
 * @slot label-slot
 * @slot start-slot
 * @slot chip-item-slot
 * @slot end-slot
 * @slot helper-text-slot
 */
@customElement('biz-chip')
export class BizChip extends LitElement {
  static styles = chipStyles;

  @property({ type: Array }) value: string[] = [];
  @property({ type: String }) placeholder = '';
  @property({ type: Object }) delimiter: string | string[] = ['Enter', ','];
  @property({ type: Number, attribute: 'max-chips' }) maxChips = Infinity;
  @property({ type: Boolean, attribute: 'allow-duplicates' }) allowDuplicates = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) error = false;
  @property({ type: Boolean }) deletable = true;
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';

  @state() private inputValue = '';
  @state() private isFocused = false;
  @state() private focusedChipIndex = -1;
  @state() private liveMessage = '';

  private uniqueId = `biz-chip-helper-${Math.random().toString(36).substring(2, 9)}`;

  private handleInput(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    const val = target.value;

    const delimiters = Array.isArray(this.delimiter) ? this.delimiter : [this.delimiter];
    const charDelimiter = delimiters.find((d) => d.length === 1 && val.endsWith(d));

    if (charDelimiter) {
      const newText = val.slice(0, -charDelimiter.length).trim();
      if (newText) {
        this.addChip(newText);
      } else {
        this.inputValue = '';
      }
    } else {
      this.inputValue = val;
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    const delimiters = Array.isArray(this.delimiter) ? this.delimiter : [this.delimiter];

    if (delimiters.includes(e.key)) {
      e.preventDefault();
      const text = this.inputValue.trim();
      if (text) {
        this.addChip(text);
      }
      return;
    }

    if (e.key === 'Backspace') {
      if (this.inputValue === '') {
        if (this.focusedChipIndex !== -1) {
          this.removeChip(this.focusedChipIndex);
          this.focusedChipIndex = this.value.length - 1 >= 0 ? this.value.length - 1 : -1;
        } else if (this.value.length > 0) {
          this.focusedChipIndex = this.value.length - 1;
        }
      }
      return;
    }

    if (e.key === 'ArrowLeft') {
      if (this.inputValue === '' || this.shadowRoot?.activeElement !== this.shadowRoot?.querySelector('.biz-chip__input')) {
        if (this.focusedChipIndex === -1) {
          this.focusedChipIndex = this.value.length - 1;
        } else if (this.focusedChipIndex > 0) {
          this.focusedChipIndex--;
        }
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      if (this.focusedChipIndex !== -1) {
        if (this.focusedChipIndex < this.value.length - 1) {
          this.focusedChipIndex++;
        } else {
          this.focusedChipIndex = -1;
          this.focusInput();
        }
      }
      return;
    }

    if (e.key === 'Delete') {
      if (this.focusedChipIndex !== -1) {
        this.removeChip(this.focusedChipIndex);
        if (this.focusedChipIndex >= this.value.length) {
          this.focusedChipIndex = this.value.length - 1;
        }
      }
      return;
    }

    if (this.focusedChipIndex !== -1) {
      this.focusedChipIndex = -1;
    }
  }

  private addChip(text: string) {
    if (this.value.length >= this.maxChips) {
      this.error = true;
      return;
    }

    if (!this.allowDuplicates && this.value.includes(text)) {
      this.error = true;
      return;
    }

    const newValue = [...this.value, text];
    this.value = newValue;
    this.inputValue = '';
    this.error = false;
    this.liveMessage = `${text} 칩이 추가되었습니다.`;

    this.dispatchEvent(
      new CustomEvent('chip-add', {
        bubbles: true,
        composed: true,
        detail: { addedValue: text, value: newValue },
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: newValue },
      })
    );
  }

  private removeChip(index: number) {
    if (index < 0 || index >= this.value.length) return;

    const removedValue = this.value[index];
    const newValue = this.value.filter((_, i) => i !== index);
    this.value = newValue;
    this.liveMessage = `${removedValue} 칩이 삭제되었습니다.`;

    this.dispatchEvent(
      new CustomEvent('chip-remove', {
        bubbles: true,
        composed: true,
        detail: { removedValue, index, value: newValue },
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: { value: newValue },
      })
    );
  }

  private handleFocus(e: FocusEvent) {
    this.isFocused = true;
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  private handleBlur(e: FocusEvent) {
    this.isFocused = false;
    this.focusedChipIndex = -1;
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
        relatedTarget: e.relatedTarget,
      })
    );
  }

  private handleContainerClick() {
    if (!this.disabled && !this.readonly) {
      this.focusInput();
    }
  }

  private focusInput() {
    const input = this.shadowRoot?.querySelector<HTMLInputElement>('.biz-chip__input');
    input?.focus();
  }

  render() {
    return ChipTemplate({
      value: this.value,
      placeholder: this.placeholder,
      variant: this.variant,
      size: this.size,
      disabled: this.disabled,
      readonly: this.readonly,
      required: this.required,
      error: this.error,
      deletable: this.deletable,
      focusedChipIndex: this.focusedChipIndex,
      isFocused: this.isFocused,
      inputValue: this.inputValue,
      liveMessage: this.liveMessage,
      helperTextId: this.uniqueId,
      onInput: this.handleInput.bind(this),
      onKeyDown: this.handleKeyDown.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      onRemoveChip: this.removeChip.bind(this),
      onContainerClick: this.handleContainerClick.bind(this),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-chip': BizChip;
  }
}