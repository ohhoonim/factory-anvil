import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CartTemplate, type CartItem } from './Cart';
import { cartStyles } from './Cart.css';


/**
 * @element shop-cart
 */
@customElement('shop-cart')
export class CartWC extends LitElement {
    static styles = cartStyles;

    @property({ type: Array })
    accessor items: CartItem[] = [];

    @state()
    private _items: CartItem[] = [];

    public get itemsInCart(): CartItem[] {
        return this._items;
    }

    willUpdate(changedProperties: Map<PropertyKey, unknown>) {
        if (changedProperties.has('items')) {
            this._items = this._mergeItems(this.items);
        }
    }

    public addItem(item: CartItem) {
        this._items = this._mergeItems([...this._items, item]);
    }

    private _handleRemoveItem(e: CustomEvent<{ id: number }>) {
        const targetId = e.detail.id;
        this._items = this._items.filter(item => item.id !== targetId);
    }

    private _mergeItems(items: CartItem[]): CartItem[] {
        const mergedMap = new Map<string | number, CartItem>();

        for (const item of items) {
            if (mergedMap.has(item.id)) {
                const existing = mergedMap.get(item.id)!;
                mergedMap.set(item.id, {
                    ...existing,
                    quantity: (existing.quantity || 0) + (item.quantity || 1)
                });
            } else {
                mergedMap.set(item.id, { ...item, quantity: item.quantity || 1 });
            }
        }

        return Array.from(mergedMap.values());
    }

    render() {
        return html`
            <div @remove-item=${this._handleRemoveItem}>
                ${CartTemplate({ items: this._items })}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'shop-cart': CartWC;
    }
}
