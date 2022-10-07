import { useDrag } from 'react-dnd';

import { ReactDndTypes } from '../constants';

export interface IComponentDragData {
  id: string;
}

export function useDragComponent(id: string, canDrag = false) {
  return useDrag<IComponentDragData>({
    type: ReactDndTypes.Component,
    item: { id },
    canDrag,
    collect(monitor) {
      return { isDragging: monitor.isDragging() };
    },
  });
}
