import { IComponent, IScreen } from '@pan/common';
import { Remesh } from 'remesh';

import { getComponentByScreen, getScreen } from '@/api';
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
    const ComponentsResourceModule = ResourceModule<number, IComponent[]>(domain, {
      name: 'EditorComponentsResourceModule',
      default: [],
      fetch(screenId) {
        return getComponentByScreen(screenId);
      },
    });
    return {
      query: {
        ScreenResourceQuery: ScreenResourceModule.query.ResourceQuery,
        IsScreenLoadingQuery: ScreenResourceModule.query.LoadingQuery,

        ComponentsQuery: ComponentsResourceModule.query.ResourceQuery,
        IsComponentsLoadingQuery: ComponentsResourceModule.query.LoadingQuery,
      },
      command: {
        FetchSingleScreenCommand: ScreenResourceModule.command.FetchCommand,
        FetchComponentsCommand: ComponentsResourceModule.command.FetchCommand,
      },
    };
  },
});
