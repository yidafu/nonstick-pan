import { Spin } from 'antd';
import React from 'react';

import { LeftMenu } from './components/left-menu';

import { ScreenCard } from './components/screen-card/screen-card';

import { useScreens } from './hooks/useScreens';

import { TopMenu } from '@/components/top-menu';

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
        className="p-full-h flex"
      >
        <LeftMenu />
        <Spin spinning={loading}>
          <div
            className="w-auto flex"
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
