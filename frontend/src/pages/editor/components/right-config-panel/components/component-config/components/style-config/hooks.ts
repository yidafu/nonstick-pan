import {
  IComponent, IComponentStyleConfig,
} from '@pan/common';
import get from 'lodash.get';
import set from 'lodash.set';
import {
  useCallback, useContext, useState,
} from 'react';
import {
  useRemeshDomain, useRemeshEvent, useRemeshQuery, useRemeshSend,
} from 'remesh-react';

import { ComponentContext } from '../../component-context';

import { EditorDomain } from '@/pages/editor/domain';

export function useOneComponentData(comId = '0') {
  const [componentId, setComponentId] = useState(comId);
  const editorDomain = useRemeshDomain(EditorDomain());
  const component = useRemeshQuery(editorDomain.query.OneComponentQuery(componentId));
  const send = useRemeshSend();

  const updateComponent = useCallback((cId: string, toUpdate: Partial<IComponent>) => {
    send(editorDomain.command.UpdateSingleComponentCommand([cId, toUpdate]));
  }, [editorDomain.command, send]);

  const updateComponentId = useCallback((cId: string) => {
    setComponentId(cId);
  }, []);

  useRemeshEvent(editorDomain.event.UpdateSingleSuccessEvent, ([id, partialCom]) => {
    if (id === componentId) {
      console.log(id, partialCom);
      // component = merge({}, component, partialCom);
    }
  });
  return {
    component, updateComponent, updateComponentId,
  };
}

export function useUpateCompoent() {
  const editorDomain = useRemeshDomain(EditorDomain());

  const send = useRemeshSend();

  const updateComponent = useCallback(((cId: string, toUpdate: Partial<IComponent>) => {
    send(editorDomain.command.UpdateSingleComponentCommand([cId, toUpdate]));
  }), [editorDomain.command, send]);

  return updateComponent;
}

export function useComponentStyleConfig() {
  const componetData = useContext(ComponentContext);

  const editorDomain = useRemeshDomain(EditorDomain());
  const send = useRemeshSend();

  const updateComponentStyleConfig = useCallback(
    (key: string, value: string | number | boolean) => {
      if (componetData) {
        const { styleConfig } = componetData;
        const toUpdate: IComponentStyleConfig = set(styleConfig, key, value);
        send(editorDomain.command.UpdateSingleComponentCommand([
          componetData.id,
          { styleConfig: toUpdate },
        ]));
      }
    },
    [componetData, editorDomain.command, send],
  );

  function getStyleValue(mapTo: string) {
    if (componetData) {
      return get(componetData.styleConfig, mapTo) as unknown as string | number | boolean;
    }
    return undefined;
  }

  return {
    getStyleValue, updateComponentStyleConfig,
  };
}
