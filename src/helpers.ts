import {
  LAYOUT_COLUMN,
  LAYOUT_ROW,
  LAYOUT_ROW_SQUARE,
} from './common/constant';
import { ImageItem } from './types/ImageItem';

export type LayoutType = typeof LAYOUT_ROW | typeof LAYOUT_ROW_SQUARE | typeof LAYOUT_COLUMN;

/**
 * Checks if an image item has landscape orientation
 */
const isLandscapeOrientation = (
  item: ImageItem,
  widthKey: string,
  heightKey: string
): boolean => {
  const width = Number(item[widthKey]);
  const height = Number(item[heightKey]);
  return !isNaN(width) && !isNaN(height) && width > height;
};

/**
 * Validates if an image item has valid dimensions
 */
const hasValidDimensions = (
  item: ImageItem,
  widthKey: string,
  heightKey: string
): boolean => {
  return (
    typeof item === 'object' &&
    item !== null &&
    item[widthKey] != null &&
    item[heightKey] != null &&
    !isNaN(Number(item[widthKey])) &&
    !isNaN(Number(item[heightKey]))
  );
};

/**
 * Determines the layout based on image data and count
 */
export const checkLayoutImage = (
  data: ImageItem[],
  length: number,
  widthKey: string,
  heightKey: string
): LayoutType | null => {
  // Need at least 2 items to determine layout
  if (length < 2 || !data.length) {
    return null;
  }

  const firstItem = data[0];
  
  // Handle string items or items without valid dimensions
  if (typeof firstItem === 'string' || !hasValidDimensions(firstItem, widthKey, heightKey)) {
    return length === 5 ? LAYOUT_COLUMN : LAYOUT_ROW;
  }

  const isFirstLandscape = isLandscapeOrientation(firstItem, widthKey, heightKey);

  switch (length) {
    case 2: {
      const secondItem = data[1];
      
      // Default to row layout if second item doesn't have valid dimensions
      if (!hasValidDimensions(secondItem, widthKey, heightKey)) {
        return LAYOUT_ROW;
      }
      
      const isSecondLandscape = isLandscapeOrientation(secondItem, widthKey, heightKey);
      
      // Both landscape -> column layout
      if (isFirstLandscape && isSecondLandscape) {
        return LAYOUT_COLUMN;
      }
      
      // Mixed orientations -> row square layout
      if (isFirstLandscape !== isSecondLandscape) {
        return LAYOUT_ROW_SQUARE;
      }
      
      // Both portrait -> row layout
      return LAYOUT_ROW;
    }
    
    case 3:
    case 4:
      return isFirstLandscape ? LAYOUT_COLUMN : LAYOUT_ROW;
      
    default:
      return LAYOUT_COLUMN;
  }
};

/**
 * Legacy export for backward compatibility
 * @deprecated Use checkLayoutImage instead
 */
export const checkLandscape = isLandscapeOrientation;
