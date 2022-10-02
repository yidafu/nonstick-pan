import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Dropdown, Menu,
} from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';

import { GoHome } from '@/components/go-home';

interface ITopMenuProps {

}

const menuItems: ItemType[] = [
  {
    label: '退出登录',
    key: 'logout',
  },
];

export const TopMenu: React.FC<ITopMenuProps> = function () {
  return (
    <div className="flex h-16 py-4 px-8 p-block justify-between">
      <div className="w-1/4">
        <GoHome />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        大屏名称
      </div>
      <div className="w-1/4 flex items-center justify-end">
        <Button className="mx-2" type="text">
          <ExclamationCircleOutlined size={20} />
        </Button>
        <div className="ml-2 mr-10">
          <Dropdown overlay={<Menu items={menuItems} />}>
            <UserOutlined size={20} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
