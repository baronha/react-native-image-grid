import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from '../GridProvider';
import { LAYOUT_COLUMN, LAYOUT_ROW_SQUARE } from '../helpers';
import Image from '../Image';

const Two = ({ layoutProps, dataProps }) => {
  const { data: dataMain, width, layout: layoutMain, spaceSize } = useContext(
    ImageGridContext
  );

  const data = dataProps || dataMain;
  const layoutChange = layoutProps || layoutMain;
  const layout = layoutProps || layoutChange.match('row') ? 'row' : 'column';
  const widthCommon = width / 2 - spaceSize / 2;

  const handleStyle = () => {
    let widthShape = widthCommon;
    let heightShape = width;

    switch (layoutChange) {
      case LAYOUT_ROW_SQUARE:
        widthShape = widthCommon;
        heightShape = widthCommon;
        break;
      case LAYOUT_COLUMN:
        widthShape = width;
        heightShape = widthCommon;
        break;
      default:
    }
    return {
      width: widthShape,
      height: heightShape,
    };
  };

  return (
    <View
      style={[
        style.container,
        {
          width,
          height: layoutChange === LAYOUT_ROW_SQUARE ? widthCommon : width,
          flexDirection: layout,
        },
      ]}
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
