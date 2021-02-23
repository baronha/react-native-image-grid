import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import { ImageGridContext } from './GridProvider';

const Image = (props) => {
  const { image, imageStyle, index } = props;
  const { renderImage, sourceKey, width, height } = useContext(
    ImageGridContext
  );

  const onLoad = (event) => {
    props.onLoad(event);
  };

  const onLoadStart = () => {};

  if (renderImage) {
    return renderImage();
  } else {
    return (
      <FastImage
        source={{ uri: typeof image === 'string' ? image : image[sourceKey] }}
        style={[style, imageStyle]}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
      />
    );
  }
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
