import React, { createContext } from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import Grid from './Grid';

export const ImageGridContext = createContext();

const { width: windowWidth } = Dimensions.get('window');

const GridProvider = (props) => {
  const {
    data,
    colorLoader,
    sourceKey,
    renderImage,
    width,
    spaceSize,
    containerStyle,
  } = props;

  if (data.length) {
    return (
      <ImageGridContext.Provider value={props}>
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
};

GridProvider.defaultProps = {
  data: [],
  colorLoader: ['#fcf8ec', '#d0e8f2', '#79a3b1', '#456268'],
  sourceKey: 'url',
  renderImage: null,
  width: windowWidth,
  spaceSize: 3,
};
