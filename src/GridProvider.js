import React, { createContext, useState } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Grid from './Grid';
import { checkLayoutImage, LAYOUT_ROW } from './helpers';
export const ImageGridContext = createContext();

const { width: windowWidth } = Dimensions.get('window');

const GridProvider = (props) => {
  const {
    data,
    colorLoader,
    sourceKey,
    width,
    spaceSize,
    containerStyle,
    isDynamicLayout,
    maximum,
    onPressImage,
  } = props;

  const length = maximum > data.length ? data.length : maximum;
  data.length = length;
  const layout = checkLayoutImage(data, length) || LAYOUT_ROW;

  const value = {
    ...props,
    //props
    layout,
    length,
  };

  if (data.length) {
    return (
      <ImageGridContext.Provider value={value}>
        <Grid />
      </ImageGridContext.Provider>
    );
  }
  return null;
};

export default GridProvider;

GridProvider.propTypes = {
  data: PropTypes.array.isRequired,
  sourceKey: PropTypes.string,
  width: PropTypes.number,
  colorLoader: PropTypes.any,
  spaceSize: PropTypes.number,
  containerStyle: PropTypes.any,
  isDynamicLayout: PropTypes.bool,
  activeOpacity: PropTypes.number,
  maximum: PropTypes.number,
  onPressImage: PropTypes.func,
};

GridProvider.defaultProps = {
  data: [],
  colorLoader: ['#fcf8ec', '#d0e8f2', '#79a3b1', '#456268'],
  sourceKey: 'url',
  width: windowWidth,
  spaceSize: 3,
  isDynamicLayout: false,
  activeOpacity: 0.9,
  maximum: 9,
};
