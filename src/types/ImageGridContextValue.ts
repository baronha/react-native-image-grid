import { ImageGridProps } from './ImageGrid';
import { ImageItem } from './ImageItem';

export interface ImageGridContextValue extends Required<ImageGridProps> {
  layout: string;
  length: number;
  remain: number;
  data: ImageItem[];
}
