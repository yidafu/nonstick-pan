import { Remesh } from 'remesh';

import { STAGE_DEFAULT_PADDING } from '../components/middle-stage/constants';

export interface IRulerOrigin {
  x: number,
  y: number,
}

export const RulerDomain = Remesh.domain({
  name: 'EditorRulerDomain',
  impl(domain) {
    const UpdateOriginEvent = domain.event<IRulerOrigin>({ name: 'UpdateOriginEvent' });
    const UpdateScaleEvent = domain.event<number>({ name: 'UpdateScaleEvent' });

    const ScaleState = domain.state({
      name: 'ScaleState',
      default: 1,
    });

    const OriginState = domain.state<IRulerOrigin>({
      name: 'OriginState',
      default: {
        x: STAGE_DEFAULT_PADDING, y: STAGE_DEFAULT_PADDING,
      },
    });

    const UpdateScaleCommand = domain.command({
      name: 'UpdateScaleCommand',
      impl: (_ctx, scale: number) => [
        ScaleState().new(scale),
        UpdateScaleEvent(scale),
      ],
    });

    const UpdateOriginCommand = domain.command({
      name: 'UpdateOriginCommand',
      impl: (_ctx, origin: IRulerOrigin) => [
        OriginState().new(origin),
        UpdateOriginEvent(origin),
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
