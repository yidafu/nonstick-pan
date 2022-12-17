import { useEffect } from 'react';
import {
  useRemeshDomain, useRemeshQuery, useRemeshSend,
} from 'remesh-react';

import { EditorDomain } from '@/pages/editor/domain';

import { useScreenId } from './use-screen-id';

export function useFetchScreen() {
  const screenId = useScreenId();
  const send = useRemeshSend();
  const editorDomain = useRemeshDomain(EditorDomain());
  const singleScreen = useRemeshQuery(editorDomain.query.ScreenResourceQuery());
  const components = useRemeshQuery(editorDomain.query.ComponentsQuery());
  const isScreenLoading = useRemeshQuery(editorDomain.query.IsScreenLoadingQuery());
  const isComponentsLoding = useRemeshQuery(editorDomain.query.IsComponentsLoadingQuery());

  useEffect(() => {
    send(editorDomain.command.FetchSingleScreenCommand(screenId));
    send(editorDomain.command.FetchComponentsCommand(screenId));
  }, [editorDomain.command, screenId, send]);

  return {
    screen: singleScreen,
    components,
    loading: isScreenLoading || isComponentsLoding,
  };
}
