import { BlankBorderConfig } from './blank-border';
import { PanComponentManager } from './pan-component-manager';

export const panComponentManager = PanComponentManager.init();

panComponentManager.register(BlankBorderConfig);

window.ComponentManager = panComponentManager;

export { panComponentManager as ComponentManager };
