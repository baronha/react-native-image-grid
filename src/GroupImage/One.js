import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from '../ImageGrid.tsx';
import Image from '../Image';

const One = () => {
  const {
    data,
    width,
    heightKey,
    widthKey,
    ratioImagePortrait,
    ratioOneLandscape,
  } = useContext(ImageGridContext);

  const handleStyle = () => {
    let heightShape = width;
    let widthShape = width;
    const widthImage = Number(data[0][widthKey]);
    const heightImage = Number(data[0][heightKey]);
    if (!Number.isNaN(widthImage) && !Number.isNaN(heightImage)) {
      let ratio = widthImage / heightImage;
      if (heightImage > widthImage) {
        ratio = heightImage / widthImage;
        heightShape =
          ratio > ratioImagePortrait
            ? width * ratioImagePortrait
            : ratio * width;
      } else if (widthImage > heightImage) {
        ratio = widthImage / heightImage;
        heightShape =
          ratio > ratioOneLandscape ? width / ratioOneLandscape : width / ratio;
      }
    }
    return {
      width: widthShape,
      height: heightShape,
    };
  };

  return (
    <View style={[style.container, handleStyle()]}>
      <Image key={0} image={data[0]} index={0} imageStyle={handleStyle()} />
    </View>
  );
};

export default One;

const style = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
