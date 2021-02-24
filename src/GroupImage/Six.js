/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from '../GridProvider';
import Image from '../Image';

const Six = () => {
  const { data, width, spaceSize, length } = useContext(ImageGridContext);

  const commonSubSize = width / 3 - (spaceSize * 2) / 3;
  const commonSize = width - commonSubSize - spaceSize;

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
        },
      ]}
    >
      <View style={[style.container, { flexDirection: 'row' }]}>
        <Image image={data[0]} imageStyle={handleStyleMain()} />
        <View style={[style.container, { flexDirection: 'column' }]}>
          {[...data].splice(1, 2).map((item, index) => {
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
      <View style={[style.container, { flexDirection: 'row' }]}>
        {[...data].splice(3, length).map((item, index) => {
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

export default Six;

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
