import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import EditorPage from '@/pages/editor';
import NotFound from '@/pages/not-found';
import ScreenPage from '@/pages/screen';
import { gUrl } from '@/utils';

export interface IAppRoute {
  path: string;
  index?: boolean;
  component?: ReactNode;
}

export const router: IAppRoute[] = [
  {
    path: '/',
    component: <Navigate to={gUrl('/screens')} replace />,
  },
  {
    index: true,
    path: gUrl('/screens'),
    component: <ScreenPage />,
  },
  {
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
