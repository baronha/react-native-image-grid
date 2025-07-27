import React, { useCallback, useState, memo, useMemo } from 'react';
import {
  Text,
  Image as RNImage,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';

import { useImageGridContext } from './ImageGrid';
import { ImageItem } from './types';

// Constants
const COLOR_GREY = '#323232';

interface ImageComponentProps {
  image: ImageItem;
  imageStyle: StyleProp<ViewStyle>;
  index: number;
}

/**
 * Individual image component with overlay support
 */
const ImageComponent: React.FC<ImageComponentProps> = memo(
  ({ image, imageStyle, index }) => {
    const context = useImageGridContext();
    const {
      sourceKey,
      activeOpacity,
      onPressImage,
      remain,
      length,
      backgroundMask,
      numberRemainStyle,
      backgroundMaskVideo,
      videoIconStyle,
      videoKey,
      conditionCheckVideo,
      width,
      colorLoader,
      videoURLKey,
      emptyImageSource,
      componentDelete,
      showDelete,
      onDeleteImage,
      prefixPath,
      data,
      backgroundColorKey,
      ImageWrap,
    } = context;

    const [hasError, setHasError] = useState(false);

    // Check if current item is a video
    const isVideo = image?.[videoKey] === conditionCheckVideo;

    // Generate image URI
    const imageUri = useMemo(() => {
      const baseUri =
        typeof image === 'string'
          ? image
          : isVideo
            ? image[videoURLKey]
            : image[sourceKey];

      return prefixPath + (baseUri || '');
    }, [image, isVideo, prefixPath, sourceKey, videoURLKey]);

    // Calculate icon size based on position and layout
    const iconSize = useMemo(() => {
      if (index === 0) return Math.round(width / 7);
      if (index === 1 && length === 2) return Math.round(width / 9);
      return Math.round(width / (index + length * 2));
    }, [index, length, width]);

    // Generate background color
    const backgroundColor = useMemo(() => {
      const itemColor = data?.[index]?.[backgroundColorKey];

      if (itemColor && typeof itemColor === 'string') {
        return itemColor;
      }

      if (typeof colorLoader === 'string') {
        return colorLoader;
      }

      if (Array.isArray(colorLoader) && colorLoader.length > 0) {
        if (colorLoader.length === 1) {
          return colorLoader[0];
        }
        const randomIndex = Math.floor(Math.random() * colorLoader.length);
        return colorLoader[randomIndex];
      }

      return COLOR_GREY;
    }, [data, index, backgroundColorKey, colorLoader]);

    // Event handlers
    const handlePress = useCallback(() => {
      onPressImage(index, image);
    }, [onPressImage, index, image]);

    const handleError = useCallback(() => {
      setHasError(true);
    }, []);

    const handleDelete = useCallback(() => {
      if (hasError) {
        setHasError(false);
      }
      onDeleteImage(index, image);
    }, [hasError, onDeleteImage, index, image]);

    // Determine image source
    const imageSource = hasError ? emptyImageSource : { uri: imageUri };

    // Show video overlay conditions
    const shouldShowVideoOverlay =
      isVideo && (remain === 0 || index !== length - 1);

    // Show remaining count overlay conditions
    const shouldShowRemainOverlay = remain > 0 && index === length - 1;

    return (
      <TouchableOpacity
        style={[styles.container, imageStyle]}
        onPress={handlePress}
        activeOpacity={activeOpacity}
        accessibilityRole="image"
        accessibilityLabel={`Image ${index + 1} of ${length}`}
      >
        <View style={{ backgroundColor }}>
          <ImageWrap
            source={imageSource}
            style={imageStyle}
            onError={handleError}
            resizeMode="cover"
          />
        </View>

        {/* Video overlay */}
        {shouldShowVideoOverlay && (
          <View
            style={[styles.overlay, { backgroundColor: backgroundMaskVideo }]}
          >
            <RNImage
              style={[styles.videoIcon, { width: iconSize }, videoIconStyle]}
              resizeMode="contain"
              source={require('./assets/video-icon.png')}
            />
          </View>
        )}

        {/* Remaining count overlay */}
        {shouldShowRemainOverlay && (
          <View style={[styles.overlay, { backgroundColor: backgroundMask }]}>
            <Text
              style={[
                styles.titleRemain,
                { fontSize: iconSize },
                numberRemainStyle,
              ]}
            >
              +{remain}
            </Text>
          </View>
        )}

        {/* Delete button */}
        {showDelete &&
          (componentDelete || (
            <View style={styles.componentDelete}>
              <TouchableOpacity
                style={styles.buttonDelete}
                activeOpacity={activeOpacity}
                onPress={handleDelete}
                accessibilityRole="button"
                accessibilityLabel="Delete image"
              >
                <RNImage
                  source={require('./assets/delete.png')}
                  style={styles.deleteImage}
                />
              </TouchableOpacity>
            </View>
          ))}
      </TouchableOpacity>
    );
  }
);

// Display name for debugging
ImageComponent.displayName = 'ImageComponent';

export default ImageComponent;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRemain: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'System', // More universal font family
  },
  videoIcon: {
    tintColor: '#fff',
  },
  componentDelete: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  buttonDelete: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    borderRadius: 4,
    paddingVertical: 6,
  },
  deleteImage: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
});
