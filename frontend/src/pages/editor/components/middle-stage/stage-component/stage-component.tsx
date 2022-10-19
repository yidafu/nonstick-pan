import { IComponentNode } from '@pan/common';
import cn from 'classnames';
import React, { useRef } from 'react';

import { computeStyle } from './utils';

import { useDragComponent } from '@/pages/editor/hooks/use-move-component';
import { ComponentManager } from '@/pan-components';

interface IStageComponentProps {
  componentConfig: IComponentNode;
}

export const StageComponent: React.FC<IStageComponentProps> = function (props) {
  const { componentConfig } = props;
  const comRef = useRef<HTMLDivElement>(null);
  const {
    id, name, groupId,
  } = componentConfig;
  const isRoot = groupId === '0';
  useDragComponent(comRef, isRoot);
  const style = computeStyle(componentConfig);
  return (
    <div
      ref={comRef}
      className={cn(
        'pan-component-wrapper absolute',
        isRoot && 'outline-dashed outline-1 outline-orange-400',
      )}
      data-c-id={id}
      data-is-group={false}
      style={style}
    >
      {ComponentManager.render(name)}
    </div>
  );
};
