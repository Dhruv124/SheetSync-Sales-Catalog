'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductImage from './ProductImage';

interface ImageSliderProps {
  images: string[];
  alt: string;
  className?: string;
}

export default function ImageSlider({ images, alt, className = '' }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Debug logging
  console.log('[ImageSlider] Images:', images);
  console.log('[ImageSlider] Current index:', currentIndex);

  useEffect(() => {
    console.log('[ImageSlider] Index changed to:', currentIndex);
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    console.log('[ImageSlider] Going to previous:', newIndex);
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    console.log('[ImageSlider] Going to next:', newIndex);
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    console.log('[ImageSlider] Going to slide:', index);
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden ${className}`}>
        <ProductImage
          src="/icons/icon-192x192.png"
          alt={alt}
          width={1000}
          height={1000}
          className="w-full aspect-square object-cover opacity-50"
        />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden ${className}`}>
        <ProductImage
          src={images[0]}
          alt={alt}
          width={1000}
          height={1000}
          className="w-full aspect-square object-cover"
          priority
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      {/* Main Image */}
      <div className="relative w-full h-full">
        <ProductImage
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          width={1000}
          height={1000}
          className="w-full aspect-square object-cover"
          priority
        />
        
        {/* Image Counter */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="text-gray-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="text-gray-800" />
        </button>
      </div>

      {/* Thumbnail Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black bg-opacity-50 p-2 rounded-lg">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'bg-white w-6' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
