import { IComponentNode } from '@pan/common';
import cn from 'classnames';
import React, {
  useCallback, useRef,
} from 'react';

import { computeStyle } from './utils';

import { ComponentManager } from '@/compnents-manager';
import { EStageSelectedType } from '@/pages/editor/domain/stage-select-module';
import { useSelectStage } from '@/pages/editor/hooks';
import { useDragComponent } from '@/pages/editor/hooks/use-move-component';

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
  const { updateSelectedComponent } = useSelectStage();

  const style = computeStyle(componentConfig);

  const handleComponentClick = useCallback(() => {
    updateSelectedComponent(id);
  }, [id, updateSelectedComponent]);

  return (
    <div
      ref={comRef}
      className={cn(
        'pan-component-wrapper absolute',
        isRoot && 'outline-dashed outline-1 outline-orange-400',
      )}
      onClick={handleComponentClick}
      data-c-id={id}
      data-e-type={EStageSelectedType.Component}
      data-is-group={false}
      style={style}
    >
      {ComponentManager.render(name)}
    </div>
  );
};
