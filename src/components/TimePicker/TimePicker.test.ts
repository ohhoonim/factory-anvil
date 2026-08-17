import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './TimePicker.wc.ts';
import { BizTimePicker } from './TimePicker.wc.ts';

describe('BizTimePicker Component', () => {
  let element: BizTimePicker;

  beforeEach(async () => {
    element = document.createElement('biz-time-picker') as BizTimePicker;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  describe('Properties and Render Verification', () => {
    it('should reflect initial property values correctly', () => {
      expect(element.variant).toBe('outlined');
      expect(element.size).toBe('medium');
      expect(element.disabled).toBe(false);
      expect(element.readonly).toBe(false);
      expect(element.use12Hours).toBe(false);
    });

    it('should format and set display value when value property changes', async () => {
      element.value = '14:30';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('.biz-time-picker__input') as HTMLInputElement;
      expect(input.value).toBe('14:30');
    });

    it('should correctly format 12-hour system string', async () => {
      element.use12Hours = true;
      element.value = '14:30';
      await element.updateComplete;

      const input = element.shadowRoot?.querySelector('.biz-time-picker__input') as HTMLInputElement;
      expect(input.value).toBe('02:30 PM');
    });
  });

  describe('Events Dispatching', () => {
    it('should dispatch input event when typing in input field', async () => {
      const inputSpy = vi.fn();
      element.addEventListener('input', inputSpy);

      const input = element.shadowRoot?.querySelector('.biz-time-picker__input') as HTMLInputElement;
      input.value = '10:20';
      input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      expect(inputSpy).toHaveBeenCalledTimes(1);
      const customEvent = inputSpy.mock.calls[0][0] as CustomEvent;
      expect(customEvent.detail.rawValue).toBe('10:20');
    });

    it('should dispatch clear and change events when clear button is clicked', async () => {
      element.value = '10:00';
      element.clearable = true;
      await element.updateComplete;

      const clearSpy = vi.fn();
      const changeSpy = vi.fn();
      element.addEventListener('clear', clearSpy);
      element.addEventListener('change', changeSpy);

      const clearBtn = element.shadowRoot?.querySelector('.biz-time-picker__clear-button') as HTMLButtonElement;
      expect(clearBtn).not.toBeNull();
      clearBtn.click();

      expect(clearSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledTimes(1);
      const changeEvent = changeSpy.mock.calls[0][0] as CustomEvent;
      expect(changeEvent.detail.value).toBe('');
      expect(changeEvent.detail.time).toBeNull();
    });

    it('should dispatch open and close events when toggling panel', async () => {
      const openSpy = vi.fn();
      const closeSpy = vi.fn();
      element.addEventListener('open', openSpy);
      element.addEventListener('close', closeSpy);

      const control = element.shadowRoot?.querySelector('.biz-time-picker__control') as HTMLElement;
      control.click();
      await element.updateComplete;

      expect(openSpy).toHaveBeenCalledTimes(1);

      control.click();
      await element.updateComplete;

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility & Keyboard Navigation', () => {
    it('should bind combobox ARIA attributes correctly on control', async () => {
      const control = element.shadowRoot?.querySelector('[role="combobox"]');
      expect(control).not.toBeNull();
      expect(control?.getAttribute('aria-expanded')).toBe('false');
      expect(control?.getAttribute('aria-haspopup')).toBe('listbox');

      control?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      await element.updateComplete;

      expect(control?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should close panel on Escape keydown', async () => {
      const control = element.shadowRoot?.querySelector('.biz-time-picker__control') as HTMLElement;
      control.click();
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.biz-time-picker__panel')).not.toBeNull();

      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await element.updateComplete;

      expect(element.shadowRoot?.querySelector('.biz-time-picker__panel')).toBeNull();
    });

    it('should navigate active columns on ArrowRight and ArrowLeft keydown', async () => {
      element.use12Hours = true;
      await element.updateComplete;

      const control = element.shadowRoot?.querySelector('.biz-time-picker__control') as HTMLElement;
      control.click();
      await element.updateComplete;

      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await element.updateComplete;

      const activeColumn = element.shadowRoot?.querySelector('.biz-time-picker__column--active');
      expect(activeColumn?.getAttribute('aria-label')).toBe('Hour');
    });
  });
});