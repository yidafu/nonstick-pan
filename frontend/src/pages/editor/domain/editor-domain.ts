import {
  IComponent, IScreen,
} from '@pan/common';
import { Remesh } from 'remesh';

import {
  getComponentByScreen, getScreen, updateComponent,
} from '@/api';
import { ListResourceModule } from '@/domain/list-resource-module';
import { ResourceModule } from '@/domain/resource-module';

export const EditorDomain = Remesh.domain({
  name: 'EditorDomain',
  impl(domain) {
    const ScreenResourceModule = ResourceModule<number, IScreen>(domain, {
      name: 'EditorScreenResourceModule',
      fetch(screenId) {
        return getScreen(screenId);
      },
      default: {} as IScreen,
    });
    const ComponentsListResourceModule = ListResourceModule<number, IComponent>(domain, {
      name: 'EditorComponentsListResourceModule',
      default: [],
      fetch(screenId) {
        return getComponentByScreen(screenId);
      },
      update(id, data) {
        return updateComponent(id as string, data);
      },
      isEqual(_a: R, _b: R): boolean {
        return false;
      },
    });

    return {
      query: {
        ScreenResourceQuery: ScreenResourceModule.query.ResourceQuery,
        IsScreenLoadingQuery: ScreenResourceModule.query.LoadingQuery,

        ComponentsQuery: ComponentsListResourceModule.query.ResourceQuery,
        IsComponentsLoadingQuery: ComponentsListResourceModule.query.LoadingQuery,
      },
      command: {
        FetchSingleScreenCommand: ScreenResourceModule.command.FetchCommand,
        FetchComponentsCommand: ComponentsListResourceModule.command.FetchCommand,

        UpdateSingleComponentCommand: ComponentsListResourceModule.command.UpdateSingleCommand,
      },
    };
  },
});
