import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { BizChip } from "./Chip.wc";
import { fixture, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit";

describe('BizChip Component Unit Tests', () => {
  let element: BizChip;

  beforeEach(async () => {
    element = await fixture<BizChip>(html`<biz-chip></biz-chip>`);
    await element.updateComplete;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it('기본 속성값이 올바르게 설정되어야 한다', () => {
    expect(element.value).toEqual([]);
    expect(element.placeholder).toBe('');
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
    expect(element.error).toBe(false);
    expect(element.deletable).toBe(true);
  });

  it('value 속성 변경 시 칩 목록이 DOM에 반영되어야 한다', async () => {
    element.value = ['Tag1', 'Tag2'];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.biz-chip__item');
    expect(items?.length).toBe(2);
    expect(items?.[0].textContent).toContain('Tag1');
    expect(items?.[1].textContent).toContain('Tag2');
  });

  it('입력 후 Delimiter 키(Enter) 입력 시 chip-add 및 change 이벤트가 발생해야 한다', async () => {
    const addSpy = vi.fn();
    const changeSpy = vi.fn();

    element.addEventListener('chip-add', addSpy);
    element.addEventListener('change', changeSpy);

    const input = element.shadowRoot?.querySelector('.biz-chip__input') as HTMLInputElement;
    input.value = 'NewChip';
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    await element.updateComplete;

    expect(addSpy).toHaveBeenCalledOnce();
    expect(addSpy.mock.calls[0][0].detail).toEqual({
      addedValue: 'NewChip',
      value: ['NewChip'],
    });

    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({
      value: ['NewChip'],
    });
  });

  it('삭제 버튼 클릭 시 chip-remove 및 change 이벤트가 발생해야 한다', async () => {
    element.value = ['DeleteMe'];
    await element.updateComplete;

    const removeSpy = vi.fn();
    const changeSpy = vi.fn();

    element.addEventListener('chip-remove', removeSpy);
    element.addEventListener('change', changeSpy);

    const deleteBtn = element.shadowRoot?.querySelector('.biz-chip__delete-btn') as HTMLButtonElement;
    deleteBtn.click();

    await element.updateComplete;

    expect(removeSpy).toHaveBeenCalledOnce();
    expect(removeSpy.mock.calls[0][0].detail).toEqual({
      removedValue: 'DeleteMe',
      index: 0,
      value: [],
    });

    expect(changeSpy).toHaveBeenCalledOnce();
    expect(changeSpy.mock.calls[0][0].detail).toEqual({
      value: [],
    });
  });

  it('중복 입력을 허용하지 않을 때 중복 칩 추가 시 error 상태가 되어야 한다', async () => {
    element.value = ['Existing'];
    element.allowDuplicates = false;
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('.biz-chip__input') as HTMLInputElement;
    input.value = 'Existing';
    input.dispatchEvent(new InputEvent('input', { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    await element.updateComplete;

    expect(element.error).toBe(true);
    expect(element.value).toEqual(['Existing']);
  });
});

describe('BizChip Integration & Accessibility Tests', () => {

  it('error 및 required 속성에 따라 ARIA 바인딩이 올바르게 설정되어야 한다', async () => {
    const element = await fixture<BizChip>(html`<biz-chip error required></biz-chip>`);
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('.biz-chip__input');
    expect(input?.getAttribute('aria-invalid')).toBe('true');
    expect(input?.getAttribute('aria-required')).toBe('true');
  });

  it('빈 입력 필드에서 Backspace 입력 시 마지막 칩 삭제 동작을 수행해야 한다', async () => {
    const element = await fixture<BizChip>(html`<biz-chip .value=${['First', 'Second']}></biz-chip>`);
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('.biz-chip__input') as HTMLInputElement;

    // 1st Backspace: 포커스 이동
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    await element.updateComplete;

    // 2nd Backspace: 칩 삭제
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    await element.updateComplete;

    expect(element.value).toEqual(['First']);
  });

  it('ArrowLeft / ArrowRight 키를 통해 칩 간 키보드 탐색이 가능해야 한다', async () => {
    const element = await fixture<BizChip>(html`<biz-chip .value=${['Chip1', 'Chip2']}></biz-chip>`);
    await element.updateComplete;

    const input = element.shadowRoot?.querySelector('.biz-chip__input') as HTMLInputElement;

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.biz-chip__item');
    expect(items?.[1].classList.contains('biz-chip__item--focused')).toBe(true);
  });
});