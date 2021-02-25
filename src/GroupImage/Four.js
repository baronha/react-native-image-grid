import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from '../GridProvider';
import { LAYOUT_COLUMN, LAYOUT_ROW } from '../helpers';
import Image from '../Image';

const Four = () => {
  const { data, width, layout, spaceSize, length } = useContext(
    ImageGridContext
  );
  const subLayout = layout === LAYOUT_ROW ? LAYOUT_COLUMN : LAYOUT_ROW;

  const commonSize = width / 3 - (spaceSize * 2) / 3;

  useEffect(() => {}, []);

  const handleStyleMain = () => {
    let widthShape = width - commonSize - spaceSize;
    let hightShape = width;
    if (layout === LAYOUT_COLUMN) {
      widthShape = width;
      hightShape = width - commonSize - spaceSize;
    }
    return {
      width: widthShape,
      height: hightShape,
    };
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
              index={index + 1}
              imageStyle={{
                width: commonSize,
                height: commonSize,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Four;

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
