import { IComponent } from '@pan/common';
import {
  useRemeshDomain, useRemeshSend,
} from 'remesh-react';

import { EditorDomain } from '../domain';

export function useUpdateComponent() {
  const editorDomain = useRemeshDomain(EditorDomain());
  const send = useRemeshSend();

  return function updateSingleComponet(id: string, data: Partial<IComponent>) {
    send(editorDomain.command.UpdateSingleComponentCommand([id, data]));
  };
}
