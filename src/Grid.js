import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ImageGridContext } from './GridProvider';
import Image from './Image';
import { LAYOUT_COLUMN, LAYOUT_ROW } from './helpers';
import { Five, Four, Six, Three, Two } from './GroupImage';

const Grid = () => {
  const { data, width, containerStyle, length } = useContext(ImageGridContext);

  const renderGroup = () => {
    if (length >= 2) {
      switch (length) {
        case 3:
          return <Three />;
        case 4:
          return <Four />;
        case 5:
          return <Five />;
        case 6:
          return <Six />;
        default:
          //default is 2
          return <Two />;
      }
    }
    return (
      <Image
        image={data[0]}
        imageStyle={{
          height: width,
          width,
        }}
      />
    );
  };

  return <View style={[style.container, containerStyle]}>{renderGroup()}</View>;
};

export default Grid;

const style = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
