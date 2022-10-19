import {
  IComponent, IScreen,
} from '@pan/common';
import { Remesh } from 'remesh';

import {
  getComponentByScreen, getScreen, updateComponent,
} from '@/api';
import { ListResourceModule } from '@/domain/list-resource-module';
import { ResourceModule } from '@/domain/resource-module';

export interface ICooridinate {
  x: number,
  y: number,
}

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

    const UpdateScaleCenterEvent = domain.event<[ICooridinate, ICooridinate]>({ name: 'UpdateScaleCenterEvent' });

    const ScaleCenterState = domain.state<ICooridinate>({
      name: 'ScaleCenterState',
      default: {
        x: 0, y: 0,
      },
    });
    const ScaleCenterQuery = domain.query({
      name: 'ScaleCenterQuery',
      impl: ({ get }) => get(ScaleCenterState()),
    });
    const OneComponentQuery = domain.query({
      name: 'OneComponentQuery',
      impl: ({ get }, comId: string) => {
        const components = get(ComponentsListResourceModule.query.ResourceQuery());
        return components.find((c) => c.id === comId) ?? null;
      },
    });

    const UpdateScaleCenterCommand = domain.command({
      name: 'UpdateScaleCenterCommand',
      impl: ({ get }, center: ICooridinate) => [
        UpdateScaleCenterEvent([get(ScaleCenterState()), center]),
        ScaleCenterState().new(center),
      ],
    });

    return {
      query: {
        ScreenResourceQuery: ScreenResourceModule.query.ResourceQuery,
        IsScreenLoadingQuery: ScreenResourceModule.query.LoadingQuery,

        ComponentsQuery: ComponentsListResourceModule.query.ResourceQuery,
        OneComponentQuery,
        IsComponentsLoadingQuery: ComponentsListResourceModule.query.LoadingQuery,

        ScaleCenterQuery,
      },
      command: {
        FetchSingleScreenCommand: ScreenResourceModule.command.FetchCommand,
        FetchComponentsCommand: ComponentsListResourceModule.command.FetchCommand,

        UpdateSingleComponentCommand: ComponentsListResourceModule.command.UpdateSingleCommand,

        UpdateScaleCenterCommand,
      },

      event: { UpdateScaleCenterEvent },
    };
  },
});
