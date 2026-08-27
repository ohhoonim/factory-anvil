import { html, type TemplateResult } from 'lit';

export interface SearchInputHost {
  value: string;
  placeholder: string;
  clearable: boolean;
  showSearchButton: boolean;
  loading: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  helperText: string;
  handleInput: (e: InputEvent) => void;
  handleChange: (e: Event) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleClear: () => void;
  handleSearch: () => void;
  handleFocus: (e: FocusEvent) => void;
  handleBlur: (e: FocusEvent) => void;
}

export const SearchInputTemplate = (host: SearchInputHost): TemplateResult => {
  const isClearVisible = host.clearable && !host.disabled && !host.readonly && host.value.length > 0;
  const isSearchBtnVisible = host.showSearchButton && !host.disabled;

  return html`
    <div
      class="biz-search-input"
      ?data-disabled="${host.disabled}"
      ?data-readonly="${host.readonly}"
      ?data-error="${host.error}"
      ?data-loading="${host.loading}"
      ?data-full-width="${host.fullWidth}"
      data-variant="${host.variant || 'outlined'}"
      data-size="${host.size || 'medium'}"
    >
      <div class="biz-search-input__label-container">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-search-input__field-container">
        <div class="biz-search-input__start-slot">
          <slot name="start-slot">
            ${host.loading
              ? html`
                  <span class="biz-search-input__spinner" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
                      <path d="M12 2 a10 10 0 0 1 10 10" />
                    </svg>
                  </span>
                `
              : html`
                  <span class="biz-search-input__default-search-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                `}
          </slot>
        </div>

        <input
          id="search-input-control"
          class="biz-search-input__control"
          type="search"
          role="searchbox"
          .value="${host.value}"
          placeholder="${host.placeholder}"
          ?disabled="${host.disabled}"
          ?readonly="${host.readonly}"
          ?required="${host.required}"
          aria-invalid="${host.error ? 'true' : 'false'}"
          aria-required="${host.required ? 'true' : 'false'}"
          aria-busy="${host.loading ? 'true' : 'false'}"
          aria-describedby="helper-text-area"
          @input="${host.handleInput}"
          @change="${host.handleChange}"
          @keydown="${host.handleKeyDown}"
          @focus="${host.handleFocus}"
          @blur="${host.handleBlur}"
        />

        <div class="biz-search-input__end-slot">
          ${isClearVisible
            ? html`
                <button
                  type="button"
                  class="biz-search-input__clear-btn"
                  aria-label="검색어 삭제"
                  @click="${host.handleClear}"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              `
            : ''}
          <slot name="end-slot"></slot>
          ${isSearchBtnVisible
            ? html`
                <slot name="search-button-slot">
                  <button
                    type="button"
                    class="biz-search-input__search-action-btn"
                    aria-label="검색 실행"
                    ?disabled="${host.disabled || host.readonly}"
                    @click="${host.handleSearch}"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </slot>
              `
            : ''}
        </div>
      </div>

      <div id="helper-text-area" class="biz-search-input__helper-area">
        <slot name="helper-text-slot">
          ${host.helperText
            ? html`<span class="biz-search-input__helper-text">${host.helperText}</span>`
            : ''}
        </slot>
      </div>
    </div>
  `;
};