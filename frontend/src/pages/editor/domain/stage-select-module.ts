import {
  RemeshDomainContext, Remesh, DomainConceptName,
} from 'remesh';

/**
 * Capitalize is a helper type to constraint the name should start with upper case.
 */
export type StageSelectModuleOptions = {
  name: DomainConceptName<'StageSelectModule'>
  // fetch: (arg: P) => Promise<R>;
  // default: R,
};

export enum EStageSelectedType {
  Component = 'component',
  Group = 'group',
  Stage = 'stage',
}

/**
 * StageSelectModule is a module for text.
 * Receiving a domain as fixed argument, you can use it in any domain by passing domain as argument.
 * The second argument is your custom options.
 */
export const StageSelectModule = (
  domain: RemeshDomainContext,
  options: StageSelectModuleOptions,
) => {
  const SelectedTypeState = domain.state({
    name: `${options.name}.SelectedTypeState`,
    default: EStageSelectedType.Stage,
  });

  const SelectComponentIdListState = domain.state<string[]>({
    name: `${options.name}.SelectComponentIdsState`,
    default: [],
  });

  const UpdateSelectedComponentCommand = domain.command({
    name: `${options.name}.UpdateSelectedComponentCommand`,
    impl: (_, comId: string) => [
      SelectedTypeState().new(EStageSelectedType.Component),
      SelectComponentIdListState().new([comId]),
    ],
  });

  const ResetStageSelectCommand = domain.command({
    name: `${options.name}.ResetSelectCommand`,
    impl: () => [
      SelectedTypeState().new(EStageSelectedType.Stage),
      SelectComponentIdListState().new([]),
    ],
  });

  const UpdateSelectedGroupCommand = domain.command({
    name: `${options.name}.UpdateSelectedGroupCommand`,
    impl: (_, comIds: string[]) => [
      SelectedTypeState().new(EStageSelectedType.Component),
      SelectComponentIdListState().new(comIds),
    ],
  });

  const SelectedTypeQuery = domain.query({
    name: `${options.name}.StageSelectTypeQuery`,
    impl: ({ get }) => get(SelectedTypeState()),
  });

  const SelectComIdListQuery = domain.query({
    name: `${options.name}.SelectComIdListQuery`,
    impl: ({ get }) => get(SelectComponentIdListState()),
  });

  return Remesh.module({
    query: {
      SelectedTypeQuery, SelectComIdListQuery,
    },
    command: {
      UpdateSelectedGroupCommand,
      ResetStageSelectCommand,
      UpdateSelectedComponentCommand,
    },
  });
};
