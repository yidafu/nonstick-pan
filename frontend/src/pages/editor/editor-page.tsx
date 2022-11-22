import { Spin } from 'antd';
import React from 'react';

import { LeftMenuPanel } from './components/left-menu-panel';
import { MiddleStage } from './components/middle-stage';
import { RightConfigPanel } from './components/right-config-panel';
import { TopMenu } from './components/top-menu';
import { useFetchScreen } from './hooks';

interface IEditorPageProps {

}

export const EditorPage: React.FC<IEditorPageProps> = function () {
  const { loading } = useFetchScreen();
  return (
    <Spin spinning={loading}>
      <div>
        <TopMenu />
        <div
          className="flex p-full-h"
        >
          <LeftMenuPanel />
          <MiddleStage />
          <RightConfigPanel />
        </div>
      </div>
    </Spin>

  );
};
