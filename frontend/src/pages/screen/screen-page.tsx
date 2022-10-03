import React, {
  useEffect,
} from 'react';
import {
  useRemeshDomain, useRemeshSend, useRemeshQuery,
} from 'remesh-react';

import {
  LeftMenu,
} from './components/left-menu';

import {
  ScreenCard,
} from './components/screen-card/screen-card';

import {
  TopMenu,
} from '@/components/top-menu';
import {
  ScreenDomain,
} from '@/domain/ScreenDomain';

interface IScreenPageProps {

}

export const ScreenPage: React.FC<IScreenPageProps> = function () {
  const screenDomain = useRemeshDomain(ScreenDomain());
  const send = useRemeshSend();
  const screenList = useRemeshQuery(screenDomain.query.AllScreenQuery());
  console.log(screenList);
  useEffect(() => {
    send(screenDomain.command.LoadScreen());
  }, []);

  return (
    <div>
      <TopMenu />
      <div
        className="p-full-h flex"
      >
        <LeftMenu />
        <div
          className="w-auto flex"
        >
          {screenList.map((screen) => (
            <ScreenCard
              screen={screen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
