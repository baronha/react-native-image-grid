export const LAYOUT_ROW = 'row';
export const LAYOUT_COLUMN = 'column';

export const checkLayoutImage = (data, length) => {
  if (length >= 2) {
    const firstItem = data[0];
    if (
      typeof firstItem === 'object' &&
      firstItem?.width &&
      firstItem?.height
    ) {
      switch (length) {
        case 3:
          return LAYOUT_ROW;
        case 4:
          return null;
        case 5:
          return LAYOUT_ROW;
        case 6:
          return LAYOUT_COLUMN;
        default:
          let layout = LAYOUT_ROW;
          //default is 2
          return layout;
      }
    }
    if (typeof data[0] === 'string') {
      if (length === 5) {
        return LAYOUT_COLUMN;
      }
      return LAYOUT_ROW;
    }
  }
};
