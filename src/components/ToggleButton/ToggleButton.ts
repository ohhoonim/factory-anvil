import { html, type TemplateResult } from 'lit';

export interface ToggleButtonHost {
  value: string;
  pressed: boolean;
  disabled: boolean;
  variant: 'standard' | 'outlined' | 'contained';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  handleClick: (event: MouseEvent) => void;
  handleKeyDown: (event: KeyboardEvent) => void;
}

export const ToggleButtonTemplate = (host: ToggleButtonHost): TemplateResult => {
  return html`
    <button
      type="button"
      class="biz-toggle-button"
      role="button"
      aria-pressed="${host.pressed ? 'true' : 'false'}"
      ?disabled="${host.disabled}"
      @click="${host.handleClick}"
      @keydown="${host.handleKeyDown}"
    >
      <span class="slot-container start">
        <slot name="start-slot"></slot>
      </span>
      <span class="slot-container label">
        <slot></slot>
      </span>
      <span class="slot-container end">
        <slot name="end-slot"></slot>
      </span>
    </button>
  `;
};