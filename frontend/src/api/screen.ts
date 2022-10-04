import { IScreen } from '@pan/common';

import { GET } from './base';

export function getAllScreen() {
  return GET<IScreen[]>('/screen/all');
}

export function getScreen(screenId: number) {
  return GET<IScreen>(`/screen/${screenId}`);
}
