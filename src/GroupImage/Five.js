import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from '../GridProvider';
import { LAYOUT_COLUMN, LAYOUT_ROW } from '../helpers';
import Image from '../Image';

const Five = () => {
  const { data, width, layout, spaceSize, length } = useContext(
    ImageGridContext
  );
  const subLayout = layout === LAYOUT_ROW ? LAYOUT_COLUMN : LAYOUT_ROW;

  const commonSize = width / 2 - spaceSize / 2;
  const commonSubSize = width / 3 - (spaceSize * 2) / 3;

  useEffect(() => {}, []);

  const handleStyleMain = () => {
    const style = {
      width: commonSize,
      height: commonSize,
    };
    return style;
  };

  const handleStyleSub = () => {
    const style = {
      width: commonSubSize,
      height: commonSubSize,
    };
    return style;
  };

  return (
    <View
      style={[
        style.container,
        {
          width,
          height: commonSize + commonSubSize + spaceSize,
          flexDirection: layout,
        },
      ]}
    >
      <View style={[style.container, { flexDirection: subLayout }]}>
        {[...data].splice(0, 2).map((item, index) => {
          return (
            <Image
              key={index}
              image={item}
              index={index}
              imageStyle={handleStyleMain()}
            />
          );
        })}
      </View>
      <View style={[style.container, { flexDirection: subLayout }]}>
        {[...data].splice(2, length).map((item, index) => {
          return (
            <Image
              key={index}
              image={item}
              index={index}
              imageStyle={handleStyleSub()}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Five;

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
