import { IComponentStyleLabelStringItem } from '@pan/common';
import {
  Input, message,
} from 'antd';
import React, { ChangeEvent } from 'react';

import { useComponentStyleConfig } from '../../hooks';

interface IStringProps extends IComponentStyleLabelStringItem {
}

export const ConfigValueString: React.FC<IStringProps> = function (props) {
  const { mapTo } = props;
  const {
    getStyleValue, updateComponentStyleConfig,
  } = useComponentStyleConfig();

  function handleValueChange(evt: ChangeEvent<HTMLInputElement>) {
    const val = evt.target.value;
    if (val) {
      updateComponentStyleConfig(mapTo, val);
    } else {
      message.warning('数字不能为空');
    }
  }

  return (
    <Input
      value={getStyleValue(mapTo) as string}
      onChange={handleValueChange}
    />
  );
};
