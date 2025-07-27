import React, { useMemo } from 'react';
import { Dimensions, Image } from 'react-native';

import Grid from './Grid';
import { ImageGridProps, ImageItem, ImageGridContextValue } from './types';
import { useProcessedImageData } from './hook/useProcessedImageData';
import { ImageGridContext } from './Context';
import { MAX_GRID_SIZE } from './common/constant';

const { width: windowWidth } = Dimensions.get('window');

// Export types for external use
export type { ImageGridProps, ImageItem };

// Constants
const DEFAULT_COLORS = [
  '#fcf8e8',
  '#d4e2d4',
  '#ecb390',
  '#df7861',
  '#dff3e3',
  '#86aba1',
  '#f4eeed',
] as const;

// Default props with proper typing
const createDefaultProps = (): Required<Omit<ImageGridProps, 'dataImage'>> => ({
  sourceKey: 'url',
  width: windowWidth,
  colorLoader: [...DEFAULT_COLORS],
  spaceSize: 3,
  containerStyle: {},
  activeOpacity: 0.9,
  maximum: MAX_GRID_SIZE,
  onPressImage: () => {},
  backgroundMask: 'rgba(0,0,0,0.6)',
  backgroundMaskVideo: 'rgba(0,0,0,0.6)',
  numberRemainStyle: {},
  videoIconStyle: {},
  videoKey: 'isVideo',
  videoURLKey: 'url',
  conditionCheckVideo: true,
  heightKey: 'height',
  widthKey: 'width',
  componentDelete: null,
  onDeleteImage: () => {},
  showDelete: false,
  ratioImagePortrait: 1.618,
  ratioImageLandscape: 1.2,
  prefixPath: '',
  backgroundColorKey: 'backgroundColor',
  ImageWrap: Image,
  emptyImageSource: require('./assets/emptyImage.png'),
});

/**
 * Custom hook to create optimized context value
 */
const useImageGridContextValue = (
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

/**
 * ImageGrid component for displaying images in a grid layout
 */
export const ImageGrid: React.FC<ImageGridProps> = (props) => {
  // Merge props with defaults
  const mergedProps = useMemo(
    () => ({
      ...createDefaultProps(),
      ...props,
    }),
    [props]
  );

  const { dataImage, maximum, widthKey, heightKey } = mergedProps;

  // Process image data using custom hook
  const processedData = useProcessedImageData(
    dataImage,
    maximum,
    widthKey,
    heightKey
  );

  // Create optimized context value
  const contextValue = useImageGridContextValue(mergedProps, processedData);

  // Early return for empty data
  if (!processedData.length) {
    return null;
  }

  return (
    <ImageGridContext.Provider value={contextValue}>
      <Grid />
    </ImageGridContext.Provider>
  );
};

/**
 * Custom hook for consuming ImageGrid context
 */
export const useImageGridContext = (): ImageGridContextValue => {
  const context = React.useContext(ImageGridContext);

  if (!context) {
    throw new Error(
      'useImageGridContext must be used within an ImageGrid component'
    );
  }

  return context;
};

// Display name for debugging
ImageGrid.displayName = 'ImageGrid';

export default ImageGrid;
