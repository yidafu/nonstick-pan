import { IComponent } from '@pan/common';

import { GET } from './base';

export function getComponentByScreen(screenId: number) {
  return GET<IComponent[]>(`/screen/${screenId}/components`);
}
