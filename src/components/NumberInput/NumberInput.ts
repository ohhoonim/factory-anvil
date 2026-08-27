import { html, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface NumberInputHost {
  value: number | null;
  min: number;
  max: number;
  step: number;
  precision?: number;
  controls: boolean;
  controlsPosition: 'end' | 'stacked' | 'split';
  useGrouping: boolean;
  required: boolean;
  readonly: boolean;
  disabled: boolean;
  error: boolean;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  placeholder?: string;
  formattedValue: string;
  isMinReached: boolean;
  isMaxReached: boolean;
  
  handleInput(e: InputEvent): void;
  handleChange(e: Event): void;
  handleFocus(e: FocusEvent): void;
  handleBlur(e: FocusEvent): void;
  handleKeyDown(e: KeyboardEvent): void;
  handleStepUp(): void;
  handleStepDown(): void;
}

export const NumberInputTemplate = (host: NumberInputHost): TemplateResult => {
  const isControlsVisible = host.controls && !host.readonly;
  const isSplit = host.controlsPosition === 'split' && isControlsVisible;
  const isStacked = host.controlsPosition === 'stacked' && isControlsVisible;
  const isEnd = host.controlsPosition === 'end' && isControlsVisible;

  const minAttr = host.min !== -Infinity ? host.min : undefined;
  const maxAttr = host.max !== Infinity ? host.max : undefined;

  return html`
    <div
      class="biz-number-input ${host.variant} ${host.size} ${host.fullWidth ? 'full-width' : ''} ${host.disabled ? 'disabled' : ''} ${host.readonly ? 'readonly' : ''} ${host.error ? 'error' : ''}"
    >
      <div class="label-wrapper">
        <slot name="label-slot"></slot>
      </div>

      <div class="input-container">
        ${isSplit
          ? html`
              <button
                type="button"
                class="control-btn decrement-btn"
                ?disabled="${host.disabled || host.readonly || host.isMinReached}"
                tabindex="-1"
                aria-label="값 감소"
                @click="${host.handleStepDown}"
              >
                <slot name="decrement-icon-slot">-</slot>
              </button>
            `
          : ''}

        <div class="input-wrapper">
          <slot name="prefix-slot"></slot>
          
          <input
            type="text"
            role="spinbutton"
            class="native-input"
            .value="${host.formattedValue}"
            ?disabled="${host.disabled}"
            ?readonly="${host.readonly}"
            ?required="${host.required}"
            placeholder="${host.placeholder ?? ''}"
            aria-valuenow="${ifDefined(host.value !== null ? host.value : undefined)}"
            aria-valuemin="${ifDefined(minAttr)}"
            aria-valuemax="${ifDefined(maxAttr)}"
            aria-invalid="${host.error ? 'true' : 'false'}"
            aria-required="${host.required ? 'true' : 'false'}"
            @input="${host.handleInput}"
            @change="${host.handleChange}"
            @focus="${host.handleFocus}"
            @blur="${host.handleBlur}"
            @keydown="${host.handleKeyDown}"
          />

          <slot name="suffix-slot"></slot>
        </div>

        ${isEnd
          ? html`
              <div class="controls-end">
                <button
                  type="button"
                  class="control-btn decrement-btn"
                  ?disabled="${host.disabled || host.readonly || host.isMinReached}"
                  tabindex="-1"
                  aria-label="값 감소"
                  @click="${host.handleStepDown}"
                >
                  <slot name="decrement-icon-slot">-</slot>
                </button>
                <button
                  type="button"
                  class="control-btn increment-btn"
                  ?disabled="${host.disabled || host.readonly || host.isMaxReached}"
                  tabindex="-1"
                  aria-label="값 증가"
                  @click="${host.handleStepUp}"
                >
                  <slot name="increment-icon-slot">+</slot>
                </button>
              </div>
            `
          : ''}

        ${isStacked
          ? html`
              <div class="controls-stacked">
                <button
                  type="button"
                  class="control-btn increment-btn"
                  ?disabled="${host.disabled || host.readonly || host.isMaxReached}"
                  tabindex="-1"
                  aria-label="값 증가"
                  @click="${host.handleStepUp}"
                >
                  <slot name="increment-icon-slot">▲</slot>
                </button>
                <button
                  type="button"
                  class="control-btn decrement-btn"
                  ?disabled="${host.disabled || host.readonly || host.isMinReached}"
                  tabindex="-1"
                  aria-label="값 감소"
                  @click="${host.handleStepDown}"
                >
                  <slot name="decrement-icon-slot">▼</slot>
                </button>
              </div>
            `
          : ''}

        ${isSplit
          ? html`
              <button
                type="button"
                class="control-btn increment-btn"
                ?disabled="${host.disabled || host.readonly || host.isMaxReached}"
                tabindex="-1"
                aria-label="값 증가"
                @click="${host.handleStepUp}"
              >
                <slot name="increment-icon-slot">+</slot>
              </button>
            `
          : ''}
      </div>

      <div class="helper-wrapper">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};