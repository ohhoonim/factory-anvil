import { html } from "lit";

export interface PageHeaderHost {
  title?: string;
  subtitle?: string;
  variant?: 'standard' | 'filled' | 'ghost' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  compact?: boolean;
  loading?: boolean;
  disabled?: boolean;
  error?: boolean;
  handleActionClick?: (actionId: string, event: Event) => void;
}

export const PageHeaderTemplate = (host: PageHeaderHost) => {
  const {
    title = '',
    subtitle = '',
    variant = 'standard',
    size = 'medium',
    compact = false,
    loading = false,
    disabled = false,
    error = false
  } = host;

  return html`
    <header
      class="biz-page-header"
      role="region"
      aria-label="Page Header"
      data-variant="${variant}"
      data-size="${size}"
      ?data-compact="${compact}"
      ?data-loading="${loading}"
      ?data-disabled="${disabled}"
      ?data-error="${error}"
    >
      <div class="biz-page-header__breadcrumb">
        <slot name="breadcrumb-slot"></slot>
      </div>

      <div class="biz-page-header__main">
        <div class="biz-page-header__title-container">
          <div class="biz-page-header__title-wrapper">
            ${title
              ? html`<h1 class="biz-page-header__title">${title}</h1>`
              : html`<slot name="title-slot"></slot>`}
            <div class="biz-page-header__meta-status">
              <slot name="meta-status-slot"></slot>
            </div>
          </div>
          <div class="biz-page-header__subtitle-wrapper">
            ${subtitle
              ? html`<p class="biz-page-header__subtitle">${subtitle}</p>`
              : html`<slot name="subtitle-slot"></slot>`}
          </div>
        </div>

        <div
          class="biz-page-header__extra-actions"
          @click="${(e: Event) => {
            const target = (e.target as HTMLElement).closest('[data-action-id]');
            if (target) {
              const actionId = target.getAttribute('data-action-id') || '';
              host.handleActionClick?.(actionId, e);
            }
          }}"
        >
          <slot name="extra-actions-slot"></slot>
        </div>
      </div>
    </header>
  `;
};