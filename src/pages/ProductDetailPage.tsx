import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WebApp from '@twa-dev/sdk';
import ProductDetail from '../components/ProductDetail';
import { mockProducts } from '../data/mockData';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const product = mockProducts.find(p => p.id === productId);

  useEffect(() => {
    // 设置Telegram Web App主按钮
    WebApp.MainButton.setText(t('actions.back'));
    WebApp.MainButton.show();
    
    const handleMainButtonClick = () => {
      navigate('/buynowchina');
    };
    
    WebApp.MainButton.onClick(handleMainButtonClick);
    
    return () => {
      WebApp.MainButton.offClick(handleMainButtonClick);
      WebApp.MainButton.hide();
    };
  }, [navigate, t]);

  const handleBack = () => {
    navigate('/buynowchina');
  };

  if (!product) {
    return (
      <div className="error-page">
        <div className="container">
          <h2>{t('messages.error')}</h2>
          <p>{t('product.notFound')}</p>
          <button className="btn btn-primary" onClick={handleBack}>
            {t('actions.back')}
          </button>
        </div>
        
        <style>{`
          .error-page {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
          }
          
          .error-page h2 {
            margin-bottom: 16px;
            color: var(--tg-theme-text-color, #000);
          }
          
          .error-page p {
            margin-bottom: 24px;
            color: var(--tg-theme-hint-color, #666);
          }
        `}</style>
      </div>
    );
  }

  return (
    <ProductDetail 
      product={product} 
      onBack={handleBack}
    />
  );
};

export default ProductDetailPage;
