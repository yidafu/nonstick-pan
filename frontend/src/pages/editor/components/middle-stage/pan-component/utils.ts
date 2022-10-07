import {
  IComponent, IComponentNode, IPanComponentConfig,
} from '@pan/common';

export function mergeConfig(componentConfig: IComponent, panConfig: IPanComponentConfig) {
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
