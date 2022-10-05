import React, { useRef } from 'react';

import { useStage } from './hook';

interface IStageProps {

}

export const Stage: React.FC<IStageProps> = function Stage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const { stageStyle } = useStage(stageWrapperRef, stageRef);
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
      />
    </div>
  );
};
