import { fixtureSync, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit";
import { describe, beforeEach, afterEach, test, expect, vi } from "vitest";
import type { FileUploader } from "./FileUploader.wc";

describe('FileUploader Component Unit Tests', () => {
  let element: FileUploader;

  beforeEach(async () => {
    element = fixtureSync(html`<biz-file-uploader></biz-file-uploader>`);
    await element.updateComplete;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  test('초기 속성값이 정상적으로 설정되어야 한다', () => {
    expect(element.variant).toBe('dropzone');
    expect(element.size).toBe('medium');
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
    expect(element.error).toBe(false);
    expect(element.value).toEqual([]);
  });

  test('disabled 속성이 설정되면 DOM 요소에 적절히 반영되어야 한다', async () => {
    element.disabled = true;
    await element.updateComplete;

    const root = element.shadowRoot?.querySelector('.biz-file-uploader');
    expect(root?.classList.contains('is-disabled')).toBe(true);

    const input = element.shadowRoot?.querySelector('.hidden-input') as HTMLInputElement;
    expect(input.hasAttribute('disabled')).toBe(true);
  });

  test('파일 제거 시 file-remove 및 change 이벤트가 정상 방출되어야 한다', async () => {
    const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });
    element.value = [mockFile];
    await element.updateComplete;

    const removeSpy = vi.fn();
    const changeSpy = vi.fn();
    const clearSpy = vi.fn();

    element.addEventListener('file-remove', removeSpy);
    element.addEventListener('change', changeSpy);
    element.addEventListener('clear', clearSpy);

    const removeBtn = element.shadowRoot?.querySelector('.remove-btn') as HTMLButtonElement;
    expect(removeBtn).not.toBeNull();
    removeBtn.click();

    await element.updateComplete;

    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy.mock.calls[0][0].detail.removedFile).toBe(mockFile);

    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail.files).toEqual([]);

    expect(clearSpy).toHaveBeenCalledTimes(1);
  });

  test('허용되지 않은 확장자 업로드 시 error 이벤트가 방출되어야 한다', async () => {
    element.accept = '.png,.jpg';
    await element.updateComplete;

    const errorSpy = vi.fn();
    element.addEventListener('error', errorSpy);

    const invalidFile = new File(['dummy'], 'document.pdf', { type: 'application/pdf' });
    (element as any).processFiles([invalidFile]);

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy.mock.calls[0][0].detail.type).toBe('extension');
  });
});

describe('FileUploader Component Integration & Accessibility Tests', () => {
  test('aria-invalid 속성이 error 상태에 따라 바인딩되어야 한다', async () => {
    const element = fixtureSync(html`<biz-file-uploader .error="${true}"></biz-file-uploader>`) as FileUploader;
    await element.updateComplete;

    const dropZone = element.shadowRoot?.querySelector('.drop-zone');
    expect(dropZone?.getAttribute('aria-invalid')).toBe('true');
  });

  test('Drop Zone에 role="button" 및 aria-dropeffect 속성이 존재해야 한다', async () => {
    const element = fixtureSync(html`<biz-file-uploader></biz-file-uploader>`) as FileUploader;
    await element.updateComplete;

    const dropZone = element.shadowRoot?.querySelector('.drop-zone');
    expect(dropZone?.getAttribute('role')).toBe('button');
    expect(dropZone?.getAttribute('aria-dropeffect')).toBe('copy');
  });

  test('Disabled 상태일 때 tabindex가 -1로 설정되어 키보드 포커스를 받지 않아야 한다', async () => {
    const element = fixtureSync(html`<biz-file-uploader disabled></biz-file-uploader>`) as FileUploader;
    await element.updateComplete;

    const dropZone = element.shadowRoot?.querySelector('.drop-zone');
    expect(dropZone?.getAttribute('tabindex')).toBe('-1');
  });
});