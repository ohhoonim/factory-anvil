import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { BizDateTimePicker } from ".";
import { fixture, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit";

describe('BizDateTimePicker (Unit Tests)', () => {
  let element: BizDateTimePicker;

  beforeEach(async () => {
    element = await fixture<BizDateTimePicker>(html`<biz-date-time-picker></biz-date-time-picker>`);
    await element.updateComplete;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it('renders with default properties', () => {
    expect(element.variant).toBe('outlined');
    expect(element.size).toBe('medium');
    expect(element.layoutMode).toBe('side-by-side');
    expect(element.disabled).toBe(false);
  });

  it('updates display value when value property is set', async () => {
    element.value = '2026-08-07T16:47:00';
    await element.updateComplete;
    const input = element.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('2026-08-07 16:47');
  });

  it('emits open and close events when toggled', async () => {
    const openSpy = vi.fn();
    const closeSpy = vi.fn();
    element.addEventListener('open', openSpy);
    element.addEventListener('close', closeSpy);

    const control = element.shadowRoot?.querySelector('.biz-date-time-picker__control') as HTMLElement;
    control.click();
    await element.updateComplete;
    expect(openSpy).toHaveBeenCalledTimes(1);

    control.click();
    await element.updateComplete;
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it('emits clear and change events on clear button click', async () => {
    element.value = '2026-08-07T16:47:00';
    element.clearable = true;
    await element.updateComplete;

    const clearSpy = vi.fn();
    const changeSpy = vi.fn();
    element.addEventListener('clear', clearSpy);
    element.addEventListener('change', changeSpy);

    const clearBtn = element.shadowRoot?.querySelector('.biz-date-time-picker__clear-btn') as HTMLButtonElement;
    clearBtn.click();
    await element.updateComplete;

    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(element.value).toBeNull();
  });
});

describe('BizDateTimePicker (Integration & Accessibility Tests)', () => {
  it('binds correct ARIA attributes to combobox control', async () => {
    const el = await fixture<BizDateTimePicker>(html`<biz-date-time-picker disabled></biz-date-time-picker>`);
    const control = el.shadowRoot?.querySelector('[role="combobox"]');
    expect(control?.getAttribute('aria-expanded')).toBe('false');
    expect(control?.getAttribute('aria-haspopup')).toBe('dialog');
    expect(control?.getAttribute('aria-disabled')).toBe('true');
  });

  it('closes popover panel when Escape key is pressed', async () => {
    const el = await fixture<BizDateTimePicker>(html`<biz-date-time-picker></biz-date-time-picker>`);
    const control = el.shadowRoot?.querySelector('.biz-date-time-picker__control') as HTMLElement;
    control.click();
    await el.updateComplete;

    const popoverBefore = el.shadowRoot?.querySelector('.biz-date-time-picker__popover');
    expect(popoverBefore).not.toBeNull();

    const container = el.shadowRoot?.querySelector('.biz-date-time-picker') as HTMLElement;
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
    await el.updateComplete;

    const popoverAfter = el.shadowRoot?.querySelector('.biz-date-time-picker__popover');
    expect(popoverAfter).toBeNull();
  });
});