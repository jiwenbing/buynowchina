import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  onContactUs?: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductSelect, onContactUs }) => {
  const { t } = useTranslation();

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📦</div>
        <h3>{t('messages.noData')}</h3>
        <p>{t('product.noProductsFound')}</p>
        
        <style jsx>{`
          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 80px 20px;
            text-align: center;
            color: var(--tg-theme-hint-color, #999);
          }
          
          .empty-icon {
            font-size: 64px;
            margin-bottom: 16px;
            opacity: 0.5;
          }
          
          .empty-state h3 {
            margin: 0 0 8px 0;
            color: var(--tg-theme-text-color, #000);
          }
          
          .empty-state p {
            margin: 0;
            font-size: 14px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="container">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductSelect(product)}
            />
          ))}
        </div>
        
        {/* 联系我们卡片 */}
        {onContactUs && (
          <div className="contact-us-card" onClick={onContactUs}>
            <div className="contact-icon">🎯</div>
            <div className="contact-text">
              <h3>{t('contactUs.title')}</h3>
              <p>{t('contactUs.subtitle')}</p>
            </div>
            <div className="contact-arrow">→</div>
          </div>
        )}
      </div>
      
      <style>{`
        .product-list {
          padding: 8px 0;
          min-height: calc(100vh - 180px);
          background: var(--tg-theme-bg-color, #f5f7fa);
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        
        @media (max-width: 768px) {
          .products-grid {
            gap: 6px;
          }
        }
        
        .contact-us-card {
          grid-column: 1 / -1; /* 跨越所有列 */
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border-radius: 12px;
          padding: 20px;
          margin-top: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }
        
        .contact-us-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }
        
        .contact-icon {
          font-size: 32px;
          flex-shrink: 0;
        }
        
        .contact-text {
          flex: 1;
        }
        
        .contact-text h3 {
          font-size: 16px;
          font-weight: bold;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }
        
        .contact-text p {
          font-size: 14px;
          margin: 0;
          opacity: 0.9;
          line-height: 1.4;
        }
        
        .contact-arrow {
          font-size: 24px;
          font-weight: bold;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        
        .contact-us-card:hover .contact-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 480px) {
          .product-list {
            padding: 6px 0;
          }
          
          .products-grid {
            gap: 4px;
          }
          
          .contact-us-card {
            margin-top: 12px;
            padding: 16px;
            gap: 12px;
          }
          
          .contact-icon {
            font-size: 28px;
          }
          
          .contact-text h3 {
            font-size: 15px;
          }
          
          .contact-text p {
            font-size: 13px;
          }
          
          .contact-arrow {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;
