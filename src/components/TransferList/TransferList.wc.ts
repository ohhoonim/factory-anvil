import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TransferListTemplate, type ListItem, type TransferListHost } from './TransferList';
import { transferListStyles } from './TransferList.css';

@customElement('biz-transfer-list')
export class BizTransferList extends LitElement implements TransferListHost {
  static styles = transferListStyles;

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
  size: 'small' | 'medium' | 'large' = 'medium';

  @property({ type: String })
  variant: 'horizontal' | 'vertical' = 'horizontal';

  @state()
  sourceSelectedKeys: (string | number)[] = [];

  @state()
  targetSelectedKeys: (string | number)[] = [];

  @state()
  sourceSearchQuery = '';

  @state()
  targetSearchQuery = '';

  private liveRegion: HTMLElement | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.initLiveRegion();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.liveRegion && this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
    }
  }

  private initLiveRegion(): void {
    const liveEl = document.createElement('div');
    liveEl.setAttribute('aria-live', 'polite');
    liveEl.setAttribute('aria-atomic', 'true');
    liveEl.style.position = 'absolute';
    liveEl.style.width = '1px';
    liveEl.style.height = '1px';
    liveEl.style.padding = '0';
    liveEl.style.overflow = 'hidden';
    liveEl.style.clip = 'rect(0, 0, 0, 0)';
    liveEl.style.whiteSpace = 'nowrap';
    liveEl.style.border = '0';
    document.body.appendChild(liveEl);
    this.liveRegion = liveEl;
  }

  private announce(message: string): void {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
    }
  }

  handleSourceSelectAll = (): void => {
    if (this.disabled) return;
    const filteredSource = this.sourceData.filter(
      item =>
        !item.disabled && item.label.toLowerCase().includes(this.sourceSearchQuery.toLowerCase())
    );
    const allFilteredKeys = filteredSource.map(item => item.key);
    const isAllSelected = allFilteredKeys.every(key => this.sourceSelectedKeys.includes(key));

    if (isAllSelected) {
      this.sourceSelectedKeys = this.sourceSelectedKeys.filter(
        key => !allFilteredKeys.includes(key)
      );
    } else {
      this.sourceSelectedKeys = Array.from(
        new Set([...this.sourceSelectedKeys, ...allFilteredKeys])
      );
    }
    this.emitSelectChange();
  };

  handleTargetSelectAll = (): void => {
    if (this.disabled) return;
    const filteredTarget = this.targetData.filter(
      item =>
        !item.disabled && item.label.toLowerCase().includes(this.targetSearchQuery.toLowerCase())
    );
    const allFilteredKeys = filteredTarget.map(item => item.key);
    const isAllSelected = allFilteredKeys.every(key => this.targetSelectedKeys.includes(key));

    if (isAllSelected) {
      this.targetSelectedKeys = this.targetSelectedKeys.filter(
        key => !allFilteredKeys.includes(key)
      );
    } else {
      this.targetSelectedKeys = Array.from(
        new Set([...this.targetSelectedKeys, ...allFilteredKeys])
      );
    }
    this.emitSelectChange();
  };

  handleSourceItemSelect = (key: string | number): void => {
    if (this.disabled) return;
    if (this.sourceSelectedKeys.includes(key)) {
      this.sourceSelectedKeys = this.sourceSelectedKeys.filter(k => k !== key);
    } else {
      this.sourceSelectedKeys = [...this.sourceSelectedKeys, key];
    }
    this.emitSelectChange();
  };

  handleTargetItemSelect = (key: string | number): void => {
    if (this.disabled) return;
    if (this.targetSelectedKeys.includes(key)) {
      this.targetSelectedKeys = this.targetSelectedKeys.filter(k => k !== key);
    } else {
      this.targetSelectedKeys = [...this.targetSelectedKeys, key];
    }
    this.emitSelectChange();
  };

  handleSourceSearch = (e: InputEvent): void => {
    const input = e.target as HTMLInputElement;
    this.sourceSearchQuery = input.value;
    this.dispatchEvent(
      new CustomEvent('search', {
        bubbles: true,
        composed: true,
        detail: { side: 'source', query: this.sourceSearchQuery },
      })
    );
  };

  handleTargetSearch = (e: InputEvent): void => {
    const input = e.target as HTMLInputElement;
    this.targetSearchQuery = input.value;
    this.dispatchEvent(
      new CustomEvent('search', {
        bubbles: true,
        composed: true,
        detail: { side: 'target', query: this.targetSearchQuery },
      })
    );
  };

  handleMoveRight = (): void => {
    if (this.disabled || this.sourceSelectedKeys.length === 0) return;
    const movedKeys = [...this.sourceSelectedKeys];
    const itemsToMove = this.sourceData.filter(item => movedKeys.includes(item.key));
    
    this.sourceData = this.sourceData.filter(item => !movedKeys.includes(item.key));
    this.targetData = [...this.targetData, ...itemsToMove];
    this.value = this.targetData.map(item => item.key);
    this.sourceSelectedKeys = [];

    this.emitChangeEvent(movedKeys, 'right');
    this.announce(`${movedKeys.length}개 항목이 우측 선택 리스트로 이동되었습니다.`);
  };

  handleMoveAllRight = (): void => {
    if (this.disabled || this.sourceData.length === 0) return;
    const itemsToMove = this.sourceData.filter(item => !item.disabled);
    const movedKeys = itemsToMove.map(item => item.key);

    this.sourceData = this.sourceData.filter(item => item.disabled);
    this.targetData = [...this.targetData, ...itemsToMove];
    this.value = this.targetData.map(item => item.key);
    this.sourceSelectedKeys = [];

    this.emitChangeEvent(movedKeys, 'right');
    this.announce(`전체 ${movedKeys.length}개 항목이 우측 선택 리스트로 이동되었습니다.`);
  };

  handleMoveLeft = (): void => {
    if (this.disabled || this.oneWay || this.targetSelectedKeys.length === 0) return;
    const movedKeys = [...this.targetSelectedKeys];
    const itemsToMove = this.targetData.filter(item => movedKeys.includes(item.key));

    this.targetData = this.targetData.filter(item => !movedKeys.includes(item.key));
    this.sourceData = [...this.sourceData, ...itemsToMove];
    this.value = this.targetData.map(item => item.key);
    this.targetSelectedKeys = [];

    this.emitChangeEvent(movedKeys, 'left');
    this.announce(`${movedKeys.length}개 항목이 좌측 원본 리스트로 이동되었습니다.`);
  };

  handleMoveAllLeft = (): void => {
    if (this.disabled || this.oneWay || this.targetData.length === 0) return;
    const itemsToMove = this.targetData.filter(item => !item.disabled);
    const movedKeys = itemsToMove.map(item => item.key);

    this.targetData = this.targetData.filter(item => item.disabled);
    this.sourceData = [...this.sourceData, ...itemsToMove];
    this.value = this.targetData.map(item => item.key);
    this.targetSelectedKeys = [];

    this.emitChangeEvent(movedKeys, 'left');
    this.announce(`전체 ${movedKeys.length}개 항목이 좌측 원본 리스트로 이동되었습니다.`);
  };

  handleMoveUp = (): void => {
    if (this.disabled || this.targetSelectedKeys.length !== 1) return;
    const key = this.targetSelectedKeys[0];
    const index = this.targetData.findIndex(item => item.key === key);
    if (index > 0) {
      const updated = [...this.targetData];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      this.targetData = updated;
      this.value = updated.map(item => item.key);
      this.emitReorderEvent(key, index - 1);
    }
  };

  handleMoveDown = (): void => {
    if (this.disabled || this.targetSelectedKeys.length !== 1) return;
    const key = this.targetSelectedKeys[0];
    const index = this.targetData.findIndex(item => item.key === key);
    if (index >= 0 && index < this.targetData.length - 1) {
      const updated = [...this.targetData];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      this.targetData = updated;
      this.value = updated.map(item => item.key);
      this.emitReorderEvent(key, index + 1);
    }
  };

  handleItemKeyDown = (key: string | number, side: 'source' | 'target', e: KeyboardEvent): void => {
    if (this.disabled) return;

    if (e.key === ' ') {
      e.preventDefault();
      if (side === 'source') {
        this.handleSourceItemSelect(key);
      } else {
        this.handleTargetItemSelect(key);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (side === 'source') {
        if (!this.sourceSelectedKeys.includes(key)) {
          this.sourceSelectedKeys = [...this.sourceSelectedKeys, key];
        }
        this.handleMoveRight();
      } else if (!this.oneWay) {
        if (!this.targetSelectedKeys.includes(key)) {
          this.targetSelectedKeys = [...this.targetSelectedKeys, key];
        }
        this.handleMoveLeft();
      }
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
      e.preventDefault();
      if (side === 'source') {
        this.handleSourceSelectAll();
      } else {
        this.handleTargetSelectAll();
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const currentEl = e.currentTarget as HTMLElement;
      const listContainer = currentEl.parentElement;
      if (!listContainer) return;
      
      const items = Array.from(listContainer.querySelectorAll<HTMLElement>('.biz-transfer-list__item[tabindex="0"]'));
      const currentIndex = items.indexOf(currentEl);
      
      if (e.key === 'ArrowDown' && currentIndex < items.length - 1) {
        items[currentIndex + 1].focus();
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        items[currentIndex - 1].focus();
      }
    }
  };

  private emitChangeEvent(movedKeys: (string | number)[], direction: 'left' | 'right'): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        bubbles: true,
        composed: true,
        detail: {
          sourceData: this.sourceData,
          targetData: this.targetData,
          movedKeys,
          direction,
        },
      })
    );
  }

  private emitSelectChange(): void {
    this.dispatchEvent(
      new CustomEvent('select-change', {
        bubbles: true,
        composed: true,
        detail: {
          sourceSelectedKeys: this.sourceSelectedKeys,
          targetSelectedKeys: this.targetSelectedKeys,
        },
      })
    );
  }

  private emitReorderEvent(movedKey: string | number, newIndex: number): void {
    this.dispatchEvent(
      new CustomEvent('reorder', {
        bubbles: true,
        composed: true,
        detail: {
          targetData: this.targetData,
          movedKey,
          newIndex,
        },
      })
    );
  }

  render() {
    return TransferListTemplate(this);
  }
}