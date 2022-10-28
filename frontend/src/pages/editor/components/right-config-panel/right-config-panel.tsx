import React from 'react';
import { EStageSelectedType } from '../../domain/stage-select-module';

// import { Tabs } from 'antd';
import { useSelectStage } from '../../hooks/use-select-stage';

import { ComponentConfig } from './components/component-config';
import { ScreenConfig } from './components/screen-config';

interface IRightConfigPanelProps {

}

export const RightConfigPanel: React.FC<IRightConfigPanelProps> = function (props) {
  const { selectedType } = useSelectStage();

  function renderConfigPanel(currentSelectedType: EStageSelectedType) {
    if (currentSelectedType === EStageSelectedType.Stage) {
      return <ScreenConfig />;
    }
    if (currentSelectedType === EStageSelectedType.Component) {
      return <ComponentConfig />;
    }
  }
  return (
    <div
      className="w-80 p-block h-full"
    >
      {renderConfigPanel(selectedType)}
    </div>
  );
};
