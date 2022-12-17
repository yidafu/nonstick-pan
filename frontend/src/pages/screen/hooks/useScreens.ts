import { useEffect } from 'react';
import {
  useRemeshDomain, useRemeshQuery, useRemeshSend,
} from 'remesh-react';

import { ScreensDomain } from '../domain';

export function useScreens() {
  const screensDomain = useRemeshDomain(ScreensDomain());
  const send = useRemeshSend();
  const screens = useRemeshQuery(screensDomain.query.FetchScreensQuery());
  const loading = useRemeshQuery(screensDomain.query.LoadingQuery());

  useEffect(() => {
    send(screensDomain.command.FetchScreensCommand());
  }, [screensDomain.command, send]);

  return {
    screens, loading,
  };
}
