import { html } from 'lit';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbHost {
  items: BreadcrumbItem[];
  separator?: string ;
  onPathClick?: (item: BreadcrumbItem) => void;
}

export const BreadcrumbTemplate = ({ items, separator='/', onPathClick }: BreadcrumbHost) => {

  const handleClick = (e: Event, item: BreadcrumbItem) => {
    e.preventDefault();
    if (onPathClick) {
      onPathClick(item);
    }
  };

  return html`
    <nav class="biz-breadcrumb-nav" aria-label="Breadcrumb" style="--biz-breadcrumb-separator: '${separator}'">
      <ol class="biz-breadcrumb-list">
        ${items.map((item, index) => {
          const isLast = index === items.length - 1;
          return html`
            <li class="biz-breadcrumb-item">
              ${isLast 
                ? html`<span class="biz-breadcrumb-current" aria-current="page">${item.label}</span>`
                : html`
                  <a 
                    href="${item.href || '#'}" 
                    class="biz-breadcrumb-link"
                    @click=${(e: Event) => handleClick(e, item)}
                  >
                    ${item.label}
                  </a>`
              }
            </li>
          `;
        })}
      </ol>
    </nav>
  `;
};
