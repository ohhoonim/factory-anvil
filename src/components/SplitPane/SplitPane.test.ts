import { beforeEach, describe, expect, it, vi } from "vitest";
import type { BizSplitPane } from "./SplitPane.wc";
import { fixture } from "@open-wc/testing";
import { html } from "lit";

describe('BizSplitPane Component Tests', () => {
  let element: BizSplitPane;

  beforeEach(async () => {
    element = await fixture<BizSplitPane>(html`
      <biz-split-pane>
        <div slot="pane-1-slot">Pane 1</div>
        <div slot="pane-2-slot">Pane 2</div>
      </biz-split-pane>
    `);
    await element.updateComplete;
  });

  describe('1. Properties 및 DOM 바인딩 테스트', () => {
    it('기본속성(direction: horizontal, disabled: false 등)이 정상 적용되어야 한다.', () => {
      expect(element.direction).to.equal('horizontal');
      expect(element.disabled).to.be.false;
      expect(element.variant).to.equal('line');
      expect(element.size).to.equal('medium');
    });

    it('direction 속성 변경 시 shadow DOM 클래스가 업데이트되어야 한다.', async () => {
      element.direction = 'vertical';
      await element.updateComplete;

      const container = element.shadowRoot?.querySelector('.biz-split-pane');
      expect(container?.classList.contains('biz-split-pane--vertical')).to.be.true;
    });

    it('disabled 속성 활성화 시 resizer에 tabindex -1이 부여되고 disabled 클래스가 추가되어야 한다.', async () => {
      element.disabled = true;
      await element.updateComplete;

      const resizer = element.shadowRoot?.querySelector('[role="separator"]');
      expect(resizer?.getAttribute('tabindex')).to.equal('-1');
      expect(resizer?.getAttribute('aria-disabled')).to.equal('true');
    });
  });

  describe('2. WAI-ARIA 및 웹 접근성 테스트', () => {
    it('Resizer 요소에 적절한 ARIA 속성이 부여되어야 한다.', () => {
      const resizer = element.shadowRoot?.querySelector('[role="separator"]');
      expect(resizer).to.exist;
      expect(resizer?.getAttribute('aria-orientation')).to.equal('horizontal');
      expect(resizer?.getAttribute('aria-valuenow')).to.equal('50');
      expect(resizer?.getAttribute('aria-controls')).to.equal('pane-1 pane-2');
    });
  });

  describe('3. 키보드 인터랙션 테스트', () => {
    it('ArrowRight 키 입력 시 패널 비율 변경 및 resize 이벤트가 방출되어야 한다.', async () => {
      const resizer = element.shadowRoot?.querySelector('[role="separator"]') as HTMLElement;
      expect(resizer).to.exist;

      const spy = vi.fn();
      element.addEventListener('resize', spy);

      resizer.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      expect(element.sizes[0]).to.equal(55);
      expect(element.sizes[1]).to.equal(45);
    });

    it('Home 및 End 키 입력 시 최소/최대 크기로 조절되어야 한다.', async () => {
      const resizer = element.shadowRoot?.querySelector('[role="separator"]') as HTMLElement;

      resizer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
      await element.updateComplete;
      expect(element.sizes[0]).to.equal(0);

      resizer.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
      await element.updateComplete;
      expect(element.sizes[0]).to.equal(100);
    });

    it('collapsible 모드에서 Enter 키 입력 시 collapse 이벤트가 방출되어야 한다.', async () => {
      element.collapsible = true;
      await element.updateComplete;

      const resizer = element.shadowRoot?.querySelector('[role="separator"]') as HTMLElement;
      const spy = vi.fn();
      element.addEventListener('collapse', spy);

      resizer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
      expect(spy.mock.calls[0][0].detail.collapsed).to.be.true;
    });
  });

  describe('4. 마우스 및 드래그 이벤트 테스트', () => {
    it('pointerdown 시 resize-start 이벤트가 방출되어야 한다.', async () => {
      const resizer = element.shadowRoot?.querySelector('[role="separator"]') as HTMLElement;
      const spy = vi.fn();
      element.addEventListener('resize-start', spy);

      resizer.dispatchEvent(new PointerEvent('pointerdown', { clientX: 100, clientY: 100, bubbles: true }));
      await element.updateComplete;

      expect(spy).toHaveBeenCalledOnce();
    });
  });
});