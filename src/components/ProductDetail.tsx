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
  const { t, i18n } = useTranslation();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseType, setPurchaseType] = useState<'purchase' | 'trial'>('purchase');

  // 根据当前语言选择显示的名称和描述
  const displayName = i18n.language === 'ru' && product.nameRu ? product.nameRu : product.name;
  const displayDescription = i18n.language === 'ru' && product.descriptionRu ? product.descriptionRu : product.description;

  // 扩展Telegram视口以避免顶部被遮挡
  React.useEffect(() => {
    if (WebApp.isExpanded) {
      WebApp.expand();
    }
  }, []);

  const handleContactSupplier = () => {
    const message = encodeURIComponent(
      `${t('messages.contactSupplier')}: ${displayName}\n${window.location.href}`
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
        title: displayName,
        text: displayDescription,
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
      </div>

      <ProductImageGallery images={product.images} alt={displayName} />

      <div className="detail-content">
        <div className="container">
          <div className="product-header">
            <h1 className="product-title">{displayName}</h1>
            <div className="price-section">
              <span className="price">₽{Math.round(product.price)}</span>
              <span className="currency">{product.currency}</span>
            </div>
          </div>

          <div className="product-description">
            <h3>{t('product.description')}</h3>
            <p>{displayDescription}</p>
          </div>

          <div className="product-specifications">
            <h3>{t('product.specifications')}</h3>
            <div className="specs-list">
              {product.specifications.map((spec, index) => {
                const displayKey = i18n.language === 'ru' && spec.keyRu ? spec.keyRu : spec.key;
                const displayValue = i18n.language === 'ru' && spec.valueRu ? spec.valueRu : spec.value;
                return (
                  <div key={index} className="spec-item">
                    <span className="spec-key">{displayKey}</span>
                    <span className="spec-value">{displayValue}</span>
                  </div>
                );
              })}
              <div className="spec-item">
                <span className="spec-key">{t('product.minOrder')}</span>
                <span className="spec-value">{product.minOrderQuantity}</span>
              </div>
            </div>
          </div>

          <SupplierInfo supplier={product.supplier} />
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
          onSubmit={(data: any) => {
            setShowPurchaseModal(false);
            WebApp.showAlert(t('messages.intentSubmitted'));
          }}
        />
      )}
      
      <style>{`
        .product-detail {
          min-height: 100vh;
          background: var(--tg-theme-bg-color, #ffffff);
        }
        
        .detail-header {
          display: flex;
          justify-content: center;
          align-items: center;
          /* 顶部固定60px空间 */
          padding-top: 60px;
          padding-bottom: 12px;
          padding-left: max(env(safe-area-inset-left), 16px);
          padding-right: max(env(safe-area-inset-right), 16px);
          min-height: 56px;
          background: var(--tg-theme-secondary-bg-color, #f8f9fa);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
          background-color: rgba(248, 249, 250, 0.95);
        }
        
        .back-btn {
          background: var(--tg-theme-button-color, var(--primary-color));
          border: none;
          font-size: 16px;
          color: white;
          cursor: pointer;
          padding: 10px 20px;
          border-radius: 8px;
          transition: var(--transition);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          min-width: 120px;
          justify-content: center;
        }
        
        .back-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .back-btn:active {
          transform: translateY(0);
        }
        
        .detail-content {
          padding: 0 0 120px 0;
        }
        
        .product-header {
          padding: 24px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .product-title {
          font-size: 28px;
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
          font-size: 36px;
          font-weight: bold;
          color: var(--tg-theme-button-color, var(--primary-color));
        }
        
        .currency {
          font-size: 20px;
          color: var(--tg-theme-hint-color, #666);
        }
        
        .product-description {
          padding: 24px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .product-description h3 {
          font-size: 20px;
          margin: 0 0 12px 0;
          color: var(--tg-theme-text-color, #000);
        }
        
        .product-description p {
          font-size: 18px;
          line-height: 1.6;
          color: var(--tg-theme-text-color, #333);
          margin: 0;
        }
        
        .product-specifications {
          padding: 24px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .product-specifications h3 {
          font-size: 20px;
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
        
        .action-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--tg-theme-bg-color, #ffffff);
          border-top: 1px solid #e0e0e0;
          padding: 16px 0;
          /* 适配Telegram底部安全区域 */
          padding-bottom: max(env(safe-area-inset-bottom), 16px);
          z-index: 100;
        }
        
        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        
        @media (max-width: 768px) {
          .product-title {
            font-size: 24px;
          }
          
          .price {
            font-size: 32px;
          }
          
          .action-buttons {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }
        
        @media (max-width: 480px) {
          .detail-header {
            /* 移动端也保持60px顶部空间 */
            padding-top: 60px;
            min-height: 52px;
          }
          
          .back-btn {
            padding: 9px 18px;
            font-size: 15px;
            min-width: 110px;
          }
          
          .product-title {
            font-size: 22px;
          }
          
          .price {
            font-size: 28px;
          }
          
          .product-description h3 {
            font-size: 18px;
          }
          
          .product-description p {
            font-size: 16px;
          }
          
          .product-specifications h3 {
            font-size: 18px;
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
