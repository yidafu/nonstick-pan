import { IComponentNode } from '@pan/common';
import cn from 'classnames';
import React from 'react';

import { PanComponentWrapper } from './pan-component-wrapper';
import { computeStyle } from './utils';

interface IPanComponentGroupProps {
  componentConfig: IComponentNode;
}

export const PanComponentGroup: React.FC<IPanComponentGroupProps> = function (props) {
  const { componentConfig } = props;
  const { id, groupId } = componentConfig;
  const isRoot = groupId === '0';
  const style = computeStyle(componentConfig);

  return (
    <div
      className={cn(
        'pan-component-group absolute',
        isRoot && 'outline-dashed outline-1 outline-orange-400',
      )}
      data-c-id={id}
      data-is-group
      style={style}
    >
      {
        componentConfig.children
          .map((component) => (
            <PanComponentWrapper
              key={component.id}
              componentConfig={component}
            />
          ))
      }
    </div>
  );
};
