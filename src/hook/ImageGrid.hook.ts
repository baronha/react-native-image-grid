import { useMemo } from 'react';
import { ImageGridContextValue, ImageGridProps } from '../types';
import { useProcessedImageData } from './useProcessedImageData';

export const useImageGridContext = (
  props: ImageGridProps & Required<Omit<ImageGridProps, 'dataImage'>>,
  processedData: ReturnType<typeof useProcessedImageData>
): ImageGridContextValue => {
  return useMemo(
    () => ({
      ...props,
      ...processedData,
    }),
    [props, processedData]
  );
};
