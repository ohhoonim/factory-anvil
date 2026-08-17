import { fixture, fixtureCleanup } from "@open-wc/testing";
import { html } from "lit";
import { describe, beforeEach, afterEach, it, expect, vi } from "vitest";
import type { BizMarkdownEditor } from "./MarkdownEditor.wc";

describe('BizMarkdownEditor Component (Unit & Integration)', () => {
  let element: BizMarkdownEditor;

  beforeEach(async () => {
    element = await fixture(html`<biz-markdown-editor></biz-markdown-editor>`);
    await element.updateComplete;
  });

  afterEach(() => {
    fixtureCleanup();
  });

  it('renders default properties correctly', () => {
    expect(element.value).toBe('');
    expect(element.mode).toBe('split');
    expect(element.syncScroll).toBe(true);
    expect(element.height).toBe('500px');
    expect(element.readonly).toBe(false);
    expect(element.disabled).toBe(false);
  });

  it('updates textarea value when property value changes', async () => {
    element.value = '# Title';
    await element.updateComplete;

    const textarea = element.shadowRoot?.querySelector('#editor-textarea') as HTMLTextAreaElement;
    expect(textarea.value).toBe('# Title');
  });

  it('dispatches change event on user input with markdown and html detail', async () => {
    const textarea = element.shadowRoot?.querySelector('#editor-textarea') as HTMLTextAreaElement;
    const changeSpy = vi.fn();

    element.addEventListener('change', changeSpy);

    textarea.value = '**Bold Text**';
    textarea.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    await element.updateComplete;

    expect(changeSpy).toHaveBeenCalledTimes(1);
    const eventDetail = changeSpy.mock.calls[0][0].detail;
    expect(eventDetail.markdown).toBe('**Bold Text**');
    expect(eventDetail.html).toContain('<b>Bold Text</b>');
  });

  it('dispatches mode-change event when view mode changes', async () => {
    const modeSpy = vi.fn();
    element.addEventListener('mode-change', modeSpy);

    element.mode = 'preview';
    element.dispatchEvent(
      new CustomEvent('mode-change', {
        detail: { mode: 'preview' },
        bubbles: true,
        composed: true,
      })
    );

    expect(modeSpy).toHaveBeenCalledTimes(1);
    expect(modeSpy.mock.calls[0][0].detail.mode).toBe('preview');
  });

  it('dispatches clear event and resets value when clear() is called', async () => {
    element.value = 'Some content';
    await element.updateComplete;

    const clearSpy = vi.fn();
    element.addEventListener('clear', clearSpy);

    element.clear();
    await element.updateComplete;

    expect(element.value).toBe('');
    expect(clearSpy).toHaveBeenCalledTimes(1);
  });

  it('binds ARIA attributes correctly for accessibility', async () => {
    const toolbar = element.shadowRoot?.querySelector('[role="toolbar"]');
    const textarea = element.shadowRoot?.querySelector('[role="textbox"]');
    const separator = element.shadowRoot?.querySelector('[role="separator"]');
    const previewRegion = element.shadowRoot?.querySelector('[role="region"]');

    expect(toolbar).not.toBeNull();
    expect(textarea).not.toBeNull();
    expect(textarea?.getAttribute('aria-multiline')).toBe('true');
    expect(separator).not.toBeNull();
    expect(separator?.getAttribute('aria-orientation')).toBe('vertical');
    expect(previewRegion).not.toBeNull();
    expect(previewRegion?.getAttribute('aria-label')).toBe('미리보기');
  });

  it('handles shortcut keys (Ctrl+B) to apply bold formatting', async () => {
    element.value = 'Text';
    await element.updateComplete;

    const textarea = element.shadowRoot?.querySelector('#editor-textarea') as HTMLTextAreaElement;
    textarea.focus();
    textarea.setSelectionRange(0, 4);

    const event = new KeyboardEvent('keydown', {
      key: 'b',
      ctrlKey: true,
      bubbles: true,
      composed: true,
    });
    textarea.dispatchEvent(event);

    await element.updateComplete;
    expect(element.value).toBe('**Text**');
  });

  it('handles Tab key for indenting text', async () => {
    const textarea = element.shadowRoot?.querySelector('#editor-textarea') as HTMLTextAreaElement;
    textarea.focus();

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      composed: true,
    });
    textarea.dispatchEvent(event);

    await element.updateComplete;
    expect(element.value).toBe('  ');
  });
});