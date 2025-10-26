import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { t, i18n } = useTranslation();
  
  // 根据当前语言选择显示的名称和描述
  const displayName = i18n.language === 'ru' && product.nameRu ? product.nameRu : product.name;
  const displayDescription = i18n.language === 'ru' && product.descriptionRu ? product.descriptionRu : product.description;

  return (
    <div className="product-card card" onClick={onClick}>
      <div className="product-image">
        <img 
          src={product.images[0]} 
          alt={displayName}
          loading="lazy"
        />
        {!product.inStock && (
          <div className="out-of-stock-badge">
            {t('product.outOfStock')}
          </div>
        )}
      </div>
      
      <div className="card-body">
        <h3 className="product-name">{displayName}</h3>
        <p className="product-description">{displayDescription}</p>
        
        <div className="product-meta">
          <div className="price-section">
            <span className="price">₽{Math.round(product.price)}</span>
            <span className="currency">{product.currency}</span>
          </div>
          
          <div className="supplier-info">
            <span className="supplier-icon">🏪</span>
            <span className="supplier-name">{product.supplier.company}</span>
          </div>
        </div>
        
        <div className="product-footer">
          <div className="min-order">
            {t('product.minOrder')}: {product.minOrderQuantity}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .product-card {
          cursor: pointer;
          transition: var(--transition);
          height: fit-content;
          border-radius: 8px;
          overflow: hidden;
          background: var(--tg-theme-secondary-bg-color, #ffffff);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        
        .product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        }
        
        .product-image {
          position: relative;
          width: 100%;
          padding-top: 100%; /* 1:1 宽高比，适合正方形图片 */
          overflow: hidden;
          background: #f8f9fa;
        }
        
        .product-image img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain; /* 改为contain以完整显示正方形图片 */
          transition: var(--transition);
          padding: 8px; /* 添加内边距让图片有呼吸感 */
        }
        
        .product-card:hover .product-image img {
          transform: scale(1.05);
        }
        
        .out-of-stock-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: var(--error-color);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .product-name {
          font-size: 17px;
          font-weight: 500;
          margin: 0 0 4px 0;
          line-height: 1.3;
          color: var(--tg-theme-text-color, #333);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 42px;
        }
        
        .product-description {
          font-size: 14px;
          color: var(--tg-theme-hint-color, #666);
          margin: 0 0 8px 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 18px;
        }
        
        .product-meta {
          margin-bottom: 12px;
        }
        
        .price-section {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 8px;
        }
        
        .price {
          font-size: 20px;
          font-weight: bold;
          color: #ff6b35;
        }
        
        .currency {
          font-size: 15px;
          color: var(--tg-theme-hint-color, #666);
        }
        
        .supplier-info {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: var(--tg-theme-hint-color, #666);
        }
        
        .supplier-icon {
          font-size: 15px;
        }
        
        .supplier-name {
          font-weight: 500;
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .product-footer {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        
        .min-order {
          font-size: 13px;
          color: var(--tg-theme-hint-color, #999);
          white-space: nowrap;
        }
        
        @media (max-width: 480px) {
          .product-image {
            padding-top: 100%; /* 保持正方形比例 */
          }
          
          .product-name {
            font-size: 16px;
            min-height: 38px;
          }
          
          .product-description {
            font-size: 13px;
            min-height: 16px;
          }
          
          .price {
            font-size: 18px;
          }
          
          .supplier-name {
            max-width: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
