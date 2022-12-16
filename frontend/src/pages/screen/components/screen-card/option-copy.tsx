import { CopyOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';

import { ScreenContext } from './screen-context';

interface IOptionCopyProps {

}

export const OptionCopy: React.FC<IOptionCopyProps> = function OptionCopy() {
  const screen = useContext(ScreenContext);

  function handleCopyScren() {
    console.log(screen);
  }

  return (
    <div className="flex items-center justify-center" onClick={handleCopyScren}>
      <CopyOutlined />
      <span className="ml-2">复制</span>
    </div>
  );
};
