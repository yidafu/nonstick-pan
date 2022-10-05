import React from 'react';

import { useRuler } from '../../hooks';

import { Ruler } from './ruler';
import { Stage } from './stage';

interface IMiddleStageProps {

}

export const MiddleStage: React.FC<IMiddleStageProps> = function () {
  const {
    scale, origin,
  } = useRuler();
  return (
    <div
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
    </div>
  );
};
