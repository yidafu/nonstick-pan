import merge from 'lodash.merge';
import {
  RemeshDomainContext, Remesh, RemeshAction, DomainConceptName,
} from 'remesh';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  const ResourceModuleInst = ResourceModule<P, R[]>(domain, restOption);

  const GetOneResourceByIdQuery = domain.query({
    name: `${options.name}.GetOneResourceByIdQuery`,
    impl: ({ get }, id: string) => {
      const list = get(ResourceModuleInst.query.ResourceQuery());
      return list.find((item) => item.id === id) ?? null;
    },
  });

  const UpdateListResourceCommand = domain.command({
    name: `${options.name}.UpdateListResourceCommand`,
    impl({ get }, [id, partialItem]: [TIdType, Partial<R>]) {
      const list = get(ResourceModuleInst.query.ResourceQuery());
      const newList = list.map((item) => {
        if (item.id === id) {
          return merge({}, item, partialItem);
        }
        return item;
      });
      return [
        ResourceModuleInst.command.UpdateResourceCommand(newList),
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
      return fromEvent(UpdateSingleEvent).pipe(
        switchMap((args) => new Observable<RemeshAction>((subscriber) => {
          options.update(...args)
            .then((data) => {
              subscriber.next(UpdateListResourceCommand([args[0], data]));
              subscriber.complete();
            })
            .catch((err: Error) => {
              subscriber.next(UpdateSingleFailEvent(err?.message ?? `更新组件[${args[0]}]信息失败`));
              subscriber.complete();
            });
        })),
      );
    },
  });

  return Remesh.module({
    query: {
      ResourceQuery: ResourceModuleInst.query.ResourceQuery,
      LoadingQuery: ResourceModuleInst.query.LoadingQuery,

      GetOneResourceByIdQuery,
    },
    command: {
      UpdateSingleCommand,
      FetchCommand: ResourceModuleInst.command.FetchCommand,
    },
    event: {
      FetchEvent: ResourceModuleInst.event.FetchEvent,
      FetchSuccessEvent: ResourceModuleInst.event.SuccessEvent,
      ListChangedEvent: ResourceModuleInst.event.ChangedEvent,
      FetchFailedEvent: ResourceModuleInst.event.FailedEvent,
      LoadingStartEvent: ResourceModuleInst.event.LoadingStartEvent,
      LoadingFinishEvent: ResourceModuleInst.event.LoadingFinishEvent,

      UpdateSingleFailEvent,
      UpdateSingleSuccessEvent,
    },
  });
};
