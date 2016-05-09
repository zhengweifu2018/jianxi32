import { productData } from './productData';

import { patternData } from './patternData';

import { nodeData } from './nodeData';

import { colorSchemeData } from './colorSchemeData';

import { textColorPanelData } from './textColorPanelData';

import { combineReducers } from 'redux';

export default combineReducers({
  productData,
  patternData,
  nodeData,
  colorSchemeData,
  textColorPanelData
});
