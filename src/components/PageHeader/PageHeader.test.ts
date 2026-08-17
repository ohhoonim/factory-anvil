import { expect, fixtureCleanup, fixtureSync, html } from "@open-wc/testing";
import { afterEach, beforeEach, describe, it, vi } from "vitest";
import type { PageHeader } from "./PageHeader.wc";

describe('PageHeader Component (Unit & Integration Tests)', () => {
  let element: PageHeader;

  beforeEach(async () => {
    element = fixtureSync(html`<biz-page-header title="Test Title" subtitle="Test Subtitle"></biz-page-header>`);
    await element.updateComplete;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  describe('Property & DOM Rendering', () => {
    it('속성(Properties) 반영에 맞춰 타이틀과 서브타이틀이 정상 렌더링된다', async () => {
      const headerEl = element.shadowRoot?.querySelector('.biz-page-header');
      expect(headerEl).not.toBeNull();

      const titleEl = element.shadowRoot?.querySelector('.biz-page-header__title');
      const subtitleEl = element.shadowRoot?.querySelector('.biz-page-header__subtitle');

      expect(titleEl?.textContent?.trim()).toBe('Test Title');
      expect(subtitleEl?.textContent?.trim()).toBe('Test Subtitle');
    });

    it('variant 및 size 속성에 따라 올바른 클래스가 바인딩된다', async () => {
      element.variant = 'filled';
      element.size = 'large';
      element.fullWidth = true;
      element.compact = true;
      await element.updateComplete;

      const headerEl = element.shadowRoot?.querySelector('.biz-page-header');
      expect(headerEl?.classList.contains('filled')).toBe(true);
      expect(headerEl?.classList.contains('large')).toBe(true);
      expect(headerEl?.classList.contains('full-width')).toBe(true);
      expect(headerEl?.classList.contains('compact')).toBe(true);
    });
  });

  describe('Events & Interaction', () => {
    it('data-action-id가 지정된 엘리먼트 클릭 시 action-click 커스텀 이벤트가 방출된다', async () => {
      element = fixtureSync(html`
        <biz-page-header>
          <div slot="extra-actions-slot">
            <button id="action-btn" data-action-id="save-action">저장</button>
          </div>
        </biz-page-header>
      `);
      await element.updateComplete;

      const handleActionClick = vi.fn();
      element.addEventListener('action-click', handleActionClick);

      const actionBtn = element.querySelector('#action-btn') as HTMLButtonElement;
      actionBtn.click();

      expect(handleActionClick).toHaveBeenCalledTimes(1);
      const eventDetail = handleActionClick.mock.calls[0][0].detail;
      expect(eventDetail).toEqual({ actionId: 'save-action' });
    });

    it('disabled 상태일 때는 action-click 이벤트가 방출되지 않는다', async () => {
      element = fixtureSync(html`
        <biz-page-header disabled>
          <div slot="extra-actions-slot">
            <button id="action-btn" data-action-id="save-action">저장</button>
          </div>
        </biz-page-header>
      `);
      await element.updateComplete;

      const handleActionClick = vi.fn();
      element.addEventListener('action-click', handleActionClick);

      const actionBtn = element.querySelector('#action-btn') as HTMLButtonElement;
      actionBtn.click();

      expect(handleActionClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility (WAI-ARIA & Keyboard Navigation)', () => {
    it('error 및 disabled 상태 시 ARIA 속성이 올바르게 설정된다', async () => {
      element.error = true;
      element.disabled = true;
      await element.updateComplete;

      const headerEl = element.shadowRoot?.querySelector('.biz-page-header');
      expect(headerEl?.getAttribute('aria-invalid')).toBe('true');
      expect(headerEl?.getAttribute('aria-disabled')).toBe('true');
      expect(headerEl?.getAttribute('role')).toBe('region');
    });

    it('Escape 키 입력 시 clear 이벤트가 방출된다', async () => {
      const handleClear = vi.fn();
      element.addEventListener('clear', handleClear);

      const headerEl = element.shadowRoot?.querySelector('.biz-page-header') as HTMLElement;
      headerEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));

      expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it('action 요소를 포커스하고 Enter 키 입력 시 action-click 이벤트가 방출된다', async () => {
      element = fixtureSync(html`
        <biz-page-header>
          <div slot="extra-actions-slot">
            <button id="action-btn" data-action-id="submit-action">제출</button>
          </div>
        </biz-page-header>
      `);
      await element.updateComplete;

      const handleActionClick = vi.fn();
      element.addEventListener('action-click', handleActionClick);

      const actionBtn = element.querySelector('#action-btn') as HTMLButtonElement;
      actionBtn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));

      expect(handleActionClick).toHaveBeenCalledTimes(1);
      expect(handleActionClick.mock.calls[0][0].detail).toEqual({ actionId: 'submit-action' });
    });
  });
});