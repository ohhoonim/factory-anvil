import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as playwrightExpect } from '@open-wc/testing';
import { BizDatePicker } from './DatePicker.wc.js';

describe('BizDatePicker Unit & Integration Tests', () => {
  let el: BizDatePicker;

  beforeEach(async () => {
    el = await fixture<BizDatePicker>(html`<biz-date-picker></biz-date-picker>`);
  });

  describe('Property & DOM Binding', () => {
    it('기본 프로퍼티 값이 올바르게 초기화되어야 한다', () => {
      expect(el.variant).toBe('outlined');
      expect(el.size).toBe('medium');
      expect(el.mode).toBe('single');
      expect(el.format).toBe('YYYY-MM-DD');
      expect(el.clearable).toBe(false);
      expect(el.disabled).toBe(false);
      expect(el.readonly).toBe(false);
      expect(el.error).toBe(false);
    });

    it('value 변경 시 input 요소의 value가 상응하게 동기화되어야 한다', async () => {
      el.value = '2026-08-17';
      await el.updateComplete;

      const inputEl = el.shadowRoot?.querySelector('input');
      expect(inputEl?.value).toBe('2026-08-17');
    });

    it('disabled 상태일 때 input과 버튼이 비활성화되어야 한다', async () => {
      el.disabled = true;
      await el.updateComplete;

      const inputEl = el.shadowRoot?.querySelector('input');
      const triggerBtn = el.shadowRoot?.querySelector('.biz-date-picker__trigger-btn') as HTMLButtonElement;

      expect(inputEl?.disabled).toBe(true);
      expect(triggerBtn?.disabled).toBe(true);
    });
  });

  describe('Events & Interaction', () => {
    it('직접 타이핑 시 input 커스텀 이벤트가 방출되어야 한다', async () => {
      const inputHandler = vi.fn();
      el.addEventListener('input', inputHandler);

      const inputEl = el.shadowRoot?.querySelector('input') as HTMLInputElement;
      inputEl.value = '2026-12-25';
      inputEl.dispatchEvent(new Event('input'));

      expect(inputHandler).toHaveBeenCalledOnce();
      const customEvent = inputHandler.mock.calls[0][0] as CustomEvent;
      expect(customEvent.detail.rawValue).toBe('2026-12-25');
    });

    it('초기화 버튼 클릭 시 clear 및 change 커스텀 이벤트가 방출되어야 한다', async () => {
      el.value = '2026-08-17';
      el.clearable = true;
      await el.updateComplete;

      const clearHandler = vi.fn();
      const changeHandler = vi.fn();
      el.addEventListener('clear', clearHandler);
      el.addEventListener('change', changeHandler);

      const clearBtn = el.shadowRoot?.querySelector('.biz-date-picker__clear-btn') as HTMLButtonElement;
      clearBtn.click();

      expect(clearHandler).toHaveBeenCalledOnce();
      expect(changeHandler).toHaveBeenCalledOnce();
      expect(el.value).toBeNull();
    });

    it('트리거 버튼 클릭 시 open 이벤트 방출과 함께 팝오버가 열려야 한다', async () => {
      const openHandler = vi.fn();
      el.addEventListener('open', openHandler);

      const triggerBtn = el.shadowRoot?.querySelector('.biz-date-picker__trigger-btn') as HTMLButtonElement;
      triggerBtn.click();
      await el.updateComplete;

      expect(openHandler).toHaveBeenCalledOnce();
      const popover = el.shadowRoot?.querySelector('.biz-date-picker__popover');
      expect(popover).not.toBeNull();
    });
  });

  describe('Accessibility & Keyboard Navigation', () => {
    it('input 요소에 ARIA 및 Role 속성이 명확히 정의되어 있어야 한다', async () => {
      const inputEl = el.shadowRoot?.querySelector('input');
      expect(inputEl?.getAttribute('role')).toBe('combobox');
      expect(inputEl?.getAttribute('aria-haspopup')).toBe('dialog');
      expect(inputEl?.getAttribute('aria-expanded')).toBe('false');
    });

    it('Escape 키 입력을 통해 열려있는 팝오버를 닫을 수 있어야 한다', async () => {
      const triggerBtn = el.shadowRoot?.querySelector('.biz-date-picker__trigger-btn') as HTMLButtonElement;
      triggerBtn.click();
      await el.updateComplete;

      const closeHandler = vi.fn();
      el.addEventListener('close', closeHandler);

      const container = el.shadowRoot?.querySelector('.biz-date-picker') as HTMLElement;
      container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await el.updateComplete;

      expect(closeHandler).toHaveBeenCalledOnce();
      const popover = el.shadowRoot?.querySelector('.biz-date-picker__popover');
      expect(popover).toBeNull();
    });
  });
});