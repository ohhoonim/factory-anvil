import { html, nothing } from 'lit';

export interface PageHeaderContext {
  title?: string;
  subtitle?: string;
  variant: 'standard' | 'filled' | 'ghost';
  size: 'small' | 'medium' | 'large';
  fullWidth: boolean;
  compact: boolean;
  loading: boolean;
  disabled: boolean;
  error: boolean;
  titleId?: string;
  subtitleId?: string;
  handleActionClick?: (e: MouseEvent) => void;
  handleKeyDown?: (e: KeyboardEvent) => void;
  handleSlotChange?: (e: Event) => void;
}

export const PageHeaderTemplate = (context: PageHeaderContext) => html`
  <header
    class="biz-page-header ${context.variant} ${context.size} ${context.fullWidth ? 'full-width' : ''} ${context.compact ? 'compact' : ''} ${context.disabled ? 'disabled' : ''} ${context.error ? 'error' : ''} ${context.loading ? 'loading' : ''}"
    role="region"
    aria-label="Page Header"
    aria-invalid=${context.error ? 'true' : 'false'}
    aria-disabled=${context.disabled ? 'true' : 'false'}
    @click=${context.handleActionClick}
    @keydown=${context.handleKeyDown}
  >
    ${context.loading
      ? html`
          <div class="biz-page-header__skeleton">
            <div class="biz-page-header__skeleton-breadcrumb"></div>
            <div class="biz-page-header__skeleton-title"></div>
            <div class="biz-page-header__skeleton-subtitle"></div>
          </div>
        `
      : html`
          <div class="biz-page-header__breadcrumb">
            <slot name="breadcrumb-slot" @slotchange=${context.handleSlotChange}></slot>
          </div>

          <div class="biz-page-header__main">
            <div class="biz-page-header__title-container">
              <slot name="title-slot" id=${context.titleId || 'title-slot'} @slotchange=${context.handleSlotChange}>
                ${context.title ? html`<h1 class="biz-page-header__title">${context.title}</h1>` : nothing}
              </slot>
              <div class="biz-page-header__meta-status">
                <slot name="meta-status-slot" @slotchange=${context.handleSlotChange}></slot>
              </div>
            </div>

            <div class="biz-page-header__extra-actions">
              <slot name="extra-actions-slot" @slotchange=${context.handleSlotChange}></slot>
            </div>
          </div>

          <div class="biz-page-header__subtitle-container">
            <slot name="subtitle-slot" id=${context.subtitleId || 'subtitle-slot'} @slotchange=${context.handleSlotChange}>
              ${context.subtitle ? html`<p class="biz-page-header__subtitle">${context.subtitle}</p>` : nothing}
            </slot>
          </div>
        `}
  </header>
`;