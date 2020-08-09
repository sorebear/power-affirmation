import React from 'react';
import { StateProvider } from './src/context/store';

export const wrapRootElement = ({ element }) => (
  <StateProvider>
    {element}
  </StateProvider>
);