import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/global.css';

function App() {
  useEffect(() => {
    // 初始化Telegram Web App
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <Routes>
      <Route path="/buynowchina" element={<HomePage />} />
      <Route path="/buynowchina/product/:productId" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;