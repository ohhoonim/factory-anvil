import { html, type TemplateResult } from 'lit';

export interface TileLayoutGridHost {
  mode: 'fixed' | 'masonry';
  columns: number | string;
  minTileWidth: string;
  gap: string;
  aspectRatio: string;
  loading: boolean;
  isEmpty: boolean;
  handleSlotChange: (e: Event) => void;
  handleTileClick: (e: MouseEvent) => void;
  handleKeyDown: (e: KeyboardEvent) => void;
}

export const TileLayoutGridTemplate = (host: TileLayoutGridHost): TemplateResult => {
  const getGapValue = (gap: string) => {
    switch (gap) {
      case 'small':
        return 'var(--biz-tile-layout-grid-gap-sm, 12px)';
      case 'large':
        return 'var(--biz-tile-layout-grid-gap-lg, 24px)';
      case 'medium':
      default:
        return 'var(--biz-tile-layout-grid-gap-md, 16px)';
    }
  };

  const getColumnsStyle = (columns: number | string, minWidth: string) => {
    if (typeof columns === 'number' || (!isNaN(Number(columns)) && columns !== '')) {
      return `repeat(${columns}, minmax(0, 1fr))`;
    }
    if (columns === 'auto-fill') {
      return `repeat(auto-fill, minmax(${minWidth}, 1fr))`;
    }
    return `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
  };

  const containerStyle = `
    --biz-tile-layout-grid-gap-current: ${getGapValue(host.gap)};
    --biz-tile-layout-grid-columns-current: ${getColumnsStyle(host.columns, host.minTileWidth)};
    --biz-tile-layout-grid-aspect-ratio-current: ${host.aspectRatio};
  `;

  return html`
    <div
      class="biz-tile-layout-grid ${host.mode === 'masonry' ? 'biz-tile-layout-grid--masonry' : 'biz-tile-layout-grid--fixed'} ${host.loading ? 'biz-tile-layout-grid--loading' : ''} ${host.isEmpty ? 'biz-tile-layout-grid--empty' : ''}"
      style="${containerStyle}"
      role="grid"
      aria-busy="${host.loading ? 'true' : 'false'}"
      @click="${host.handleTileClick}"
      @keydown="${host.handleKeyDown}"
    >
      <div class="biz-tile-layout-grid__header">
        <slot name="header-slot"></slot>
      </div>

      ${host.loading
        ? html`
            <div class="biz-tile-layout-grid__skeleton-container">
              ${Array.from({ length: 6 }).map(
                () => html`<div class="biz-tile-layout-grid__skeleton-item"></div>`
              )}
            </div>
          `
        : html`
            <div
              class="biz-tile-layout-grid__content ${host.isEmpty ? 'biz-tile-layout-grid__content--hidden' : ''}"
            >
              <slot @slotchange="${host.handleSlotChange}"></slot>
            </div>
            ${host.isEmpty
              ? html`
                  <div class="biz-tile-layout-grid__empty">
                    <slot name="empty-slot">
                      <p class="biz-tile-layout-grid__empty-text">No items available</p>
                    </slot>
                  </div>
                `
              : ''}
          `}
    </div>
  `;
};