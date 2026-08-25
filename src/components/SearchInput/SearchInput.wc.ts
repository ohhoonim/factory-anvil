import { LitElement } from 'lit';
import { customElement, property, state } from "lit/decorators.js";
import { SearchInputTemplate } from "./SearchInput";
import { searchInputStyles } from "./SearchInput.css";

/**
 * @element biz-search-input
 * 
 * @slot label-slot
 * @slot start-slot
 * @slot end-slot
 * @slot search-button-slot
 * @slot helper-text-slot
 */
@customElement('biz-search-input')
export class SearchInputWC extends LitElement {
  static styles = searchInputStyles;

  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '검색어를 입력하세요';
  @property({ type: Boolean }) clearable = true;
  @property({ type: Boolean, attribute: 'show-search-button' }) showSearchButton = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) required = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) error = false;
  @property({ type: String }) variant: 'outlined' | 'filled' | 'standard' = 'outlined';
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium';
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth = false;
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'helper-text' }) helperText = '';

  @state() private srAnnounceText = '';

  public handleInput(e: InputEvent): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  public handleChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  public handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;

    if (e.key === 'Enter') {
      this.handleSearchAction();
    } else if (e.key === 'Escape') {
      if (this.value && this.clearable && !this.readonly) {
        this.handleClear();
      }
    }
  }

  public handleClear(): void {
    if (this.disabled || this.readonly) return;
    this.value = '';
    this.srAnnounceText = '검색어가 지워졌습니다';
    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: '' },
        bubbles: true,
        composed: true,
      })
    );
  }

  public handleSearchAction(): void {
    if (this.disabled || this.readonly) return;
    this.dispatchEvent(
      new CustomEvent('search', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  public handleFocus(e: FocusEvent): void {
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: e,
        bubbles: true,
        composed: true,
      })
    );
  }

  public handleBlur(e: FocusEvent): void {
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: e,
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render() {
    return SearchInputTemplate({
      value: this.value,
      placeholder: this.placeholder,
      clearable: this.clearable,
      showSearchButton: this.showSearchButton,
      loading: this.loading,
      required: this.required,
      readonly: this.readonly,
      disabled: this.disabled,
      error: this.error,
      variant: this.variant,
      size: this.size,
      fullWidth: this.fullWidth,
      label: this.label,
      helperText: this.helperText,
      srAnnounceText: this.srAnnounceText,
      handleInput: this.handleInput.bind(this),
      handleChange: this.handleChange.bind(this),
      handleKeyDown: this.handleKeyDown.bind(this),
      handleClear: this.handleClear.bind(this),
      handleSearchAction: this.handleSearchAction.bind(this),
      handleFocus: this.handleFocus.bind(this),
      handleBlur: this.handleBlur.bind(this),
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-search-input': SearchInputWC;
  }
}