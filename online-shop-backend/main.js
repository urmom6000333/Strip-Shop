alert("main.js is loaded!");

// Replace with your own Stripe publishable key from https://dashboard.stripe.com/apikeys
const stripe = Stripe('pk_test_51RZ5t1AxHsai90CYI77H2rVtN9PpnicYFb47cfM1ZVqdD4e9eta2OfSyi4HTQCmvNJ3PvnnYlDBB7XLSEOAPWW0n00XV3bsoBp');

const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

const form = document.getElementById('payment-form');
const paymentMessage = document.getElementById('payment-message');

// Always use your public backend URL on Glitch now
const BACKEND_URL = "https://deeply-wistful-columnist.glitch.me";

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  alert('Pay button clicked!'); // For debugging

  paymentMessage.textContent = "Processing...";

  const amount = 1000; // $10.00 in cents
  const currency = 'usd';

  let clientSecret;
  try {
    const response = await fetch(`${BACKEND_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency })
    });

    if (!response.ok) {
      throw new Error('Failed to create PaymentIntent');
    }

    const data = await response.json();
    clientSecret = data.clientSecret;
    if (!clientSecret) throw new Error('No clientSecret returned from backend.');
  } catch (err) {
    paymentMessage.textContent = "Error: " + err.message;
    return;
  }

  // Confirm the card payment
  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardElement,
    }
  });

  if (error) {
    paymentMessage.textContent = `Payment failed: ${error.message}`;
  } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    paymentMessage.textContent = "Payment succeeded!";
    form.reset();
    cardElement.clear();
  } else {
    paymentMessage.textContent = "Payment did not complete.";
  }
});