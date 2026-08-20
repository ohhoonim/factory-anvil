import { LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dropdownStyles } from './Dropdown.css.js';
import { DropdownTemplate, type DropdownOption } from './Dropdown.js';

/**
 * @element biz-dropdown
 * 
 * @slot tag-slot
 * @slot label-slot
 * @slot prefix-slot
 * @slot suffix-slot
 * @slot header-slot
 * @slot empty-slot
 * @slot option-slot
 * @slot footer-slot
 * @slot helper-text-wrapper
 */
@customElement('biz-dropdown')
export class BizDropdown extends LitElement {
  static styles = dropdownStyles;

  @property({ type: Object })
  value: string | number | (string | number)[] | null = null;

  @property({ type: Array })
  options: DropdownOption[] = [];

  @property({ type: String })
  mode: 'single' | 'multi' = 'single';

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

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

  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  @state()
  private isOpen = false;

  @state()
  private filterKeyword = '';

  @state()
  private activeIndex = -1;

  @state()
  private focused = false;

  private handleDocumentClick = (e: MouseEvent) => {
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.closePopover();
    }
  };

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleDocumentClick);
    super.disconnectedCallback();
  }

  private getFilteredOptions(): DropdownOption[] {
    if (this.filterable && this.filterKeyword) {
      return this.options.filter((opt) =>
        opt.label.toLowerCase().includes(this.filterKeyword.toLowerCase())
      );
    }
    return this.options;
  }

  private openPopover() {
    if (this.disabled || this.readonly || this.isOpen) return;
    this.isOpen = true;
    this.activeIndex = -1;
    this.dispatchEvent(
      new CustomEvent('open', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private closePopover() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.filterKeyword = '';
    this.activeIndex = -1;
    this.dispatchEvent(
      new CustomEvent('close', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private toggleDropdownPopover() {
    if (this.isOpen) {
      this.closePopover();
    } else {
      this.openPopover();
    }
  }

  private handleTriggerClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.toggleDropdownPopover();
  };

  private handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.readonly) return;

    const filtered = this.getFilteredOptions();

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!this.isOpen) {
          this.openPopover();
          this.activeIndex = 0;
        } else {
          this.activeIndex = (this.activeIndex + 1) % filtered.length;
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!this.isOpen) {
          this.openPopover();
          this.activeIndex = filtered.length - 1;
        } else {
          this.activeIndex = (this.activeIndex - 1 + filtered.length) % filtered.length;
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (this.isOpen && this.activeIndex >= 0 && filtered[this.activeIndex]) {
          const opt = filtered[this.activeIndex];
          if (!opt.disabled) {
            this.selectOption(opt);
          }
        } else {
          this.toggleDropdownPopover();
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
          this.mode === 'multi' &&
          this.filterable &&
          this.filterKeyword === '' &&
          Array.isArray(this.value) &&
          this.value.length > 0
        ) {
          const lastVal = this.value[this.value.length - 1];
          this.removeTag(lastVal);
        }
        break;
    }
  };

  private handleFilterInput = (e: InputEvent) => {
    const input = e.target as HTMLInputElement;
    this.filterKeyword = input.value;
    this.activeIndex = -1;
    this.dispatchEvent(
      new CustomEvent('search', {
        detail: { keyword: this.filterKeyword },
        bubbles: true,
        composed: true,
      })
    );
  };

  private handleFilterKeyDown = (e: KeyboardEvent) => {
    this.handleTriggerKeyDown(e);
  };

  private selectOption(option: DropdownOption) {
    if (option.disabled) return;

    if (this.mode === 'multi') {
      const currentValues = Array.isArray(this.value) ? [...this.value] : [];
      const index = currentValues.indexOf(option.value);
      if (index > -1) {
        currentValues.splice(index, 1);
      } else {
        currentValues.push(option.value);
      }
      this.value = currentValues;
    } else {
      this.value = option.value;
      this.closePopover();
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, selectedOption: option },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleOptionClick = (option: DropdownOption, index: number) => {
    this.activeIndex = index;
    this.selectOption(option);
  };

  private handleClearClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (this.disabled || this.readonly) return;

    this.value = this.mode === 'multi' ? [] : null;
    this.filterKeyword = '';

    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, selectedOption: null },
        bubbles: true,
        composed: true,
      })
    );
  };

  private removeTag(val: string | number) {
    if (this.disabled || this.readonly || !Array.isArray(this.value)) return;

    const newValues = this.value.filter((v) => v !== val);
    this.value = newValues;

    this.dispatchEvent(
      new CustomEvent('tag-remove', {
        detail: { removedValue: val },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value, selectedOption: null },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleTagRemove = (e: MouseEvent, val: string | number) => {
    e.stopPropagation();
    this.removeTag(val);
  };

  private handleFocus = () => {
    this.focused = true;
  };

  private handleBlur = () => {
    this.focused = false;
  };

  render(): TemplateResult {
    return DropdownTemplate({
      value: this.value,
      options: this.options,
      mode: this.mode,
      variant: this.variant,
      size: this.size,
      filterable: this.filterable,
      placeholder: this.placeholder,
      clearable: this.clearable,
      maxTagCount: this.maxTagCount,
      loading: this.loading,
      required: this.required,
      readonly: this.readonly,
      disabled: this.disabled,
      error: this.error,
      fullWidth: this.fullWidth,
      isOpen: this.isOpen,
      filterKeyword: this.filterKeyword,
      activeIndex: this.activeIndex,
      focused: this.focused,
      onTriggerClick: this.handleTriggerClick,
      onTriggerKeyDown: this.handleTriggerKeyDown,
      onFilterInput: this.handleFilterInput,
      onFilterKeyDown: this.handleFilterKeyDown,
      onOptionClick: this.handleOptionClick,
      onClearClick: this.handleClearClick,
      onTagRemove: this.handleTagRemove,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-dropdown': BizDropdown;
  }
}