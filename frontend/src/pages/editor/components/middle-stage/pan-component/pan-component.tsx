import { IComponentNode } from '@pan/common';
import React from 'react';

import { ComponentManager } from '@/pan-components';

interface IPanComponentProps {
  componentConfig: IComponentNode;
}

function computeStyle(config: IComponentNode) {
  return {
    width: config.width,
    height: config.height,
    top: config.offsetX,
    left: config.offsetY,
    zIndex: config.zIndex,
  };
}

export const PanComponent: React.FC<IPanComponentProps> = function (props) {
  const { componentConfig } = props;
  const { name } = componentConfig;
  const style = computeStyle(componentConfig);
  return (
    <div
      className="pan-component-wrapper absolute border-yellow-100"
      style={style}
    >
      {ComponentManager.render(name)}
    </div>
  );
};
