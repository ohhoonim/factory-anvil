import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { ContentContainer } from './ContentContainer.wc';
import './ContentContainer.wc';



describe('ContentContainer Unit Tests', () => {
  let element: ContentContainer;

  beforeEach(async () => {
    element = document.createElement('biz-content-container') as ContentContainer;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('기본 속성값이 올바르게 설정되어야 한다', () => {
    expect(element.variant).toBe('standard');
    expect(element.size).toBe('medium');
    expect(element.centered).toBe(false);
    expect(element.scrollable).toBe(false);
    expect(element.padding).toBe(true);
    expect(element.loading).toBe(false);
    expect(element.empty).toBe(false);
  });

  it('속성 변경에 따라 섀도 DOM 클래스 및 ARIA 속성이 적절히 반영되어야 한다', async () => {
    element.variant = 'card';
    element.size = 'large';
    element.loading = true;
    await element.updateComplete;

    const mainEl = element.shadowRoot?.querySelector('main');
    expect(mainEl?.classList.contains('biz-content-container--card')).toBe(true);
    expect(mainEl?.classList.contains('biz-content-container--large')).toBe(true);
    expect(mainEl?.getAttribute('aria-busy')).toBe('true');
  });

  it('scrollable 속성이 true일 때 tabindex="0" 속성이 설정되고 scroll 커스텀 이벤트가 방출되어야 한다', async () => {
    element.scrollable = true;
    await element.updateComplete;

    expect(element.getAttribute('tabindex')).toBe('0');

    const handleScrollSpy = vi.fn();
    element.addEventListener('scroll', handleScrollSpy);

    const mainEl = element.shadowRoot?.querySelector('main');
    if (mainEl) {
      mainEl.dispatchEvent(new Event('scroll'));
    }

    expect(handleScrollSpy).toHaveBeenCalled();
    const eventDetail = handleScrollSpy.mock.calls[0][0].detail;
    expect(eventDetail).toHaveProperty('scrollTop');
  });

  it('키보드 입력(PageDown, PageUp 등)에 대응하여 스크롤 동작 로직이 호출되어야 한다', async () => {
    element.scrollable = true;
    await element.updateComplete;

    const mainEl = element.shadowRoot?.querySelector('main');
    if (mainEl) {
      Object.defineProperty(mainEl, 'clientHeight', { value: 100, configurable: true });
      mainEl.scrollTop = 0;

      const event = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true });
      element.dispatchEvent(event);

      expect(mainEl.scrollTop).toBe(100);
    }
  });
});
