import { describe, beforeEach, afterEach, it, vi, test, expect } from "vitest";
import type { TileLayoutGrid } from "./TileLayoutGrid.wc";

describe('TileLayoutGrid Component Unit Tests', () => {
  let element: TileLayoutGrid;

  beforeEach(async () => {
    element = document.createElement('biz-tile-layout-grid') as TileLayoutGrid;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('기본 속성값들이 올바르게 초깃값으로 세팅되어야 한다', () => {
    expect(element.mode).toBe('fixed');
    expect(element.columns).toBe('auto-fit');
    expect(element.minTileWidth).toBe('280px');
    expect(element.gap).toBe('medium');
    expect(element.loading).toBe(false);
  });

  it('속성 변경 시 DOM 렌더링에 정상적으로 반영되어야 한다', async () => {
    element.mode = 'masonry';
    element.loading = true;
    await element.updateComplete;

    const shadowRoot = element.shadowRoot;
    const gridEl = shadowRoot?.querySelector('.biz-tile-layout-grid');

    expect(gridEl?.classList.contains('biz-tile-layout-grid--masonry')).toBe(true);
    expect(gridEl?.getAttribute('aria-busy')).toBe('true');
  });

  it('타일 클릭 시 tile-click 이벤트와 detail 데이터가 정상 방출되어야 한다', async () => {
    const tile = document.createElement('div');
    tile.textContent = 'Test Tile';
    element.appendChild(tile);
    await element.updateComplete;

    const clickSpy = vi.fn();
    element.addEventListener('tile-click', clickSpy);

    tile.click();

    expect(clickSpy).toHaveBeenCalledTimes(1);
    const eventDetail = clickSpy.mock.calls[0][0].detail;
    expect(eventDetail.item).toBe(tile);
    expect(eventDetail.index).toBe(0);
  });
});
