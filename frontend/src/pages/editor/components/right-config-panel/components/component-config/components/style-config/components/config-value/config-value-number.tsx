import { IComponentStyleLabelNumberItem } from '@pan/common';
import {
  InputNumber, message,
} from 'antd';
import React from 'react';

import { useComponentStyleConfig } from '../../hooks';

interface INumberProps extends IComponentStyleLabelNumberItem {
}

export const ConfigValueNumber: React.FC<INumberProps> = function (props) {
  const {
    min, max, step, mapTo,
  } = props;
  const {
    getStyleValue, updateComponentStyleConfig,
  } = useComponentStyleConfig();

  function handleValueChange(val: number | null) {
    if (val) {
      updateComponentStyleConfig(mapTo, val);
    } else {
      message.warning('数字不能为空');
    }
  }

  return (
    <InputNumber
      value={getStyleValue(mapTo) as number}
      min={min}
      max={max}
      step={step}
      onChange={handleValueChange}
    />
  );
};
