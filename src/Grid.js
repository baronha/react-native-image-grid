import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from './GridProvider';
import Image from './Image';
import { Five, Four, Six, Three, Two } from './GroupImage';

const Grid = () => {
  const { data, width, containerStyle, length } = useContext(ImageGridContext);

  const renderGroup = () => {
    if (length >= 2) {
      switch (length) {
        case 2:
          return <Two />;
        case 3:
          return <Three />;
        case 4:
          return <Four />;
        case 5:
          return <Five />;
        default:
          //default is 6
          return <Six />;
      }
    }
    return (
      <Image
        image={data[0]}
        index={0}
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
