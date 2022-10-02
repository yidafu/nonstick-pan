import React from 'react';

import { Ruler } from './ruler';

interface IMiddleStageProps {

}

export const MiddleStage: React.FC<IMiddleStageProps> = function (props) {
  return (
    <div className="grow h-full">
      <Ruler />
    </div>
  );
};
