import { ExportOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';

import { ScreenContext } from './screen-context';

interface IOptionExportProps {

}

export const OptionExport: React.FC<IOptionExportProps> = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const screen = useContext(ScreenContext);

  return (
    <div className="flex items-center justify-center">
      <ExportOutlined />
      <span className="ml-2">导出</span>
    </div>
  );
};
