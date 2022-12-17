import {
  RefObject, useEffect,
} from 'react';

import { toFixed } from '@/utils';

import {
  STAGE_DEFAULT_PADDING, STAGE_RULRE_WIDTH,
} from '../constants';

import { useRuler } from './use-ruler';

export function useMoveStage(stageRef: RefObject<HTMLDivElement>) {
  const { updateOrigin } = useRuler();

  useEffect(() => {
    const $stage = stageRef.current;
    if (!$stage) return () => {};

    let canMoveStage = false;
    const startPosition = {
      offsetX: 0,
      offsetY: 0,
    };

    function handleMouseDown(evt: MouseEvent) {
      canMoveStage = true;
      $stage!.style.cursor = 'grab';
      startPosition.offsetX = evt.clientX;
      startPosition.offsetY = evt.clientY;
    }

    function handleMouseMove(evt: MouseEvent) {
      if (!canMoveStage) return () => {};

      const [, scale, translateX, translateY] = /scale\(([\d\\.]+)\)\s+translate\(([-\d\\.]+)px,\s+([-\d\\.]+)px/.exec($stage!.style.transform) ?? [];
      if (scale === undefined || translateX === undefined || translateY === undefined) {
        return;
      }

      const offsetX = evt.clientX - startPosition.offsetX;
      const offsetY = evt.clientY - startPosition.offsetY;

      startPosition.offsetX = evt.clientX;
      startPosition.offsetY = evt.clientY;

      const stageOffsetX = toFixed(Number(translateX) + offsetX / Number(scale), 3);
      const stageOffsetY = toFixed(Number(translateY) + offsetY / Number(scale), 3);

      updateOrigin({
        x: Number(translateX) * Number(scale) + offsetX + STAGE_DEFAULT_PADDING - STAGE_RULRE_WIDTH,
        y: Number(translateY) * Number(scale) + offsetY + STAGE_DEFAULT_PADDING - STAGE_RULRE_WIDTH,
      });

      $stage!.style.transform = `scale(${scale}) translate(${stageOffsetX}px, ${stageOffsetY}px)`;
    }

    function handleMouseUp() {
      $stage!.style.cursor = 'pointer';
      canMoveStage = false;
    }

    $stage.addEventListener('mousedown', handleMouseDown);
    $stage.addEventListener('mousemove', handleMouseMove);
    $stage.addEventListener('mouseup', handleMouseUp);

    return () => {
      $stage.removeEventListener('mousedown', handleMouseDown);
      $stage.removeEventListener('mousemove', handleMouseMove);
      $stage.removeEventListener('mouseup', handleMouseUp);
    };
  }, [stageRef, updateOrigin]);
}
