import React from 'react';
import PaymentButton from './components/src/PaymentButton.tsx';

function App() {
  const handleSuccess = (response: any) => {
    // User is redirected to Stripe, so this may not be visible
    console.log('Checkout session created:', response);
  };

  const handleError = (error: any) => {
    alert('Payment failed: ' + (error?.message || error));
  };

  return (
    <div>
      <h1>Stripe Checkout Example</h1>
      <PaymentButton amount={10} onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default App;