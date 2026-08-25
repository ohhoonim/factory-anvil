import { html } from 'lit';
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";

export interface SearchInputContext {
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
  label?: string;
  helperText?: string;
  srAnnounceText: string;
  handleInput: (e: InputEvent) => void;
  handleChange: (e: Event) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleClear: (e: MouseEvent) => void;
  handleSearchAction: (e: MouseEvent) => void;
  handleFocus: (e: FocusEvent) => void;
  handleBlur: (e: FocusEvent) => void;
}

export const SearchInputTemplate = (context: SearchInputContext) => {
  const isClearVisible = context.clearable && !context.disabled && !context.readonly && Boolean(context.value);
  const isSearchBtnVisible = context.showSearchButton;

  return html`
    <div
      class=${classMap({
        'biz-search-input': true,
        [`biz-search-input--${context.variant}`]: true,
        [`biz-search-input--${context.size}`]: true,
        'biz-search-input--disabled': context.disabled,
        'biz-search-input--readonly': context.readonly,
        'biz-search-input--error': context.error,
        'biz-search-input--loading': context.loading,
        'biz-search-input--full-width': context.fullWidth,
      })}
    >
      <div class="biz-search-input__label-container">
        <slot name="label-slot">
          ${context.label ? html`<label for="search-control" class="biz-search-input__label">${context.label}</label>` : ''}
        </slot>
      </div>

      <div class="biz-search-input__control-wrapper">
        <span class="biz-search-input__start-slot">
          <slot name="start-slot">
            ${context.loading
              ? html`<span class="biz-search-input__spinner" aria-hidden="true"></span>`
              : html`
                  <svg class="biz-search-input__search-icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                `}
          </slot>
        </span>

        <input
          id="search-control"
          type="text"
          role="searchbox"
          class="biz-search-input__control"
          .value=${live(context.value)}
          placeholder=${context.placeholder}
          ?disabled=${context.disabled}
          ?readonly=${context.readonly}
          ?required=${context.required}
          aria-invalid=${context.error ? 'true' : 'false'}
          aria-required=${context.required ? 'true' : 'false'}
          aria-busy=${context.loading ? 'true' : 'false'}
          aria-describedby="helper-text"
          @input=${context.handleInput}
          @change=${context.handleChange}
          @keydown=${context.handleKeyDown}
          @focus=${context.handleFocus}
          @blur=${context.handleBlur}
        />

        <span class="biz-search-input__end-slot">
          <slot name="end-slot">
            ${isClearVisible
              ? html`
                  <button
                    type="button"
                    class="biz-search-input__clear-btn"
                    aria-label="검색어 삭제"
                    @click=${context.handleClear}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                `
              : ''}
            ${isSearchBtnVisible
              ? html`
                  <slot name="search-button-slot">
                    <button
                      type="button"
                      class="biz-search-input__action-btn"
                      aria-label="검색 실행"
                      ?disabled=${context.disabled || context.readonly}
                      @click=${context.handleSearchAction}
                    >
                      검색
                    </button>
                  </slot>
                `
              : ''}
          </slot>
        </span>
      </div>

      <div id="helper-text" class="biz-search-input__helper-container">
        <slot name="helper-text-slot">
          ${context.helperText
            ? html`<span class="biz-search-input__helper-text">${context.helperText}</span>`
            : ''}
        </slot>
      </div>

      <div class="biz-search-input__sr-only" aria-live="polite">
        ${context.srAnnounceText}
      </div>
    </div>
  `;
};