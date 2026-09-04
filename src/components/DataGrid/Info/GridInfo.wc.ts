import { LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { GridInfoTemplate, type GridInfoHost, type SortItem, type RenderedRange } from './GridInfo.js';
import { GridinfoStyles } from './GridInfo.css.js';

@customElement('grid-info')
export class GridInfo extends LitElement implements GridInfoHost {
  static override styles = GridinfoStyles;

  @property({ type: Number })
  totalCount = 0;

  @property({ type: Number })
  filteredCount = 0;

  @property({ type: Object })
  renderedRange: RenderedRange = { start: 0, end: 0 };

  @property({ type: Number })
  selectedRowCount = 0;

  @property({ type: Number })
  selectedCellCount = 0;

  @property({ type: Number })
  dirtyRowCount = 0;

  @property({ type: Number })
  dirtyCellCount = 0;

  @property({ type: Array })
  sortState: SortItem[] = [];

  @property({ type: String })
  variant: 'default' | 'compact' = 'default';

  @property({ type: String })
  size: 'sm' | 'md' = 'md';

  @property({ type: String })
  position: 'top' | 'bottom' = 'bottom';

  handleInfoClick = (type: 'count' | 'sort' | 'selection' | 'dirty'): void => {
    this.dispatchEvent(
      new CustomEvent('info-click', {
        detail: { type },
        bubbles: true,
        composed: true,
      })
    );
  };

  override render(): TemplateResult {
    return GridInfoTemplate(this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'grid-info': GridInfo;
  }
}