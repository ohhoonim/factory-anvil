import { html } from 'lit';

export interface ListItem {
  key: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface TransferListContext {
  sourceData: ListItem[];
  targetData: ListItem[];
  value: (string | number)[];
  sourceTitle: string;
  targetTitle: string;
  showSearch: boolean;
  showSelectAll: boolean;
  showReorder: boolean;
  disabled: boolean;
  oneWay: boolean;
  variant: 'horizontal' | 'vertical';
  size: 'small' | 'medium' | 'large';
  
  sourceSelectedKeys: (string | number)[];
  targetSelectedKeys: (string | number)[];
  sourceSearchQuery: string;
  targetSearchQuery: string;
  focusedSide: 'source' | 'target' | null;
  focusedIndex: number;
  liveMessage: string;

  handleSelectAll: (side: 'source' | 'target', checked: boolean) => void;
  handleItemSelect: (side: 'source' | 'target', key: string | number, event?: MouseEvent | KeyboardEvent) => void;
  handleSearchInput: (side: 'source' | 'target', event: InputEvent) => void;
  handleMoveRight: () => void;
  handleMoveAllRight: () => void;
  handleMoveLeft: () => void;
  handleMoveAllLeft: () => void;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleKeyDown: (side: 'source' | 'target', event: KeyboardEvent) => void;
}

export const TransferListTemplate = (context: TransferListContext) => {
  const {
    sourceData,
    targetData,
    sourceTitle,
    targetTitle,
    showSearch,
    showSelectAll,
    showReorder,
    disabled,
    oneWay,
    variant = 'horizontal',
    size = 'medium',
    sourceSelectedKeys,
    targetSelectedKeys,
    sourceSearchQuery,
    targetSearchQuery,
    focusedSide,
    focusedIndex,
    liveMessage,
    handleSelectAll,
    handleItemSelect,
    handleSearchInput,
    handleMoveRight,
    handleMoveAllRight,
    handleMoveLeft,
    handleMoveAllLeft,
    handleMoveUp,
    handleMoveDown,
    handleKeyDown
  } = context;

  const filterItems = (data: ListItem[], query: string) => {
    if (!query.trim()) return data;
    return data.filter(item => item.label.toLowerCase().includes(query.toLowerCase()));
  };

  const filteredSourceData = filterItems(sourceData, sourceSearchQuery);
  const filteredTargetData = filterItems(targetData, targetSearchQuery);

  const isSourceAllSelected = filteredSourceData.length > 0 && 
    filteredSourceData.every(item => item.disabled || sourceSelectedKeys.includes(item.key));
  const isTargetAllSelected = filteredTargetData.length > 0 && 
    filteredTargetData.every(item => item.disabled || targetSelectedKeys.includes(item.key));

  const sourceEnabledSelectedCount = filteredSourceData.filter(item => !item.disabled && sourceSelectedKeys.includes(item.key)).length;
  const targetEnabledSelectedCount = filteredTargetData.filter(item => !item.disabled && targetSelectedKeys.includes(item.key)).length;

  const renderListBox = (
    side: 'source' | 'target',
    title: string,
    data: ListItem[],
    selectedKeys: (string | number)[],
    searchQuery: string,
    isAllSelected: boolean,
    headerSlotName: string,
    emptySlotName: string
  ) => {
    return html`
      <div class=${`biz-transfer-list__box biz-transfer-list__box--${side}`}>
        <div class="biz-transfer-list__header">
          <slot name=${headerSlotName}>
            <div class="biz-transfer-list__header-content">
              ${showSelectAll ? html`
                <input
                  type="checkbox"
                  class="biz-transfer-list__checkbox"
                  .checked=${isAllSelected}
                  .disabled=${disabled || data.length === 0}
                  @change=${(e: Event) => handleSelectAll(side, (e.target as HTMLInputElement).checked)}
                  aria-label=${`${title} 전체 선택`}
                />
              ` : ''}
              <span class="biz-transfer-list__header-title">${title}</span>
              <span class="biz-transfer-list__header-count">
                ${selectedKeys.length}/${data.length}
              </span>
            </div>
          </slot>
        </div>

        ${showSearch ? html`
          <div class="biz-transfer-list__search">
            <input
              type="text"
              class="biz-transfer-list__search-input"
              placeholder="검색..."
              .value=${searchQuery}
              .disabled=${disabled}
              @input=${(e: InputEvent) => handleSearchInput(side, e)}
              aria-label=${`${title} 검색`}
            />
          </div>
        ` : ''}

        <div
          class="biz-transfer-list__body"
          role="listbox"
          aria-multiselectable="true"
          aria-label=${title}
          tabindex=${disabled ? -1 : 0}
          @keydown=${(e: KeyboardEvent) => handleKeyDown(side, e)}
        >
          ${data.length === 0 ? html`
            <div class="biz-transfer-list__empty">
              <slot name=${emptySlotName}>데이터가 없습니다.</slot>
            </div>
          ` : html`
            <ul class="biz-transfer-list__list">
              ${data.map((item, index) => {
                const isSelected = selectedKeys.includes(item.key);
                const isFocused = focusedSide === side && focusedIndex === index;
                const itemDisabled = disabled || Boolean(item.disabled);

                return html`
                  <li
                    class=${`biz-transfer-list__item ${isSelected ? 'biz-transfer-list__item--selected' : ''} ${isFocused ? 'biz-transfer-list__item--focused' : ''} ${itemDisabled ? 'biz-transfer-list__item--disabled' : ''}`}
                    role="option"
                    aria-selected=${isSelected ? 'true' : 'false'}
                    aria-disabled=${itemDisabled ? 'true' : 'false'}
                    @click=${(e: MouseEvent) => !itemDisabled && handleItemSelect(side, item.key, e)}
                  >
                    <input
                      type="checkbox"
                      class="biz-transfer-list__checkbox"
                      .checked=${isSelected}
                      .disabled=${itemDisabled}
                      tabindex="-1"
                      aria-hidden="true"
                    />
                    <div class="biz-transfer-list__item-content">
                      <slot name="item-slot" .item=${item}>
                        <span class="biz-transfer-list__item-label">${item.label}</span>
                      </slot>
                    </div>
                  </li>
                `;
              })}
            </ul>
          `}
        </div>

        <div class="biz-transfer-list__footer">
          <slot name="footer-slot"></slot>
        </div>
      </div>
    `;
  };

  return html`
    <div
      class=${`biz-transfer-list biz-transfer-list--${variant} biz-transfer-list--${size} ${disabled ? 'biz-transfer-list--disabled' : ''}`}
      role="group"
      aria-label="Transfer List"
    >
      <div class="biz-transfer-list__live-region" aria-live="polite" aria-atomic="true">
        ${liveMessage}
      </div>

      ${renderListBox('source', sourceTitle, filteredSourceData, sourceSelectedKeys, sourceSearchQuery, isSourceAllSelected, 'source-header-slot', 'empty-source-slot')}

      <div class="biz-transfer-list__actions" role="group" aria-label="이동 제어">
        <slot name="action-controls-slot">
          <button
            type="button"
            class="biz-transfer-list__btn"
            .disabled=${disabled || sourceEnabledSelectedCount === 0}
            @click=${handleMoveRight}
            aria-label="선택 항목 우측 이동"
          >
            &gt;
          </button>
          <button
            type="button"
            class="biz-transfer-list__btn"
            .disabled=${disabled || filteredSourceData.filter(i => !i.disabled).length === 0}
            @click=${handleMoveAllRight}
            aria-label="전체 항목 우측 이동"
          >
            &gt;&gt;
          </button>
          ${!oneWay ? html`
            <button
              type="button"
              class="biz-transfer-list__btn"
              .disabled=${disabled || targetEnabledSelectedCount === 0}
              @click=${handleMoveLeft}
              aria-label="선택 항목 좌측 이동"
            >
              &lt;
            </button>
            <button
              type="button"
              class="biz-transfer-list__btn"
              .disabled=${disabled || filteredTargetData.filter(i => !i.disabled).length === 0}
              @click=${handleMoveAllLeft}
              aria-label="전체 항목 좌측 이동"
            >
              &lt;&lt;
            </button>
          ` : ''}
        </slot>
      </div>

      ${renderListBox('target', targetTitle, filteredTargetData, targetSelectedKeys, targetSearchQuery, isTargetAllSelected, 'target-header-slot', 'empty-target-slot')}

      ${showReorder ? html`
        <div class="biz-transfer-list__reorder-actions" role="group" aria-label="순서 제어">
          <button
            type="button"
            class="biz-transfer-list__btn"
            .disabled=${disabled || targetSelectedKeys.length !== 1}
            @click=${handleMoveUp}
            aria-label="위로 이동"
          >
            ▲
          </button>
          <button
            type="button"
            class="biz-transfer-list__btn"
            .disabled=${disabled || targetSelectedKeys.length !== 1}
            @click=${handleMoveDown}
            aria-label="아래로 이동"
          >
            ▼
          </button>
        </div>
      ` : ''}
    </div>
  `;
};