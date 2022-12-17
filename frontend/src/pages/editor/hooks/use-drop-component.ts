import { useDrop } from 'react-dnd';

import { ReactDndTypes } from '../constants';

import { useComponentsData } from './use-components-data';
import { IComponentDragData } from './use-move-component';
import { useUpdateComponent } from './use-update-component';

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
