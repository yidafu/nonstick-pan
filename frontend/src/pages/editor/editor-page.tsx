import React from 'react';

import { TopMenu } from './components/top-menu';
import { LeftMenuPanel } from './components/left-menu-panel';
import { RightConfigPanel } from './components/right-config-panel';
import { MiddleStage } from './components/middle-stage';

interface IEditorPageProps {

}

export const EditorPage: React.FC<IEditorPageProps> = function (props) {
  return (
    <div>
      <TopMenu />
      <div className="p-full-h flex">
        <LeftMenuPanel />
        <MiddleStage />
        <RightConfigPanel />
      </div>
    </div>
  );
};
