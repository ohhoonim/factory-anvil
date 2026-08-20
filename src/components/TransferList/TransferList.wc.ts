import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { transferListStyles } from './TransferList.css.js';
import { TransferListTemplate, type ListItem, type TransferListContext } from './TransferList.js';

/**
 * @element biz-transfer-list
 * 
 * @slot ${headerSlotName} 사용자 정의
 * @slot ${emptySlotName} 사용자 정의
 * @slot item-slot
 * @slot footer-slot
 * @slot action-controls-slot
 */
@customElement('biz-transfer-list')
export class BizTransferList extends LitElement {
  static override styles = transferListStyles;

  @property({ type: Array, attribute: 'source-data' })
  sourceData: ListItem[] = [];

  @property({ type: Array, attribute: 'target-data' })
  targetData: ListItem[] = [];

  @property({ type: Array })
  value: (string | number)[] = [];

  @property({ type: String, attribute: 'source-title' })
  sourceTitle = 'Source';

  @property({ type: String, attribute: 'target-title' })
  targetTitle = 'Target';

  @property({ type: Boolean, attribute: 'show-search' })
  showSearch = false;

  @property({ type: Boolean, attribute: 'show-select-all' })
  showSelectAll = true;

  @property({ type: Boolean, attribute: 'show-reorder' })
  showReorder = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: 'one-way' })
  oneWay = false;

  @property({ type: String })
  variant: 'horizontal' | 'vertical' = 'horizontal';

  @property({ type: String })
  size: 'small' | 'medium' | 'large' = 'medium';

  @state()
  private sourceSelectedKeys: (string | number)[] = [];

  @state()
  private targetSelectedKeys: (string | number)[] = [];

  @state()
  private sourceSearchQuery = '';

  @state()
  private targetSearchQuery = '';

  @state()
  private focusedSide: 'source' | 'target' | null = null;

  @state()
  private focusedIndex = -1;

  @state()
  private liveMessage = '';

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('value')) {
      this.syncDataWithValue();
    }
  }

  private syncDataWithValue() {
    if (!this.value) return;
    const allItems = [...this.sourceData, ...this.targetData];
    const targetMap = new Map<string | number, ListItem>();

    this.value.forEach(val => {
      const found = allItems.find(item => item.key === val);
      if (found) {
        targetMap.set(val, found);
      }
    });

    const newTargetData = Array.from(targetMap.values());
    const newSourceData = allItems.filter(item => !targetMap.has(item.key));

    this.sourceData = newSourceData;
    this.targetData = newTargetData;
  }

  private getFilteredItems(side: 'source' | 'target'): ListItem[] {
    const data = side === 'source' ? this.sourceData : this.targetData;
    const query = side === 'source' ? this.sourceSearchQuery : this.targetSearchQuery;
    if (!query.trim()) return data;
    return data.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  }

  private dispatchSelectChangeEvent() {
    this.dispatchEvent(
      new CustomEvent('select-change', {
        bubbles: true,
        composed: true,
        detail: {
          sourceSelectedKeys: [...this.sourceSelectedKeys],
          targetSelectedKeys: [...this.targetSelectedKeys]
        }
      })
    );
  }

  private dispatchChangeEvent(movedKeys: (string | number)[], direction: 'left' | 'right') {
    this.value = this.targetData.map(item => item.key);
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          sourceData: [...this.sourceData],
          targetData: [...this.targetData],
          movedKeys,
          direction
        }
      })
    );
  }

  private handleSelectAll = (side: 'source' | 'target', checked: boolean) => {
    const filteredData = this.getFilteredItems(side);
    const validKeys = filteredData.filter(item => !item.disabled).map(item => item.key);

    if (side === 'source') {
      if (checked) {
        this.sourceSelectedKeys = Array.from(new Set([...this.sourceSelectedKeys, ...validKeys]));
      } else {
        this.sourceSelectedKeys = this.sourceSelectedKeys.filter(key => !validKeys.includes(key));
      }
    } else {
      if (checked) {
        this.targetSelectedKeys = Array.from(new Set([...this.targetSelectedKeys, ...validKeys]));
      } else {
        this.targetSelectedKeys = this.targetSelectedKeys.filter(key => !validKeys.includes(key));
      }
    }

    this.dispatchSelectChangeEvent();
  }

  private handleItemSelect = (side: 'source' | 'target', key: string | number, event?: MouseEvent | KeyboardEvent) => {
    let selectedKeys = side === 'source' ? [...this.sourceSelectedKeys] : [...this.targetSelectedKeys];

    if (selectedKeys.includes(key)) {
      selectedKeys = selectedKeys.filter(k => k !== key);
    } else {
      selectedKeys.push(key);
    }

    if (side === 'source') {
      this.sourceSelectedKeys = selectedKeys;
    } else {
      this.targetSelectedKeys = selectedKeys;
    }

    const filteredData = this.getFilteredItems(side);
    this.focusedSide = side;
    this.focusedIndex = filteredData.findIndex(item => item.key === key);

    this.dispatchSelectChangeEvent();
  }

  private handleSearchInput = (side: 'source' | 'target', event: InputEvent) => {
    const query = (event.target as HTMLInputElement).value;
    if (side === 'source') {
      this.sourceSearchQuery = query;
    } else {
      this.targetSearchQuery = query;
    }

    this.dispatchEvent(
      new CustomEvent('search', {
        bubbles: true,
        composed: true,
        detail: {
          side,
          query
        }
      })
    );
  }

  private handleMoveRight = () => {
    const movedItems = this.sourceData.filter(
      item => !item.disabled && this.sourceSelectedKeys.includes(item.key)
    );
    if (movedItems.length === 0) return;

    const movedKeys = movedItems.map(item => item.key);
    this.sourceData = this.sourceData.filter(item => !movedKeys.includes(item.key));
    this.targetData = [...this.targetData, ...movedItems];
    this.sourceSelectedKeys = this.sourceSelectedKeys.filter(key => !movedKeys.includes(key));

    this.liveMessage = `${movedItems.length}개 항목이 우측 선택 리스트로 이동되었습니다.`;
    this.dispatchChangeEvent(movedKeys, 'right');
  }

  private handleMoveAllRight = () => {
    const movedItems = this.getFilteredItems('source').filter(item => !item.disabled);
    if (movedItems.length === 0) return;

    const movedKeys = movedItems.map(item => item.key);
    this.sourceData = this.sourceData.filter(item => !movedKeys.includes(item.key));
    this.targetData = [...this.targetData, ...movedItems];
    this.sourceSelectedKeys = this.sourceSelectedKeys.filter(key => !movedKeys.includes(key));

    this.liveMessage = `전체 ${movedItems.length}개 항목이 우측 선택 리스트로 이동되었습니다.`;
    this.dispatchChangeEvent(movedKeys, 'right');
  }

  private handleMoveLeft = () => {
    if (this.oneWay) return;
    const movedItems = this.targetData.filter(
      item => !item.disabled && this.targetSelectedKeys.includes(item.key)
    );
    if (movedItems.length === 0) return;

    const movedKeys = movedItems.map(item => item.key);
    this.targetData = this.targetData.filter(item => !movedKeys.includes(item.key));
    this.sourceData = [...this.sourceData, ...movedItems];
    this.targetSelectedKeys = this.targetSelectedKeys.filter(key => !movedKeys.includes(key));

    this.liveMessage = `${movedItems.length}개 항목이 좌측 원본 리스트로 이동되었습니다.`;
    this.dispatchChangeEvent(movedKeys, 'left');
  }

  private handleMoveAllLeft = () => {
    if (this.oneWay) return;
    const movedItems = this.getFilteredItems('target').filter(item => !item.disabled);
    if (movedItems.length === 0) return;

    const movedKeys = movedItems.map(item => item.key);
    this.targetData = this.targetData.filter(item => !movedKeys.includes(item.key));
    this.sourceData = [...this.sourceData, ...movedItems];
    this.targetSelectedKeys = this.targetSelectedKeys.filter(key => !movedKeys.includes(key));

    this.liveMessage = `전체 ${movedItems.length}개 항목이 좌측 원본 리스트로 이동되었습니다.`;
    this.dispatchChangeEvent(movedKeys, 'left');
  }

  private handleMoveUp = () => {
    if (this.targetSelectedKeys.length !== 1) return;
    const key = this.targetSelectedKeys[0];
    const index = this.targetData.findIndex(item => item.key === key);
    if (index <= 0) return;

    const newTargetData = [...this.targetData];
    const [movedItem] = newTargetData.splice(index, 1);
    const newIndex = index - 1;
    newTargetData.splice(newIndex, 0, movedItem);

    this.targetData = newTargetData;
    this.value = this.targetData.map(item => item.key);

    this.dispatchEvent(
      new CustomEvent('reorder', {
        bubbles: true,
        composed: true,
        detail: {
          targetData: [...this.targetData],
          movedKey: key,
          newIndex
        }
      })
    );
  }

  private handleMoveDown = () => {
    if (this.targetSelectedKeys.length !== 1) return;
    const key = this.targetSelectedKeys[0];
    const index = this.targetData.findIndex(item => item.key === key);
    if (index < 0 || index >= this.targetData.length - 1) return;

    const newTargetData = [...this.targetData];
    const [movedItem] = newTargetData.splice(index, 1);
    const newIndex = index + 1;
    newTargetData.splice(newIndex, 0, movedItem);

    this.targetData = newTargetData;
    this.value = this.targetData.map(item => item.key);

    this.dispatchEvent(
      new CustomEvent('reorder', {
        bubbles: true,
        composed: true,
        detail: {
          targetData: [...this.targetData],
          movedKey: key,
          newIndex
        }
      })
    );
  }

  private handleKeyDown = (side: 'source' | 'target', event: KeyboardEvent) => {
    if (this.disabled) return;
    const filteredData = this.getFilteredItems(side);
    if (filteredData.length === 0) return;

    let currentIndex = this.focusedSide === side ? this.focusedIndex : 0;
    if (currentIndex < 0) currentIndex = 0;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedSide = side;
        this.focusedIndex = Math.min(currentIndex + 1, filteredData.length - 1);
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedSide = side;
        this.focusedIndex = Math.max(currentIndex - 1, 0);
        break;

      case ' ':
        event.preventDefault();
        if (filteredData[currentIndex] && !filteredData[currentIndex].disabled) {
          this.handleItemSelect(side, filteredData[currentIndex].key, event);
        }
        break;

      case 'Enter':
        event.preventDefault();
        if (side === 'source') {
          this.handleMoveRight();
        } else {
          this.handleMoveLeft();
        }
        break;

      case 'a':
      case 'A':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          this.handleSelectAll(side, true);
        }
        break;
    }
  }

  override render() {
    const context: TransferListContext = {
      sourceData: this.sourceData,
      targetData: this.targetData,
      value: this.value,
      sourceTitle: this.sourceTitle,
      targetTitle: this.targetTitle,
      showSearch: this.showSearch,
      showSelectAll: this.showSelectAll,
      showReorder: this.showReorder,
      disabled: this.disabled,
      oneWay: this.oneWay,
      variant: this.variant,
      size: this.size,
      sourceSelectedKeys: this.sourceSelectedKeys,
      targetSelectedKeys: this.targetSelectedKeys,
      sourceSearchQuery: this.sourceSearchQuery,
      targetSearchQuery: this.targetSearchQuery,
      focusedSide: this.focusedSide,
      focusedIndex: this.focusedIndex,
      liveMessage: this.liveMessage,
      handleSelectAll: this.handleSelectAll,
      handleItemSelect: this.handleItemSelect,
      handleSearchInput: this.handleSearchInput,
      handleMoveRight: this.handleMoveRight,
      handleMoveAllRight: this.handleMoveAllRight,
      handleMoveLeft: this.handleMoveLeft,
      handleMoveAllLeft: this.handleMoveAllLeft,
      handleMoveUp: this.handleMoveUp,
      handleMoveDown: this.handleMoveDown,
      handleKeyDown: this.handleKeyDown
    };

    return TransferListTemplate(context);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-transfer-list': BizTransferList;
  }
}