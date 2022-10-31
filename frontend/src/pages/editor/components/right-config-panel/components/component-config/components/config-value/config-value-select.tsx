import { IIComponentStyleLabelSelectionItem } from '@pan/common';
import {
  Select, message,
} from 'antd';
import React from 'react';

import { useComponentStyleConfig } from '../../hooks';

interface INumberProps extends IIComponentStyleLabelSelectionItem {
}

export const ConfigValueSelect: React.FC<INumberProps> = function ConfigValueSelect(props) {
  const {
    options, mapTo,
  } = props;
  const {
    getStyleValue, updateComponentStyleConfig,
  } = useComponentStyleConfig();

  function handleValueChange(val: string | null) {
    if (val) {
      updateComponentStyleConfig(mapTo, val);
    } else {
      message.warning('数字不能为空');
    }
  }

  return (
    <Select
      value={getStyleValue(mapTo) as string}
      onChange={handleValueChange}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value}>{opt.label}</Select.Option>
      ))}
    </Select>
  );
};
