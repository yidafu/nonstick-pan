import React, { useEffect } from 'react';
import {
  useRemeshDomain, useRemeshSend, useRemeshQuery,
} from 'remesh-react';

import { TopMenu } from '@/components/top-menu';
import { ScreenDomain } from '@/domain/ScreenDomain';

import { LeftMenu } from './components/left-menu';
import { ScreenCard } from './components/screen-card/screen-card';

interface IScreenPageProps {

}

export const ScreenPage: React.FC<IScreenPageProps> = function () {
  const screenDomain = useRemeshDomain(ScreenDomain());
  const send = useRemeshSend();
  const screenList = useRemeshQuery(screenDomain.query.AllScreenQuery());

  useEffect(() => {
    send(screenDomain.command.LoadScreen());
  }, [screenDomain.command, send]);

  return (
    <div>
      <TopMenu />
      <div className="flex p-full-h">
        <LeftMenu />
        <div className="flex w-auto">
          {screenList.map((screen) => <ScreenCard screen={screen} />)}
        </div>
      </div>
    </div>
  );
};
