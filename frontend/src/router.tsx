import { ReactNode } from 'react';

import EditorPage from '@/pages/editor';
import NotFound from '@/pages/not-found';
import ScreenPage from '@/pages/screen';
import { generateUrl } from '@/utils';

export interface IAppRoute {
  path: string;
  index?: boolean;
  component: ReactNode;
}

export const router: IAppRoute[] = [
  {
    index: true,
    path: generateUrl('/screen'),
    component: <ScreenPage />,
  },
  {
    path: generateUrl('/editor/:screenId'),
    component: <EditorPage />,
  },

  {
    path: '*',
    component: <NotFound />,
  },
];
