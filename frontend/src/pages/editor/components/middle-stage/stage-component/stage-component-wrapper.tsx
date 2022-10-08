import { IComponentNode } from '@pan/common';
import React from 'react';

import { StageComponent } from './stage-component';
import { StageComponentGroup } from './stage-component-group';

interface IStageComponentWrapperProps {
  componentConfig: IComponentNode;
}

/**
 * 分发单个组件和内置组件
 * @param props
 * @returns
 */
export const StageComponentWrapper: React.FC<IStageComponentWrapperProps> = function (props) {
  const { componentConfig } = props;
  if (componentConfig.isGroup) {
    return <StageComponentGroup componentConfig={componentConfig} />;
  }
  return <StageComponent componentConfig={componentConfig} />;
};
