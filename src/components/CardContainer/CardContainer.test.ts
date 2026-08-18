import { fixture, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit";
import { describe, beforeEach, afterEach, it, vi, expect } from "vitest";

import type { CardContainer as CardContainerWc} from "./CardContainer.wc";

describe('CardContainer Component Unit & Integration Tests', () => {
  let element: CardContainerWc;

  beforeEach(async () => {
    element = await fixture(html`
      <biz-card-container aria-labelledby="test-header">
        <div slot="header-slot" id="test-header">Card Title</div>
        <div>Card Content</div>
        <div slot="footer-slot">Card Footer</div>
      </biz-card-container>
    `);
    await element.updateComplete;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it('기본 속성이 정상 렌더링되고 DOM에 반영된다', async () => {
    expect(element.variant).toBe('outlined');
    expect(element.size).toBe('medium');
    expect(element.fullWidth).toBe(false);

    element.variant = 'filled';
    element.size = 'large';
    element.fullWidth = true;
    await element.updateComplete;

    const innerDiv = element.shadowRoot?.querySelector('.biz-card-container');
    expect(innerDiv?.classList.contains('biz-card-container--filled')).toBe(true);
    expect(innerDiv?.classList.contains('biz-card-container--large')).toBe(true);
    expect(innerDiv?.classList.contains('biz-card-container--full-width')).toBe(true);
  });

  it('hoverable 속성 활성화 시 클릭 이벤트가 정확한 detail과 함께 방출된다', async () => {
    element.hoverable = true;
    await element.updateComplete;

    const clickSpy = vi.fn();
    element.addEventListener('card-click', clickSpy);

    const innerDiv = element.shadowRoot?.querySelector('.biz-card-container') as HTMLElement;
    innerDiv.click();

    expect(clickSpy).toHaveBeenCalledTimes(1);
    const eventDetail = clickSpy.mock.calls[0][0].detail;
    expect(eventDetail).toHaveProperty('originalEvent');
  });

  it('disabled 상태일 때 클릭 및 이벤트 방출이 차단된다', async () => {
    element.hoverable = true;
    element.disabled = true;
    await element.updateComplete;

    const clickSpy = vi.fn();
    element.addEventListener('card-click', clickSpy);

    const innerDiv = element.shadowRoot?.querySelector('.biz-card-container') as HTMLElement;
    innerDiv.click();

    expect(clickSpy).not.toHaveBeenCalled();
    expect(innerDiv.getAttribute('aria-disabled')).toBe('true');
  });

  it('loading 상태일 때 로딩 오버레이가 표시되고 aria-busy가 true로 설정된다', async () => {
    element.loading = true;
    await element.updateComplete;

    const innerDiv = element.shadowRoot?.querySelector('.biz-card-container');
    const overlay = element.shadowRoot?.querySelector('.biz-card-container__loading-overlay');

    expect(overlay).not.toBeNull();
    expect(innerDiv?.getAttribute('aria-busy')).toBe('true');
  });

  it('ARIA 연동 속성이 섀도 DOM 내부 요소에 연동된다', async () => {
    const innerDiv = element.shadowRoot?.querySelector('.biz-card-container');
    expect(innerDiv?.getAttribute('aria-labelledby')).toBe('test-header');
  });

  it('키보드 인터랙션(Enter, Space) 시 card-click 이벤트가 방출된다', async () => {
    element.hoverable = true;
    await element.updateComplete;

    const clickSpy = vi.fn();
    element.addEventListener('card-click', clickSpy);

    const innerDiv = element.shadowRoot?.querySelector('.biz-card-container') as HTMLElement;

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true });
    innerDiv.dispatchEvent(enterEvent);

    expect(clickSpy).toHaveBeenCalledTimes(1);

    const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, composed: true });
    innerDiv.dispatchEvent(spaceEvent);

    expect(clickSpy).toHaveBeenCalledTimes(2);
  });
});