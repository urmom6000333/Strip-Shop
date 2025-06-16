import React, { useState } from 'react';
import { useCart } from './CartContext';
import CheckoutForm from './CheckoutForm';

const products = [
  {
    id: 1,
    name: 'T-Shirt',
    price: 19.99,
    description: 'A cool t-shirt.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    name: 'Mug',
    price: 9.99,
    description: 'A coffee mug.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    name: 'Hat',
    price: 14.99,
    description: 'A stylish hat.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80'
  }
];

export default function ProductList() {
  const { addToCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <>
      <ul className="products-list">
        {products.map(product => (
          <li className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '12px' }}
            />
            <h3>{product.name}</h3>
            <div className="price">${product.price}</div>
            <p>{product.description}</p>
            <button onClick={() => addToCart({ id: product.id, name: product.name, price: product.price })}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button
          style={{ padding: '12px 32px', fontSize: '1.1rem' }}
          onClick={() => setShowCheckout(true)}
        >
          Proceed to Checkout
        </button>
        {showCheckout && <CheckoutForm />}
      </div>
    </>
  );
}