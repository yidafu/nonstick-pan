import {
  useCallback, useEffect,
} from 'react';
import {
  useRemeshSend, useRemeshDomain, useRemeshQuery,
} from 'remesh-react';

import { toFixed } from '@/utils';

import {
  STAGE_DEFAULT_PADDING, STAGE_RULRE_WIDTH,
} from '../constants';

import { EditorDomain } from '../domain';
import { ICooridinate } from '../domain/editor-domain';

import { useRuler } from './use-ruler';
import { useScreenData } from './use-screen-data';

export function useStageScale(): [ICooridinate, (center: ICooridinate) => void] {
  const {
    width = 1920, height = 1080,
  } = useScreenData();
  const {
    scale, updateOrigin,
  } = useRuler();

  const send = useRemeshSend();
  const editorDomain = useRemeshDomain(EditorDomain());

  const scaleCenter = useRemeshQuery(editorDomain.query.ScaleCenterQuery());

  const setScaleCenter = useCallback((center: ICooridinate) => {
    send(editorDomain.command.UpdateScaleCenterCommand(center));
  }, [editorDomain.command, send]);

  useEffect(() => {
    // 缩放后真实的像素偏差
    const originX = toFixed(scaleCenter.x - (width * scale) / 2, 3); // + STAGE_DEFAULT_PADDING;
    const originY = toFixed(scaleCenter.y - (height * scale) / 2, 3); // + STAGE_DEFAULT_PADDING;

    updateOrigin({
      x: originX + STAGE_DEFAULT_PADDING - STAGE_RULRE_WIDTH,
      y: originY + STAGE_DEFAULT_PADDING - STAGE_RULRE_WIDTH,
    });
  }, [height, scale, scaleCenter, updateOrigin, width]);

  return [scaleCenter, setScaleCenter];
}
