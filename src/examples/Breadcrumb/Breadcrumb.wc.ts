import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BreadcrumbTemplate, type BreadcrumbItem } from './Breadcrumb';
import { breadcrumbStyles } from './Breadcrumb.css';

@customElement('biz-breadcrumb')
export class BreadcrumbWC extends LitElement {
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
    'biz-breadcrumb': BreadcrumbWC;
  }
}
