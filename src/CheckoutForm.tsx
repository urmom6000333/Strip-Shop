import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutForm from './StripeCheckoutForm';

// Replace with your real Stripe publishable key
const stripePromise = loadStripe('pk_test_XXXXXXXXXXXXXXXXXXXXXXXX');

export default function CheckoutForm() {
  const [submitted, setSubmitted] = useState(false);

  if (!submitted) {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          setSubmitted(true);
        }}
        style={{ marginTop: 24, background: '#f9fafc', padding: 24, borderRadius: 8 }}
      >
        <h2>Checkout</h2>
        <div>
          <label>Name:</label>
          <input required style={{ marginLeft: 8 }} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" required style={{ marginLeft: 8 }} />
        </div>
        <div>
          <label>Address:</label>
          <input required style={{ marginLeft: 8 }} />
        </div>
        <button type="submit" style={{ marginTop: 16, padding: '8px 24px' }}>
          Continue to Payment
        </button>
      </form>
    );
  }

  // Payment step with Stripe Elements
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm />
    </Elements>
  );
}