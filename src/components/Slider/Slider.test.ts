import { expect, test, describe, beforeEach, vi, afterEach } from 'vitest';
import './Slider.wc';
import { BizSlider } from './Slider.wc';

describe('BizSlider Unit & Integration Tests', () => {
  let element: BizSlider;

  beforeEach(async () => {
    element = document.createElement('biz-slider') as BizSlider;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  test('초기 기본 속성값이 정상적으로 DOM 및 인스턴스에 반영되어야 한다', async () => {
    expect(element.value).toBe(0);
    expect(element.min).toBe(0);
    expect(element.max).toBe(100);
    expect(element.step).toBe(1);
    expect(element.mode).toBe('single');

    const thumb = element.shadowRoot?.querySelector('[role="slider"]');
    expect(thumb).not.toBeNull();
    expect(thumb?.getAttribute('aria-valuenow')).toBe('0');
    expect(thumb?.getAttribute('aria-valuemin')).toBe('0');
    expect(thumb?.getAttribute('aria-valuemax')).toBe('100');
  });

  test('키보드 ArrowRight/ArrowLeft 조작 시 value가 step 단위로 변경되고 input/change 이벤트가 방출되어야 한다', async () => {
    element.value = 50;
    await element.updateComplete;

    const inputSpy = vi.fn();
    const changeSpy = vi.fn();
    element.addEventListener('input', inputSpy);
    element.addEventListener('change', changeSpy);

    const thumb = element.shadowRoot?.querySelector('.biz-slider__thumb--end') as HTMLElement;
    expect(thumb).not.toBeNull();

    element.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }), 'end');
    await element.updateComplete;

    expect(element.value).toBe(51);
    expect(inputSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(inputSpy.mock.calls[0][0].detail).toEqual({ value: 51 });

    element.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }), 'end');
    await element.updateComplete;

    expect(element.value).toBe(50);
  });

  test('Home 및 End 키보드 조작 시 min/max 값으로 즉시 변경되어야 한다', async () => {
    element.value = 50;
    await element.updateComplete;

    element.handleKeyDown(new KeyboardEvent('keydown', { key: 'Home' }), 'end');
    await element.updateComplete;
    expect(element.value).toBe(0);

    element.handleKeyDown(new KeyboardEvent('keydown', { key: 'End' }), 'end');
    await element.updateComplete;
    expect(element.value).toBe(100);
  });

  test('clear() 메서드 호출 시 값이 초기화되고 clear, input, change 이벤트가 방출되어야 한다', async () => {
    element.value = 75;
    await element.updateComplete;

    const clearSpy = vi.fn();
    element.addEventListener('clear', clearSpy);

    element.clear();
    await element.updateComplete;

    expect(element.value).toBe(0);
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });

  test('disabled 상태에서는 키보드 이벤트 조작 및 clear() 호출 시 값이 변경되지 않아야 한다', async () => {
    element.value = 30;
    element.disabled = true;
    await element.updateComplete;

    element.handleKeyDown(new KeyboardEvent('keydown', { key: 'ArrowRight' }), 'end');
    await element.updateComplete;
    expect(element.value).toBe(30);

    element.clear();
    await element.updateComplete;
    expect(element.value).toBe(30);

    const thumb = element.shadowRoot?.querySelector('.biz-slider__thumb--end');
    expect(thumb?.getAttribute('aria-disabled')).toBe('true');
  });

  test('range 모드에서 시작 핸들과 끝 핸들의 ARIA 속성 및 독립적인 값이 올바르게 계산되어야 한다', async () => {
    element.mode = 'range';
    element.value = [20, 80];
    await element.updateComplete;

    const thumbs = element.shadowRoot?.querySelectorAll('[role="slider"]');
    expect(thumbs?.length).toBe(2);

    expect(thumbs?.[0].getAttribute('aria-valuenow')).toBe('20');
    expect(thumbs?.[1].getAttribute('aria-valuenow')).toBe('80');
  });
});