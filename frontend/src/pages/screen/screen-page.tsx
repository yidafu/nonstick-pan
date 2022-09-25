import React from 'react';

import { LeftMenu } from './components/left-menu';

import { TopMenu } from '@/components/top-menu';

interface IScreenPageProps {

}

export const ScreenPage: React.FC<IScreenPageProps> = function (props) {
  return (
    <div>
      <TopMenu />
      <div className="p-full-h">
        <LeftMenu />
      </div>
    </div>
  );
};
