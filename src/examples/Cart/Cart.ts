import { html } from 'lit';

export interface CartItem {
  id: number,
  name: string
  quantity: number
  price: number
}

export interface CartProps {
    items: CartItem[];
}

export const CartTemplate = ({
    items,
    }: CartProps) => {

    // 총합 계산
    const total = () => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    // 아이템 삭제
    const handleRemove = (id: number, e: Event) => {
        const target = e.target as HTMLElement;
        target.dispatchEvent(new CustomEvent('remove-item', {
            detail: { id },
            bubbles: true,
            composed: true
        }));
    };

    return html`
      <div class="cart">
        <header class="cart-header">
          <h2>🛒 장바구니</h2>
        </header>

        <ul class="cart-items">
          ${items.map((item, _) => html`
            <li class="cart-item">
              <span class="item-name">${item.name}</span>
              <span class="item-quantity">x${item.quantity}</span>
              <span class="item-price">₩${item.price.toLocaleString()}</span>
              <button class="remove-btn" @click=${(e: Event) => handleRemove(item.id, e)}>삭제</button>
            </li>
          `)}
        </ul>

        <div class="cart-total">
          <span>총합:</span>
          <strong>₩${total().toLocaleString()}</strong>
        </div>
      </div>
    `;
};