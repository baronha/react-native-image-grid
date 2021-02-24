import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import { ImageGridContext } from './GridProvider';
import { TouchableOpacity } from 'react-native';
import { LAYOUT_ROW } from './helpers';

const Image = (props) => {
  const { image, imageStyle, index } = props;
  const {
    sourceKey,
    width,
    activeOpacity,
    onPressImage,
    colorLoader,
    length,
    layout,
    spaceSize,
  } = useContext(ImageGridContext);
  const uri = typeof image === 'string' ? image : image[sourceKey];

  const onLoad = (event) => {
    props.onLoad(event);
  };

  const onReload = () => {};

  const onLoadStart = () => {};

  const onPress = () => {
    onPressImage(image, index);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <FastImage
        source={{ uri }}
        style={[style, imageStyle]}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        resizeMode={'cover'}
      />
    </TouchableOpacity>
  );
};

export default Image;

const style = StyleSheet.create({
  container: {},
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
