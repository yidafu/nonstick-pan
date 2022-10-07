import {
  RemeshDomainContext, Remesh, RemeshAction, DomainConceptName,
} from 'remesh';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

/**
 * Capitalize is a helper type to constraint the name should start with upper case.
 */
export type ResourceModuleOptions<P, R> = {
  name: DomainConceptName<'ResourceModule'>
  fetch: (arg: P) => Promise<R>;
  default: R,
};

/**
 * ResourceModule is a module for text.
 * Receiving a domain as fixed argument, you can use it in any domain by passing domain as argument.
 * The second argument is your custom options.
 */
export const ResourceModule = <P, R>(
  domain: RemeshDomainContext,
  options: ResourceModuleOptions<P, R>,
) => {
  const FetchEvent = domain.event<P>({ name: `${options.name}.FetchEvent` });
  const LoadingStartEvent = domain.event({ name: `${options.name}.LoadingStartEvent` });
  const LoadingFinishEvent = domain.event({ name: `${options.name}.LoadingFinishEvent` });
  const SuccessEvent = domain.event<P>({ name: `${options.name}.SuccessEvent` });
  const FailedEvent = domain.event<Error>({ name: `${options.name}.FailedEvent` });
  const ChangedEvent = domain.event<[R, R]>({ name: `${options.name}.ChangedEvent` });

  const LoadingState = domain.state({
    name: `${options.name}.LoadingState`,
    default: false,
  });
  const LoadingStartCommand = domain.command({
    name: `${options.name}.LoadingStartCommand`,
    impl: () => [
      LoadingState().new(true),
      LoadingStartEvent(),
    ],
  });

  const LoadingFinishCommand = domain.command({
    name: `${options.name}.LoadingFinishCommand`,
    impl: () => [
      LoadingState().new(false),
      LoadingFinishEvent(),
    ],
  });

  const LoadingQuery = domain.query({
    name: `${options.name}.LoadingQuery`,
    impl: ({ get }) => get(LoadingState()),
  });

  const ResourceDataState = domain.state({
    name: `${options.name}.ResourceState`,
    default: options.default,
  });

  const ResourceQuery = domain.query({
    name: `${options.name}.ResourceQuery`,
    impl: ({ get }) => get(ResourceDataState()),
  });

  const UpdateResourceCommand = domain.command({
    name: `${options.name}.UpdateResourceCommand`,
    impl: ({ get }, data: R) => [
      ChangedEvent([get(ResourceDataState()), data]),
      ResourceDataState().new(data!),
    ],
  });

  const FetchCommand = domain.command({
    name: `${options.name}.FetchCommand`,
    impl: (_ctx, arg: P) => [
      FetchEvent(arg),
      LoadingStartCommand(),
    ],
  });

  const SuccessCommand = domain.command({
    name: `${options.name}.SuccessCommand`,
    impl: (_ctx, [data, arg]: [R, P]) => [
      UpdateResourceCommand(data),
      LoadingFinishCommand(),
      SuccessEvent(arg),
    ],
  });

  const FailCommand = domain.command({
    name: `${options.name}.FailCommand`,
    impl: (_ctx, [err]: [Error, P]) => [
      UpdateResourceCommand(options.default),
      LoadingFinishCommand(),
      FailedEvent(err),
    ],
  });

  domain.effect({
    name: `${options.name}.FetchEffect`,
    impl: ({ fromEvent }) => {
      function fetchResource(arg: P) {
        return new Observable<RemeshAction>((subscriber) => {
          options.fetch(arg)
            .then((data: R) => {
              subscriber.next(SuccessCommand([data, arg]));
              subscriber.complete();
            })
            .catch((err: Error) => {
              subscriber.next(FailCommand([err, arg]));
              subscriber.complete();
            });
        });
      }

      return fromEvent(FetchEvent)
        .pipe(
          switchMap((arg: P) => fetchResource(arg)),
        );
    },
  });

  return Remesh.module({
    query: {
      ResourceQuery, LoadingQuery,
    },
    command: {
      FetchCommand,
      UpdateResourceCommand,
    },
    event: {
      FetchEvent,
      SuccessEvent,
      ChangedEvent,
      FailedEvent,
      LoadingStartEvent,
      LoadingFinishEvent,
    },
  });
};
