import { html } from "lit";

export interface ListItem {
  key: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface TransferListHost {
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
  size?: 'small' | 'medium' | 'large';
  variant?: 'horizontal' | 'vertical';
  
  sourceSelectedKeys: (string | number)[];
  targetSelectedKeys: (string | number)[];
  sourceSearchQuery: string;
  targetSearchQuery: string;

  handleSourceSelectAll: (e: Event) => void;
  handleTargetSelectAll: (e: Event) => void;
  handleSourceItemSelect: (key: string | number, e: Event) => void;
  handleTargetItemSelect: (key: string | number, e: Event) => void;
  handleSourceSearch: (e: InputEvent) => void;
  handleTargetSearch: (e: InputEvent) => void;
  handleMoveRight: () => void;
  handleMoveAllRight: () => void;
  handleMoveLeft: () => void;
  handleMoveAllLeft: () => void;
  handleMoveUp: () => void;
  handleMoveDown: () => void;
  handleItemKeyDown: (key: string | number, side: 'source' | 'target', e: KeyboardEvent) => void;
}

export const TransferListTemplate = (host: TransferListHost) => {
  const filteredSource = host.sourceData.filter(item =>
    item.label.toLowerCase().includes(host.sourceSearchQuery.toLowerCase())
  );
  const filteredTarget = host.targetData.filter(item =>
    item.label.toLowerCase().includes(host.targetSearchQuery.toLowerCase())
  );

  const isSourceAllSelected =
    filteredSource.length > 0 &&
    filteredSource.every(item => item.disabled || host.sourceSelectedKeys.includes(item.key));
  const isTargetAllSelected =
    filteredTarget.length > 0 &&
    filteredTarget.every(item => item.disabled || host.targetSelectedKeys.includes(item.key));

  return html`
    <div
      class="biz-transfer-list"
      role="region"
      aria-label="Transfer List"
      ?data-disabled=${host.disabled}
      data-size=${host.size || 'medium'}
      data-variant=${host.variant || 'horizontal'}
    >
      <div class="biz-transfer-list__box" role="group" aria-labelledby="source-title">
        <div class="biz-transfer-list__header">
          <slot name="source-header-slot">
            ${host.showSelectAll
              ? html`
                  <input
                    type="checkbox"
                    class="biz-transfer-list__checkbox"
                    .checked=${isSourceAllSelected}
                    ?disabled=${host.disabled || filteredSource.length === 0}
                    @change=${host.handleSourceSelectAll}
                    aria-label="Select all source items"
                  />
                `
              : ''}
            <span id="source-title" class="biz-transfer-list__title">${host.sourceTitle}</span>
            <span class="biz-transfer-list__count">
              ${host.sourceSelectedKeys.length}/${host.sourceData.length}
            </span>
          </slot>
        </div>

        ${host.showSearch
          ? html`
              <div class="biz-transfer-list__search">
                <input
                  type="text"
                  class="biz-transfer-list__search-input"
                  placeholder="Search..."
                  .value=${host.sourceSearchQuery}
                  ?disabled=${host.disabled}
                  @input=${host.handleSourceSearch}
                  aria-label="Search source items"
                />
              </div>
            `
          : ''}

        <ul class="biz-transfer-list__list" role="listbox" aria-multiselectable="true" tabindex="0">
          ${filteredSource.length === 0
            ? html`
                <li class="biz-transfer-list__empty">
                  <slot name="empty-source-slot">No items</slot>
                </li>
              `
            : filteredSource.map(item => {
                const isSelected = host.sourceSelectedKeys.includes(item.key);
                const isDisabled = host.disabled || Boolean(item.disabled);
                return html`
                  <li
                    class="biz-transfer-list__item"
                    role="option"
                    aria-selected=${isSelected}
                    aria-disabled=${isDisabled}
                    ?data-selected=${isSelected}
                    ?data-disabled=${isDisabled}
                    tabindex=${isDisabled ? '-1' : '0'}
                    @click=${(e: Event) => !isDisabled && host.handleSourceItemSelect(item.key, e)}
                    @keydown=${(e: KeyboardEvent) => !isDisabled && host.handleItemKeyDown(item.key, 'source', e)}
                  >
                    <input
                      type="checkbox"
                      class="biz-transfer-list__checkbox"
                      .checked=${isSelected}
                      ?disabled=${isDisabled}
                      tabindex="-1"
                    />
                    <slot name="item-slot" .item=${item}>
                      <span class="biz-transfer-list__item-label">${item.label}</span>
                    </slot>
                  </li>
                `;
              })}
        </ul>

        <div class="biz-transfer-list__footer">
          <slot name="footer-slot"></slot>
        </div>
      </div>

      <div class="biz-transfer-list__actions" role="group" aria-label="Transfer Controls">
        <slot name="action-controls-slot">
          <button
            type="button"
            class="biz-transfer-list__btn"
            ?disabled=${host.disabled || host.sourceSelectedKeys.length === 0}
            @click=${host.handleMoveRight}
            aria-label="Move Selected Right"
          >
            &gt;
          </button>
          <button
            type="button"
            class="biz-transfer-list__btn"
            ?disabled=${host.disabled || host.sourceData.length === 0}
            @click=${host.handleMoveAllRight}
            aria-label="Move All Right"
          >
            &gt;&gt;
          </button>
          ${!host.oneWay
            ? html`
                <button
                  type="button"
                  class="biz-transfer-list__btn"
                  ?disabled=${host.disabled || host.targetSelectedKeys.length === 0}
                  @click=${host.handleMoveLeft}
                  aria-label="Move Selected Left"
                >
                  &lt;
                </button>
                <button
                  type="button"
                  class="biz-transfer-list__btn"
                  ?disabled=${host.disabled || host.targetData.length === 0}
                  @click=${host.handleMoveAllLeft}
                  aria-label="Move All Left"
                >
                  &lt;&lt;
                </button>
              `
            : ''}
        </slot>
      </div>

      <div class="biz-transfer-list__box" role="group" aria-labelledby="target-title">
        <div class="biz-transfer-list__header">
          <slot name="target-header-slot">
            ${host.showSelectAll
              ? html`
                  <input
                    type="checkbox"
                    class="biz-transfer-list__checkbox"
                    .checked=${isTargetAllSelected}
                    ?disabled=${host.disabled || filteredTarget.length === 0}
                    @change=${host.handleTargetSelectAll}
                    aria-label="Select all target items"
                  />
                `
              : ''}
            <span id="target-title" class="biz-transfer-list__title">${host.targetTitle}</span>
            <span class="biz-transfer-list__count">
              ${host.targetSelectedKeys.length}/${host.targetData.length}
            </span>
          </slot>
        </div>

        ${host.showSearch
          ? html`
              <div class="biz-transfer-list__search">
                <input
                  type="text"
                  class="biz-transfer-list__search-input"
                  placeholder="Search..."
                  .value=${host.targetSearchQuery}
                  ?disabled=${host.disabled}
                  @input=${host.handleTargetSearch}
                  aria-label="Search target items"
                />
              </div>
            `
          : ''}

        <ul class="biz-transfer-list__list" role="listbox" aria-multiselectable="true" tabindex="0">
          ${filteredTarget.length === 0
            ? html`
                <li class="biz-transfer-list__empty">
                  <slot name="empty-target-slot">No items</slot>
                </li>
              `
            : filteredTarget.map(item => {
                const isSelected = host.targetSelectedKeys.includes(item.key);
                const isDisabled = host.disabled || Boolean(item.disabled);
                return html`
                  <li
                    class="biz-transfer-list__item"
                    role="option"
                    aria-selected=${isSelected}
                    aria-disabled=${isDisabled}
                    ?data-selected=${isSelected}
                    ?data-disabled=${isDisabled}
                    tabindex=${isDisabled ? '-1' : '0'}
                    @click=${(e: Event) => !isDisabled && host.handleTargetItemSelect(item.key, e)}
                    @keydown=${(e: KeyboardEvent) => !isDisabled && host.handleItemKeyDown(item.key, 'target', e)}
                  >
                    <input
                      type="checkbox"
                      class="biz-transfer-list__checkbox"
                      .checked=${isSelected}
                      ?disabled=${isDisabled}
                      tabindex="-1"
                    />
                    <slot name="item-slot" .item=${item}>
                      <span class="biz-transfer-list__item-label">${item.label}</span>
                    </slot>
                  </li>
                `;
              })}
        </ul>

        <div class="biz-transfer-list__footer">
          <slot name="footer-slot"></slot>
        </div>
      </div>

      ${host.showReorder
        ? html`
            <div class="biz-transfer-list__reorder-actions" role="group" aria-label="Reorder Controls">
              <button
                type="button"
                class="biz-transfer-list__btn"
                ?disabled=${host.disabled || host.targetSelectedKeys.length !== 1}
                @click=${host.handleMoveUp}
                aria-label="Move Up"
              >
                ▲
              </button>
              <button
                type="button"
                class="biz-transfer-list__btn"
                ?disabled=${host.disabled || host.targetSelectedKeys.length !== 1}
                @click=${host.handleMoveDown}
                aria-label="Move Down"
              >
                ▼
              </button>
            </div>
          `
        : ''}
    </div>
  `;
};