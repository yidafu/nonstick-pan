
import React from 'react';
import * as ReactIs from 'react-is';
import { IPanComponentConfig } from './pan-component';

export class PanComponentManager {
  static instance: PanComponentManager;

  static init() {
    if (!this.instance) {
      this.instance = new PanComponentManager();
    }
    return this.instance;
  }

  componentConfigMap = new Map<string, IPanComponentConfig>();

  register(config: IPanComponentConfig) {
    this.componentConfigMap.set(config.name, config);
  }

  getComponentConfig(name: string) {
    if (this.componentConfigMap.has(name)) {
      return this.componentConfigMap.get(name)!;
    }
    throw new Error(`Component(${name}) not register`);
  }

  render(name: string) {
    const config = this.getComponentConfig(name);
    if (typeof config.esmUrl === 'string') {
      return React.lazy(() => import(config.esmUrl!));
    }
    if (typeof config.render === 'function') {
      // TODO: 确定默认 props
      return config.render({});
    }
    if (ReactIs.isValidElementType(config.Component)) {
      return React.createElement(config.Component);
    }
  }
}
