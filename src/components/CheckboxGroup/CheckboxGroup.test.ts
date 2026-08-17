import { expect, test, describe, beforeEach } from 'vitest';
import './CheckboxGroup.wc.js';

describe('CheckboxGroup Component Unit & Integration Tests', () => {
  let element: HTMLElement;

  beforeEach(async () => {
    document.body.innerHTML = `
      <biz-checkbox-group name="test-group">
        <span slot="label-slot">테스트 그룹</span>
        <label><input type="checkbox" value="opt1" id="cb1" /></label>
        <label><input type="checkbox" value="opt2" id="cb2" /></label>
        <span slot="helper-text-slot">도움말 문구</span>
      </biz-checkbox-group>
    `;
    element = document.querySelector('biz-checkbox-group')!;
    await (element as any).updateComplete;
  });

  test('Properties 변경에 따른 DOM 및 하위 체크박스 동기화 검증', async () => {
    (element as any).value = ['opt1'];
    await (element as any).updateComplete;

    const cb1 = document.getElementById('cb1') as HTMLInputElement;
    const cb2 = document.getElementById('cb2') as HTMLInputElement;

    expect(cb1.checked).toBe(true);
    expect(cb2.checked).toBe(false);
  });

  test('하위 체크박스 선택 변경 시 change 이벤트 방출 및 detail 데이터 검증', async () => {
    let changeDetail: any = null;
    element.addEventListener('change', (e: Event) => {
      changeDetail = (e as CustomEvent).detail;
    });

    const cb1 = document.getElementById('cb1') as HTMLInputElement;
    cb1.checked = true;
    cb1.dispatchEvent(new Event('change', { bubbles: true }));

    await (element as any).updateComplete;

    expect(changeDetail).not.toBeNull();
    expect(changeDetail.value).toEqual(['opt1']);
  });

  test('clear() 호출 시 선택 초기화 및 clear/change 커스텀 이벤트 방출 검증', async () => {
    (element as any).value = ['opt1', 'opt2'];
    await (element as any).updateComplete;

    let cleared = false;
    element.addEventListener('clear', () => {
      cleared = true;
    });

    (element as any).clear();
    await (element as any).updateComplete;

    expect((element as any).value).toEqual([]);
    expect(cleared).toBe(true);
  });

  test('ARIA 속성 바인딩 검증 (role, aria-required, aria-invalid)', async () => {
    (element as any).required = true;
    (element as any).error = true;
    await (element as any).updateComplete;

    const shadowRoot = element.shadowRoot!;
    const groupDiv = shadowRoot.querySelector('.biz-checkbox-group')!;

    expect(groupDiv.getAttribute('role')).toBe('group');
    expect(groupDiv.getAttribute('aria-required')).toBe('true');
    expect(groupDiv.getAttribute('aria-invalid')).toBe('true');
  });

  test('키보드 인터랙션 (Escape 키 입력 시 선택 초기화 동작) 검증', async () => {
    (element as any).value = ['opt1'];
    await (element as any).updateComplete;

    const shadowRoot = element.shadowRoot!;
    const groupContainer = shadowRoot.querySelector('.biz-checkbox-group')!;

    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    groupContainer.dispatchEvent(event);

    await (element as any).updateComplete;
    expect((element as any).value).toEqual([]);
  });
});