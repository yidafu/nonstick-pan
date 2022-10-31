import { PanComponentManager } from './pan-components/pan-component-manager';

declare global {
  interface Window {
    /**
     * 全局大屏组件管理器
     *
     * @type {PanComponentManager}
     * @memberof Window
     */
    ComponentManager: PanComponentManager;
  }

  type Nullable<T> = T | null;

}
