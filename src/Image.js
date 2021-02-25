/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useState } from 'react';
import { Text, Image as RNImage, View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import { ImageGridContext } from './GridProvider';
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
  } = useContext(ImageGridContext);
  const uri = typeof image === 'string' ? image : image[sourceKey];
  const isVideo = image?.[videoKey] === conditionCheckVideo;
  const size = Math.round(width / (index + length * 2));

  const [loading, setLoading] = useState(true);

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

  const onLoad = (event) => {
    props.onLoad(event);
  };

  const onLoadStart = () => {};

  const onLoadEnd = () => {
    setLoading(false);
  };

  const onPress = () => {
    onPressImage(image, index);
  };

  return (
    <TouchableOpacity
      style={[imageStyle]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <FastImage
        {...imageProps}
        source={{ uri }}
        style={[
          imageStyle,
          {
            backgroundColor: loading ? backgroundColor : 'transparent',
          },
        ]}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        resizeMode={'cover'}
      />
      {isVideo && index !== length - 1 && (
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
});

Image.propTypes = {
  image: PropTypes.any.isRequired,
  imageStyle: PropTypes.any,
  onLoad: PropTypes.func,
  index: PropTypes.number,
};

Image.defaultProps = {
  onLoad: () => {},
};
