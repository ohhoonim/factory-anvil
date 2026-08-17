import { html, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface DropdownTemplateProps {
  value: string | number | (string | number)[] | null;
  options: DropdownOption[];
  mode: 'single' | 'multi';
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  filterable: boolean;
  placeholder: string;
  clearable: boolean;
  maxTagCount?: number;
  loading: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  fullWidth: boolean;
  isOpen: boolean;
  filterKeyword: string;
  activeIndex: number;
  focused: boolean;
  onTriggerClick: (e: MouseEvent) => void;
  onTriggerKeyDown: (e: KeyboardEvent) => void;
  onFilterInput: (e: InputEvent) => void;
  onFilterKeyDown: (e: KeyboardEvent) => void;
  onOptionClick: (option: DropdownOption, index: number) => void;
  onClearClick: (e: MouseEvent) => void;
  onTagRemove: (e: MouseEvent, val: string | number) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
}

export const DropdownTemplate = (props: DropdownTemplateProps): TemplateResult => {
  const {
    value,
    options,
    mode,
    variant,
    size,
    filterable,
    placeholder,
    clearable,
    maxTagCount,
    loading,
    required,
    readonly,
    disabled,
    error,
    fullWidth,
    isOpen,
    filterKeyword,
    activeIndex,
    focused,
    onTriggerClick,
    onTriggerKeyDown,
    onFilterInput,
    onFilterKeyDown,
    onOptionClick,
    onClearClick,
    onTagRemove,
    onFocus,
    onBlur,
  } = props;

  const selectedValues = Array.isArray(value) ? value : value !== null && value !== undefined ? [value] : [];
  const hasValue = selectedValues.length > 0;

  const filteredOptions = filterable && filterKeyword
    ? options.filter((opt) => opt.label.toLowerCase().includes(filterKeyword.toLowerCase()))
    : options;

  const renderTags = () => {
    if (mode !== 'multi' || !hasValue) return null;

    const visibleValues = maxTagCount !== undefined && maxTagCount >= 0
      ? selectedValues.slice(0, maxTagCount)
      : selectedValues;
    const hiddenCount = selectedValues.length - visibleValues.length;

    return html`
      <div class="tags-container">
        ${repeat(
          visibleValues,
          (val) => val,
          (val) => {
            const opt = options.find((o) => o.value === val);
            const label = opt ? opt.label : String(val);
            return html`
              <span class="tag">
                <slot name="tag-slot" .tagValue=${val}>
                  <span class="tag-label">${label}</span>
                </slot>
                ${!disabled && !readonly
                  ? html`
                      <button
                        type="button"
                        class="tag-remove-btn"
                        aria-label="Remove ${label}"
                        @click=${(e: MouseEvent) => onTagRemove(e, val)}
                      >
                        &times;
                      </button>
                    `
                  : null}
              </span>
            `;
          }
        )}
        ${hiddenCount > 0
          ? html`<span class="tag tag-more">+${hiddenCount}</span>`
          : null}
      </div>
    `;
  };

  const renderValueDisplay = () => {
    if (mode === 'multi') {
      return renderTags();
    }

    if (hasValue) {
      const selectedOpt = options.find((o) => o.value === selectedValues[0]);
      return html`<span class="selected-value">${selectedOpt ? selectedOpt.label : String(selectedValues[0])}</span>`;
    }

    return html`<span class="placeholder">${placeholder}</span>`;
  };

  const isSelected = (optValue: string | number) => {
    return selectedValues.includes(optValue);
  };

  const activeOptionId = activeIndex >= 0 && filteredOptions[activeIndex]
    ? `option-${activeIndex}`
    : '';

  return html`
    <div
      class="biz-dropdown ${variant} ${size} ${disabled ? 'disabled' : ''} ${readonly ? 'readonly' : ''} ${error ? 'error' : ''} ${focused ? 'focused' : ''} ${isOpen ? 'open' : ''} ${fullWidth ? 'full-width' : ''}"
      @focusin=${onFocus}
      @focusout=${onBlur}
    >
      <div class="label-wrapper">
        <slot name="label-slot"></slot>
      </div>

      <div
        class="trigger-control"
        role="combobox"
        aria-expanded=${isOpen ? 'true' : 'false'}
        aria-haspopup="listbox"
        aria-controls="dropdown-popover"
        aria-activedescendant=${activeOptionId}
        aria-required=${required ? 'true' : 'false'}
        aria-disabled=${disabled ? 'true' : 'false'}
        tabindex=${disabled ? '-1' : '0'}
        @click=${onTriggerClick}
        @keydown=${onTriggerKeyDown}
      >
        <span class="prefix-icon">
          <slot name="prefix-slot"></slot>
        </span>

        <div class="value-container">
          ${filterable && isOpen
            ? html`
                <input
                  type="text"
                  class="filter-input"
                  .value=${filterKeyword}
                  placeholder=${hasValue && mode === 'single' ? '' : placeholder}
                  ?disabled=${disabled}
                  ?readonly=${readonly}
                  @input=${onFilterInput}
                  @keydown=${onFilterKeyDown}
                />
              `
            : renderValueDisplay()}
        </div>

        <div class="suffix-actions">
          ${clearable && hasValue && !disabled && !readonly
            ? html`
                <button
                  type="button"
                  class="clear-btn"
                  aria-label="Clear value"
                  @click=${onClearClick}
                >
                  &times;
                </button>
              `
            : null}

          ${loading
            ? html`<span class="spinner" aria-hidden="true"></span>`
            : html`
                <span class="arrow-icon" aria-hidden="true">
                  <slot name="suffix-slot">&#9660;</slot>
                </span>
              `}
        </div>
      </div>

      <div
        id="dropdown-popover"
        class="popover ${isOpen ? 'open' : ''}"
        role="listbox"
        aria-multiselectable=${mode === 'multi' ? 'true' : 'false'}
      >
        <div class="popover-header">
          <slot name="header-slot"></slot>
        </div>

        <div class="options-container">
          ${filteredOptions.length === 0
            ? html`
                <div class="empty-state">
                  <slot name="empty-slot">검색 결과가 없습니다.</slot>
                </div>
              `
            : repeat(
                filteredOptions,
                (option) => option.value,
                (option, index) => {
                  const selected = isSelected(option.value);
                  const active = index === activeIndex;
                  return html`
                    <div
                      id="option-${index}"
                      class="option-item ${selected ? 'selected' : ''} ${active ? 'active' : ''} ${option.disabled ? 'disabled' : ''}"
                      role="option"
                      aria-selected=${selected ? 'true' : 'false'}
                      aria-disabled=${option.disabled ? 'true' : 'false'}
                      @click=${() => !option.disabled && onOptionClick(option, index)}
                    >
                      <slot name="option-slot" .option=${option}>
                        ${mode === 'multi'
                          ? html`<input type="checkbox" .checked=${selected} tabindex="-1" ?disabled=${option.disabled} />`
                          : null}
                        <span class="option-label">${option.label}</span>
                      </slot>
                    </div>
                  `;
                }
              )}
        </div>

        <div class="popover-footer">
          <slot name="footer-slot"></slot>
        </div>
      </div>

      <div class="helper-text-wrapper">
        <slot name="helper-text-slot"></slot>
      </div>

      <div class="sr-only" aria-live="polite">
        ${isOpen
          ? `${filteredOptions.length}개의 옵션이 있습니다.`
          : ''}
      </div>
    </div>
  `;
};