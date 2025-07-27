import { ImageSourcePropType, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { ImageItem } from './ImageItem';

export interface ImageGridProps {
  dataImage: ImageItem[];
  sourceKey?: string;
  width?: number;
  colorLoader?: string[];
  spaceSize?: number;
  containerStyle?: ViewStyle;
  activeOpacity?: number;
  maximum?: number;
  onPressImage?: (index: number, item: ImageItem) => void;
  backgroundMask?: string;
  backgroundMaskVideo?: string;
  numberRemainStyle?: TextStyle;
  videoIconStyle?: ImageStyle;
  videoKey?: string;
  videoURLKey?: string;
  conditionCheckVideo?: boolean;
  heightKey?: string;
  widthKey?: string;
  componentDelete?: React.ReactElement | null;
  onDeleteImage?: (index: number, item: ImageItem) => void;
  showDelete?: boolean;
  ratioImagePortrait?: number;
  ratioImageLandscape?: number;
  prefixPath?: string;
  backgroundColorKey?: string;
  ImageWrap?: React.ComponentType<any>;
  emptyImageSource?: ImageSourcePropType;
}
