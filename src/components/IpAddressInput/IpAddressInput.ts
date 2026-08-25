import { html } from 'lit';

export interface IpAddressInputState {
  value: string;
  type: 'ipv4' | 'ipv6';
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  autoFocusNext: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  fullWidth: boolean;
  segments: string[];
  helperText?: string;
  label?: string;
  onSegmentInput: (index: number, event: InputEvent) => void;
  onSegmentKeyDown: (index: number, event: KeyboardEvent) => void;
  onSegmentPaste: (index: number, event: ClipboardEvent) => void;
  onSegmentFocus: (index: number, event: FocusEvent) => void;
  onSegmentBlur: (index: number, event: FocusEvent) => void;
}

export const IpAddressInputTemplate = (context: IpAddressInputState) => {
  const segmentCount = context.type === 'ipv6' ? 8 : 4;
  const separatorChar = context.type === 'ipv6' ? ':' : '.';
  const maxLength = context.type === 'ipv6' ? 4 : 3;

  const segmentElements = [];

  for (let i = 0; i < segmentCount; i++) {
    const segmentValue = context.segments[i] || '';
    const ariaLabel = `${context.type === 'ipv6' ? 'IPv6' : 'IP'} 주소 세그먼트 ${i + 1}/${segmentCount}`;

    segmentElements.push(html`
      <input
        type="text"
        class="biz-ip-address-input__segment"
        data-index="${i}"
        .value="${segmentValue}"
        maxlength="${maxLength}"
        ?disabled="${context.disabled}"
        ?readonly="${context.readonly}"
        aria-invalid="${context.error }" 
        aria-required="${context.required }"
        aria-label="${ariaLabel}"
        @input="${(e: InputEvent) => context.onSegmentInput(i, e)}"
        @keydown="${(e: KeyboardEvent) => context.onSegmentKeyDown(i, e)}"
        @paste="${(e: ClipboardEvent) => context.onSegmentPaste(i, e)}"
        @focus="${(e: FocusEvent) => context.onSegmentFocus(i, e)}"
        @blur="${(e: FocusEvent) => context.onSegmentBlur(i, e)}"
      />
    `);

    if (i < segmentCount - 1) {
      segmentElements.push(html`
        <span class="biz-ip-address-input__separator" aria-hidden="true">
          <slot name="separator-slot">${separatorChar}</slot>
        </span>
      `);
    }
  }

  const containerClasses = [
    'biz-ip-address-input',
    `biz-ip-address-input--${context.variant || 'outlined'}`,
    `biz-ip-address-input--${context.size || 'medium'}`,
    `biz-ip-address-input--${context.type || 'ipv4'}`,
    context.disabled ? 'biz-ip-address-input--disabled' : '',
    context.readonly ? 'biz-ip-address-input--readonly' : '',
    context.error ? 'biz-ip-address-input--error' : '',
    context.fullWidth ? 'biz-ip-address-input--full-width' : ''
  ].filter(Boolean).join(' ');

  return html`
    <div class="${containerClasses}" role="group" aria-label="IP 주소 입력">
      <div class="biz-ip-address-input__label-area">
        <slot name="label-slot">
          ${context.label ? html`<label class="biz-ip-address-input__label">${context.label}</label>` : ''}
        </slot>
      </div>

      <div class="biz-ip-address-input__field">
        <slot name="prefix-slot"></slot>
        <div class="biz-ip-address-input__segments">
          ${segmentElements}
        </div>
        <slot name="suffix-slot"></slot>
      </div>

      <div class="biz-ip-address-input__helper-area" id="helper-text">
        <slot name="helper-text-slot">
          ${context.helperText ? html`<span class="biz-ip-address-input__helper-text">${context.helperText}</span>` : ''}
        </slot>
      </div>
    </div>
  `;
};