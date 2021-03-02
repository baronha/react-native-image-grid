import React, { useContext, useState } from 'react';
import { Text, Image as RNImage, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import { ImageGridContext } from './ImageGrid.tsx';
import { TouchableOpacity } from 'react-native';

const COLOR_GREY = '#323232';

const Image = (props) => {
  const { image, imageStyle, index } = props;
  const {
    sourceKey,
    activeOpacity,
    onPressImage,
    imageProps,
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
  } = useContext(ImageGridContext);
  const isVideo = image?.[videoKey] === conditionCheckVideo;
  const uri =
    typeof image === 'string'
      ? image
      : isVideo
      ? image[videoURLKey]
      : image[sourceKey];
  const size =
    index === 0
      ? Math.round(width / 7)
      : index === 1 && length === 2
      ? Math.round(width / 9)
      : Math.round(width / (index + length * 2));

  const handleBackgroundColor = () => {
    if (typeof colorLoader === 'string') {
      return colorLoader;
    }
    if (typeof colorLoader === 'object') {
      if (colorLoader.length > 1) {
        const random = Math.floor(Math.random() * colorLoader.length);
        return colorLoader[random];
      }
      return colorLoader[0];
    }
    return COLOR_GREY;
  };

  const backgroundColor = handleBackgroundColor();

  const [isError, setError] = useState(false);

  const onPress = () => {
    onPressImage(image, index);
  };

  const onError = () => {
    setError(true);
    imageProps?.onError();
  };

  const onDelete = () => {
    if (isError) {
      setError(false);
    }
    onDeleteImage(image, index);
  };

  return (
    <TouchableOpacity
      style={[imageStyle]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <FastImage
        {...imageProps}
        source={isError ? emptyImageSource : { uri }}
        style={[
          imageStyle,
          {
            backgroundColor: backgroundColor,
          },
        ]}
        onError={onError}
        resizeMode={'cover'}
      />
      {isVideo && (remain === 0 || index !== length - 1) && (
        <View style={[style.overlay, { backgroundColor: backgroundMaskVideo }]}>
          <RNImage
            style={[
              style.videoIcon,
              {
                width: size,
              },
              videoIconStyle,
            ]}
            resizeMode={'contain'}
            source={require('./assets/video-icon.png')}
          />
        </View>
      )}
      {remain > 0 && index === length - 1 && (
        <View style={[style.overlay, { backgroundColor: backgroundMask }]}>
          <Text
            style={[
              style.titleRemain,
              {
                fontSize: size,
              },
              numberRemainStyle,
            ]}
          >
            +{remain}
          </Text>
        </View>
      )}
      {showDelete &&
        (componentDelete || (
          <View style={style.componentDelete}>
            <TouchableOpacity
              style={style.buttonDelete}
              activeOpacity={activeOpacity}
              onPress={onDelete}
            >
              <FastImage
                source={require('./assets/delete.png')}
                style={style.deleteImage}
                tintColor={'#fff'}
              />
            </TouchableOpacity>
          </View>
        ))}
    </TouchableOpacity>
  );
};

export default Image;

const style = StyleSheet.create({
  container: {},
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRemain: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Avenir',
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

Image.propTypes = {
  image: PropTypes.any.isRequired,
  imageStyle: PropTypes.any,
  index: PropTypes.number,
};

Image.defaultProps = {};
