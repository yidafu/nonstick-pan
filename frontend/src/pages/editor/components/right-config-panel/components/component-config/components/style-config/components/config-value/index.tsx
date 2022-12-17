/* eslint-disable react/jsx-props-no-spreading */

import {
  EStyleConfigLabelType, TComponentStyleLabelItem,
} from '@pan/common';
import React from 'react';

import { ConfigValueBoolean } from './config-value-boolean';
import { ConfigValueNumber } from './config-value-number';
import { ConfigValueSelect } from './config-value-select';
import { ConfigValueString } from './config-value-string';

interface IConfigValueProps {

}

export const ConfigValue: React.FC<
IConfigValueProps & TComponentStyleLabelItem
> = function (props) {
  const { type } = props;
  switch (type) {
    case EStyleConfigLabelType.Num: {
      return <ConfigValueNumber {...props} />;
    }
    case EStyleConfigLabelType.Str: {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <ConfigValueString {...props} />;
    }
    case EStyleConfigLabelType.Bool: {
      return <ConfigValueBoolean {...props} />;
    }
    case EStyleConfigLabelType.Selection: {
      return <ConfigValueSelect {...props} />;
    }
    default:
      // eslint-disable-next-line react/jsx-props-no-spreading
      // return <ConfigValueNumber {...props} />;
      return null;
  }
};
