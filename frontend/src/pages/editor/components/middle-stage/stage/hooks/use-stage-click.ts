import {
  RefObject, useEffect,
} from 'react';

// import { EStageSelectedType } from '@/pages/editor/domain/stage-select-module';
import { useSelectStage } from '@/pages/editor/hooks';

export function useStageClick(refStageContainer: RefObject<HTMLDivElement>) {
  const { resetSelect } = useSelectStage();
  useEffect(() => {
    if (!refStageContainer.current) return () => {};
    const $div = refStageContainer.current;

    function handleStageClick() {
      resetSelect();
      // if (evt.target) {
      //   const target = evt.target as HTMLDivElement;
      //   const selectedElementType = target.dataset.eType;
      //   switch (selectedElementType) {
      //     case EStageSelectedType.Component: {
      //       const comId = target.dataset.cId;
      //       updateSelectedComponent(Number(comId));
      //       break;
      //     }
      //     case EStageSelectedType.Group: {
      //       const comId = target.dataset.cId;
      //       updateSelectedGroup([Number(comId)]);
      //       break;
      //     }
      //     default: {
      //       resetSelect();
      //     }
      //   }
      // }
    }
    $div.addEventListener('click', handleStageClick);

    return () => {
      $div.removeEventListener('click', handleStageClick);
    };
  }, [refStageContainer, resetSelect]);
}
