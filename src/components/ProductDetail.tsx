import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WebApp from '@twa-dev/sdk';
import { Product } from '../types';
import ProductImageGallery from './ProductImageGallery';
import SupplierInfo from './SupplierInfo';
import PurchaseIntentModal from './PurchaseIntentModal';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const { t } = useTranslation();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseType, setPurchaseType] = useState<'purchase' | 'trial'>('purchase');

  const handleContactSupplier = () => {
    const message = encodeURIComponent(
      `${t('messages.contactSupplier')}: ${product.name}\n${window.location.href}`
    );
    const telegramUrl = `https://t.me/${product.supplier.telegramUsername}?text=${message}`;
    WebApp.openTelegramLink(telegramUrl);
  };

  const handlePurchaseIntent = () => {
    setPurchaseType('purchase');
    setShowPurchaseModal(true);
  };

  const handleTrialRequest = () => {
    setPurchaseType('trial');
    setShowPurchaseModal(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      // 复制到剪贴板
      navigator.clipboard.writeText(window.location.href);
      WebApp.showAlert(t('messages.linkCopied'));
    }
  };

  return (
    <div className="product-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={onBack}>
          ← {t('actions.back')}
        </button>
        <button className="share-btn" onClick={handleShare}>
          📤
        </button>
      </div>

      <ProductImageGallery images={product.images} alt={product.name} />

      <div className="detail-content">
        <div className="container">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="price-section">
              <span className="price">${product.price.toFixed(2)}</span>
              <span className="currency">{product.currency}</span>
            </div>
          </div>

          <div className="product-description">
            <h3>{t('product.description')}</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-specifications">
            <h3>{t('product.specifications')}</h3>
            <div className="specs-list">
              {product.specifications.map((spec, index) => (
                <div key={index} className="spec-item">
                  <span className="spec-key">{spec.key}</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
              <div className="spec-item">
                <span className="spec-key">{t('product.minOrder')}</span>
                <span className="spec-value">{product.minOrderQuantity}</span>
              </div>
            </div>
          </div>

          <SupplierInfo supplier={product.supplier} />

          <div className="product-tags">
            {product.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="action-bar">
        <div className="container">
          <div className="action-buttons">
            <button 
              className="btn btn-outline"
              onClick={handleTrialRequest}
            >
              🧪 {t('product.tryProduct')}
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={handleContactSupplier}
            >
              💬 {t('product.contactSupplier')}
            </button>
            
            <button 
              className="btn btn-primary"
              onClick={handlePurchaseIntent}
            >
              🛒 {t('product.purchaseIntent')}
            </button>
          </div>
        </div>
      </div>

      {showPurchaseModal && (
        <PurchaseIntentModal
          product={product}
          type={purchaseType}
          onClose={() => setShowPurchaseModal(false)}
          onSubmit={(data) => {
            setShowPurchaseModal(false);
            WebApp.showAlert(t('messages.intentSubmitted'));
          }}
        />
      )}
      
      <style jsx>{`
        .product-detail {
          min-height: 100vh;
          background: var(--tg-theme-bg-color, #ffffff);
        }
        
        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          background: var(--tg-theme-secondary-bg-color, #f8f9fa);
          border-bottom: 1px solid #e0e0e0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .back-btn, .share-btn {
          background: none;
          border: none;
          font-size: 16px;
          color: var(--tg-theme-button-color, var(--primary-color));
          cursor: pointer;
          padding: 8px 12px;
          border-radius: var(--border-radius);
          transition: var(--transition);
        }
        
        .back-btn:hover, .share-btn:hover {
          background: var(--tg-theme-secondary-bg-color, #f0f0f0);
        }
        
        .detail-content {
          padding: 0 0 120px 0;
        }
        
        .product-header {
          padding: 24px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .product-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 16px 0;
          line-height: 1.3;
          color: var(--tg-theme-text-color, #000);
        }
        
        .price-section {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        
        .price {
          font-size: 32px;
          font-weight: bold;
          color: var(--tg-theme-button-color, var(--primary-color));
        }
        
        .currency {
          font-size: 18px;
          color: var(--tg-theme-hint-color, #666);
        }
        
        .product-description {
          padding: 24px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .product-description h3 {
          font-size: 18px;
          margin: 0 0 12px 0;
          color: var(--tg-theme-text-color, #000);
        }
        
        .product-description p {
          font-size: 16px;
          line-height: 1.6;
          color: var(--tg-theme-text-color, #333);
          margin: 0;
        }
        
        .product-specifications {
          padding: 24px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .product-specifications h3 {
          font-size: 18px;
          margin: 0 0 16px 0;
          color: var(--tg-theme-text-color, #000);
        }
        
        .specs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .spec-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          background: var(--tg-theme-secondary-bg-color, #f8f9fa);
          border-radius: var(--border-radius);
        }
        
        .spec-key {
          font-weight: 500;
          color: var(--tg-theme-text-color, #000);
        }
        
        .spec-value {
          color: var(--tg-theme-hint-color, #666);
          text-align: right;
        }
        
        .product-tags {
          padding: 24px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tag {
          background: var(--tg-theme-button-color, var(--primary-color));
          color: white;
          padding: 6px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .action-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--tg-theme-bg-color, #ffffff);
          border-top: 1px solid #e0e0e0;
          padding: 16px 0;
          z-index: 100;
        }
        
        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr 2fr;
          gap: 8px;
        }
        
        @media (max-width: 768px) {
          .product-title {
            font-size: 20px;
          }
          
          .price {
            font-size: 28px;
          }
          
          .action-buttons {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
        
        @media (max-width: 480px) {
          .detail-header {
            padding: 12px 16px;
          }
          
          .product-title {
            font-size: 18px;
          }
          
          .price {
            font-size: 24px;
          }
          
          .spec-item {
            padding: 10px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
