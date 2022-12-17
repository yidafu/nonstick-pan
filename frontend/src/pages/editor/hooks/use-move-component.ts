import {
  RefObject, useEffect,
} from 'react';

import { useRuler } from './use-ruler';

import { useUpdateComponent } from './use-update-component';

export interface IComponentDragData {
  id: string;
}

export interface IMousePosition {
  left: number;
  top: number;
}

export function useDragComponent(domRef: RefObject<HTMLDivElement>, canDrag = false) {
  const updateComponent = useUpdateComponent();
  const { scale } = useRuler();
  // TODO: 改成 rxjs
  useEffect(() => {
    if (!canDrag) {
      return () => {};
    }
    const $container = domRef.current;
    if (!$container) return () => {};

    let canMoveComponent = false;
    const mousePostion: IMousePosition = {
      left: 0,
      top: 0,
    };

    function handleMouseDown(evt: MouseEvent) {
      $container!.style.cursor = 'grab';
      canMoveComponent = true;
      mousePostion.left = evt.clientX;
      mousePostion.top = evt.clientY;
      evt.stopPropagation();
    }

    function handleComponentMove(evt: MouseEvent) {
      if (!canMoveComponent) return;

      const deltaX = evt.clientX - mousePostion.left;
      const deltaY = evt.clientY - mousePostion.top;

      mousePostion.left = evt.clientX;
      mousePostion.top = evt.clientY;

      // 转为舞台的移动距离
      const top = parseFloat($container!.style.top) + deltaY / scale;
      $container!.style.top = `${top}px`;
      const left = parseFloat($container!.style.left) + deltaX / scale;
      $container!.style.left = `${left}px`;
      evt.stopPropagation();
    }

    function handleMouseUp(evt: MouseEvent) {
      $container!.style.cursor = 'pointer';
      canMoveComponent = false;

      const offsetX = parseFloat($container?.style.left!);
      const offsetY = parseFloat($container?.style.top!);
      const componetId = $container?.dataset.cId;
      if (componetId && typeof offsetX === 'number' && typeof offsetY === 'number') {
        updateComponent(componetId, {
          offsetX, offsetY,
        });
      }
      evt.stopPropagation();
    }
    $container.addEventListener('mousedown', handleMouseDown);
    $container.addEventListener('mousemove', handleComponentMove);
    $container.addEventListener('mouseup', handleMouseUp);
    return () => {
      $container.removeEventListener('mousedown', handleMouseDown);
      $container.removeEventListener('mousemove', handleComponentMove);
      $container.removeEventListener('mousedown', handleMouseUp);
    };
  }, [canDrag, domRef, scale, updateComponent]);
}
