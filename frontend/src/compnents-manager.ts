import { PanComponentManager } from '@pan/common';
import {
  PanBlankBorder, PanEchartBar,
} from '@pan/store';

export const panComponentManager = PanComponentManager.init();

panComponentManager.register(PanBlankBorder);
panComponentManager.register(PanEchartBar);

window.ComponentManager = panComponentManager;

export { panComponentManager as ComponentManager };
