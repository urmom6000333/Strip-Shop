import React from 'react';

export default function Checkout() {
  // Example values -- in a real app you'd get these from user input or context
  const amount = 2500; // $25.00 in cents
  const currency = 'usd';
  const email = 'customer@example.com'; // Replace with actual user email if available
  const lineItems = [
    {
      price_data: {
        currency,
        product_data: {
          name: 'Sample Product',
        },
        unit_amount: amount,
      },
      quantity: 1,
    },
  ];

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, email, lineItems }),
      });
      const data = await response.json();
      if (data.url) {
        window.location = data.url; // Redirect to Stripe Checkout
      } else {
        alert(data.error || 'Checkout session could not be created.');
      }
    } catch (err) {
      alert('Error during checkout: ' + err.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Buy Sample Product</h1>
      <p>Price: $25.00 USD</p>
      <button
        onClick={handleCheckout}
        style={{ fontSize: '1.2rem', padding: '0.75rem 2rem', cursor: 'pointer' }}
      >
        Checkout
      </button>
    </div>
  );
}