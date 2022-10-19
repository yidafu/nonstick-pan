import {
  RefObject, useEffect,
} from 'react';

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

  // TODO: 改成 rxjs
  useEffect(() => {
    if (!canDrag) {
      return;
    }
    const $div = domRef.current;
    if (!$div) return;

    let canMoveComponent = false;
    const mousePostion: IMousePosition = {
      left: 0,
      top: 0,
    };

    function handleMouseDown(evt: MouseEvent) {
      canMoveComponent = true;
      mousePostion.left = evt.clientX;
      mousePostion.top = evt.clientY;
    }

    function handleComponentMove(evt: MouseEvent) {
      if (!canMoveComponent) return;

      const deltaX = evt.clientX - mousePostion.left;
      const deltaY = evt.clientY - mousePostion.top;
      console.log(deltaX, deltaY);
      // 转为舞台的移动距离
    }

    function handleMouseUp(evt: MouseEvent) {
      canMoveComponent = false;
      mousePostion.left = 0;
      mousePostion.top = 0;
    }
    $div.addEventListener('mousedown', handleMouseDown);
    $div.addEventListener('mousemove', handleComponentMove);
    $div.addEventListener('mouseup', handleMouseUp);
    return (): void => {
      $div.removeEventListener('mousedown', handleMouseDown);
      $div.removeEventListener('mousemove', handleComponentMove);
      $div.removeEventListener('mousedown', handleMouseUp);
    };
  }, [canDrag, domRef]);
}
