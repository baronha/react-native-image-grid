import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { ImageGridContext } from './GridProvider';
import Image from './Image';
import TwoImages from './TwoImages';

const Grid = () => {
  const { data, width, containerStyle } = useContext(ImageGridContext);

  const renderImage = () => {
    switch (data.length) {
      case 2:
        return <TwoImages />;
      default:
        return (
          <Image
            image={data[0]}
            imageStyle={{
              width,
              height: width,
            }}
          />
        );
    }
  };

  return <View style={[style.container, containerStyle]}>{renderImage()}</View>;
};

export default Grid;

const style = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
