import {
  ReactNode,
} from 'react';

import EditorPage from '@/pages/editor';
import NotFound from '@/pages/not-found';
import ScreenPage from '@/pages/screen';
import {
  gUrl,
} from '@/utils';

export interface IAppRoute {
  path: string;
  index?: boolean;
  component: ReactNode;
}

export const router: IAppRoute[] = [
  {
    index: true,
    path: gUrl('/screens'),
    component: <ScreenPage />,
  },
  {
    index: true,
    path: gUrl('/templates'),
    component: <ScreenPage />,
  },
  {
    path: gUrl('/editor/:screenId'),
    component: <EditorPage />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];
