import React, { useRef } from 'react';

import { useRuler } from '../../hooks';

import { MiddleStageContext } from './middle-stage-context';
import { ResizeBar } from './resize-bar';
import { Ruler } from './ruler';
import { Stage } from './stage';

interface IMiddleStageProps {

}

export const MiddleStage: React.FC<IMiddleStageProps> = function () {
  const middleStageRef = useRef<HTMLDivElement>(null);
  const {
    scale, origin,
  } = useRuler();
  return (
    <MiddleStageContext.Provider value={middleStageRef}>
      <div
        ref={middleStageRef}
        className="p-bg grow h-full relative"
      >
        <Ruler
          scale={scale}
          onXAxis={console.log}
          onYAxis={console.log}
          originX={origin.x}
          originY={origin.y}
        />
        <Stage />
        <ResizeBar />
      </div>
    </MiddleStageContext.Provider>

  );
};
