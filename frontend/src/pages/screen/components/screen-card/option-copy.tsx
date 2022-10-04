import { CopyOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';

import { ScreenContext } from './screen-context';

interface IOptionCopyProps {

}

export const OptionCopy: React.FC<IOptionCopyProps> = function (props) {
  const screen = useContext(ScreenContext);

  function handleCopyScren() {
    console.log(screen);
  }

  return (
    <div
      className="flex justify-center items-center"
      onClick={handleCopyScren}
    >
      <CopyOutlined />
      <span
        className="ml-2"
      >
        复制
      </span>
    </div>
  );
};
