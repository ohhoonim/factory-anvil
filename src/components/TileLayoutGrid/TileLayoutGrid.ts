import { html } from 'lit';

export interface TileLayoutGridTemplateProps {
  mode: 'fixed' | 'masonry';
  columns: number | string;
  minTileWidth: string;
  gap: 'small' | 'medium' | 'large' | string;
  aspectRatio: string;
  loading: boolean;
  isEmpty: boolean;
  onSlotChange: (e: Event) => void;
  onTileClick: (e: MouseEvent) => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

export const TileLayoutGridTemplate = (props: TileLayoutGridTemplateProps) => {
  const getGapValue = (gap: string) => {
    switch (gap) {
      case 'small':
        return 'var(--biz-tile-layout-grid-gap-sm, 12px)';
      case 'medium':
        return 'var(--biz-tile-layout-grid-gap-md, 16px)';
      case 'large':
        return 'var(--biz-tile-layout-grid-gap-lg, 24px)';
      default:
        return gap;
    }
  };

  const getColumnsValue = (columns: number | string, minWidth: string) => {
    if (typeof columns === 'number') {
      return `repeat(${columns}, minmax(0, 1fr))`;
    }
    if (columns === 'auto-fit' || columns === 'auto-fill') {
      return `repeat(${columns}, minmax(${minWidth}, 1fr))`;
    }
    return columns;
  };

  const inlineStyles = `
    --biz-tile-layout-grid-columns: ${getColumnsValue(props.columns, props.minTileWidth)};
    --biz-tile-layout-grid-gap-current: ${getGapValue(props.gap)};
    --biz-tile-layout-grid-aspect-ratio-current: ${props.aspectRatio};
  `;

  return html`
    <div
      class="biz-tile-layout-grid ${props.mode === 'masonry' ? 'biz-tile-layout-grid--masonry' : 'biz-tile-layout-grid--fixed'} ${props.loading ? 'biz-tile-layout-grid--loading' : ''} ${props.isEmpty ? 'biz-tile-layout-grid--empty' : ''}"
      style="${inlineStyles}"
      role="grid"
      aria-busy="${props.loading ? 'true' : 'false'}"
      @click="${props.onTileClick}"
      @keydown="${props.onKeyDown}"
    >
      <header class="biz-tile-layout-grid__header">
        <slot name="header-slot"></slot>
      </header>

      ${props.loading
        ? html`
            <div class="biz-tile-layout-grid__skeleton-container" aria-hidden="true">
              ${Array.from({ length: 6 }).map(
                () => html`<div class="biz-tile-layout-grid__skeleton-item"></div>`
              )}
            </div>
          `
        : html`
            <main class="biz-tile-layout-grid__body">
              <slot @slotchange="${props.onSlotChange}"></slot>
              ${props.isEmpty
                ? html`
                    <div class="biz-tile-layout-grid__empty">
                      <slot name="empty-slot">
                        <p class="biz-tile-layout-grid__empty-text">표시할 타일이 없습니다.</p>
                      </slot>
                    </div>
                  `
                : ''}
            </main>
          `}
    </div>
  `;
};