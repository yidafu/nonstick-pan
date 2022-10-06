import * as Common from '@pan/common';
import React from 'react';

import { BlankBorder } from './blank-border';

export const BlankBorderConfig = Common.definePanComponent({
  name: 'PanBlankBorder',
  width: 200,
  height: 200,

  render() {
    return React.createElement(BlankBorder);
  },
  layerName: '空白边框',
  isLock: false,
  isLockAspectRatio: false,

  category: '',
  subCategory: '',
  styleConfig: {},
  requestConfig: {},
  interactConfig: {},
});
