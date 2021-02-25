/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from '../GridProvider';
import { LAYOUT_ROW_SQUARE } from '../helpers';
import Image from '../Image';
import Two from './Two';

const Five = () => {
  const { data, width, spaceSize, length } = useContext(ImageGridContext);

  const commonSize = width / 3 - (spaceSize * 2) / 3;

  return (
    <View
      style={[
        style.container,
        {
          width,
        },
      ]}
    >
      <Two dataProps={[...data].splice(0, 2)} layoutProps={LAYOUT_ROW_SQUARE} />
      <View
        style={[
          style.container,
          { flexDirection: 'row', marginTop: spaceSize },
        ]}
      >
        {[...data].splice(2, length).map((item, index) => {
          return (
            <Image
              key={index}
              image={item}
              index={index + 2}
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

export default Five;

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
