import { Tabs } from 'antd';
import React from 'react';

interface IComponentConfigProps {

}

export enum EComponentTabType {
  Style = 'style',
  Interaction = 'interaction',
  Data = 'data',
}

export const ComponentConfig: React.FC<IComponentConfigProps> = function (props) {
  return (
    <div>
      <Tabs
        type="card"
        items={[
          {
            label: '样式', key: EComponentTabType.Style, children: '样式配置',
          },
          {
            label: '交互', key: EComponentTabType.Interaction, children: '交互配置',
          },
          {
            label: '数据', key: EComponentTabType.Data, children: '数据配置',
          },
        ]}
      />
    </div>
  );
};
