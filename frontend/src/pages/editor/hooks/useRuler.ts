import { useCallback } from 'react';
import {
  useRemeshDomain, useRemeshQuery, useRemeshSend,
} from 'remesh-react';

import {
  IRulerOrigin, RulerDomain,
} from '../domain/ruler-domain';

export function useRuler() {
  const rulerDomain = useRemeshDomain(RulerDomain());
  const send = useRemeshSend();
  const origin = useRemeshQuery(rulerDomain.query.OriginQuery());
  const scale = useRemeshQuery(rulerDomain.query.ScaleQuery());

  const updateOrigin = useCallback((newOrigin: IRulerOrigin) => {
    send(rulerDomain.command.UpdateOriginCommand(newOrigin));
  }, [rulerDomain.command, send]);

  const updateScale = useCallback((newScale: number) => {
    send(rulerDomain.command.UpdateScaleCommand(newScale));
  }, [rulerDomain.command, send]);

  return {
    origin, scale, updateOrigin, updateScale,
  };
}
