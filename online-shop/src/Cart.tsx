import React from 'react';
import { useCart } from './CartContext';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ background: '#fff', padding: 20, borderRadius: 8, margin: '20px 0' }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} - ${item.price * item.quantity}
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 8 }}>Remove</button>
              </li>
            ))}
          </ul>
          <p><strong>Total: ${total.toFixed(2)}</strong></p>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
}