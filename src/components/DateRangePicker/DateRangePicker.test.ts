import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, expect as playwrightExpect } from '@open-wc/testing';
import './DateRangePicker.wc.ts';
import type { DateRangePicker } from './DateRangePicker.wc.ts';

describe('DateRangePicker Component Unit & Integration Tests', () => {
  let el: DateRangePicker;

  beforeEach(async () => {
    el = await fixture<DateRangePicker>(html`
      <biz-date-range-picker .clearable=${true}>
        <span slot="label-slot">테스트 날짜 범위</span>
        <span slot="helper-text-slot">안내 메시지</span>
      </biz-date-range-picker>
    `);
  });

  describe('Properties & DOM Rendering', () => {
    it('기본 프로퍼티 설정 및 DOM 바인딩을 확인한다', () => {
      expect(el.variant).toBe('outlined');
      expect(el.size).toBe('medium');
      expect(el.calendarMode).toBe('dual');
      expect(el.inputMode).toBe('double');

      const root = el.shadowRoot?.querySelector('.biz-date-range-picker');
      expect(root?.classList.contains('outlined')).toBe(true);
      expect(root?.classList.contains('medium')).toBe(true);
    });

    it('disabled 및 readonly 속성 적용 시 클래스 및 ARIA 속성을 업데이트한다', async () => {
      el.disabled = true;
      await el.updateComplete;

      const control = el.shadowRoot?.querySelector('.control-container');
      expect(control?.getAttribute('aria-disabled')).toBe('true');
      expect(el.shadowRoot?.querySelector('.biz-date-range-picker')?.classList.contains('disabled')).toBe(true);
    });

    it('value 설정 시 인풋 필드에 포맷팅된 문자열이 반영된다', async () => {
      const startDate = new Date('2026-08-01');
      const endDate = new Date('2026-08-07');
      el.value = [startDate, endDate];
      await el.updateComplete;

      const startInput = el.shadowRoot?.querySelector('.start-input') as HTMLInputElement;
      const endInput = el.shadowRoot?.querySelector('.end-input') as HTMLInputElement;

      expect(startInput.value).toBe('2026-08-01');
      expect(endInput.value).toBe('2026-08-07');
    });
  });

  describe('Event Emission', () => {
    it('초기화 버튼 클릭 시 clear 및 change 커스텀 이벤트를 방출한다', async () => {
      el.value = [new Date('2026-08-01'), new Date('2026-08-07')];
      await el.updateComplete;

      const clearSpy = vi.fn();
      const changeSpy = vi.fn();
      el.addEventListener('clear', clearSpy);
      el.addEventListener('change', changeSpy);

      const clearBtn = el.shadowRoot?.querySelector('.clear-button') as HTMLButtonElement;
      clearBtn.click();

      expect(clearSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail.value).toEqual([null, null]);
    });

    it('인풋 타이핑 시 input 커스텀 이벤트를 방출한다', async () => {
      const inputSpy = vi.fn();
      el.addEventListener('input', inputSpy);

      const startInput = el.shadowRoot?.querySelector('.start-input') as HTMLInputElement;
      startInput.value = '2026-08-01';
      startInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      expect(inputSpy).toHaveBeenCalledTimes(1);
      expect(inputSpy.mock.calls[0][0].detail.rawValue).toBe('2026-08-01');
    });
  });

  describe('Accessibility & Keyboard Interaction', () => {
    it('combobox 및 aria-expanded 속성이 팝오버 상태와 연동된다', async () => {
      const control = el.shadowRoot?.querySelector('.control-container');
      expect(control?.getAttribute('role')).toBe('combobox');
      expect(control?.getAttribute('aria-expanded')).toBe('false');

      (control as HTMLElement).click();
      await el.updateComplete;

      expect(control?.getAttribute('aria-expanded')).toBe('true');
      expect(el.shadowRoot?.querySelector('.popover-panel')).not.toBeNull();
    });

    it('Escape 키 입력 시 열려있는 팝오버를 닫는다', async () => {
      const control = el.shadowRoot?.querySelector('.control-container') as HTMLElement;
      control.click();
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('.popover-panel')).not.toBeNull();

      const root = el.shadowRoot?.querySelector('.biz-date-range-picker') as HTMLElement;
      root.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
      await el.updateComplete;

      expect(el.shadowRoot?.querySelector('.popover-panel')).toBeNull();
    });
  });
});