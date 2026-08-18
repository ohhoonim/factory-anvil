import { fixture, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit";
import { describe, beforeEach, afterEach, test, vi, expect } from "vitest";
import type { BizFormWrapper } from "./FormWrapper.wc";

describe('BizFormWrapper (Unit & Integration Tests)', () => {
  let element: BizFormWrapper;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    element = await fixture(html`
      <biz-form-wrapper label="테스트 레이블" helper-text="도움말 문구">
        <input type="text" id="test-input" />
      </biz-form-wrapper>
    `);
    inputElement = element.querySelector('#test-input') as HTMLInputElement;
    await element.updateComplete;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  test('Property 변경 시 렌더링 및 속성이 올바르게 반영된다', async () => {
    expect(element.label).toBe('테스트 레이블');
    expect(element.helperText).toBe('도움말 문구');

    element.errorMessage = '에러 발생';
    await element.updateComplete;

    expect(inputElement.getAttribute('aria-invalid')).toBe('true');
  });

  test('required 속성 설정 시 하위 입력 컴포넌트에 aria-required가 지정된다', async () => {
    element.required = true;
    await element.updateComplete;

    expect(inputElement.getAttribute('aria-required')).toBe('true');
  });

  test('disabled 속성 설정 시 하위 입력 컴포넌트에 disabled 및 aria-disabled가 반영된다', async () => {
    element.disabled = true;
    await element.updateComplete;

    expect(inputElement.getAttribute('aria-disabled')).toBe('true');
    expect(inputElement.hasAttribute('disabled')).toBe(true);
  });

  test('helperText, errorMessage 지정 시 aria-describedby가 자동 연결된다', async () => {
    element.errorMessage = '필수 항목입니다.';
    await element.updateComplete;

    const describedBy = inputElement.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();

    const messageEl = element.shadowRoot?.querySelector('#' + describedBy);
    expect(messageEl).toBeTruthy();
  });

  test('Escape 키 입력 시 clear 커스텀 이벤트가 방출되고 input 값이 초기화된다', async () => {
    const clearSpy = vi.fn();
    element.addEventListener('clear', clearSpy);

    inputElement.value = '초기값';
    inputElement.focus();

    const keyEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
      composed: true
    });
    element.dispatchEvent(keyEvent);

    expect(clearSpy).toHaveBeenCalledTimes(1);
    const eventDetail = clearSpy.mock.calls[0][0].detail;
    expect(eventDetail.source).toBe('keyboard');
    expect(inputElement.value).toBe('');
  });

  test('레이블 영역 클릭 시 하위 입력 컴포넌트로 포커스가 이동한다', async () => {
    const labelArea = element.shadowRoot?.querySelector('.biz-form-wrapper__label-area') as HTMLElement;
    expect(labelArea).toBeTruthy();

    labelArea.click();
    await element.updateComplete;

    expect(document.activeElement).toBe(inputElement);
  });
});
