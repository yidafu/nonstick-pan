import React from 'react';

import { EStageSelectedType } from '../../domain/stage-select-module';

// import { Tabs } from 'antd';
import { useSelectStage } from '../../hooks/use-select-stage';

import { ComponentConfig } from './components/component-config';
import { ScreenConfig } from './components/screen-config';

interface IRightConfigPanelProps {

}

export const RightConfigPanel: React.FC<IRightConfigPanelProps> = function () {
  const {
    selectedType, selectedComIdList,
  } = useSelectStage();

  function renderConfigPanel(currentSelectedType: EStageSelectedType, comIdList: string[]) {
    if (currentSelectedType === EStageSelectedType.Stage) {
      return <ScreenConfig />;
    }
    if (currentSelectedType === EStageSelectedType.Component) {
      return <ComponentConfig componentId={comIdList[0]} />;
    }
  }
  return (
    <div
      className="h-full w-80 p-block"
    >
      {renderConfigPanel(selectedType, selectedComIdList)}
    </div>
  );
};
