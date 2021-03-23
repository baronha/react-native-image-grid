import React, { createContext } from 'react';
import { Dimensions } from 'react-native';
import PropTypes, { InferProps } from 'prop-types';

import Grid from './Grid.js';
import { checkLayoutImage, LAYOUT_ROW } from './helpers';

const { width: windowWidth } = Dimensions.get('window');

export const ImageGridContext = createContext({});

export function ImageGrid(props: InferProps<typeof ImageGrid.propTypes>) {
  const { dataImage, widthKey, heightKey } = props;

  const maximum = props.maximum as number;

  const data = [...dataImage];
  const length = maximum > data.length ? data.length : maximum;
  const remain = data.length - length;
  data.length = length > 6 ? 6 : length;
  const layout =
    checkLayoutImage(data, length, widthKey, heightKey) || LAYOUT_ROW;

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
}

ImageGrid.propTypes = {
  dataImage: PropTypes.any.isRequired,
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
  videoURLKey: PropTypes.string,
  conditionCheckVideo: PropTypes.any,
  heightKey: PropTypes.string,
  widthKey: PropTypes.string,
  componentDelete: PropTypes.element,
  onDeleteImage: PropTypes.func,
  showDelete: PropTypes.bool,
  ratioImagePortrait: PropTypes.number,
  ratioImageLandscape: PropTypes.number,
  prefixPath: PropTypes.string,
  backgroundColorKey: PropTypes.string,
};

ImageGrid.defaultProps = {
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
  videoURLKey: 'url',
  width: windowWidth,
  spaceSize: 3,
  activeOpacity: 0.9,
  maximum: 6,
  backgroundMask: 'rgba(0,0,0,0.6)',
  backgroundMaskVideo: 'rgba(0,0,0,0.6)',
  videoKey: 'isVideo',
  conditionCheckVideo: true,
  heightKey: 'height',
  widthKey: 'width',
  onPressImage: () => {},
  emptyImageSource: require('./assets/emptyImage.png'),
  showDelete: false,
  onDeleteImage: () => {},
  ratioImagePortrait: 1.618,
  ratioImageLandscape: 1.2,
  prefixPath: '',
  backgroundColorKey: 'backgroundColor',
};
