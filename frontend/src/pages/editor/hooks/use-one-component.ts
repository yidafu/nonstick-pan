import {
  useRemeshDomain, useRemeshQuery,
} from 'remesh-react';

import { EditorDomain } from '@/pages/editor/domain';

export function useOneComponent(comId: string) {
  const editorDomain = useRemeshDomain(EditorDomain());

  const component = useRemeshQuery(editorDomain.query.OneComponentQuery(comId));

  function update() {

  }
  return component;
}
