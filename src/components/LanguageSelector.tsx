import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  onClose
}) => {
  const { t } = useTranslation();

  const languages = [
    { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="language-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{t('settings.selectLanguage')}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="language-list">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${currentLanguage === lang.code ? 'active' : ''}`}
              onClick={() => onLanguageChange(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <div className="language-info">
                <span className="language-name">{lang.nativeName}</span>
                <span className="language-english">{lang.name}</span>
              </div>
              {currentLanguage === lang.code && (
                <span className="check-icon">✓</span>
              )}
            </button>
          ))}
        </div>
        
        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
          }
          
          .language-modal {
            background: var(--tg-theme-bg-color, #ffffff);
            border-radius: var(--border-radius);
            width: 100%;
            max-width: 400px;
            overflow: hidden;
            box-shadow: var(--shadow);
          }
          
          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e0e0e0;
          }
          
          .modal-header h3 {
            margin: 0;
            font-size: 18px;
            color: var(--tg-theme-text-color, #000);
          }
          
          .close-btn {
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: var(--tg-theme-hint-color, #666);
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: var(--transition);
          }
          
          .close-btn:hover {
            background: var(--tg-theme-secondary-bg-color, #f0f0f0);
          }
          
          .language-list {
            padding: 8px 0;
          }
          
          .language-option {
            display: flex;
            align-items: center;
            gap: 16px;
            width: 100%;
            padding: 16px 20px;
            border: none;
            background: none;
            cursor: pointer;
            transition: var(--transition);
            text-align: left;
          }
          
          .language-option:hover {
            background: var(--tg-theme-secondary-bg-color, #f8f9fa);
          }
          
          .language-option.active {
            background: var(--tg-theme-button-color, var(--primary-color));
            color: white;
          }
          
          .language-flag {
            font-size: 24px;
            flex-shrink: 0;
          }
          
          .language-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          
          .language-name {
            font-size: 16px;
            font-weight: 500;
            color: var(--tg-theme-text-color, #000);
          }
          
          .language-option.active .language-name {
            color: white;
          }
          
          .language-english {
            font-size: 14px;
            color: var(--tg-theme-hint-color, #666);
          }
          
          .language-option.active .language-english {
            color: rgba(255, 255, 255, 0.8);
          }
          
          .check-icon {
            font-size: 18px;
            color: white;
            flex-shrink: 0;
          }
          
          @media (max-width: 480px) {
            .modal-overlay {
              padding: 0;
            }
            
            .language-modal {
              border-radius: 0;
              max-width: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LanguageSelector;
