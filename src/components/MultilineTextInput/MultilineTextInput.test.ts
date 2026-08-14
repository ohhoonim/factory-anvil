import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import './MultilineTextInput.wc.js';
import { BizMultilineTextInput } from './MultilineTextInput.wc.js';

describe('BizMultilineTextInput (Unit Tests)', () => {
  let element: BizMultilineTextInput;

  beforeEach(async () => {
    element = document.createElement('biz-multiline-text-input') as BizMultilineTextInput;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('속성(Property) 변경 시 DOM에 올바르게 반영되어야 한다', async () => {
    element.value = 'Hello World';
    element.placeholder = 'Test Placeholder';
    element.disabled = true;
    await element.updateComplete;

    const textarea = element.shadowRoot?.querySelector('textarea');
    expect(textarea?.value).toBe('Hello World');
    expect(textarea?.getAttribute('placeholder')).toBe('Test Placeholder');
    expect(textarea?.hasAttribute('disabled')).toBe(true);
  });

  it('입력 이벤트 발생 시 custom event detail 데이터와 함께 input 이벤트가 방출되어야 한다', async () => {
    const inputSpy = vi.fn();
    element.addEventListener('input', inputSpy);

    const textarea = element.shadowRoot?.querySelector('textarea');
    if (textarea) {
      textarea.value = 'Testing';
      textarea.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    }

    expect(inputSpy).toHaveBeenCalledTimes(1);
    const eventDetail = inputSpy.mock.calls[0][0].detail;
    expect(eventDetail).toEqual({ value: 'Testing' });
  });

  it('값 변경 및 포커스 해제 시 change 이벤트가 방출되어야 한다', async () => {
    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    const textarea = element.shadowRoot?.querySelector('textarea');
    if (textarea) {
      textarea.value = 'Changed Value';
      textarea.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail).toEqual({ value: 'Changed Value' });
  });

  it('Escape 키 입력 시 clear 이벤트가 방출되어야 한다', async () => {
    const clearSpy = vi.fn();
    element.addEventListener('clear', clearSpy);

    element.value = 'Text to clear';
    await element.updateComplete;

    element.handleKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(clearSpy).toHaveBeenCalledTimes(1);
    expect(clearSpy.mock.calls[0][0].detail).toEqual({ value: 'Text to clear' });
  });
});

describe('BizMultilineTextInput (Accessibility & ARIA Tests)', () => {
  let element: BizMultilineTextInput;

  beforeEach(async () => {
    element = document.createElement('biz-multiline-text-input') as BizMultilineTextInput;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('error 및 required 속성에 따라 ARIA 바인딩이 정확히 설정되어야 한다', async () => {
    element.error = true;
    element.required = true;
    await element.updateComplete;

    const textarea = element.shadowRoot?.querySelector('textarea');
    expect(textarea?.getAttribute('aria-invalid')).toBe('true');
    expect(textarea?.getAttribute('aria-required')).toBe('true');
    expect(textarea?.getAttribute('aria-multiline')).toBe('true');
  });

  it('showCount 속성 활성화 시 counter 영역에 aria-live 속성이 설정되어야 한다', async () => {
    element.showCount = true;
    element.maxlength = 100;
    await element.updateComplete;

    const counter = element.shadowRoot?.querySelector('#counter-text');
    expect(counter?.getAttribute('aria-live')).toBe('polite');
  });
});
