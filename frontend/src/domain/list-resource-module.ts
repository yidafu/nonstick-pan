import _merge from 'lodash.merge';
import {
  RemeshDomainContext, Remesh, DomainConceptName,
} from 'remesh';
import {
  from, asyncScheduler, merge,
} from 'rxjs';
import {
  switchMap, throttleTime, catchError, map,
} from 'rxjs/operators';

import { ResourceModule } from './resource-module';

/**
 * Capitalize is a helper type to constraint the name should start with upper case.
 */
export type ListResourceModuleOptions<P, R extends { id: string | number }> = {
  name: DomainConceptName<'ListResourceModule'>
  fetch: (arg: P) => Promise<R[]>;
  update: (id: TIdType, data: Partial<R>) => Promise<R>;
  isEqual: (a: R, b: R) => boolean,
  default: R[],
};

type TIdType = string | number;
/**
 * ListResourceModule is a module for text.
 * Receiving a domain as fixed argument, you can use it in any domain by passing domain as argument.
 * The second argument is your custom options.
 */
export const ListResourceModule = <P, R extends { id: TIdType }>(
  domain: RemeshDomainContext,
  options: ListResourceModuleOptions<P, R>,
) => {
  const UpdateSingleEvent = domain.event<[TIdType, Partial<R>]>({ name: `${options.name}.UpdateSingleEvent` });
  const UpdateSingleSuccessEvent = domain.event<[TIdType, Partial<R>]>({ name: 'UpdateSingleSuccessEvent' });
  const UpdateSingleFailEvent = domain.event<string>({ name: `${options.name}.UpdateSingleFailEvent` });

  const {
    update, isEqual, ...restOption
  } = options;
  const Resource = ResourceModule<P, R[]>(domain, restOption);

  const GetOneResourceByIdQuery = domain.query({
    name: `${options.name}.GetOneResourceByIdQuery`,
    impl: ({ get }, id: string) => {
      const list = get(Resource.query.ResourceQuery());
      return list.find((item) => item.id === id) ?? null;
    },
  });

  const UpdateListResourceCommand = domain.command({
    name: `${options.name}.UpdateListResourceCommand`,
    impl({ get }, [id, partialItem]: [TIdType, Partial<R>]) {
      const list = get(Resource.query.ResourceQuery());
      const newList = list.map((item) => {
        if (item.id === id) {
          return _merge({}, item, partialItem);
        }
        return item;
      });
      return [
        Resource.command.UpdateResourceCommand(newList),
        UpdateSingleSuccessEvent([id, partialItem]),
      ];
    },
  });

  const UpdateSingleCommand = domain.command({
    name: `${options.name}.UpdateSingleCommand`,
    impl(_ctx, [id, partialItem]: [TIdType, Partial<R>]) {
      return [
        UpdateSingleEvent([id, partialItem]),
      ];
    },
  });

  domain.effect({
    name: `${options.name}.UpdateSingleEffect`,
    impl({ fromEvent }) {
      const source = fromEvent(UpdateSingleEvent);

      return merge(
        source.pipe(
        // 先更新本地状态
          map((args) => UpdateListResourceCommand([args[0], { ...args[1] }])),
        ),
        // 延时更新服务断状态
        source
          .pipe(
            throttleTime(1000, asyncScheduler, {
              leading: false, trailing: true,
            }),
            switchMap((args) => from(options.update(...args))),
            // 最后同步服务器状态
            map((data) => UpdateListResourceCommand([data.id, data])),

            catchError(async (err) => UpdateSingleFailEvent(err?.message ?? '更新组件信息失败')),
          ),
      );
    },
  });

  return Remesh.module({
    query: {
      ResourceQuery: Resource.query.ResourceQuery,
      LoadingQuery: Resource.query.LoadingQuery,

      GetOneResourceByIdQuery,
    },
    command: {
      UpdateSingleCommand,
      FetchCommand: Resource.command.FetchCommand,
    },
    event: {
      FetchEvent: Resource.event.FetchEvent,
      FetchSuccessEvent: Resource.event.SuccessEvent,
      ListChangedEvent: Resource.event.ChangedEvent,
      FetchFailedEvent: Resource.event.FailedEvent,
      LoadingStartEvent: Resource.event.LoadingStartEvent,
      LoadingFinishEvent: Resource.event.LoadingFinishEvent,

      UpdateSingleFailEvent,
      UpdateSingleSuccessEvent,
    },
  });
};
