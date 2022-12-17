import { useCallback } from 'react';
import {
  useRemeshDomain, useRemeshQuery, useRemeshSend,
} from 'remesh-react';

import { EditorDomain } from '../domain';

export function useSelectStage() {
  const editorDomain = useRemeshDomain(EditorDomain());
  const selectedType = useRemeshQuery(editorDomain.query.SelectedTypeQuery());
  const selectedComIdList = useRemeshQuery(editorDomain.query.SelectComIdListQuery());
  const send = useRemeshSend();

  const updateSelectedComponent = useCallback((comId: string) => {
    send(editorDomain.command.UpdateSelectedComponentCommand(comId));
  }, [editorDomain.command, send]);

  const updateSelectedGroup = useCallback((comIds: string[]) => {
    send(editorDomain.command.UpdateSelectedGroupCommand(comIds));
  }, [editorDomain.command, send]);
  const resetSelect = useCallback(() => {
    send(editorDomain.command.ResetStageSelectCommand());
  }, [editorDomain.command, send]);
  return {
    selectedType,
    selectedComIdList,
    updateSelectedComponent,
    updateSelectedGroup,
    resetSelect,
  };
}
