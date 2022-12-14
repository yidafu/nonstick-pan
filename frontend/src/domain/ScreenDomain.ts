import { IScreen } from '@pan/common';
import { Remesh } from 'remesh';

import { AsyncModule } from 'remesh/modules/async';

import { getAllScreen } from '@/api';

export const ScreenDomain = Remesh.domain({
  name: 'SceenDomain',
  impl(domain) {
    const ScreenListState = domain.state<IScreen[]>({
      name: 'ScreenListState',
      default: [],
    });

    const UpdateScreenListCmd = domain.command({
      name: 'UpdateScreenListCommand',
      impl(_ctx, screens: IScreen[]) {
        return [ScreenListState().new(screens)];
      },
    });
    const AllScreenQuery = domain.query({
      name: 'AllScreenQuery',
      impl({ get }) {
        return get(ScreenListState());
      },
    });

    const AsyncFetchScreenData = AsyncModule<unknown, IScreen[]>(domain, {
      name: 'AsyncFetchScreenDataAsyncModule',
      async load(_ctx) {
        const screens = await getAllScreen();
        return screens;
      },
      onSuccess(_ctx, screens: IScreen[]) {
        return UpdateScreenListCmd(screens);
      },
      onFailed(_ctx, error) {
        console.error(error);
        return UpdateScreenListCmd([]);
      },
    });

    return {
      query: { AllScreenQuery },
      command: { LoadScreen: AsyncFetchScreenData.command.LoadCommand },
    };
  },
});
