'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fallbackSrc?: string;
}

export default function ProductImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority,
  fallbackSrc = '/icons/icon-192x192.png' 
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [imgError, setImgError] = useState(false);

  const handleError = () => {
    if (!imgError && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setImgError(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
    />
  );
}
