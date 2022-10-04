import {
  ExclamationCircleOutlined, UserOutlined, PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button, Dropdown, Menu, MenuProps,
} from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';

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
    <div
      className="flex h-16 p-block justify-between"
    >
      <div
        className="w-50 flex items-center"
      >
        <Button
          className="mx-2"
          icon={(
            <PlusCircleOutlined
              size={20}
            />
)}
        >
          新建大屏
        </Button>
      </div>

      <div
        className="flex items-center justify-end"
      >
        <Button
          className="mx-2"
          type="text"
        >
          <ExclamationCircleOutlined
            size={20}
          />
        </Button>
        <div
          className="ml-2 mr-10"
        >
          <Dropdown
            overlay={(
              <Menu
                items={menuItems}
              />
)}
          >
            <UserOutlined
              size={20}
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
