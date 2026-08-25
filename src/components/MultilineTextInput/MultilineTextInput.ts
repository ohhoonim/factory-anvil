import { html, nothing } from 'lit';

export const MultilineTextInputTemplate = (host: any) => {
  const currentLength = host.value ? host.value.length : 0;
  const counterText = host.maxlength !== undefined && host.maxlength !== null
    ? `${currentLength}/${host.maxlength}`
    : `${currentLength}`;

  return html`
    <div class="biz-multiline-text-input ${host.variant || 'outlined'} ${host.size || 'medium'} ${host.disabled ? 'disabled' : ''} ${host.readonly ? 'readonly' : ''} ${host.error ? 'error' : ''} ${host.loading ? 'loading' : ''} ${host.fullWidth ? 'full-width' : ''}">
      <div class="biz-multiline-text-input__header">
        <slot name="label-slot"></slot>
        <slot name="header-extra-slot"></slot>
      </div>
      <div class="biz-multiline-text-input__control">
        <textarea
          class="biz-multiline-text-input__textarea"
          .value="${host.value || ''}"
          placeholder="${host.placeholder || ''}"
          rows="${host.rows || 3}"
          maxlength="${host.maxlength !== undefined && host.maxlength !== null ? host.maxlength : nothing}"
          ?readonly="${host.readonly}"
          ?disabled="${host.disabled}"
          ?required="${host.required}"
          aria-invalid="${host.error ? 'true' : 'false'}"
          aria-required="${host.required ? 'true' : 'false'}"
          aria-multiline="true"
          aria-describedby="helper-text counter-text"
          style="resize: ${host.autoResize ? 'none' : (host.resize || 'vertical')};"
          @input="${host.handleInput}"
          @change="${host.handleChange}"
          @focus="${host.handleFocus}"
          @blur="${host.handleBlur}"
        ></textarea>
      </div>
      <div class="biz-multiline-text-input__footer">
        <div id="helper-text" class="biz-multiline-text-input__helper">
          <slot name="helper-text-slot"></slot>
        </div>
        <div class="biz-multiline-text-input__footer-right">
          <slot name="footer-extra-slot"></slot>
          ${host.showCount
            ? html`<span id="counter-text" class="biz-multiline-text-input__counter" aria-live="polite">${counterText}</span>`
            : nothing}
        </div>
      </div>
    </div>
  `;
};