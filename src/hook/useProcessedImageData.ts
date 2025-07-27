import { useMemo } from 'react';
import { LAYOUT_ROW, MAX_GRID_SIZE } from 'src/common/constant';
import { checkLayoutImage } from 'src/helpers';
import { ImageItem } from 'src/ImageGrid';

export const useProcessedImageData = (
  dataImage: ImageItem[],
  maximum: number,
  widthKey: string,
  heightKey: string
) => {
  return useMemo(() => {
    if (!dataImage?.length) {
      return {
        data: [],
        length: 0,
        remain: 0,
        layout: LAYOUT_ROW,
      };
    }

    const clonedData = [...dataImage];
    const targetLength = Math.min(maximum, clonedData.length);
    const remain = clonedData.length - targetLength;
    const finalLength = Math.min(targetLength, MAX_GRID_SIZE);
    const processedData = clonedData.slice(0, finalLength);

    const layout =
      checkLayoutImage(processedData, finalLength, widthKey, heightKey) ||
      LAYOUT_ROW;

    return {
      data: processedData,
      length: finalLength,
      remain,
      layout,
    };
  }, [dataImage, maximum, widthKey, heightKey]);
};
