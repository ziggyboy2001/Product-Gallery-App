import React from 'react';
import { Image } from 'expo-image';

interface CachedImageProps {
  source: string;
  testID?: string;
}

export const CachedImage: React.FC<CachedImageProps> = ({ source, testID }) => {
  return (
    <Image
      testID={testID}
      source={source}
      cachePolicy="memory-disk"
      transition={200}
    />
  );
}; 