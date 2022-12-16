import { DashOutlined } from '@ant-design/icons';
import {
  Dropdown, Button, Menu,
} from 'antd';
import React, { useContext } from 'react';

import { OptionCopy } from './option-copy';
import { OptionDelete } from './option-delete';
import { OptionExport } from './option-export';
import { OptionPreview } from './option-preview';

import { ScreenContext } from './screen-context';

const MENU_ITEMS = [
  {
    label: (
      <OptionCopy />
    ),
    key: 'copy',
  },
  {
    label: <OptionPreview />,
    key: 'preview',
  },
  {

    label: <OptionExport />,
    key: 'export',
  },
  {

    label: <OptionDelete />,
    key: '删除',
  },
];

interface IMoreOptionProps {
  screeId: number;
}
const MoreMenu = (
  <Menu items={MENU_ITEMS} />
);

export const MoreOption: React.FC<IMoreOptionProps> = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const screen = useContext(ScreenContext);

  return (
    <Dropdown overlay={MoreMenu}>
      <Button icon={<DashOutlined />} />
    </Dropdown>
  );
};
