import React from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductSelect }) => {
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
      </div>
      
      <style jsx>{`
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
        
        @media (max-width: 480px) {
          .product-list {
            padding: 6px 0;
          }
          
          .products-grid {
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductList;
