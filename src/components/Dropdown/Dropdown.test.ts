import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './Dropdown.wc.js';
import type { BizDropdown } from './Dropdown.wc.js';

const sampleOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

describe('BizDropdown Unit Tests', () => {
  let el: BizDropdown;

  beforeEach(async () => {
    el = await fixture<BizDropdown>(html`
      <biz-dropdown .options=${sampleOptions}></biz-dropdown>
    `);
  });

  it('renders default element and properties correctly', () => {
    expect(el).to.exist;
    expect(el.mode).to.equal('single');
    expect(el.variant).to.equal('outlined');
    expect(el.size).to.equal('medium');
    expect(el.value).to.be.null;
  });

  it('opens popover when trigger clicked and emits open event', async () => {
    const openSpy = vi.fn();
    el.addEventListener('open', openSpy);

    const trigger = el.shadowRoot?.querySelector('.trigger-control') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    expect(openSpy).toHaveBeenCalledOnce();
    const popover = el.shadowRoot?.querySelector('#dropdown-popover');
    expect(popover?.classList.contains('open')).to.be.true;
  });

  it('selects option on click, changes value and emits change event', async () => {
    const changeSpy = vi.fn();
    el.addEventListener('change', changeSpy);

    const trigger = el.shadowRoot?.querySelector('.trigger-control') as HTMLElement;
    trigger.click();
    await el.updateComplete;

    const firstOption = el.shadowRoot?.querySelector('#option-0') as HTMLElement;
    firstOption.click();
    await el.updateComplete;

    expect(el.value).to.equal('apple');
    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).to.deep.equal({
      value: 'apple',
      selectedOption: sampleOptions[0],
    });
  });

  it('clears value and emits clear event when clear button is clicked', async () => {
    el.value = 'apple';
    el.clearable = true;
    await el.updateComplete;

    const clearSpy = vi.fn();
    el.addEventListener('clear', clearSpy);

    const clearBtn = el.shadowRoot?.querySelector('.clear-btn') as HTMLButtonElement;
    clearBtn.click();
    await el.updateComplete;

    expect(el.value).to.be.null;
    expect(clearSpy).toHaveBeenCalledOnce();
  });
});

describe('BizDropdown Integration & Accessibility Tests', () => {
  let el: BizDropdown;

  beforeEach(async () => {
    el = await fixture<BizDropdown>(html`
      <biz-dropdown
        .options=${sampleOptions}
        required
        filterable
      ></biz-dropdown>
    `);
  });

  it('binds ARIA attributes correctly to combobox trigger', () => {
    const trigger = el.shadowRoot?.querySelector('.trigger-control');
    expect(trigger?.getAttribute('role')).to.equal('combobox');
    expect(trigger?.getAttribute('aria-expanded')).to.equal('false');
    expect(trigger?.getAttribute('aria-required')).to.equal('true');
  });

  it('handles keyboard navigation (ArrowDown, Enter, Escape)', async () => {
    const trigger = el.shadowRoot?.querySelector('.trigger-control') as HTMLElement;

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    expect(trigger.getAttribute('aria-expanded')).to.equal('true');

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await el.updateComplete;

    expect(el.value).to.equal('Banana');

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    expect(trigger.getAttribute('aria-expanded')).to.equal('true');

    trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;

    expect(trigger.getAttribute('aria-expanded')).to.equal('false');
  });
});