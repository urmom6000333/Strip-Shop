require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 4242;

// Serve static files from public (success.html/cancel.html)
app.use(express.static('public'));

// CORS setup
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://deeply-wistful-columnist.glitch.me'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

// FIXED ROOT ROUTE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// [rest of your code unchanged ...]