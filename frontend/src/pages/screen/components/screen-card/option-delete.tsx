import { DeleteOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';

import { ScreenContext } from './screen-context';

interface IOptionDeleteProps {

}

export const OptionDelete: React.FC<IOptionDeleteProps> = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const screen = useContext(ScreenContext);

  return (
    <div
      className="flex items-center justify-center"
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
