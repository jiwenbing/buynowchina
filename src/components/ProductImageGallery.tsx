import React, { useState } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, alt }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="image-gallery">
      <div className="main-image">
        <img 
          src={images[currentImageIndex]} 
          alt={alt}
          loading="lazy"
        />
        
        {images.length > 1 && (
          <>
            <button className="nav-btn prev-btn" onClick={prevImage}>
              ‹
            </button>
            <button className="nav-btn next-btn" onClick={nextImage}>
              ›
            </button>
            
            <div className="image-counter">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="thumbnail-list">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <img src={image} alt={`${alt} ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
      
      <style jsx>{`
        .image-gallery {
          background: #000;
        }
        
        .main-image {
          position: relative;
          width: 100%;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: white;
        }
        
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
          z-index: 10;
        }
        
        .nav-btn:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        
        .prev-btn {
          left: 16px;
        }
        
        .next-btn {
          right: 16px;
        }
        
        .image-counter {
          position: absolute;
          bottom: 16px;
          right: 16px;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        
        .thumbnail-list {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          overflow-x: auto;
          background: var(--tg-theme-secondary-bg-color, #f8f9fa);
        }
        
        .thumbnail {
          flex-shrink: 0;
          width: 60px;
          height: 60px;
          border: 2px solid transparent;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: var(--transition);
          background: white;
        }
        
        .thumbnail.active {
          border-color: var(--tg-theme-button-color, var(--primary-color));
        }
        
        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .thumbnail:hover {
          opacity: 0.8;
        }
        
        @media (max-width: 480px) {
          .main-image {
            height: 250px;
          }
          
          .nav-btn {
            width: 36px;
            height: 36px;
            font-size: 20px;
          }
          
          .prev-btn {
            left: 12px;
          }
          
          .next-btn {
            right: 12px;
          }
          
          .thumbnail {
            width: 50px;
            height: 50px;
          }
          
          .thumbnail-list {
            padding: 8px 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductImageGallery;
