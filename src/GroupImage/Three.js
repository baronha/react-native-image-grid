import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from '../GridProvider';
import { LAYOUT_COLUMN, LAYOUT_ROW } from '../helpers';
import Image from '../Image';

const Three = () => {
  const { data, width, layout, spaceSize, length } = useContext(
    ImageGridContext
  );
  const subLayout = layout === LAYOUT_ROW ? LAYOUT_COLUMN : LAYOUT_ROW;

  const commonSize = width / 2 - spaceSize / 2;

  useEffect(() => {}, []);

  const handleStyleMain = () => {
    const style = {
      width: commonSize,
      height: width,
    };
    return style;
  };

  const handleStyleSub = () => {
    const style = {
      width: commonSize,
      height: commonSize,
    };
    return style;
  };

  return (
    <View
      style={[style.container, { width, height: width, flexDirection: layout }]}
    >
      <View>
        <Image index={0} image={data[0]} imageStyle={handleStyleMain()} />
      </View>
      <View style={[style.container, { flexDirection: subLayout }]}>
        {[...data].splice(1, length).map((item, index) => {
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

export default Three;

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
