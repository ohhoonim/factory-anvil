import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BreadcrumbTemplate, type BreadcrumbHost, type BreadcrumbItem } from './Breadcrumb';
import { breadcrumbStyles } from './Breadcrumb.css';

/**
 * @element biz-breadcrumb
 * 
 * @slot (no)
 */
@customElement('biz-breadcrumb')
export class BizBreadcrumb extends LitElement implements BreadcrumbHost {
  static styles = breadcrumbStyles;

  @property({ type: Array }) accessor items: BreadcrumbItem[] = [];
  @property({ type: String }) accessor separator: string | undefined = '/';

  private _handlePathClick = (item: BreadcrumbItem) => {
    this.dispatchEvent(new CustomEvent('path-click', { detail: { item } }));
  };

  render() {
    return BreadcrumbTemplate({
      items: this.items,
      separator: this.separator,
      onPathClick: this._handlePathClick
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-breadcrumb': BizBreadcrumb;
  }
}
