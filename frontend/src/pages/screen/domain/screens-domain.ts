import { IScreen } from '@pan/common';
import { Remesh } from 'remesh';

import { getAllScreen } from '@/api';
import { ResourceModule } from '@/domain/resource-module';

export const ScreensDomain = Remesh.domain({
  name: 'ScreensDomain',
  impl(domain) {
    const ScreensResourceModule = ResourceModule<void, IScreen[]>(domain, {
      name: 'HomeScreensResourceModule',
      default: [],
      fetch() {
        return getAllScreen();
      },
    });
    return {
      query: {
        FetchScreensQuery: ScreensResourceModule.query.ResourceQuery,
        LoadingQuery: ScreensResourceModule.query.LoadingQuery,
      },
      command: { FetchScreensCommand: ScreensResourceModule.command.FetchCommand },
    };
  },
});
