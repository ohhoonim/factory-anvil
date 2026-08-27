import { html, type TemplateResult, nothing } from 'lit';

export interface ChipHost {
  value: string[];
  placeholder: string;
  delimiter: string | string[];
  maxChips: number;
  allowDuplicates: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  deletable: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  inputValue: string;
  focusedChipIndex: number;
  liveMessage: string;
  helperTextId: string;
  
  handleInputKeydown(e: KeyboardEvent): void;
  handleInputInput(e: HTMLInputElement): void;
  handleInputFocus(e: FocusEvent): void;
  handleInputBlur(e: FocusEvent): void;
  handleChipKeydown(e: KeyboardEvent, index: number): void;
  handleChipClick(index: number): void;
  handleRemoveChip(e: Event, index: number): void;
  handleContainerClick(): void;
}

export const ChipTemplate = (host: ChipHost): TemplateResult => {
  const isMaxReached = host.value.length >= host.maxChips;

  return html`
    <div
      class="biz-chip ${host.variant} ${host.size} ${host.disabled ? 'disabled' : ''} ${host.readonly ? 'readonly' : ''} ${host.error ? 'error' : ''} ${host.fullWidth ? 'full-width' : ''}"
      @click=${host.handleContainerClick}
    >
      <div class="biz-chip__label-container">
        <slot name="label-slot"></slot>
      </div>

      <div class="biz-chip__wrapper">
        <slot name="start-slot"></slot>

        <div class="biz-chip__container" role="list" aria-label="Selected chips">
          ${host.value.map((item, index) => html`
            <slot name="chip-item-slot" data-index=${index}>
              <div
                class="biz-chip__item ${host.focusedChipIndex === index ? 'focused' : ''}"
                role="listitem"
                tabindex=${host.disabled ? '-1' : '0'}
                @keydown=${(e: KeyboardEvent) => host.handleChipKeydown(e, index)}
                @click=${() => host.handleChipClick(index)}
              >
                <span class="biz-chip__item-text">${item}</span>
                ${host.deletable && !host.readonly && !host.disabled
                  ? html`
                      <button
                        type="button"
                        class="biz-chip__item-delete"
                        aria-label="삭제: ${item}"
                        tabindex="-1"
                        @click=${(e: Event) => host.handleRemoveChip(e, index)}
                      >
                        &times;
                      </button>
                    `
                  : nothing}
              </div>
            </slot>
          `)}

          <input
            type="text"
            class="biz-chip__input"
            .value=${host.inputValue}
            placeholder=${host.value.length === 0 ? host.placeholder : ''}
            ?disabled=${host.disabled || isMaxReached}
            ?readonly=${host.readonly}
            aria-invalid=${host.error ? 'true' : 'false'}
            aria-required=${host.required ? 'true' : 'false'}
            aria-describedby=${host.helperTextId}
            @keydown=${host.handleInputKeydown}
            @input=${(e: Event) => host.handleInputInput(e.target as HTMLInputElement)}
            @focus=${host.handleInputFocus}
            @blur=${host.handleInputBlur}
          />
        </div>

        <slot name="end-slot"></slot>
      </div>

      <div class="biz-chip__helper-container" id=${host.helperTextId}>
        <slot name="helper-text-slot"></slot>
      </div>

      <div class="biz-chip__sr-only" aria-live="polite" aria-atomic="true">
        ${host.liveMessage}
      </div>
    </div>
  `;
};