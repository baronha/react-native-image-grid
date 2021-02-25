export const LAYOUT_ROW = 'row';
export const LAYOUT_ROW_SQUARE = 'row_square';
export const LAYOUT_COLUMN = 'column';

export const checkLayoutImage = (data, length) => {
  if (length >= 2) {
    const firstItem = data[0];
    if (
      typeof firstItem === 'object' &&
      firstItem?.width &&
      firstItem?.height
    ) {
      let isRecHoriFirst = false; // mean: is Reactangle Horizontal First Item
      if (firstItem.width > firstItem.height) {
        isRecHoriFirst = true;
      }
      switch (length) {
        case 2:
          const secondItem = data[1];
          let isRecHoriSecond = false; // mean: is Reactangle Horizontal Second Item
          if (secondItem?.width > secondItem?.height) {
            isRecHoriSecond = true;
          }
          if (isRecHoriFirst && isRecHoriFirst === isRecHoriSecond) {
            return LAYOUT_COLUMN;
          }
          if (isRecHoriFirst !== isRecHoriSecond) {
            return LAYOUT_ROW_SQUARE;
          }
          return LAYOUT_ROW;
        case 3:
        case 4:
          if (isRecHoriFirst) {
            return LAYOUT_COLUMN;
          }
          return LAYOUT_ROW;
        default:
          return LAYOUT_COLUMN;
      }
    }
    if (length === 5) {
      return LAYOUT_COLUMN;
    }
    return LAYOUT_ROW;
  }
};
