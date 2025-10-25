import React from 'react';
import { useTranslation } from 'react-i18next';
import WebApp from '@twa-dev/sdk';
import { Supplier } from '../types';

interface SupplierInfoProps {
  supplier: Supplier;
}

const SupplierInfo: React.FC<SupplierInfoProps> = ({ supplier }) => {
  const { t } = useTranslation();

  const handleContactSupplier = () => {
    const telegramUrl = `https://t.me/${supplier.telegramUsername}`;
    WebApp.openTelegramLink(telegramUrl);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    
    if (hasHalfStar) {
      stars.push('⭐');
    }
    
    return stars.join('');
  };

  return (
    <div className="supplier-info">
      <h3>{t('product.supplier')}</h3>
      
      <div className="supplier-card">
        <div className="supplier-header">
          <div className="supplier-main">
            <h4 className="supplier-name">{supplier.name}</h4>
            <p className="company-name">{supplier.company}</p>
            <div className="supplier-location">
              📍 {supplier.location}
            </div>
          </div>
          
          <div className="supplier-badge">
            {supplier.verified && (
              <div className="verified-badge">
                ✅ {t('supplier.verified')}
              </div>
            )}
          </div>
        </div>
        
        <div className="supplier-stats">
          <div className="stat-item">
            <span className="stat-label">{t('supplier.rating')}</span>
            <div className="rating">
              <span className="stars">{renderStars(supplier.rating)}</span>
              <span className="rating-value">{supplier.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">{t('supplier.responseTime')}</span>
            <span className="stat-value">{supplier.responseTime}</span>
          </div>
          
          <div className="stat-item">
            <span className="stat-label">{t('supplier.languages')}</span>
            <div className="languages">
              {supplier.languages.map((lang) => (
                <span key={lang} className="language-tag">
                  {lang === 'zh' && '🇨🇳'}
                  {lang === 'en' && '🇺🇸'}
                  {lang === 'ru' && '🇷🇺'}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          className="contact-supplier-btn btn btn-outline"
          onClick={handleContactSupplier}
        >
          💬 {t('product.contactSupplier')}
        </button>
      </div>
      
      <style jsx>{`
        .supplier-info {
          padding: 24px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .supplier-info h3 {
          font-size: 18px;
          margin: 0 0 16px 0;
          color: var(--tg-theme-text-color, #000);
        }
        
        .supplier-card {
          background: var(--tg-theme-secondary-bg-color, #f8f9fa);
          border-radius: var(--border-radius);
          padding: 20px;
          border: 1px solid #e0e0e0;
        }
        
        .supplier-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
        }
        
        .supplier-main {
          flex: 1;
        }
        
        .supplier-name {
          font-size: 18px;
          font-weight: bold;
          margin: 0 0 4px 0;
          color: var(--tg-theme-text-color, #000);
        }
        
        .company-name {
          font-size: 14px;
          color: var(--tg-theme-hint-color, #666);
          margin: 0 0 8px 0;
        }
        
        .supplier-location {
          font-size: 12px;
          color: var(--tg-theme-hint-color, #666);
        }
        
        .verified-badge {
          background: var(--success-color);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 500;
          white-space: nowrap;
        }
        
        .supplier-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .stat-label {
          font-size: 12px;
          color: var(--tg-theme-hint-color, #666);
          font-weight: 500;
        }
        
        .rating {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .stars {
          font-size: 14px;
        }
        
        .rating-value {
          font-size: 14px;
          font-weight: bold;
          color: var(--tg-theme-text-color, #000);
        }
        
        .stat-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--tg-theme-text-color, #000);
        }
        
        .languages {
          display: flex;
          gap: 4px;
        }
        
        .language-tag {
          font-size: 16px;
        }
        
        .contact-supplier-btn {
          width: 100%;
          margin-top: 8px;
        }
        
        @media (max-width: 480px) {
          .supplier-header {
            flex-direction: column;
            gap: 12px;
          }
          
          .supplier-stats {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .stat-item {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default SupplierInfo;
