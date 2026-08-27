import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface IpAddressInputHost {
  type: 'ipv4' | 'ipv6';
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  value: string;
  segments: string[];
  autoFocusNext: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  fullWidth: boolean;
  activeSegmentIndex: number;
  handleSegmentInput(event: InputEvent, index: number): void;
  handleSegmentKeyDown(event: KeyboardEvent, index: number): void;
  handleSegmentPaste(event: ClipboardEvent, index: number): void;
  handleSegmentFocus(event: FocusEvent, index: number): void;
  handleContainerBlur(event: FocusEvent): void;
}

export const IpAddressInputTemplate = (host: IpAddressInputHost) => {
  const segmentCount = host.type === 'ipv6' ? 8 : 4;
  const separator = host.type === 'ipv6' ? ':' : '.';

  return html`
    <div
      class=${classMap({
        'biz-ip-address-input': true,
        [`biz-ip-address-input--${host.variant}`]: true,
        [`biz-ip-address-input--${host.size}`]: true,
        'biz-ip-address-input--disabled': host.disabled,
        'biz-ip-address-input--readonly': host.readonly,
        'biz-ip-address-input--error': host.error,
        'biz-ip-address-input--full-width': host.fullWidth,
      })}
      @blur=${host.handleContainerBlur}
    >
      <div class="biz-ip-address-input__label-area">
        <slot name="label-slot"></slot>
      </div>

      <div
        class="biz-ip-address-input__field"
        role="group"
        aria-label="${host.type === 'ipv6' ? 'IPv6 주소 입력' : 'IP 주소 입력'}"
        aria-invalid=${host.error ? 'true' : 'false'}
        aria-required=${host.required ? 'true' : 'false'}
      >
        <slot name="prefix-slot"></slot>

        <div class="biz-ip-address-input__segments">
          ${Array.from({ length: segmentCount }).map((_, index) => {
            const segmentValue = host.segments[index] || '';
            const segmentLabel = `${host.type === 'ipv6' ? 'IPv6' : 'IP'} 주소 세그먼트 ${index + 1}/${segmentCount}`;

            return html`
              <input
                type="text"
                class="biz-ip-address-input__segment"
                .value=${segmentValue}
                ?disabled=${host.disabled}
                ?readonly=${host.readonly}
                aria-label=${segmentLabel}
                aria-invalid=${host.error ? 'true' : 'false'}
                maxlength=${host.type === 'ipv6' ? 4 : 3}
                @input=${(e: InputEvent) => host.handleSegmentInput(e, index)}
                @keydown=${(e: KeyboardEvent) => host.handleSegmentKeyDown(e, index)}
                @paste=${(e: ClipboardEvent) => host.handleSegmentPaste(e, index)}
                @focus=${(e: FocusEvent) => host.handleSegmentFocus(e, index)}
              />
              ${index < segmentCount - 1
                ? html`
                    <span class="biz-ip-address-input__separator" aria-hidden="true">
                      <slot name="separator-slot">${separator}</slot>
                    </span>
                  `
                : ''}
            `;
          })}
        </div>

        <slot name="suffix-slot"></slot>
      </div>

      <div class="biz-ip-address-input__helper-area">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};