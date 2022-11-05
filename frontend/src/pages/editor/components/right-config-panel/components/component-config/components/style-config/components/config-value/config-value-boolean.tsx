import { IComponentStyleLabelBooleanItem } from '@pan/common';
import { Switch } from 'antd';
import React from 'react';

import { useComponentStyleConfig } from '../../hooks';

interface IBooleanProps extends IComponentStyleLabelBooleanItem {
}

export const ConfigValueBoolean: React.FC<IBooleanProps> = function (props) {
  const { mapTo } = props;
  const {
    getStyleValue, updateComponentStyleConfig,
  } = useComponentStyleConfig();

  function handleValueChange(val: boolean) {
    updateComponentStyleConfig(mapTo, val);
  }

  return (
    <Switch
      checked={getStyleValue(mapTo) as boolean}
      onChange={handleValueChange}
    />
  );
};
