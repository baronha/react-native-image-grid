import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from '../GridProvider';
import { LAYOUT_ROW } from '../helpers';
import Image from '../Image';

const Two = () => {
  const { data, width, layout, spaceSize } = useContext(ImageGridContext);

  useEffect(() => {}, []);

  const handleStyle = () => {
    const style = {
      width: width / 2 - spaceSize / 2,
      height: width / 2,
    };
    if (layout === LAYOUT_ROW) {
      style.width = width / 2 - spaceSize / 2;
      style.height = width;
    } else {
      style.width = width;
      style.height = width / 2 - spaceSize / 2;
    }
    return style;
  };

  return (
    <View
      style={[style.container, { width, height: width, flexDirection: layout }]}
    >
      {data.map((item, index) => {
        return (
          <Image
            key={index}
            image={item}
            index={index}
            imageStyle={handleStyle()}
          />
        );
      })}
    </View>
  );
};

export default Two;

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
