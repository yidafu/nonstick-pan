import { IComponent } from '@pan/common';

import {
  GET, PATCH,
} from './base';

export function getComponentByScreen(screenId: number) {
  return GET<IComponent[]>(`/screen/${screenId}/components`);
}

export function updateComponent(componentId: string, data: Partial<IComponent>) {
  return PATCH<IComponent>(`/component/${componentId}`, data);
}
