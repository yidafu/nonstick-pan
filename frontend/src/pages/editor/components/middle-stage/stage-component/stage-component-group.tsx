import { IComponentNode } from '@pan/common';
import cn from 'classnames';
import React, { useRef } from 'react';

import { EStageSelectedType } from '@/pages/editor/domain/stage-select-module';

import { useDragComponent } from '@/pages/editor/hooks/use-move-component';

import { StageComponentWrapper } from './stage-component-wrapper';
import { computeStyle } from './utils';

interface IStageComponentGroupProps {
  componentConfig: IComponentNode;
}

export const StageComponentGroup: React.FC<IStageComponentGroupProps> = function (props) {
  const groupRef = useRef<HTMLDivElement>(null);
  const { componentConfig } = props;
  const {
    id, groupId,
  } = componentConfig;
  const isRoot = groupId === '0';
  useDragComponent(groupRef, isRoot);
  const style = computeStyle(componentConfig);

  return (
    <div
      ref={groupRef}
      className={cn(
        'pan-component-group absolute',
        isRoot && 'outline-dashed outline-1 outline-orange-400',
      )}
      data-c-id={id}
      data-e-type={EStageSelectedType.Group}
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
