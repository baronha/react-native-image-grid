import React, { createContext } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Grid from './Grid';
import { checkLayoutImage, LAYOUT_ROW } from './helpers';
export const ImageGridContext = createContext();

const { width: windowWidth } = Dimensions.get('window');

const GridProvider = (props) => {
  const { dataImage, maximum } = props;

  const data = [...dataImage];
  const length = maximum > data.length ? data.length : maximum;
  const remain = data.length - length;
  data.length = length > 6 ? 6 : length;
  const layout = checkLayoutImage(data, length) || LAYOUT_ROW;

  const value = {
    ...props,
    //props
    layout,
    length,
    remain,
    data,
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
  dataImage: PropTypes.array.isRequired,
  sourceKey: PropTypes.string,
  width: PropTypes.number,
  colorLoader: PropTypes.any,
  spaceSize: PropTypes.number,
  containerStyle: PropTypes.any,
  activeOpacity: PropTypes.number,
  maximum: PropTypes.number,
  onPressImage: PropTypes.func,
  backgroundMask: PropTypes.string,
  backgroundMaskVideo: PropTypes.string,
  numberRemainStyle: PropTypes.any,
  videoIconStyle: PropTypes.any,
  videoKey: PropTypes.string,
  conditionCheckVideo: PropTypes.any,
};

GridProvider.defaultProps = {
  dataImage: [],
  colorLoader: [
    '#fcf8e8',
    '#d4e2d4',
    '#ecb390',
    '#df7861',
    '#dff3e3',
    '#86aba1',
    '#f4eeed',
  ],
  sourceKey: 'url',
  width: windowWidth,
  spaceSize: 3,
  activeOpacity: 0.9,
  maximum: 6,
  backgroundMask: 'rgba(0,0,0,0.6)',
  backgroundMaskVideo: 'rgba(0,0,0,0.6)',
  videoKey: 'isVideo',
  conditionCheckVideo: true,
};
