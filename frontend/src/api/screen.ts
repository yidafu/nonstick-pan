import { IScreen } from 'common';

import { GET } from './base';

export function getAllScreen() {
  return GET<IScreen[]>('/screen/all');
}
