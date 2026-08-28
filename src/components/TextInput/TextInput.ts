import { html, type TemplateResult } from 'lit';

export interface TextInputHost {
  value: string;
  type: string;
  placeholder: string;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  clearable: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  loading: boolean;
  direction: 'vertical' | 'horizontal';
  hasLabelSlot?: boolean;
  handleInput: (e: InputEvent) => void;
  handleChange: (e: Event) => void;
  handleFocus: (e: FocusEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  handleClear: (e: MouseEvent) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
  handleLabelSlotChange?: (e: Event) => void;
}

export const TextInputTemplate = (host: TextInputHost): TemplateResult => {
  const isClearableVisible = host.clearable && !host.disabled && !host.readonly && host.value.length > 0;

  return html`
    <div
      class="biz-text-input ${host.variant} ${host.size} ${host.direction} ${host.fullWidth ? 'full-width' : ''} ${host.error ? 'error' : ''} ${host.disabled ? 'disabled' : ''} ${host.readonly ? 'readonly' : ''} ${host.loading ? 'loading' : ''}"
    >
      <div class="label-container">
        <slot name="label-slot" @slotchange="${host.handleLabelSlotChange}"></slot>
      </div>

      <div class="input-body">
        <div class="input-control">
          <slot name="start-slot"></slot>

          <input
            id="native-input"
            class="input-field"
            .type="${host.type}"
            .value="${host.value}"
            .placeholder="${host.placeholder}"
            ?required="${host.required}"
            ?readonly="${host.readonly}"
            ?disabled="${host.disabled}"
            aria-invalid="${host.error ? 'true' : 'false'}"
            aria-required="${host.required ? 'true' : 'false'}"
            aria-disabled="${host.disabled ? 'true' : 'false'}"
            aria-describedby="helper-text-container"
            @input="${host.handleInput}"
            @change="${host.handleChange}"
            @focus="${host.handleFocus}"
            @blur="${host.handleBlur}"
            @keydown="${host.handleKeyDown}"
          />

          ${host.loading
            ? html`<span class="spinner" aria-hidden="true"></span>`
            : ''}

          ${isClearableVisible
            ? html`
                <button
                  type="button"
                  class="clear-button"
                  aria-label="Clear input"
                  tabindex="-1"
                  @click="${host.handleClear}"
                >
                  &times;
                </button>
              `
            : ''}

          <slot name="end-slot"></slot>
        </div>

        <div id="helper-text-container" class="helper-text-container">
          <slot name="helper-text-slot"></slot>
        </div>
      </div>
    </div>
  `;
};