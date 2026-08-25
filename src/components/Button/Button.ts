import { html, nothing } from 'lit';

export interface ButtonHost {
  variant: 'filled' | 'outlined' | 'text';
  size: 'small' | 'medium' | 'large';
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  handleClick: (event: MouseEvent) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
}

export const ButtonTemplate = (host: ButtonHost) => {
  const isDisabled = host.disabled || host.loading;

  return html`
    <button
      type=${host.type}
      class=${`biz-button biz-button--${host.variant} biz-button--${host.size}${
        host.fullWidth ? ' biz-button--full-width' : ''
      }${host.loading ? ' biz-button--loading' : ''}`}
      ?disabled=${isDisabled}
      aria-disabled=${isDisabled ? 'true' : 'false'}
      aria-busy=${host.loading ? 'true' : 'false'}
      @click=${host.handleClick}
      @keydown=${host.handleKeyDown}
    >
      ${host.loading
        ? html`
            <span class="biz-button__spinner" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  opacity="0.25"
                />
                <path
                  d="M12 2a10 10 0 0110 10"
                  stroke="currentColor"
                  stroke-width="4"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          `
        : nothing}
      <span class="biz-button__icon biz-button__icon--start">
        <slot name="start-slot"></slot>
      </span>
      <span class="biz-button__label">
        <slot></slot>
      </span>
      <span class="biz-button__icon biz-button__icon--end">
        <slot name="end-slot"></slot>
      </span>
    </button>
  `;
};