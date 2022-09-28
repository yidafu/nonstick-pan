import { IScreen } from '@pan/common';

import { GET } from './base';

export function getAllScreen() {
  return GET<IScreen[]>('/screen/all');
}
