import React from 'react';
import { useTranslation } from 'react-i18next';
import { mockCategories } from '../data/mockData';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange
}) => {
  const { t, i18n } = useTranslation();

  const getCategoryName = (category: any) => {
    switch (i18n.language) {
      case 'en':
        return category.nameEn;
      case 'ru':
        return category.nameRu;
      default:
        return category.name;
    }
  };

  return (
    <div className="category-filter">
      <div className="category-scroll">
        <button
          className={`category-item ${!selectedCategory ? 'active' : ''}`}
          onClick={() => onCategoryChange(null)}
        >
          <span className="category-icon">🏪</span>
          <span className="category-name">{t('categories.all')}</span>
        </button>
        
        {mockCategories.map((category) => (
          <button
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{getCategoryName(category)}</span>
            <span className="category-count">{category.productCount}</span>
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .category-filter {
          margin: 0;
        }
        
        .category-scroll {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          padding: 2px 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        
        .category-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .category-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 12px;
          padding: 8px 12px;
          cursor: pointer;
          transition: var(--transition);
          min-width: 60px;
          white-space: nowrap;
          color: var(--tg-theme-text-color, #333);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .category-item:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .category-item.active {
          background: rgba(255, 255, 255, 0.95);
          border-color: rgba(255, 255, 255, 0.9);
          color: var(--tg-theme-button-color, var(--primary-color));
          box-shadow: 0 2px 6px rgba(36, 129, 204, 0.15);
          font-weight: 600;
        }
        
        .category-icon {
          font-size: 16px;
          margin-bottom: 2px;
        }
        
        .category-name {
          font-size: 10px;
          font-weight: 500;
          margin-bottom: 1px;
          line-height: 1.2;
        }
        
        .category-count {
          font-size: 9px;
          opacity: 0.6;
          line-height: 1;
        }
        
        .category-item.active .category-count {
          opacity: 0.8;
        }
        
        @media (max-width: 480px) {
          .category-scroll {
            gap: 4px;
          }
          
          .category-item {
            min-width: 55px;
            padding: 6px 10px;
            border-radius: 10px;
          }
          
          .category-icon {
            font-size: 14px;
          }
          
          .category-name {
            font-size: 9px;
          }
          
          .category-count {
            font-size: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryFilter;
