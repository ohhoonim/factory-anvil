import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SearchInputTemplate, type SearchInputHost } from './SearchInput.js';
import { searchInputStyles } from './SearchInput.css.js';

@customElement('biz-search-input')
export class BizSearchInput extends LitElement implements SearchInputHost {
  static override styles = searchInputStyles;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '검색어를 입력하세요';

  @property({ type: Boolean })
  clearable = true;

  @property({ type: Boolean, attribute: 'show-search-button' })
  showSearchButton = false;

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

  @property({ type: String })
  variant: 'outlined' | 'filled' | 'standard' = 'outlined';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: Boolean, attribute: 'full-width' })
  fullWidth = false;

  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  handleInput(e: InputEvent): void {
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

  handleChange(e: Event): void {
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

  handleKeyDown(e: KeyboardEvent): void {
    if (this.disabled) return;

    if (e.key === 'Enter') {
      this.handleSearch();
    } else if (e.key === 'Escape' && this.value.length > 0) {
      this.handleClear();
    }
  }

  handleClear(): void {
    if (this.disabled || this.readonly) return;
    this.value = '';
    
    this.dispatchEvent(
      new CustomEvent('input', {
        detail: { value: '' },
        bubbles: true,
        composed: true,
      })
    );

    this.dispatchEvent(
      new CustomEvent('clear', {
        bubbles: true,
        composed: true,
      })
    );
  }

  handleSearch(): void {
    if (this.disabled || this.readonly) return;
    this.dispatchEvent(
      new CustomEvent('search', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  handleFocus(e: FocusEvent): void {
    this.dispatchEvent(
      new CustomEvent('focus', {
        detail: e,
        bubbles: true,
        composed: true,
      })
    );
  }

  handleBlur(e: FocusEvent): void {
    this.dispatchEvent(
      new CustomEvent('blur', {
        detail: e,
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return SearchInputTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-search-input': BizSearchInput;
  }
}