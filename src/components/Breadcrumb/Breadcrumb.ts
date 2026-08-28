import { html } from "lit";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export interface BreadcrumbHost {
  items: BreadcrumbItem[];
  variant: 'standard' | 'contained' | 'standard-icon';
  size: 'small' | 'medium' | 'large';
  maxItems: number;
  itemsBeforeCollapse: number;
  itemsAfterCollapse: number;
  separator: string;
  disabled: boolean;
  fullWidth: boolean;
  wrap: boolean;
  handleItemClick: (item: BreadcrumbItem, index: number, event: MouseEvent) => void;
  handleOverflowClick: (collapsedItems: BreadcrumbItem[], event: MouseEvent) => void;
}

export const BreadcrumbTemplate = (host: BreadcrumbHost) => {
  const {
    items = [],
    variant = 'standard',
    size = 'medium',
    maxItems = 0,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
    separator = '/',
    disabled = false,
    fullWidth = false,
    wrap = false,
    handleItemClick,
    handleOverflowClick
  } = host;

  const totalItems = items.length;
  const isCollapsed = maxItems > 0 && totalItems > maxItems;

  let renderableItems: { item: BreadcrumbItem; originalIndex: number }[] = [];
  let collapsedItems: { item: BreadcrumbItem; originalIndex: number }[] = [];

  if (isCollapsed) {
    const headCount = Math.max(0, itemsBeforeCollapse);
    const tailCount = Math.max(0, itemsAfterCollapse);

    if (headCount + tailCount < totalItems) {
      const head = items.slice(0, headCount).map((item, index) => ({ item, originalIndex: index }));
      const tail = items.slice(totalItems - tailCount).map((item, index) => ({
        item,
        originalIndex: totalItems - tailCount + index
      }));
      collapsedItems = items
        .slice(headCount, totalItems - tailCount)
        .map((item, index) => ({ item, originalIndex: headCount + index }));

      renderableItems = [...head, ...tail];
    } else {
      renderableItems = items.map((item, index) => ({ item, originalIndex: index }));
    }
  } else {
    renderableItems = items.map((item, index) => ({ item, originalIndex: index }));
  }

  const headItems = isCollapsed ? renderableItems.slice(0, itemsBeforeCollapse) : [];
  const tailItems = isCollapsed ? renderableItems.slice(itemsBeforeCollapse) : renderableItems;

  const renderSeparator = () => html`
    <li class="biz-breadcrumb__separator" aria-hidden="true">
      <slot name="separator-slot">${separator}</slot>
    </li>
  `;

  const renderItem = (entry: { item: BreadcrumbItem; originalIndex: number }) => {
    const { item, originalIndex } = entry;
    const isCurrent = originalIndex === totalItems - 1;

    return html`
      <li class="biz-breadcrumb__item ${isCurrent ? 'biz-breadcrumb__item--current' : ''}">
        ${item.href && !isCurrent && !disabled
          ? html`
              <a
                class="biz-breadcrumb__link"
                href="${item.href}"
                aria-current="${isCurrent ? 'page' : 'false'}"
                @click="${(e: MouseEvent) => handleItemClick(item, originalIndex, e)}"
              >
                ${item.icon ? html`<span class="biz-breadcrumb__icon">${item.icon}</span>` : ''}
                <span class="biz-breadcrumb__label">${item.label}</span>
              </a>
            `
          : html`
              <span
                class="biz-breadcrumb__text"
                aria-current="${isCurrent ? 'page' : 'false'}"
                @click="${(e: MouseEvent) => !disabled && !isCurrent && handleItemClick(item, originalIndex, e)}"
              >
                ${item.icon ? html`<span class="biz-breadcrumb__icon">${item.icon}</span>` : ''}
                <span class="biz-breadcrumb__label">${item.label}</span>
              </span>
            `}
      </li>
    `;
  };

  return html`
    <nav
      class="biz-breadcrumb biz-breadcrumb--${variant} biz-breadcrumb--${size} ${fullWidth ? 'biz-breadcrumb--full-width' : ''} ${wrap ? 'biz-breadcrumb--wrap' : ''} ${disabled ? 'biz-breadcrumb--disabled' : ''}"
      aria-label="Breadcrumb"
      role="navigation"
    >
      <slot name="start-slot"></slot>
      <ol class="biz-breadcrumb__list">
        ${headItems.map((entry, idx) => html`
          ${renderItem(entry)}
          ${renderSeparator()}
        `)}
        ${isCollapsed && collapsedItems.length > 0
          ? html`
              <li class="biz-breadcrumb__item biz-breadcrumb__item--overflow">
                <button
                  type="button"
                  class="biz-breadcrumb__overflow-button"
                  aria-label="Show more navigation items"
                  ?disabled="${disabled}"
                  @click="${(e: MouseEvent) =>
                    handleOverflowClick(
                      collapsedItems.map((c) => c.item),
                      e
                    )}"
                >
                  ...
                </button>
                <slot name="dropdown-slot"></slot>
              </li>
              ${renderSeparator()}
            `
          : ''}
        ${tailItems.map(
          (entry, idx) => html`
            ${renderItem(entry)}
            ${idx < tailItems.length - 1 ? renderSeparator() : ''}
          `
        )}
      </ol>
      <slot name="end-slot"></slot>
    </nav>
  `;
};