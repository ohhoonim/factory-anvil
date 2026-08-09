
import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { CartItem, CartProps } from './Cart';
import './Cart.wc';

const meta: Meta<CartProps> = {
    title: 'Examples/Cart',
    render: (args) => {
        const handleAddItem = () => {
            const cartEl = document.querySelector('shop-cart');
            if (cartEl) {
                const newItem: CartItem = {
                    id: Math.floor(Math.random() * 5),
                    name: `추가된 상품 (${Date.now().toString().slice(-4)})`,
                    price: 1500,
                    quantity: 1
                };
                cartEl.addItem(newItem);
            }
        };
        const handleCheckout = () => {
            const cartEl = document.querySelector('shop-cart');
            if (cartEl) {
                // public getter를 통해 병합된 내부 상태 수집
                const finalItems = cartEl.itemsInCart;
                alert(`총 ${finalItems.length}개의 종류 상품 결재를 진행합니다.`);
            }
        };
        return html`
        <div style="margin-bottom: 16px;">
            <button @click=${handleAddItem}>상품추가</button>
        </div>
        <shop-cart
            .items=${args.items} 
        ></shop-cart> 
        <div style="margin-top: 16px; display: flex; gap: 8px;">
            <button @click=${handleCheckout}>결재하기</button>
        </div>
    `;
    },
    argTypes: {
        items: {
            control: { type: 'object' }
        }
    }
};

export default meta;
type Story = StoryObj<CartProps>;

export const Default: Story = {
    args: {
        items: [
            { id: 1, name: "notebook", price: 1000, quantity: 1 },
            { id: 2, name: "macbook", price: 2300, quantity: 1 },
            { id: 1, name: "notebook", price: 1000, quantity: 2 },
        ]
    }
};