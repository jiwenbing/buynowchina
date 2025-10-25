import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import WebApp from '@twa-dev/sdk';
import { Product, PurchaseIntent } from '../types';

interface PurchaseIntentModalProps {
  product: Product;
  type: 'purchase' | 'trial';
  onClose: () => void;
  onSubmit: (data: Partial<PurchaseIntent>) => void;
}

const PurchaseIntentModal: React.FC<PurchaseIntentModalProps> = ({
  product,
  type,
  onClose,
  onSubmit
}) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(product.minOrderQuantity);
  const [message, setMessage] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'purchase' && quantity < product.minOrderQuantity) {
      WebApp.showAlert(t('messages.minOrderError', { min: product.minOrderQuantity }));
      return;
    }

    setIsSubmitting(true);

    try {
      const intentData: Partial<PurchaseIntent> = {
        productId: product.id,
        quantity: type === 'trial' ? 1 : quantity,
        message,
        requirements,
        contactInfo,
        type,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // 发送消息到Telegram
      const telegramMessage = encodeURIComponent(
        `${type === 'trial' ? t('product.tryProduct') : t('product.purchaseIntent')}\n\n` +
        `${t('product.title')}: ${product.name}\n` +
        `${t('forms.quantity')}: ${intentData.quantity}\n` +
        `${t('forms.message')}: ${message}\n` +
        `${t('forms.requirements')}: ${requirements}\n` +
        `${t('forms.contactInfo')}: ${contactInfo}\n\n` +
        `${window.location.href}`
      );
      
      const telegramUrl = `https://t.me/${product.supplier.telegramUsername}?text=${telegramMessage}`;
      WebApp.openTelegramLink(telegramUrl);

      onSubmit(intentData);
    } catch (error) {
      WebApp.showAlert(t('messages.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {type === 'trial' ? t('product.tryProduct') : t('product.purchaseIntent')}
          </h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="product-summary">
            <img src={product.images[0]} alt={product.name} className="product-thumb" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)} {product.currency}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {type === 'purchase' && (
              <div className="form-group">
                <label htmlFor="quantity">{t('forms.quantity')}</label>
                <input
                  type="number"
                  id="quantity"
                  className="form-input"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || product.minOrderQuantity)}
                  min={product.minOrderQuantity}
                  required
                />
                <small className="form-hint">
                  {t('product.minOrder')}: {product.minOrderQuantity}
                </small>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="message">{t('forms.message')}</label>
              <textarea
                id="message"
                className="form-input form-textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('forms.messagePlaceholder')}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirements">{t('forms.requirements')}</label>
              <textarea
                id="requirements"
                className="form-input form-textarea"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder={t('forms.requirementsPlaceholder')}
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactInfo">{t('forms.contactInfo')}</label>
              <input
                type="text"
                id="contactInfo"
                className="form-input"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={t('forms.contactInfoPlaceholder')}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {t('actions.cancel')}
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading"></span>
                ) : (
                  t('actions.submit')
                )}
              </button>
            </div>
          </form>
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

          .modal-content {
            background: var(--tg-theme-bg-color, #ffffff);
            border-radius: var(--border-radius);
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #e0e0e0;
          }

          .modal-header h2 {
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

          .modal-body {
            padding: 20px;
            overflow-y: auto;
            flex: 1;
          }

          .product-summary {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
            padding: 16px;
            background: var(--tg-theme-secondary-bg-color, #f8f9fa);
            border-radius: var(--border-radius);
          }

          .product-thumb {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 4px;
            flex-shrink: 0;
          }

          .product-info h3 {
            font-size: 14px;
            margin: 0 0 4px 0;
            color: var(--tg-theme-text-color, #000);
            line-height: 1.3;
          }

          .price {
            font-size: 16px;
            font-weight: bold;
            color: var(--tg-theme-button-color, var(--primary-color));
            margin: 0;
          }

          .form-group {
            margin-bottom: 20px;
          }

          .form-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: var(--tg-theme-text-color, #000);
          }

          .form-hint {
            display: block;
            margin-top: 4px;
            font-size: 12px;
            color: var(--tg-theme-hint-color, #666);
          }

          .form-actions {
            display: flex;
            gap: 12px;
            margin-top: 24px;
          }

          .form-actions .btn {
            flex: 1;
          }

          @media (max-width: 480px) {
            .modal-overlay {
              padding: 0;
            }

            .modal-content {
              max-height: 100vh;
              border-radius: 0;
            }

            .form-actions {
              flex-direction: column;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default PurchaseIntentModal;
