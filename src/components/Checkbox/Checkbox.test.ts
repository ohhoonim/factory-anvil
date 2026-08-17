import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html, oneEvent } from '@open-wc/testing';
import './Checkbox.wc.ts';
import type { BizCheckbox } from './Checkbox.wc.ts';

describe('BizCheckbox Component Unit Tests', () => {
  let el: BizCheckbox;

  beforeEach(async () => {
    el = await fixture<BizCheckbox>(html`<biz-checkbox value="test-val">Accept Terms</biz-checkbox>`);
  });

  it('Property reflection and DOM rendering test', async () => {
    expect(el.checked).toBe(false);
    expect(el.hasAttribute('checked')).toBe(false);

    el.checked = true;
    await el.updateComplete;

    expect(el.hasAttribute('checked')).toBe(true);
    const input = el.shadowRoot?.querySelector('input');
    expect(input?.checked).toBe(true);
  });

  it('Emits custom "change" event with detail on toggle', async () => {
    const listener = oneEvent(el, 'change');
    const input = el.shadowRoot?.querySelector('input');

    input?.click();

    const event = await listener;
    expect(event).to.exist;
    expect(event.detail).to.deep.equal({
      checked: true,
      value: 'test-val',
    });
  });

  it('Does not emit events or state changes when disabled', async () => {
    el.disabled = true;
    await el.updateComplete;

    const changeSpy = vi.fn();
    el.addEventListener('change', changeSpy);

    const input = el.shadowRoot?.querySelector('input');
    input?.click();

    expect(changeSpy).not.toHaveBeenCalled();
    expect(el.checked).toBe(false);
  });

  it('Binds ARIA attributes correctly according to accessibility requirements', async () => {
    el.error = true;
    el.required = true;
    el.indeterminate = true;
    await el.updateComplete;

    const input = el.shadowRoot?.querySelector('input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-required')).toBe('true');
    expect(input?.getAttribute('aria-checked')).toBe('mixed');
  });

  it('Toggles state on Space keydown interaction', async () => {
    expect(el.checked).toBe(false);

    const keydownEvent = new KeyboardEvent('keydown', { code: 'Space', bubbles: true, composed: true });
    el.dispatchEvent(keydownEvent);
    await el.updateComplete;

    expect(el.checked).toBe(true);
  });
});