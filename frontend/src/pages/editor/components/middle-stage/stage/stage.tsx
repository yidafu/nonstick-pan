import React, { useRef } from 'react';

import { PanComponentWrapper } from '../pan-component';

import {
  useComponents, useStage,
} from '@/pages/editor/hooks';

interface IStageProps {

}

export const Stage: React.FC<IStageProps> = function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const { stageStyle } = useStage(stageWrapperRef, stageRef);
  const { componentTree } = useComponents();
  return (
    <div
      id="stage-wrapper"
      ref={stageWrapperRef}
      className="p-bg h-full absolute inset-0 m-8 overflow-hidden"
    >
      <div
        id="pan-stage"
        className="p-bg-l absolute shadow-md"
        style={stageStyle}
        ref={stageRef}
      >
        {componentTree.map((compoennt) => (
          <PanComponentWrapper
            key={compoennt.id}
            componentConfig={compoennt}
          />
        ))}
      </div>
    </div>
  );
};
