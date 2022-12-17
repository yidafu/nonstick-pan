import {
  InputNumber, message,
} from 'antd';
import React, {
  useCallback, useContext,
} from 'react';

import { ComponentContext } from '../../../component-context';
import { useUpateCompoent } from '../hooks';

interface ISizeAndOffsetProps {

}

export const SizeAndOffset: React.FC<ISizeAndOffsetProps> = function SizeAndOffset() {
  const componentData = useContext(ComponentContext);
  const {
    width = 100, height = 100, offsetX = 0, offsetY = 0,
  } = componentData ?? {};

  const updateComponent = useUpateCompoent();
  const handleUpdateComponent = useCallback((prop: string) => (val: number | null) => {
    if (componentData) {
      if (val !== null) {
        updateComponent(componentData.id, { [prop]: val });
      } else {
        message.warn(`${prop} 不能为空`);
      }
    }
  }, [componentData, updateComponent]);
  return (
    <div className="p-1">
      <div className="flex justify-around my-2">
        <div className="flex items-center w-40 mx-1">
          <span className="w-8 text-right mr-2">宽度</span>
          <InputNumber value={width} onChange={handleUpdateComponent('width')} />
        </div>

        <div className="flex items-center w-40 mx-1">
          <span className="w-8 text-right mr-2">高度</span>
          <InputNumber value={height} onChange={handleUpdateComponent('height')} />
        </div>
      </div>

      <div className="flex justify-around my-2">
        <div className="flex items-center w-40 mx-1">
          <span className="w-8 text-right mr-2">X</span>
          <InputNumber value={offsetX} onChange={handleUpdateComponent('offsetX')} />
        </div>

        <div className="flex items-center w-40 mx-1">
          <span className="w-8 text-right mr-2">Y</span>
          <InputNumber value={offsetY} onChange={handleUpdateComponent('offsetY')} />
        </div>
      </div>
    </div>
  );
};
