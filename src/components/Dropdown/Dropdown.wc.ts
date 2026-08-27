import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dropdownStyles } from './Dropdown.css.ts';
import { DropdownTemplate, type DropdownOption } from './Dropdown.ts';
import type { DropdownHost } from './Dropdown.ts';

@customElement('biz-dropdown')
export class BizDropdown extends LitElement implements DropdownHost {
  static styles = dropdownStyles;

  @property({ type: Object })
  value: any = null;

  @property({ type: Array })
  options: DropdownOption[] = [];

  @property({ type: String })
  mode: 'single' | 'multi' = 'single';

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String, attribute: 'label-placement' })
  labelPlacement: 'vertical' | 'horizontal' = 'vertical';

  @property({ type: Boolean })
  filterable = false;

  @property({ type: String })
  placeholder = '선택하세요';

  @property({ type: Boolean })
  clearable = false;

  @property({ type: Number, attribute: 'max-tag-count' })
  maxTagCount?: number;

  @property({ type: Boolean })
  loading = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  disabled = false;

  @property({ type: Boolean })
  error = false;

  @state()
  isOpen = false;

  @state()
  focusedOptionIndex = -1;

  @state()
  searchKeyword = '';

  @state()
  hasLabelSlot = false;

  private _outsideClickListener = (e: MouseEvent) => {
    if (!this.contains(e.target as Node)) {
      this.closePopover();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._outsideClickListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideClickListener);
  }

  getOptionId(index: number): string {
    return `biz-dropdown-option-${index}`;
  }

  getFilteredOptions(): DropdownOption[] {
    if (!this.filterable || !this.searchKeyword) {
      return this.options;
    }
    return this.options.filter((opt) =>
      opt.label.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }

  handleLabelSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const assignedNodes = slot.assignedNodes({ flatten: true });
    this.hasLabelSlot = assignedNodes.some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return Boolean(node.textContent?.trim());
      }
      return true;
    });
  }

  openPopover() {
    if (this.disabled || this.readonly || this.isOpen) return;
    this.isOpen = true;
    this.focusedOptionIndex = -1;
    this.dispatchEvent(
      new CustomEvent('open', { bubbles: true, composed: true })
    );
  }

  closePopover() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.focusedOptionIndex = -1;
    this.searchKeyword = '';
    this.dispatchEvent(
      new CustomEvent('close', { bubbles: true, composed: true })
    );
  }

  toggleDropdownPopover() {
    if (this.isOpen) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  handleTriggerClick(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.toggleDropdownPopover();
  }

  handleInputClick(e: MouseEvent) {
    e.stopPropagation();
    if (!this.isOpen) {
      this.openPopover();
    }
  }

  handleTriggerKeyDown(e: KeyboardEvent) {
    if (this.disabled || this.readonly) return;

    const filteredOptions = this.getFilteredOptions();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.openPopover();
          this.focusedOptionIndex = filteredOptions.length > 0 ? 0 : -1;
        } else {
          if (filteredOptions.length > 0) {
            this.focusedOptionIndex =
              (this.focusedOptionIndex + 1) % filteredOptions.length;
          }
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!this.isOpen) {
          this.openPopover();
          this.focusedOptionIndex =
            filteredOptions.length > 0 ? filteredOptions.length - 1 : -1;
        } else {
          if (filteredOptions.length > 0) {
            this.focusedOptionIndex =
              (this.focusedOptionIndex - 1 + filteredOptions.length) %
              filteredOptions.length;
          }
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (this.isOpen) {
          if (
            this.focusedOptionIndex >= 0 &&
            this.focusedOptionIndex < filteredOptions.length
          ) {
            const selectedOpt = filteredOptions[this.focusedOptionIndex];
            if (!selectedOpt.disabled) {
              this.selectOption(selectedOpt);
            }
          }
        } else {
          this.openPopover();
        }
        break;

      case 'Escape':
        e.preventDefault();
        this.closePopover();
        break;

      case 'Tab':
        this.closePopover();
        break;

      case 'Backspace':
        if (
          this.filterable &&
          this.mode === 'multi' &&
          this.searchKeyword === '' &&
          Array.isArray(this.value) &&
          this.value.length > 0
        ) {
          const lastValue = this.value[this.value.length - 1];
          this.handleTagRemove(lastValue, e as any);
        }
        break;
    }
  }

  handleOptionClick(option: DropdownOption, e: MouseEvent) {
    e.stopPropagation();
    if (option.disabled) return;
    this.selectOption(option);
  }

  selectOption(option: DropdownOption) {
    if (this.mode === 'single') {
      this.value = option.value;
      this.closePopover();
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value, selectedOption: option },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.indexOf(option.value);
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(option.value);
      }
      this.value = currentValues;
      const selectedOptions = this.options.filter((o) =>
        currentValues.includes(o.value)
      );
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value, selectedOption: selectedOptions },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  handleClearClick(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.value = this.mode === 'multi' ? [] : null;
    this.searchKeyword = '';
    this.dispatchEvent(
      new CustomEvent('clear', { bubbles: true, composed: true })
    );
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: this.value,
          selectedOption: this.mode === 'multi' ? [] : null,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleTagRemove(optionValue: any, e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    if (Array.isArray(this.value)) {
      this.value = this.value.filter((v: any) => v !== optionValue);
      const selectedOptions = this.options.filter((o) =>
        this.value.includes(o.value)
      );
      this.dispatchEvent(
        new CustomEvent('tag-remove', {
          detail: { removedValue: optionValue },
          bubbles: true,
          composed: true,
        })
      );
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: { value: this.value, selectedOption: selectedOptions },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  handleFilterInput(e: InputEvent) {
    e.stopPropagation();
    const target = e.target as HTMLInputElement;
    this.searchKeyword = target.value;
    this.focusedOptionIndex = -1;
    this.dispatchEvent(
      new CustomEvent('search', {
        detail: { keyword: this.searchKeyword },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return DropdownTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-dropdown': BizDropdown;
  }
}