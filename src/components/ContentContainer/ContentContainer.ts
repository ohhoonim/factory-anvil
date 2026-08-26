import { html } from 'lit';

export interface ContentContainerHost {
  variant?: 'standard' | 'fluid' | 'card';
  size?: 'small' | 'medium' | 'large' | 'full';
  centered?: boolean;
  scrollable?: boolean;
  padding?: boolean;
  loading?: boolean;
  empty?: boolean;
  handleScroll?: (event: Event) => void;
}

export const ContentContainerTemplate = (host: ContentContainerHost) => {
  const {
    variant = 'standard',
    size = 'medium',
    centered = false,
    scrollable = false,
    padding = true,
    loading = false,
    empty = false,
    handleScroll,
  } = host;

  const classes = [
    'biz-content-container',
    `biz-content-container--${variant}`,
    `biz-content-container--${size}`,
    centered ? 'biz-content-container--centered' : '',
    scrollable ? 'biz-content-container--scrollable' : '',
    padding ? 'biz-content-container--padding' : '',
    loading ? 'biz-content-container--loading' : '',
    empty ? 'biz-content-container--empty' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return html`
    <main
      class="${classes}"
      role="main"
      aria-busy="${loading ? 'true' : 'false'}"
      @scroll="${scrollable ? handleScroll : null}"
    >
      <div class="biz-content-container__header">
        <slot name="header-slot"></slot>
      </div>

      <div class="biz-content-container__body">
        ${loading
          ? html`
              <div class="biz-content-container__loading-state" aria-live="polite">
                <slot name="loading-slot">
                  <span class="biz-content-container__spinner" aria-hidden="true"></span>
                  <span class="biz-content-container__sr-only">로딩 중...</span>
                </slot>
              </div>
            `
          : empty
          ? html`
              <div class="biz-content-container__empty-state">
                <slot name="empty-slot">
                  <p class="biz-content-container__empty-text">표시할 콘텐츠가 없습니다.</p>
                </slot>
              </div>
            `
          : html`<slot></slot>`}
      </div>

      <div class="biz-content-container__footer">
        <slot name="footer-slot"></slot>
      </div>
    </main>
  `;
};