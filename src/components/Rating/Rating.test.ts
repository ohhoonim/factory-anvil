import { expect, test, describe, beforeEach, vi } from 'vitest';
import './Rating.wc.js';
import type { BizRating } from './Rating.wc.js';

describe('BizRating Component (Unit & Integration Tests)', () => {
  let element: BizRating;

  beforeEach(async () => {
    element = document.createElement('biz-rating') as BizRating;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  test('기본 속성이 정상 설정되는지 검증', () => {
    expect(element.value).toBe(0);
    expect(element.max).toBe(5);
    expect(element.precision).toBe(1);
    expect(element.size).toBe('md');
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
  });

  test('value 및 max 변경 시 ARIA 속성에 올바르게 반영되는지 검증', async () => {
    element.value = 4;
    element.max = 10;
    await element.updateComplete;

    const rootElement = element.shadowRoot?.querySelector('.biz-rating');
    expect(rootElement?.getAttribute('aria-valuenow')).toBe('4');
    expect(rootElement?.getAttribute('aria-valuemax')).toBe('10');
    expect(rootElement?.getAttribute('aria-valuemin')).toBe('0');
  });

  test('disabled 상태 시 aria-disabled 설정 및 대화상자 속성 검증', async () => {
    element.disabled = true;
    await element.updateComplete;

    const rootElement = element.shadowRoot?.querySelector('.biz-rating');
    expect(rootElement?.getAttribute('aria-disabled')).toBe('true');
    expect(rootElement?.getAttribute('tabindex')).toBe('-1');
  });

  test('readonly 상태 시 aria-readonly 속성이 적용되는지 검증', async () => {
    element.readonly = true;
    await element.updateComplete;

    const rootElement = element.shadowRoot?.querySelector('.biz-rating');
    expect(rootElement?.getAttribute('aria-readonly')).toBe('true');
  });

  test('키보드 탐색(ArrowRight, ArrowLeft, Home, End) 인터랙션 및 change 이벤트 검증', async () => {
    element.value = 2;
    await element.updateComplete;

    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    const rootElement = element.shadowRoot?.querySelector('.biz-rating') as HTMLElement;

    rootElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await element.updateComplete;
    expect(element.value).toBe(3);
    expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({ detail: { value: 3 } }));

    rootElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await element.updateComplete;
    expect(element.value).toBe(2);

    rootElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await element.updateComplete;
    expect(element.value).toBe(5);

    rootElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await element.updateComplete;
    expect(element.value).toBe(0);
  });

  test('allowClear가 true일 때 동일 값 클릭 시 clear 이벤트 방출 및 value 0 초기화 검증', async () => {
    element.value = 3;
    element.allowClear = true;
    await element.updateComplete;

    const clearSpy = vi.fn();
    element.addEventListener('clear', clearSpy);

    const item = element.shadowRoot?.querySelector('.biz-rating__item[data-index="2"]') as HTMLElement;
    item.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await element.updateComplete;

    expect(element.value).toBe(0);
    expect(clearSpy).toHaveBeenCalled();
  });
});