import React, { useRef } from 'react';

interface IStageProps {

}

export const Stage: React.FC<IStageProps> = function Stage(props) {
  const stageRef = useRef<HTMLCanvasElement>(null);
  return (
    <div id="stage-wrapper">
      <canvas
        id="pan-stage"
        ref={stageRef}
      />
    </div>
  );
};
