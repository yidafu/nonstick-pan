import { Collapse } from 'antd';
import React, { useContext } from 'react';

import { ComponentContext } from '../component-context';

import { ConfigValue } from './config-value';

interface IStyleConfigProps {

}

export const StyleConfig: React.FC<IStyleConfigProps> = function (props) {
  const componentData = useContext(ComponentContext);
  if (!componentData) return null;

  return (
    <div>
      <Collapse>
        {
          componentData?.styleLabelConfig.map((labelGroup) => (
            <Collapse.Panel header={labelGroup.label} key={labelGroup.label}>
              {
                labelGroup.children.map((item) => (
                  <div className="flex justify-between my-2">
                    <span className="w20">{item.label}</span>
                    <div>
                      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                      <ConfigValue {...item} />
                    </div>
                  </div>
                ))
              }
            </Collapse.Panel>
          ))
        }
      </Collapse>
    </div>
  );
};
