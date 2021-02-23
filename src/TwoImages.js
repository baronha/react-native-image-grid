/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageGridContext } from './GridProvider';
import Image from './Image';

const HORIZONTAL = 'HORIZONTAL';
const VERTICAL = 'VERTICAL';

const ROW = ROW;

const TwoImages = () => {
  const { data, width, spaceSize } = useContext(ImageGridContext);

  const [shapeOne, setShapeOne] = useState(VERTICAL);
  const [shapeTwo, setShapeTwo] = useState(VERTICAL);
  const [isRow, setRow] = useState(true);
  const [isSquare, setSquare] = useState(false);

  const onLoad = (e, index) => {
    const { width: widthShape, height: heightShape } = e.nativeEvent;
    let shape = VERTICAL;
    if (widthShape >= heightShape) {
      shape = HORIZONTAL;
    }
    if (index === 0) {
      setShapeOne(shape);
    }
    setShapeTwo(shape);
  };

  useEffect(() => {
    if (shapeOne === HORIZONTAL || shapeTwo === HORIZONTAL) {
      if (shapeOne === shapeTwo) {
        setRow(false);
        return;
      }
      setSquare(true);
    }
  }, [shapeOne, shapeTwo]);

  const handleStyle = useCallback(
    (index) => {
      const imageStyle = {
        width: width / 2,
        height: width,
        marginLeft: index === 0 ? 0 : spaceSize,
      };
      if (isSquare || !isRow) {
        console.log('shapeOne', shapeOne);
        console.log('shapeTwo', shapeTwo);
        if (isSquare) {
          imageStyle.height = width / 2;
        }
        if (!isRow) {
          imageStyle.width = width;
          imageStyle.height = width / 2;
          imageStyle.marginTop = index === 1 ? spaceSize : 0;
          imageStyle.marginLeft = 0;
        }
      }
      return imageStyle;
    },
    [isSquare, isRow]
  );

  return (
    <View
      style={[
        style.container,
        { width, flexDirection: isRow ? 'row' : 'column' },
      ]}
    >
      {data.map((item, index) => {
        return (
          <Image
            image={item}
            index={index}
            imageStyle={handleStyle(index)}
            onLoad={(e) => {
              onLoad(e, index);
            }}
            key={index}
          />
        );
      })}
    </View>
  );
};

export default TwoImages;

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});
