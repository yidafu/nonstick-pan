import {
  IComponent, IComponentNode, IPanComponentConfig,
} from '@pan/common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function mergeConfig(componentConfig: IComponent, _panConfig: IPanComponentConfig) {
  return componentConfig;
}

export function computeStyle(config: IComponentNode) {
  return {
    width: config.width,
    height: config.height,
    top: config.offsetY,
    left: config.offsetX,
    zIndex: config.zIndex,
  };
}
