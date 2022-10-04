import {
  useRemeshDomain, useRemeshQuery,
} from 'remesh-react';

import { EditorDomain } from '@/pages/editor/domain';

export function useComponentsData() {
  const editorDomain = useRemeshDomain(EditorDomain());
  const components = useRemeshQuery(editorDomain.query.ComponentsQuery());

  return components;
}
