import { definePanComponent } from '@pan/common';
import React from 'react';

import { EchartBar as EchartBarComponent } from './echart-bar';

export const PanEchartBar = definePanComponent({
  name: 'PanEchartBar',
  width: 400,
  height: 300,

  render() {
    return React.createElement(EchartBarComponent);
  },
  layerName: 'Echart柱状图',
  isLock: false,
  isLockAspectRatio: false,

  category: 'chart',
  subCategory: 'bar',

  requestConfig: {},
  interactConfig: {},
});
