import {
  DeleteOutlined,
} from '@ant-design/icons';
import React, {
  useContext,
} from 'react';

import {
  ScreenContext,
} from './screen-context';

interface IOptionDeleteProps {

}

export const OptionDelete: React.FC<IOptionDeleteProps> = function () {
  const screen = useContext(ScreenContext);

  return (
    <div
      className="flex justify-center items-center"
    >
      <DeleteOutlined />
      <span
        className="ml-2"
      >
        删除
      </span>
    </div>
  );
};
