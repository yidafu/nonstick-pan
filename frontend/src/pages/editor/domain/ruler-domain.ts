import { Remesh } from 'remesh';

import { STAGE_DEFAULT_PADDING } from '../constants';

export interface IRulerCooridinate {
  x: number,
  y: number,
}

export const RulerDomain = Remesh.domain({
  name: 'EditorRulerDomain',
  impl(domain) {
    const UpdateOriginEvent = domain.event<[IRulerCooridinate, IRulerCooridinate]>({ name: 'UpdateOriginEvent' });
    const UpdateScaleEvent = domain.event<[number, number]>({ name: 'UpdateScaleEvent' });

    const ScaleState = domain.state({
      name: 'ScaleState',
      default: 1,
    });

    const OriginState = domain.state<IRulerCooridinate>({
      name: 'OriginState',
      default: {
        x: STAGE_DEFAULT_PADDING, y: STAGE_DEFAULT_PADDING,
      },
    });

    const UpdateScaleCommand = domain.command({
      name: 'UpdateScaleCommand',
      impl: ({ get }, scale: number) => [
        UpdateScaleEvent([get(ScaleState()), scale]),
        ScaleState().new(scale),
      ],
    });

    const UpdateOriginCommand = domain.command({
      name: 'UpdateOriginCommand',
      impl: ({ get }, origin: IRulerCooridinate) => [
        UpdateOriginEvent([get(OriginState()), origin]),
        OriginState().new(origin),
      ],
    });

    const ScaleQuery = domain.query({
      name: 'ScaleQuery',
      impl: ({ get }) => get(ScaleState()),
    });

    const OriginQuery = domain.query({
      name: 'OriginQuery',
      impl: ({ get }) => get(OriginState()),
    });

    return {
      query: {
        OriginQuery,
        ScaleQuery,
      },
      command: {
        UpdateOriginCommand,
        UpdateScaleCommand,
      },
      event: {
        UpdateOriginEvent,
        UpdateScaleEvent,
      },
    };
  },
});
