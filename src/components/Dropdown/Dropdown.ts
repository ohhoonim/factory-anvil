import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

export interface DropdownOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface DropdownHost {
  value: any;
  options: DropdownOption[];
  mode: 'single' | 'multi';
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  labelPlacement?: 'vertical' | 'horizontal';
  hasLabelSlot?: boolean;
  filterable: boolean;
  placeholder: string;
  clearable: boolean;
  maxTagCount?: number;
  loading: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  isOpen: boolean;
  focusedOptionIndex: number;
  searchKeyword: string;
  handleTriggerClick: (e: MouseEvent) => void;
  handleInputClick: (e: MouseEvent) => void;
  handleTriggerKeyDown: (e: KeyboardEvent) => void;
  handleOptionClick: (option: DropdownOption, e: MouseEvent) => void;
  handleClearClick: (e: MouseEvent) => void;
  handleTagRemove: (optionValue: any, e: MouseEvent) => void;
  handleFilterInput: (e: InputEvent) => void;
  handleLabelSlotChange: (e: Event) => void;
  getFilteredOptions: () => DropdownOption[];
  getOptionId: (index: number) => string;
}

export const DropdownTemplate = (host: DropdownHost) => {
  const filteredOptions = host.getFilteredOptions();
  const selectedValues = Array.isArray(host.value)
    ? host.value
    : host.value !== null && host.value !== undefined
      ? [host.value]
      : [];

  const isSelected = (val: any) => selectedValues.includes(val);

  const renderValueDisplay = () => {
    if (host.mode === 'multi') {
      if (selectedValues.length === 0 && !host.searchKeyword) {
        return html`<span class="biz-dropdown__placeholder">${host.placeholder}</span>`;
      }

      const visibleValues =
        host.maxTagCount !== undefined
          ? selectedValues.slice(0, host.maxTagCount)
          : selectedValues;
      const hiddenCount = selectedValues.length - visibleValues.length;

      return html`
        <div class="biz-dropdown__tags">
          <slot name="tag-slot">
            ${visibleValues.map((val) => {
              const opt = host.options.find((o) => o.value === val);
              const label = opt ? opt.label : val;
              return html`
                <span class="biz-dropdown__tag">
                  ${label}
                  ${!host.disabled && !host.readonly
                    ? html`
                        <button
                          type="button"
                          class="biz-dropdown__tag-remove"
                          @click=${(e: MouseEvent) => host.handleTagRemove(val, e)}
                          aria-label="Remove tag"
                        >
                          ✕
                        </button>
                      `
                    : ''}
                </span>
              `;
            })}
            ${hiddenCount > 0
              ? html`<span class="biz-dropdown__tag">+${hiddenCount}</span>`
              : ''}
          </slot>
        </div>
      `;
    }

    if (host.value !== null && host.value !== undefined && host.value !== '') {
      const selectedOpt = host.options.find((o) => o.value === host.value);
      return html`<span>${selectedOpt ? selectedOpt.label : host.value}</span>`;
    }

    return html`<span class="biz-dropdown__placeholder">${host.placeholder}</span>`;
  };

  const activeDescendantId =
    host.focusedOptionIndex >= 0
      ? host.getOptionId(host.focusedOptionIndex)
      : undefined;

  const labelPlacement = host.labelPlacement || 'vertical';

  return html`
    <div
      class=${classMap({
        'biz-dropdown': true,
        'biz-dropdown--open': host.isOpen,
        'biz-dropdown--disabled': host.disabled,
        'biz-dropdown--readonly': host.readonly,
        'biz-dropdown--error': host.error,
        [`biz-dropdown--label-${labelPlacement}`]: true,
        [`biz-dropdown--${host.variant}`]: Boolean(host.variant),
        [`biz-dropdown--${host.size}`]: Boolean(host.size),
      })}
    >
      <div
        class=${classMap({
          'biz-dropdown__label-container': true,
          'biz-dropdown__label-container--has-content': Boolean(host.hasLabelSlot),
        })}
      >
        <div class="biz-dropdown__label">
          <slot name="label-slot" @slotchange=${host.handleLabelSlotChange}></slot>
        </div>
      </div>

      <div class="biz-dropdown__trigger-container">
        <div
          class="biz-dropdown__trigger"
          role="combobox"
          tabindex=${host.disabled ? -1 : 0}
          aria-expanded=${host.isOpen ? 'true' : 'false'}
          aria-haspopup="listbox"
          aria-controls="biz-dropdown-menu"
          aria-activedescendant=${ifDefined(activeDescendantId)}
          aria-disabled=${host.disabled ? 'true' : 'false'}
          aria-required=${host.required ? 'true' : 'false'}
          @click=${host.handleTriggerClick}
          @keydown=${host.handleTriggerKeyDown}
        >
          <slot name="prefix-slot"></slot>

          <div class="biz-dropdown__content-area">
            ${host.filterable && host.isOpen
              ? html`
                  ${host.mode === 'multi' ? renderValueDisplay() : ''}
                  <input
                    type="text"
                    class=${classMap({
                      'biz-dropdown__filter-input': true,
                      'biz-dropdown__filter-input--inline': host.mode === 'multi',
                    })}
                    .value=${host.searchKeyword}
                    placeholder=${host.mode === 'single' && host.value
                      ? ''
                      : host.placeholder}
                    @click=${host.handleInputClick}
                    @input=${host.handleFilterInput}
                    ?disabled=${host.disabled}
                    ?readonly=${host.readonly}
                  />
                `
              : renderValueDisplay()}
          </div>

          <div class="biz-dropdown__controls">
            ${host.clearable && selectedValues.length > 0 && !host.disabled && !host.readonly
              ? html`
                  <button
                    type="button"
                    class="biz-dropdown__clear-btn"
                    @click=${host.handleClearClick}
                    aria-label="Clear selection"
                  >
                    ✕
                  </button>
                `
              : ''}
            ${host.loading
              ? html`<div class="biz-dropdown__spinner"></div>`
              : html`<span class="biz-dropdown__arrow"></span>`}
            <slot name="suffix-slot"></slot>
          </div>
        </div>

        ${host.isOpen && !host.disabled && !host.readonly
          ? html`
              <div class="biz-dropdown__popover" id="biz-dropdown-menu">
                <slot name="header-slot"></slot>

                ${filteredOptions.length > 0
                  ? html`
                      <ul
                        class="biz-dropdown__listbox"
                        role="listbox"
                        aria-multiselectable=${host.mode === 'multi' ? 'true' : 'false'}
                      >
                        ${filteredOptions.map((opt, index) => {
                          const selected = isSelected(opt.value);
                          const focused = host.focusedOptionIndex === index;
                          return html`
                            <li
                              id=${host.getOptionId(index)}
                              class=${classMap({
                                'biz-dropdown__option': true,
                                'biz-dropdown__option--selected': selected,
                                'biz-dropdown__option--focused': focused,
                                'biz-dropdown__option--disabled': Boolean(opt.disabled),
                              })}
                              role="option"
                              aria-selected=${selected ? 'true' : 'false'}
                              aria-disabled=${opt.disabled ? 'true' : 'false'}
                              @click=${(e: MouseEvent) => host.handleOptionClick(opt, e)}
                            >
                              <slot name="option-slot" .option=${opt}>
                                ${opt.label}
                              </slot>
                            </li>
                          `;
                        })}
                      </ul>
                    `
                  : html`
                      <div class="biz-dropdown__empty">
                        <slot name="empty-slot">검색 결과가 없습니다.</slot>
                      </div>
                    `}

                <slot name="footer-slot"></slot>
              </div>
            `
          : ''}
      </div>

      <div class="biz-dropdown__helper-text">
        <slot name="helper-text-slot"></slot>
      </div>

      <div class="biz-dropdown__sr-only" aria-live="polite">
        ${host.isOpen
          ? `${filteredOptions.length}개의 옵션이 있습니다.`
          : ''}
      </div>
    </div>
  `;
};