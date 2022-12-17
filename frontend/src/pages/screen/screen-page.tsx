import { Spin } from 'antd';
import React from 'react';

import { TopMenu } from '@/components/top-menu';

import { LeftMenu } from './components/left-menu';

import { ScreenCard } from './components/screen-card/screen-card';

import { useScreens } from './hooks/useScreens';

interface IScreenPageProps {

}

export const ScreenPage: React.FC<IScreenPageProps> = function () {
  const {
    screens, loading,
  } = useScreens();
  return (
    <div>
      <TopMenu />
      <div
        className="flex p-full-h"
      >
        <LeftMenu />
        <Spin spinning={loading}>
          <div
            className="flex w-auto"
          >
            {screens.map((screen) => (
              <ScreenCard
                screen={screen}
              />
            ))}
          </div>
        </Spin>
      </div>
    </div>
  );
};
