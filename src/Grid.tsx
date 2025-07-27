import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';

import { useImageGridContext } from './ImageGrid';
import { Five, Four, One, Six, Three, Two } from './GroupImage';

// Component mapping for better performance and maintainability
const GRID_COMPONENTS = {
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
} as const;

type GridLength = keyof typeof GRID_COMPONENTS;

/**
 * Grid component that renders the appropriate layout based on image count
 */
const Grid: React.FC = memo(() => {
  const { containerStyle, length } = useImageGridContext();

  // Safely get the component, fallback to One if length is out of bounds
  const GridComponent = GRID_COMPONENTS[Math.min(Math.max(length, 1), 6) as GridLength] || One;

  return (
    <View style={[styles.container, containerStyle]}>
      <GridComponent />
    </View>
  );
});

// Display name for debugging
Grid.displayName = 'Grid';

export default Grid;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  } satisfies ViewStyle,
});
