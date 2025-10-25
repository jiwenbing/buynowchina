import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.css';

interface HeaderProps {
  onLanguageClick: () => void;
  onContactPlatform: () => void;
  onMerchantCooperation: () => void;
  onRequestSample: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onLanguageClick,
  onContactPlatform,
  onMerchantCooperation,
  onRequestSample
}) => {
  const { t, i18n } = useTranslation();

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case 'zh': return '🇨🇳';
      case 'en': return '🇺🇸';
      case 'ru': return '🇷🇺';
      default: return '🌐';
    }
  };

  return (
    <header className={styles.header}>
      {/* 顶部状态栏 */}
      <div className={styles.statusBar}>
        <div className="container flex-between">
          <div className={styles.logoSection}>
            <img 
              src="https://www.xfx365.com/buynowchina/buy-logo.jpg"
              alt="BNC Logo" 
              className={styles.logo}
            />
            <div className={styles.appInfo}>
              <h1 className={styles.appName}>{t('app.title')}</h1>
              <p className={styles.appSubtitle}>{t('app.subtitle')}</p>
            </div>
          </div>
          
          <button 
            className={styles.languageBtn}
            onClick={onLanguageClick}
          >
            <span className={styles.languageFlag}>{getLanguageFlag(i18n.language)}</span>
          </button>
        </div>
      </div>

      {/* 功能模块区域 */}
      <div className={styles.functionSection}>
        <div className="container">
          <div className={styles.functionGrid}>
            <button className={`${styles.functionBtn} ${styles.contactBtn}`} onClick={onContactPlatform}>
              <div className={styles.functionIcon}>📞</div>
              <span className={styles.functionText}>{t('functions.contactPlatform')}</span>
            </button>
            
            <button className={`${styles.functionBtn} ${styles.cooperationBtn}`} onClick={onMerchantCooperation}>
              <div className={styles.functionIcon}>🤝</div>
              <span className={styles.functionText}>{t('functions.merchantCooperation')}</span>
            </button>
            
            <button className={`${styles.functionBtn} ${styles.sampleBtn}`} onClick={onRequestSample}>
              <div className={styles.functionIcon}>📦</div>
              <span className={styles.functionText}>{t('functions.requestSample')}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;