import React from 'react';

import {
  LeftMenuPanel,
} from './components/left-menu-panel';
import {
  MiddleStage,
} from './components/middle-stage';
import {
  RightConfigPanel,
} from './components/right-config-panel';
import {
  TopMenu,
} from './components/top-menu';

interface IEditorPageProps {

}

export const EditorPage: React.FC<IEditorPageProps> = function (props) {
  return (
    <div>
      <TopMenu />
      <div
        className="p-full-h flex"
      >
        <LeftMenuPanel />
        <MiddleStage />
        <RightConfigPanel />
      </div>
    </div>
  );
};
