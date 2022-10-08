import { IComponentNode } from '@pan/common';
import cn from 'classnames';
import React from 'react';

import { StageComponentWrapper } from './stage-component-wrapper';
import { computeStyle } from './utils';

import { useDragComponent } from '@/pages/editor/hooks/use-drag-component';

interface IStageComponentGroupProps {
  componentConfig: IComponentNode;
}

export const StageComponentGroup: React.FC<IStageComponentGroupProps> = function (props) {
  const { componentConfig } = props;
  const { id, groupId } = componentConfig;
  const isRoot = groupId === '0';
  const [, drapRef] = useDragComponent(id, isRoot);
  const style = computeStyle(componentConfig);

  return (
    <div
      ref={drapRef}
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
            <StageComponentWrapper
              key={component.id}
              componentConfig={component}
            />
          ))
      }
    </div>
  );
};
