import { EditOutlined } from '@ant-design/icons';
import { IScreen } from '@pan/common';
import { Button } from 'antd';
import React from 'react';

import { Link } from 'react-router-dom';

import { gUrl } from '@/utils';

import { MoreOption } from './more-option';

import { ScreenContext } from './screen-context';

import defaultSnapshot from '@/assets/snapshot.png';

interface IScreenCardProps {
  screen: IScreen,
}

export const ScreenCard: React.FC<IScreenCardProps> = function (props) {
  const { screen } = props;
  return (
    <ScreenContext.Provider value={screen}>
      <div className="w-60 h-48 border-solid border border-white m-5 rounded">
        <div className="h-3/4 flex justify-center items-center">
          <img src={defaultSnapshot} alt="大屏截图" />
        </div>
        <div className="p-bg-action px-2 h-1/4 flex justify-between items-center">
          <span>{screen.name}</span>
          <div>
            <Link to={gUrl(`/edtior/${screen.id}`)}>
              <Button className="mr-2" icon={<EditOutlined />} />
            </Link>
            <MoreOption screeId={screen.id} />
          </div>
        </div>
      </div>
    </ScreenContext.Provider>

  );
};
