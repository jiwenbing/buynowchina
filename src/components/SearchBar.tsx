import React from 'react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  const { t } = useTranslation();

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || t('search.placeholder')}
        />
        {value && (
          <button
            className="clear-btn"
            onClick={() => onChange('')}
          >
            ✕
          </button>
        )}
      </div>
      
      <style jsx>{`
        .search-bar {
          margin: 0;
        }
        
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.8);
        }
        
        .search-icon {
          padding: 10px 14px;
          color: #666;
          font-size: 14px;
        }
        
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 10px 14px 10px 0;
          font-size: 14px;
          background: transparent;
          color: var(--tg-theme-text-color, #000000);
        }
        
        .search-input::placeholder {
          color: #999;
          font-size: 14px;
        }
        
        .clear-btn {
          background: none;
          border: none;
          padding: 10px 14px;
          cursor: pointer;
          color: #999;
          font-size: 12px;
          transition: var(--transition);
          border-radius: 50%;
        }
        
        .clear-btn:hover {
          color: #666;
          background: rgba(0, 0, 0, 0.05);
        }
        
        @media (max-width: 480px) {
          .search-input-wrapper {
            border-radius: 18px;
          }
          
          .search-icon {
            padding: 8px 12px;
          }
          
          .search-input {
            padding: 8px 12px 8px 0;
            font-size: 14px;
          }
          
          .clear-btn {
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
