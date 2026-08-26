import { html, type TemplateResult } from 'lit';

export interface FormWrapperHost {
  label: string;
  required: boolean;
  helperText: string;
  errorMessage: string;
  successMessage: string;
  layout: 'vertical' | 'horizontal' | 'inline';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  labelWidth: string;
  disabled: boolean;
  helperTextId: string;
  handleLabelClick: (event: MouseEvent) => void;
  handleSlotChange: () => void;
}

export const FormWrapperTemplate = (host: FormWrapperHost): TemplateResult => {
  const isError = Boolean(host.errorMessage);
  const isSuccess = !isError && Boolean(host.successMessage);
  const currentMessage = host.errorMessage || host.successMessage || host.helperText;

  const containerClasses = [
    'biz-form-wrapper',
    `biz-form-wrapper--${host.layout}`,
    `biz-form-wrapper--${host.size}`,
    host.fullWidth ? 'biz-form-wrapper--full-width' : '',
    host.disabled ? 'biz-form-wrapper--disabled' : '',
    isError ? 'biz-form-wrapper--error' : '',
    isSuccess ? 'biz-form-wrapper--success' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const messageClasses = [
    'biz-form-wrapper__message',
    isError ? 'biz-form-wrapper__message--error' : '',
    isSuccess ? 'biz-form-wrapper__message--success' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperStyle = host.labelWidth
    ? `--biz-form-wrapper-label-width: ${host.labelWidth};`
    : '';

  return html`
    <div class="${containerClasses}" style="${wrapperStyle}">
      <div class="biz-form-wrapper__label-container">
        <label
          class="biz-form-wrapper__label"
          @click="${host.handleLabelClick}"
        >
          <slot name="label-slot">${host.label}</slot>
          ${host.required
            ? html`<span class="biz-form-wrapper__required" aria-hidden="true">*</span>`
            : ''}
        </label>
        <div class="biz-form-wrapper__extra">
          <slot name="extra-slot"></slot>
        </div>
      </div>

      <div class="biz-form-wrapper__content">
        <div class="biz-form-wrapper__control">
          <slot @slotchange="${host.handleSlotChange}"></slot>
        </div>

        <div
          id="${host.helperTextId}"
          class="${messageClasses}"
          role="${isError ? 'alert' : 'status'}"
        >
          <slot name="helper-text-slot">${currentMessage}</slot>
        </div>
      </div>
    </div>
  `;
};