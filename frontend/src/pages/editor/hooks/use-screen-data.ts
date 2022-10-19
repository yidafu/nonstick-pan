import {
  useRemeshDomain, useRemeshQuery,
} from 'remesh-react';

import { EditorDomain } from '@/pages/editor/domain';

export function useScreenData() {
  const editorDomain = useRemeshDomain(EditorDomain());
  const singleScreen = useRemeshQuery(editorDomain.query.ScreenResourceQuery());

  return singleScreen;
}
