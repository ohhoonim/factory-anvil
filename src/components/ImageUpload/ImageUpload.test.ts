import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { describe, expect as vitestExpect, it as vitestIt } from 'vitest';
import './ImageUpload.wc';
import type { ImageUpload } from './ImageUpload.wc';

describe('ImageUpload Unit Tests (Vitest & @open-wc/testing)', () => {
  vitestIt('기본 속성값들이 올바르게 초깃값으로 세팅된다', async () => {
    const el = await fixture<ImageUpload>(html`<biz-image-upload></biz-image-upload>`);

    vitestExpect(el.value).toBeNull();
    vitestExpect(el.accept).toBe('image/jpeg,image/png,image/webp');
    vitestExpect(el.shape).toBe('square');
    vitestExpect(el.enableCrop).toBe(true);
    vitestExpect(el.disabled).toBe(false);
    vitestExpect(el.readonly).toBe(false);
    vitestExpect(el.error).toBe(false);
  });

  vitestIt('disabled 속성이 변경되면 Host 엘리먼트에 세팅된다', async () => {
    const el = await fixture<ImageUpload>(html`<biz-image-upload disabled></biz-image-upload>`);

    vitestExpect(el.hasAttribute('disabled')).toBe(true);

    el.disabled = false;
    await el.updateComplete;

    vitestExpect(el.hasAttribute('disabled')).toBe(false);
  });

  vitestIt('용량 초과 파일 업로드 시 error 이벤트가 발생하고 detail 데이터가 검증된다', async () => {
    const el = await fixture<ImageUpload>(
      html`<biz-image-upload .maxSize=${1024}></biz-image-upload>`
    );

    const oversizedFile = new File(['a'.repeat(2048)], 'large-image.png', { type: 'image/png' });

    setTimeout(() => {
      const fileInput = el.shadowRoot?.querySelector('input[type="file"]') as HTMLInputElement;
      Object.defineProperty(fileInput, 'files', {
        value: [oversizedFile],
        writable: false,
      });
      fileInput.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const { detail } = await oneEvent(el, 'error');

    vitestExpect(detail.type).toBe('size');
    vitestExpect(detail.message).toBe('File size exceeds maximum allowed limit.');
    vitestExpect(el.error).toBe(true);
  });

  vitestIt('이미지 제거 버튼 클릭 시 remove 및 clear 커스텀 이벤트가 방출된다', async () => {
    const el = await fixture<ImageUpload>(
      html`<biz-image-upload value="https://via.placeholder.com/150"></biz-image-upload>`
    );

    const removeBtn = el.shadowRoot?.querySelector('.biz-image-upload__overlay-btn') as HTMLButtonElement;

    setTimeout(() => removeBtn.click());
    const removeEvent = await oneEvent(el, 'remove');
    vitestExpect(removeEvent).toBeTruthy();

    vitestExpect(el.value).toBeNull();
  });
});
