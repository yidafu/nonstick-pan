import { Collapse } from 'antd';
import React, { useContext } from 'react';

import { ComponentContext } from '../../component-context';

import { ConfigValue } from './components/config-value';
import { SizeAndOffset } from './components/size-and-offset';

interface IStyleConfigProps {

}

export const StyleConfig: React.FC<IStyleConfigProps> = function () {
  const componentData = useContext(ComponentContext);
  if (!componentData) return null;

  return (
    <div>
      <SizeAndOffset />
      <Collapse>
        {
          componentData?.styleLabelConfig.map((labelGroup) => (
            <Collapse.Panel header={labelGroup.label} key={labelGroup.label}>
              {
                labelGroup.children.map((item) => (
                  <div className="flex justify-between my-2" key={item.mapTo}>
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
