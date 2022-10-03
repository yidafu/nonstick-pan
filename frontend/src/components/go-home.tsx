import {
  HomeOutlined,
} from '@ant-design/icons';
import {
  Button,
} from 'antd';
import React from 'react';
import {
  Link,
} from 'react-router-dom';

import {
  gUrl,
} from '@/utils';

interface IGoHomeProps {

}

export const GoHome: React.FC<IGoHomeProps> = function (props) {
  return (
    <Link
      to={gUrl('/screens')}
    >
      <Button
        icon={<HomeOutlined />}
      />
    </Link>
  );
};
