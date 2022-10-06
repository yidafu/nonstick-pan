import { IComponentNode } from '@pan/common';
import React from 'react';

import { PanComponent } from './pan-component';
import { PanComponentGroup } from './pan-component-group';

interface IPanComponentWrapperProps {
  componentConfig: IComponentNode;
}

/**
 * 分发单个组件和内置组件
 * @param props
 * @returns
 */
export const PanComponentWrapper: React.FC<IPanComponentWrapperProps> = function (props) {
  const { componentConfig } = props;
  if (componentConfig.isGroup) {
    return <PanComponentGroup componentConfig={componentConfig} />;
  }
  return <PanComponent componentConfig={componentConfig} />;
};
