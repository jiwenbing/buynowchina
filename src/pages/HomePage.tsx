import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WebApp from '@twa-dev/sdk';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import LanguageSelector from '../components/LanguageSelector';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleProductSelect = (product: Product) => {
    navigate(`/buynowchina/product/${product.id}`);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setShowLanguageSelector(false);
  };

  const handleContactPlatform = () => {
    const message = encodeURIComponent(t('functions.contactPlatform'));
    WebApp.openTelegramLink(`https://t.me/buynowchina_support?text=${message}`);
  };

  const handleMerchantCooperation = () => {
    const message = encodeURIComponent(t('functions.merchantCooperation'));
    WebApp.openTelegramLink(`https://t.me/buynowchina_business?text=${message}`);
  };

  const handleRequestSample = () => {
    const message = encodeURIComponent(t('functions.requestSample'));
    WebApp.openTelegramLink(`https://t.me/buynowchina_samples?text=${message}`);
  };

  return (
    <div className="app">
      <Header 
        onLanguageClick={() => setShowLanguageSelector(true)}
        onContactPlatform={handleContactPlatform}
        onMerchantCooperation={handleMerchantCooperation}
        onRequestSample={handleRequestSample}
      />
      
      <ProductList 
        products={mockProducts}
        onProductSelect={handleProductSelect}
      />
      
      {showLanguageSelector && (
        <LanguageSelector
          currentLanguage={i18n.language}
          onLanguageChange={handleLanguageChange}
          onClose={() => setShowLanguageSelector(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
