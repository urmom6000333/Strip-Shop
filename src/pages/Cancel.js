import React from 'react';

export default function Cancel() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1>Payment Canceled</h1>
      <p>Your payment was canceled or not completed.</p>
      <p>If this was a mistake, you can try again or contact our support team for assistance.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '2rem', fontSize: '1.1rem' }}>
        Return to Home
      </a>
    </div>
  );
}