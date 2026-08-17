import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import './TransferList.wc.js';
import type { BizTransferList } from './TransferList.wc.js';

describe('BizTransferList Component Unit & Integration Tests', () => {
  let element: BizTransferList;

  beforeEach(async () => {
    element = document.createElement('biz-transfer-list') as BizTransferList;
    element.sourceData = [
      { key: '1', label: 'Item 1' },
      { key: '2', label: 'Item 2' },
      { key: '3', label: 'Item 3', disabled: true }
    ];
    element.targetData = [
      { key: '4', label: 'Item 4' }
    ];
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('renders correctly with default properties', () => {
    const root = element.shadowRoot?.querySelector('.biz-transfer-list');
    expect(root).not.toBeNull();
    expect(element.sourceTitle).toBe('Source');
    expect(element.targetTitle).toBe('Target');
  });

  it('emits select-change event when an item is clicked', async () => {
    const selectChangeSpy = vi.fn();
    element.addEventListener('select-change', selectChangeSpy);

    const firstSourceItem = element.shadowRoot?.querySelector(
      '.biz-transfer-list__box--source .biz-transfer-list__item'
    ) as HTMLElement;

    expect(firstSourceItem).not.toBeNull();
    firstSourceItem.click();
    await element.updateComplete;

    expect(selectChangeSpy).toHaveBeenCalledOnce();
    const detail = selectChangeSpy.mock.calls[0][0].detail;
    expect(detail.sourceSelectedKeys).toEqual(['1']);
  });

  it('moves item right when action button is clicked and emits change event', async () => {
    const changeSpy = vi.fn();
    element.addEventListener('change', changeSpy);

    const firstSourceItem = element.shadowRoot?.querySelector(
      '.biz-transfer-list__box--source .biz-transfer-list__item'
    ) as HTMLElement;
    firstSourceItem.click();
    await element.updateComplete;

    const moveRightBtn = element.shadowRoot?.querySelectorAll(
      '.biz-transfer-list__actions button'
    )[0] as HTMLButtonElement;

    moveRightBtn.click();
    await element.updateComplete;

    expect(changeSpy).toHaveBeenCalledOnce();
    const detail = changeSpy.mock.calls[0][0].detail;
    expect(detail.direction).toBe('right');
    expect(detail.movedKeys).toEqual(['1']);
  });

  it('emits search event on search input', async () => {
    element.showSearch = true;
    await element.updateComplete;

    const searchSpy = vi.fn();
    element.addEventListener('search', searchSpy);

    const searchInput = element.shadowRoot?.querySelector(
      '.biz-transfer-list__search-input'
    ) as HTMLInputElement;

    searchInput.value = 'Item 1';
    searchInput.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    await element.updateComplete;

    expect(searchSpy).toHaveBeenCalledOnce();
    expect(searchSpy.mock.calls[0][0].detail.query).toBe('Item 1');
  });

  it('supports keyboard navigation via ArrowDown and Space keys', async () => {
    const selectChangeSpy = vi.fn();
    element.addEventListener('select-change', selectChangeSpy);

    const sourceBody = element.shadowRoot?.querySelector(
      '.biz-transfer-list__box--source .biz-transfer-list__body'
    ) as HTMLElement;

    sourceBody.focus();
    sourceBody.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await element.updateComplete;

    sourceBody.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    await element.updateComplete;

    expect(selectChangeSpy).toHaveBeenCalled();
  });

  it('has valid ARIA attributes bound to components', () => {
    const listboxes = element.shadowRoot?.querySelectorAll('[role="listbox"]');
    expect(listboxes?.length).toBe(2);

    const options = element.shadowRoot?.querySelectorAll('[role="option"]');
    expect(options?.length).toBeGreaterThan(0);
    expect(options?.[0].getAttribute('aria-selected')).toBe('false');
  });
});