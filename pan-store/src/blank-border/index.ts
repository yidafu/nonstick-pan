import * as Common from '@pan/common';
import React from 'react';

import { BlankBorder as BlankBorderComponent } from './blank-border';

export const PanBlankBorder = Common.definePanComponent({
  name: 'PanBlankBorder',
  width: 200,
  height: 200,

  render() {
    return React.createElement(BlankBorderComponent);
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
