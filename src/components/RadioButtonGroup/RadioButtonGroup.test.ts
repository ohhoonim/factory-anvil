import { fixture } from "@open-wc/testing";
import { html } from "lit";
import { describe, beforeEach, it, expect, vi } from "vitest";
import type { BizRadioButtonGroup } from "./RadioButtonGroup.wc";

describe('BizRadioButtonGroup (Unit Tests)', () => {
  let element: BizRadioButtonGroup;

  beforeEach(async () => {
    element = await fixture(html`
      <biz-radio-button-group label="Test Group" helperText="Test Helper" value="opt1">
        <input type="radio" name="test" value="opt1" id="opt1" />
        <input type="radio" name="test" value="opt2" id="opt2" />
      </biz-radio-button-group>
    `);
    await element.updateComplete;
  });

  it('renders with properties correctly', () => {
    const root = element.shadowRoot?.querySelector('.biz-radio-button-group');
    expect(root).to.exist;
    expect(element.value).to.equal('opt1');
  });

  it('emits change event when value changes', async () => {
    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    const radio2 = element.querySelector('#opt2') as HTMLInputElement;
    radio2.click();

    expect(changeSpy).toHaveBeenCalledOnce();
    const eventDetail = changeSpy.mock.calls[0][0].detail;
    expect(eventDetail.value).to.equal('opt2');
  });

  it('emits clear event and resets value when clear() is called', async () => {
    const clearSpy = vi.fn();
    element.addEventListener('clear', clearSpy);

    element.clear();

    expect(clearSpy).toHaveBeenCalledOnce();
    expect(element.value).to.equal('');
  });
});

describe('BizRadioButtonGroup (Accessibility & Integration Tests)', () => {
  it('binds ARIA attributes correctly according to error state', async () => {
    const element = await fixture<BizRadioButtonGroup>(html`
      <biz-radio-button-group label="ARIA Group" error required>
        <input type="radio" name="aria" value="1" />
      </biz-radio-button-group>
    `);

    const group = element.shadowRoot?.querySelector('[role="radiogroup"]');
    expect(group?.getAttribute('aria-invalid')).to.equal('true');
    expect(group?.getAttribute('aria-required')).to.equal('true');
  });

  it('navigates via arrow keys', async () => {
    const element = await fixture<BizRadioButtonGroup>(html`
      <biz-radio-button-group value="opt1">
        <input type="radio" name="nav" value="opt1" id="nav1" />
        <input type="radio" name="nav" value="opt2" id="nav2" />
      </biz-radio-button-group>
    `);

    const nav1 = element.querySelector('#nav1') as HTMLInputElement;
    nav1.focus();

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await element.updateComplete;

    expect(element.value).to.equal('opt2');
  });

  it('clears selection when Escape key is pressed', async () => {
    const element = await fixture<BizRadioButtonGroup>(html`
      <biz-radio-button-group value="opt1">
        <input type="radio" name="esc" value="opt1" id="esc1" />
      </biz-radio-button-group>
    `);

    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await element.updateComplete;

    expect(element.value).to.equal('');
  });
});