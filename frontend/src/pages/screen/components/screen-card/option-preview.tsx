import {
  EyeOutlined,
} from '@ant-design/icons';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { ScreenContext } from './screen-context';

import { gUrl } from '@/utils';

interface IOptionCopyProps {

}

export const OptionPreview: React.FC<IOptionCopyProps> = function () {
  const screen = useContext(ScreenContext);

  return (
    <Link to={gUrl(`/preview/${screen.id}`)}>
      <div className="flex justify-center items-center">
        <EyeOutlined />
        <span className="ml-2">预览</span>
      </div>
    </Link>
  );
};
