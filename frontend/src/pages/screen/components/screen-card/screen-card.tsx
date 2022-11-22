import { EditOutlined } from '@ant-design/icons';
import { IScreen } from '@pan/common';
import { Button } from 'antd';
import React from 'react';

import { Link } from 'react-router-dom';

import { MoreOption } from './more-option';

import { ScreenContext } from './screen-context';

// eslint-disable-next-line import/extensions
import defaultSnapshot from '@/assets/snapshot.png';

import { gUrl } from '@/utils';

interface IScreenCardProps {
  screen: IScreen,
}

export const ScreenCard: React.FC<IScreenCardProps> = function (props) {
  const { screen } = props;
  return (
    <ScreenContext.Provider
      value={screen}
    >
      <div
        className="h-48 m-5 border border-white border-solid rounded w-60"
      >
        <div
          className="flex items-center justify-center h-3/4"
        >
          <img
            src={defaultSnapshot}
            alt="大屏截图"
          />
        </div>
        <div
          className="flex items-center justify-between px-2 p-bg-action h-1/4"
        >
          <span>{screen.name}</span>
          <div>
            <Link
              to={gUrl(`/editor/${screen.id}`)}
            >
              <Button
                className="mr-2"
                icon={<EditOutlined />}
              />
            </Link>
            <MoreOption />
          </div>
        </div>
      </div>
    </ScreenContext.Provider>

  );
};
