import { IComponentNode } from '@pan/common';
import React from 'react';

import { PanComponentWrapper } from './pan-component-wrapper';

interface IPanComponentGroupProps {
  componentConfig: IComponentNode;
}

export const PanComponentGroup: React.FC<IPanComponentGroupProps> = function (props) {
  const { componentConfig } = props;
  return (
    <div className="pan-component-group">
      {
        componentConfig.children
          .map((component) => (<PanComponentWrapper componentConfig={component} />))
      }
    </div>
  );
};
