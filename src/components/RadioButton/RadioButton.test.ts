import { describe, it, expect, beforeEach, vi } from 'vitest';
import './RadioButton.wc';
import { RadioButton } from './RadioButton.wc';

describe('RadioButton Component Unit Tests', () => {

  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('renders with default property values', async () => {
    const el = document.createElement('biz-radio-button') as RadioButton;
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.checked).toBe(false);
    expect(el.value).toBe('');
    expect(el.size).toBe('medium');
    expect(el.variant).toBe('standard');
    expect(el.getAttribute('aria-checked')).toBe('false');
  });

  it('reflects property changes to DOM attributes and ARIA attributes', async () => {
    const el = document.createElement('biz-radio-button') as RadioButton;
    document.body.appendChild(el);

    el.checked = true;
    el.disabled = true;
    el.error = true;
    await el.updateComplete;

    expect(el.getAttribute('aria-checked')).toBe('true');
    expect(el.getAttribute('aria-disabled')).toBe('true');
    expect(el.getAttribute('aria-invalid')).toBe('true');
  });

  it('dispatches change and input events with detailed payload upon user interaction', async () => {
    const el = document.createElement('biz-radio-button') as RadioButton;
    el.value = 'radio-1';
    document.body.appendChild(el);
    await el.updateComplete;

    const changeSpy = vi.fn();
    const inputSpy = vi.fn();
    el.addEventListener('change', changeSpy);
    el.addEventListener('input', inputSpy);

    const inputEl = el.shadowRoot?.querySelector('input') as HTMLInputElement;
    inputEl.checked = true;
    inputEl.dispatchEvent(new Event('change', { bubbles: true }));
    inputEl.dispatchEvent(new Event('input', { bubbles: true }));

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(inputSpy).toHaveBeenCalledTimes(1);

    const changeEvent = changeSpy.mock.calls[0][0] as CustomEvent;
    expect(changeEvent.detail).toEqual({ checked: true, value: 'radio-1' });
  });

  it('dispatches clear event and resets checked property when clear() is invoked', async () => {
    const el = document.createElement('biz-radio-button') as RadioButton;
    el.checked = true;
    el.value = 'radio-clear';
    document.body.appendChild(el);
    await el.updateComplete;

    const clearSpy = vi.fn();
    el.addEventListener('clear', clearSpy);

    el.clear();
    await el.updateComplete;

    expect(el.checked).toBe(false);
    expect(clearSpy).toHaveBeenCalledTimes(1);
    const clearEvent = clearSpy.mock.calls[0][0] as CustomEvent;
    expect(clearEvent.detail).toEqual({ checked: false, value: 'radio-clear' });
  });

  it('handles keyboard navigation with Space key to select radio button', async () => {
    const el = document.createElement('biz-radio-button') as RadioButton;
    el.value = 'radio-space';
    document.body.appendChild(el);
    await el.updateComplete;

    const changeSpy = vi.fn();
    el.addEventListener('change', changeSpy);

    const targetDiv = el.shadowRoot?.querySelector('div');
    targetDiv?.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    await el.updateComplete;

    expect(el.checked).toBe(true);
    expect(changeSpy).toHaveBeenCalledTimes(1);
  });

  it('prevents state change and event firing when component is disabled or readonly', async () => {
    const el = document.createElement('biz-radio-button') as RadioButton;
    el.disabled = true;
    el.value = 'radio-disabled';
    document.body.appendChild(el);
    await el.updateComplete;

    const changeSpy = vi.fn();
    el.addEventListener('change', changeSpy);

    const targetDiv = el.shadowRoot?.querySelector('div');
    targetDiv?.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    await el.updateComplete;

    expect(el.checked).toBe(false);
    expect(changeSpy).not.toHaveBeenCalled();
  });
});