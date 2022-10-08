import React, { useRef } from 'react';
import { StageComponentWrapper } from '../stage-component';

import {
  useComponents, useStage,
} from '@/pages/editor/hooks';
import { useDropCompnent } from '@/pages/editor/hooks/use-drop-component';

interface IStageProps {

}

export const Stage: React.FC<IStageProps> = function Stage() {
  // const stageRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const { componentTree } = useComponents();

  const [, dropRef] = useDropCompnent();
  const { stageStyle } = useStage(stageWrapperRef, dropRef);
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
        ref={dropRef}
      >
        {componentTree.map((compoennt) => (
          <StageComponentWrapper
            key={compoennt.id}
            componentConfig={compoennt}
          />
        ))}
      </div>
    </div>
  );
};
