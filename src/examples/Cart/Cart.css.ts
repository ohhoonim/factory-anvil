import { css } from 'lit';

export const cartStyles = css`
    .cart { border: 1px solid #ccc; padding: 1rem; border-radius: 8px; }
    .cart-header { font-size: 1.2rem; margin-bottom: 1rem; }
    .cart-items { list-style: none; padding: 0; margin: 0; }
    .cart-item { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
    .cart-total { margin-top: 1rem; font-weight: bold; }
`;