import React from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Welcome to Your Online Shop!</h1>
      <Cart />
      <ProductList />
    </div>
  );
}

export default App;