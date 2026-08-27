import { LitElement, type TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type { ChipHost } from './Chip.js';
import { ChipTemplate } from './Chip.js';
import { chipStyles } from './Chip.css.js';

@customElement('biz-chip')
export class BizChip extends LitElement implements ChipHost {
  static styles = chipStyles;

  @property({ type: Array }) value: string[] = [];
  @property({ type: String }) placeholder: string = '';
  @property({ attribute: false }) delimiter: string | string[] = ['Enter', ','];
  @property({ type: Number, attribute: 'max-chips' }) maxChips: number = Infinity;
  @property({ type: Boolean, attribute: 'allow-duplicates' }) allowDuplicates: boolean = false;
  @property({ type: Boolean, reflect: true }) required: boolean = false;
  @property({ type: Boolean, reflect: true }) readonly: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) error: boolean = false;
  @property({ type: Boolean, reflect: true }) deletable: boolean = true;
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth: boolean = false;

  @state() inputValue: string = '';
  @state() focusedChipIndex: number = -1;
  @state() liveMessage: string = '';
  @state() helperTextId: string = `biz-chip-helper-${Math.random().toString(36).substring(2, 9)}`;

  @query('.biz-chip__input') private inputElement?: HTMLInputElement;
  @query('.biz-chip__container') private containerElement?: HTMLDivElement;

  private isDelimitKey(key: string): boolean {
    if (Array.isArray(this.delimiter)) {
      return this.delimiter.includes(key);
    }
    return this.delimiter === key;
  }

  private dispatchChangeEvent(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: [...this.value] },
        bubbles: true,
        composed: true,
      })
    );
  }

  private addChip(rawText: string): void {
    const text = rawText.trim();
    if (!text) return;
    if (this.value.length >= this.maxChips) return;
    if (!this.allowDuplicates && this.value.includes(text)) return;

    const newValue = [...this.value, text];
    this.value = newValue;
    this.inputValue = '';
    
    this.dispatchEvent(
      new CustomEvent('chip-add', {
        detail: { addedValue: text, value: [...newValue] },
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchChangeEvent();
    this.liveMessage = `${text} 칩이 추가되었습니다.`;
  }

  private removeChipAtIndex(index: number): void {
    if (index < 0 || index >= this.value.length) return;
    const removedValue = this.value[index];
    const newValue = this.value.filter((_, i) => i !== index);
    this.value = newValue;

    this.dispatchEvent(
      new CustomEvent('chip-remove', {
        detail: { removedValue, index, value: [...newValue] },
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchChangeEvent();
    this.liveMessage = `${removedValue} 칩이 삭제되었습니다.`;

    if (this.value.length === 0) {
      this.focusedChipIndex = -1;
      this.inputElement?.focus();
    } else if (this.focusedChipIndex >= this.value.length) {
      this.focusedChipIndex = this.value.length - 1;
    }
  }

  public clear(): void {
    if (this.readonly || this.disabled) return;
    this.value = [];
    this.inputValue = '';
    this.focusedChipIndex = -1;
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchChangeEvent();
  }

  handleContainerClick(): void {
    if (this.disabled) return;
    if (this.focusedChipIndex === -1) {
      this.inputElement?.focus();
    }
  }

  handleInputInput(inputEl: HTMLInputElement): void {
    const currentValue = inputEl.value;

    if (typeof this.delimiter === 'string' && this.delimiter !== 'Enter') {
      if (currentValue.includes(this.delimiter)) {
        const parts = currentValue.split(this.delimiter);
        parts.forEach((part, idx) => {
          if (idx < parts.length - 1) {
            this.addChip(part);
          } else {
            this.inputValue = part;
          }
        });
        return;
      }
    } else if (Array.isArray(this.delimiter)) {
      const charDelimiters = this.delimiter.filter((d) => d.length === 1);
      for (const char of charDelimiters) {
        if (currentValue.includes(char)) {
          const parts = currentValue.split(char);
          parts.forEach((part, idx) => {
            if (idx < parts.length - 1) {
              this.addChip(part);
            } else {
              this.inputValue = part;
            }
          });
          return;
        }
      }
    }

    this.inputValue = currentValue;
  }

  handleInputKeydown(e: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;

    if (this.isDelimitKey(e.key)) {
      e.preventDefault();
      this.addChip(this.inputValue);
      return;
    }

    if (e.key === 'Backspace' && this.inputValue === '') {
      if (this.value.length > 0) {
        e.preventDefault();
        this.focusedChipIndex = this.value.length - 1;
        this.focusChipItem(this.focusedChipIndex);
      }
      return;
    }

    if (e.key === 'ArrowLeft' && this.inputValue === '') {
      if (this.value.length > 0) {
        e.preventDefault();
        this.focusedChipIndex = this.value.length - 1;
        this.focusChipItem(this.focusedChipIndex);
      }
    }
  }

  handleInputFocus(e: FocusEvent): void {
    this.focusedChipIndex = -1;
    this.dispatchEvent(
      new FocusEvent('focus', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleInputBlur(e: FocusEvent): void {
    this.dispatchEvent(
      new FocusEvent('blur', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleChipClick(index: number): void {
    if (this.disabled) return;
    this.focusedChipIndex = index;
  }

  handleChipKeydown(e: KeyboardEvent, index: number): void {
    if (this.disabled) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) {
        this.focusedChipIndex = index - 1;
        this.focusChipItem(this.focusedChipIndex);
      }
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < this.value.length - 1) {
        this.focusedChipIndex = index + 1;
        this.focusChipItem(this.focusedChipIndex);
      } else {
        this.focusedChipIndex = -1;
        this.inputElement?.focus();
      }
    } else if ((e.key === 'Delete' || e.key === 'Backspace') && !this.readonly) {
      e.preventDefault();
      this.removeChipAtIndex(index);
      if (this.focusedChipIndex !== -1) {
        this.focusChipItem(this.focusedChipIndex);
      }
    } else if (e.key === 'Escape') {
      this.focusedChipIndex = -1;
      this.inputElement?.focus();
    }
  }

  handleRemoveChip(e: Event, index: number): void {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.removeChipAtIndex(index);
  }

  private focusChipItem(index: number): void {
    this.updateComplete.then(() => {
      const chipItems = this.shadowRoot?.querySelectorAll('.biz-chip__item');
      if (chipItems && chipItems[index]) {
        (chipItems[index] as HTMLElement).focus();
      }
    });
  }

  render(): TemplateResult {
    return ChipTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-chip': BizChip;
  }
}