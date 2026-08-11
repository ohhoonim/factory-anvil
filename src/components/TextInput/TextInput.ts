import { html } from "lit";

export const TextInputTemplate = (context: any) => html`
  <div class="biz-text-input ${context.variant || 'outlined'} ${context.size || 'medium'} ${context.fullWidth ? 'full-width' : ''} ${context.disabled ? 'disabled' : ''} ${context.readonly ? 'readonly' : ''} ${context.error ? 'error' : ''} ${context.loading ? 'loading' : ''}">
    <div class="biz-text-input__label-wrapper">
      <slot name="label-slot"></slot>
    </div>
    <div class="biz-text-input__control">
      <slot name="start-slot"></slot>
      <input
        id="input"
        class="biz-text-input__field"
        type="${context.type || 'text'}"
        .value="${context.value || ''}"
        placeholder="${context.placeholder || ''}"
        ?disabled="${context.disabled}"
        ?readonly="${context.readonly}"
        ?required="${context.required}"
        aria-invalid="${context.error ? 'true' : 'false'}"
        aria-required="${context.required ? 'true' : 'false'}"
        aria-disabled="${context.disabled ? 'true' : 'false'}"
        aria-describedby="helper-text"
        @input="${context.handleInput}"
        @change="${context.handleChange}"
        @focus="${context.handleFocus}"
        @blur="${context.handleBlur}"
        @keydown="${context.handleKeyDown}"
      />
      ${context.loading ? html`<span class="biz-text-input__spinner"></span>` : ''}
      ${context.clearable && !context.disabled && !context.readonly && context.value ? html`
        <button type="button" class="biz-text-input__clear-btn" @click="${context.handleClear}" aria-label="Clear">
          &times;
        </button>
      ` : ''}
      <slot name="end-slot"></slot>
    </div>
    <div id="helper-text" class="biz-text-input__helper-wrapper">
      <slot name="helper-text-slot"></slot>
    </div>
  </div>
`;