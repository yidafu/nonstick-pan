import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { gUrl } from '@/utils';

interface ILeftMenuProps {

}
const items = [
  {
    label: <Link
      to={gUrl('/screens')}
    >
      所有大屏
    </Link>,
    key: 'screens',
  }, // 菜单项务必填写 key
  {
    label: <Link
      to={gUrl('/template')}
    >
      所有模板
    </Link>,
    key: 'templates',
  },
];
export const LeftMenu: React.FC<ILeftMenuProps> = function (props) {
  return (
    <div
      className="w-60 p-block h-full"
    >
      <Menu
        items={items}
      />
    </div>
  );
};
