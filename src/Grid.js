import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from './ImageGrid.tsx';
import { Five, Four, One, Six, Three, Two } from './GroupImage';

const Grid = () => {
  const { containerStyle, length } = useContext(ImageGridContext);

  const renderGroup = () => {
    switch (length) {
      case 2:
        return <Two />;
      case 3:
        return <Three />;
      case 4:
        return <Four />;
      case 5:
        return <Five />;
      case 6:
        return <Six />;
      default:
        //default is 1
        return <One />;
    }
  };

  return <View style={[style.container, containerStyle]}>{renderGroup()}</View>;
};

export default Grid;

const style = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});
