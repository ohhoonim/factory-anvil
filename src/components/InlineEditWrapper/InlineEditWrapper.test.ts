import { fixtureSync, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit";
import { afterEach, beforeEach, describe, expect, it, test, vi } from "vitest";
import type { InlineEditWrapper } from "./InlineEditWrapper.wc";

describe('InlineEditWrapper - Unit Tests (Vitest)', () => {
  let element: InlineEditWrapper;

  beforeEach(async () => {
    element = fixtureSync(html`
      <biz-inline-edit-wrapper value="Initial Value">
        <input type="text" value="Initial Value" />
      </biz-inline-edit-wrapper>
    `);
    await element.updateComplete;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it('기본 속성이 정상 반영되고 DOM을 렌더링한다', () => {
    expect(element.value).toBe('Initial Value');
    expect(element.mode).toBe('view');

    const viewEl = element.shadowRoot?.querySelector('.biz-inline-edit-wrapper__view');
    expect(viewEl).not.toBeNull();
    expect(viewEl?.getAttribute('role')).toBe('button');
    expect(viewEl?.getAttribute('aria-expanded')).toBe('false');
  });

  it('클릭 시 mode가 edit으로 변경되고 mode-change 이벤트를 방출한다', async () => {
    const listener = vi.fn();
    element.addEventListener('mode-change', listener);

    const viewEl = element.shadowRoot?.querySelector('.biz-inline-edit-wrapper__view') as HTMLElement;
    viewEl.click();
    await element.updateComplete;

    expect(element.mode).toBe('edit');
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail).toEqual({ mode: 'edit' });
  });

  it('Edit 모드에서 Enter 입력 시 save 이벤트를 방출한다', async () => {
    const saveListener = vi.fn();
    element.addEventListener('save', saveListener);

    element.mode = 'edit';
    await element.updateComplete;

    const editContainer = element.shadowRoot?.querySelector('.biz-inline-edit-wrapper__edit') as HTMLElement;
    editContainer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await element.updateComplete;

    expect(saveListener).toHaveBeenCalledTimes(1);
    expect(saveListener.mock.calls[0][0].detail).toEqual({
      value: 'Initial Value',
      oldValue: 'Initial Value',
    });
    expect(element.mode).toBe('view');
  });

  it('Edit 모드에서 Escape 입력 시 cancel 이벤트를 방출하고 이전 값으로 복원한다', async () => {
    const cancelListener = vi.fn();
    element.addEventListener('cancel', cancelListener);

    element.mode = 'edit';
    await element.updateComplete;

    element.value = 'Modified Value';

    const editContainer = element.shadowRoot?.querySelector('.biz-inline-edit-wrapper__edit') as HTMLElement;
    editContainer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await element.updateComplete;

    expect(cancelListener).toHaveBeenCalledTimes(1);
    expect(element.value).toBe('Initial Value');
    expect(element.mode).toBe('view');
  });
});
