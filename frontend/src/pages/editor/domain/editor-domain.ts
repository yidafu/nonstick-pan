import {
  IComponent, IScreen,
} from '@pan/common';
import { Remesh } from 'remesh';

import {
  getComponentByScreen, getScreen, updateComponent,
} from '@/api';
import { ListResourceModule } from '@/domain/list-resource-module';
import { ResourceModule } from '@/domain/resource-module';

import { StageSelectModule } from './stage-select-module';

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
    const ComponentsListResource = ListResourceModule<number, IComponent>(domain, {
      name: 'EditorComponentsListResourceModule',
      default: [],
      fetch(screenId) {
        return getComponentByScreen(screenId);
      },
      update(id, data) {
        return updateComponent(id as string, data);
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      isEqual(_a, _b): boolean {
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

    const UpdateScaleCenterCommand = domain.command({
      name: 'UpdateScaleCenterCommand',
      impl: ({ get }, center: ICooridinate) => [
        UpdateScaleCenterEvent([get(ScaleCenterState()), center]),
        ScaleCenterState().new(center),
      ],
    });

    /* 舞台选择组件相关状态 */
    const PanStageSelectModule = StageSelectModule(domain, { name: 'PanStageSelectModule' });
    return {
      query: {
        ScreenResourceQuery: ScreenResourceModule.query.ResourceQuery,
        IsScreenLoadingQuery: ScreenResourceModule.query.LoadingQuery,

        ComponentsQuery: ComponentsListResource.query.ResourceQuery,
        OneComponentQuery: ComponentsListResource.query.GetOneResourceByIdQuery,
        IsComponentsLoadingQuery: ComponentsListResource.query.LoadingQuery,

        ScaleCenterQuery,
        ...PanStageSelectModule.query,
      },
      command: {
        FetchSingleScreenCommand: ScreenResourceModule.command.FetchCommand,
        FetchComponentsCommand: ComponentsListResource.command.FetchCommand,

        UpdateSingleComponentCommand: ComponentsListResource.command.UpdateSingleCommand,

        UpdateScaleCenterCommand,

        ...PanStageSelectModule.command,
      },

      event: {
        UpdateScaleCenterEvent,
        ...ComponentsListResource.event,
      },
    };
  },
});
