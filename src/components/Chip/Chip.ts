import { html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { repeat } from "lit/directives/repeat.js";

export interface ChipTemplateContext {
  value: string[];
  placeholder: string;
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  readonly: boolean;
  required: boolean;
  error: boolean;
  deletable: boolean;
  focusedChipIndex: number;
  isFocused: boolean;
  inputValue: string;
  liveMessage: string;
  helperTextId: string;
  onInput: (e: InputEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
  onFocus: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onRemoveChip: (index: number) => void;
  onContainerClick: () => void;
}

export const ChipTemplate = (ctx: ChipTemplateContext) => {
  const sizeClass = ctx.size === 'small' ? 'sm' : ctx.size === 'large' ? 'lg' : 'md';
  const variantClass = ctx.variant || 'outlined';

  return html`
    <div
      class=${classMap({
        'biz-chip': true,
        [`biz-chip--${variantClass}`]: true,
        [`biz-chip--${sizeClass}`]: true,
      })}
    >
      <slot name="label-slot">
        <label class="biz-chip__label"></label>
      </slot>

      <div
        class=${classMap({
          'biz-chip__container': true,
          'biz-chip__container--focused': ctx.isFocused,
          'biz-chip__container--disabled': ctx.disabled,
          'biz-chip__container--readonly': ctx.readonly,
          'biz-chip__container--error': ctx.error,
        })}
        @click=${ctx.onContainerClick}
      >
        <slot name="start-slot"></slot>

        <ul class="biz-chip__item-list" role="list">
          ${repeat(
            ctx.value,
            (item) => item,
            (item, index) => html`
              <li
                class=${classMap({
                  'biz-chip__item': true,
                  'biz-chip__item--focused': ctx.focusedChipIndex === index,
                })}
                role="listitem"
                tabindex=${ctx.focusedChipIndex === index ? '0' : '-1'}
              >
                <slot name="chip-item-slot" .item=${item} .index=${index}>
                  <span>${item}</span>
                  ${ctx.deletable && !ctx.disabled && !ctx.readonly
                    ? html`
                        <button
                          type="button"
                          class="biz-chip__delete-btn"
                          aria-label=${`삭제: ${item}`}
                          tabindex="-1"
                          @click=${(e: Event) => {
                            e.stopPropagation();
                            ctx.onRemoveChip(index);
                          }}
                        >
                          &times;
                        </button>
                      `
                    : ''}
                </slot>
              </li>
            `
          )}
        </ul>

        ${!ctx.readonly
          ? html`
              <input
                type="text"
                class="biz-chip__input"
                .value=${live(ctx.inputValue)}
                placeholder=${ctx.value.length === 0 ? ctx.placeholder : ''}
                ?disabled=${ctx.disabled}
                ?readonly=${ctx.readonly}
                aria-invalid=${ctx.error ? 'true' : 'false'}
                aria-required=${ctx.required ? 'true' : 'false'}
                aria-describedby=${ctx.helperTextId}
                @input=${ctx.onInput}
                @keydown=${ctx.onKeyDown}
                @focus=${ctx.onFocus}
                @blur=${ctx.onBlur}
              />
            `
          : ''}

        <slot name="end-slot"></slot>
      </div>

      <div
        id=${ctx.helperTextId}
        class=${classMap({
          'biz-chip__helper-text': true,
          'biz-chip__helper-text--error': ctx.error,
        })}
      >
        <slot name="helper-text-slot"></slot>
      </div>

      <div class="sr-only" aria-live="polite" aria-atomic="true">
        ${ctx.liveMessage}
      </div>
    </div>
  `;
};