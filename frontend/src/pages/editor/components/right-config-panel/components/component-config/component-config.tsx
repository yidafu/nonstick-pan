import { Tabs } from 'antd';
import React, { useEffect } from 'react';

import { ComponentContext } from './component-context';
import { DataConfig } from './components/data-config';
import { InteractionConfig } from './components/interaction-config';
import { StyleConfig } from './components/style-config';

import { useOneComponentData } from './components/style-config/hooks';

interface IComponentConfigProps {
  componentId: string;
}

export enum EComponentTabType {
  Style = 'style',
  Interaction = 'interaction',
  Data = 'data',
}

export const ComponentConfig: React.FC<IComponentConfigProps> = function ComponentConfig(props) {
  const { componentId } = props;
  const {
    component, updateComponentId,
  } = useOneComponentData(componentId);

  useEffect(() => {
    updateComponentId(componentId);
  }, [componentId, updateComponentId]);

  return (
    <div>
      <Tabs
        type="card"
        items={[
          {
            label: '样式',
            key: EComponentTabType.Style,
            children: (
              <ComponentContext.Provider value={component}>
                <StyleConfig />
              </ComponentContext.Provider>
            ),
          },
          {
            label: '交互',
            key: EComponentTabType.Interaction,
            children: (
              <ComponentContext.Provider value={component}>
                <InteractionConfig />
              </ComponentContext.Provider>
            ),
          },
          {
            label: '数据',
            key: EComponentTabType.Data,
            children: (
              <ComponentContext.Provider value={component}>
                <DataConfig />
              </ComponentContext.Provider>
            ),
          },
        ]}
      />
    </div>
  );
};
