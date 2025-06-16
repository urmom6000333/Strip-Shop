require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());

// Stripe requires raw body for webhooks!
app.use('/webhook', bodyParser.raw({ type: 'application/json' }));

// 1. Create Stripe Checkout Session
app.post('/create-checkout-session', async (req, res) => {
  const { amount, currency, email, lineItems } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: lineItems || [
        {
          price_data: {
            currency: currency || 'usd',
            product_data: {
              name: 'Sample Product',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. Get Checkout Session details (for frontend success page)
app.get('/checkout-session', async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- ADDED: Get line items for a session (for order details on frontend) ---
app.get('/checkout-session/line-items', async (req, res) => {
  const { session_id } = req.query;
  try {
    const items = await stripe.checkout.sessions.listLineItems(session_id, { limit: 100 });
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 3. Stripe Webhook for payment confirmation and email sending
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Send email
    await sendConfirmationEmail(session.customer_email, session);
  }

  res.json({ received: true });
});

// Email sending function using Nodemailer
async function sendConfirmationEmail(to, session) {
  if (!to) return;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM, // your email
      pass: process.env.EMAIL_PASS, // your email password or app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Order Confirmation',
    text: `Thank you for your order! Your payment of ${session.amount_total / 100} ${session.currency.toUpperCase()} was successful. Session ID: ${session.id}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent to:', to);
  } catch (err) {
    console.error('Error sending email:', err);
  }
}

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));