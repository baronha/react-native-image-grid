import { createContext } from 'react';
import { ImageGridContextValue } from './types';

// Context
export const ImageGridContext = createContext<ImageGridContextValue | null>(
  null
);
