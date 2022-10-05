import React, { useRef } from 'react';

import { useStage } from './hook';

interface IStageProps {

}

export const Stage: React.FC<IStageProps> = function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const { stageStyle } = useStage(stageWrapperRef, stageRef);
  return (
    <div id="p-bg stage-wrapper" ref={stageWrapperRef} className="h-full absolute inset-0 m-8">
      <div
        id="pan-stage"
        className="p-bg-l absolute shadow-md"
        style={stageStyle}
        ref={stageRef}
      />
    </div>
  );
};
