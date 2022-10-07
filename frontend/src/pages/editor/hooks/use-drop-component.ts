import { useDrop } from 'react-dnd';

import { ReactDndTypes } from '../constants';
import { useUpdateComponent } from './use-update-component';
import { useComponentsData } from './useComponentsData';
import { IComponentDragData } from './use-drag-component';

export function useDropCompnent() {
  const updateComponent = useUpdateComponent();
  const componentList = useComponentsData();
  return useDrop<IComponentDragData>({
    accept: ReactDndTypes.Component,
    drop(item, monitor) {
      // @see https://github.com/react-dnd/react-dnd/issues/151
      const delta = monitor.getDifferenceFromInitialOffset();
      const sourceComponent = componentList.find((component) => component.id === item.id);
      if (sourceComponent && delta) {
        console.log(delta);
        updateComponent(item.id, {
          offsetX: sourceComponent.offsetX + delta.x,
          offsetY: sourceComponent.offsetY + delta.y,
        });
      }
    },
    collect(monitor) {
      return { isOver: monitor.isOver() };
    },
  });
}
