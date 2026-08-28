import { html, nothing } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface ActionButtonItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
}

export interface ActionButtonHost {
  label: string;
  variant: 'solid' | 'outlined' | 'text' | 'split';
  size: 'small' | 'medium' | 'large';
  items: ActionButtonItem[];
  split: boolean;
  open: boolean;
  disabled: boolean;
  loading: boolean;
  fullWidth: boolean;
  placement: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  
  handleMainClick(event: MouseEvent): void;
  handleTriggerClick(event: MouseEvent): void;
  handleItemClick(item: ActionButtonItem, event: MouseEvent): void;
  handleKeyDown(event: KeyboardEvent): void;
}

export const ActionButtonTemplate = (host: ActionButtonHost) => {
  const isSplit = host.split || host.variant === 'split';

  return html`
    <div 
      class=${classMap({
        'biz-action-button': true,
        [`biz-action-button--${host.variant}`]: true,
        [`biz-action-button--${host.size}`]: true,
        'biz-action-button--open': host.open,
        'biz-action-button--disabled': host.disabled,
        'biz-action-button--loading': host.loading,
        'biz-action-button--full-width': host.fullWidth,
        [`biz-action-button--placement-${host.placement}`]: true,
      })}
      @keydown=${host.handleKeyDown}
    >
      <div class="biz-action-button__group">
        <button
          type="button"
          class="biz-action-button__main"
          ?disabled=${host.disabled || host.loading}
          aria-busy=${host.loading ? 'true' : 'false'}
          aria-haspopup=${!isSplit ? 'menu' : 'false'}
          aria-expanded=${!isSplit ? (host.open ? 'true' : 'false') : 'false'}
          aria-controls=${!isSplit ? 'dropdown-menu' : nothing}
          @click=${host.handleMainClick}
        >
          ${host.loading
            ? html`<span class="biz-action-button__spinner" aria-hidden="true"></span>`
            : html`
                <slot name="start-slot"></slot>
                <slot name="label-slot">
                  <span class="biz-action-button__label">${host.label}</span>
                </slot>
                ${!isSplit ? html`<slot name="end-slot"></slot>` : nothing}
              `}
        </button>

        ${isSplit
          ? html`
              <button
                type="button"
                class="biz-action-button__trigger"
                ?disabled=${host.disabled || host.loading}
                aria-haspopup="menu"
                aria-expanded=${host.open ? 'true' : 'false'}
                aria-controls="dropdown-menu"
                aria-label="Sub options"
                @click=${host.handleTriggerClick}
              >
                <slot name="end-slot">
                  <span class="biz-action-button__arrow" aria-hidden="true">▼</span>
                </slot>
              </button>
            `
          : nothing}
      </div>

      ${host.open
        ? html`
            <div
              id="dropdown-menu"
              class="biz-action-button__menu"
              role="menu"
              tabindex="-1"
            >
              <slot name="menu-slot">
                <ul class="biz-action-button__menu-list" role="presentation">
                  ${host.items.map(
                    (item) => html`
                      <li role="none">
                        <button
                          type="button"
                          role="menuitem"
                          class=${classMap({
                            'biz-action-button__menu-item': true,
                            'biz-action-button__menu-item--danger': Boolean(item.danger),
                          })}
                          ?disabled=${Boolean(item.disabled)}
                          @click=${(e: MouseEvent) => host.handleItemClick(item, e)}
                        >
                          ${item.icon
                            ? html`<span class="biz-action-button__menu-icon">${item.icon}</span>`
                            : nothing}
                          <span class="biz-action-button__menu-label">${item.label}</span>
                        </button>
                      </li>
                    `
                  )}
                </ul>
              </slot>
            </div>
          `
        : nothing}

      <div class="biz-action-button__helper">
        <slot name="helper-text-slot"></slot>
      </div>
    </div>
  `;
};