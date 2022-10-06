import {
  IComponent, IComponentNode,
} from '@pan/common';

import { useComponentsData } from './useComponentsData';

function toComonentNode(component: IComponent): IComponentNode {
  return {
    ...component, children: [],
  };
}

function buildComponentTree(components: IComponent[]): IComponentNode[] {
  const componentNodes = components.map(toComonentNode);
  const roots = componentNodes
    .filter((c) => c.groupId === '0');

  const idStack = roots.map((r) => r.id);
  while (idStack.length) {
    const nodeId = idStack.pop();
    const node = componentNodes.find((n) => n.id === nodeId);
    // eslint-disable-next-line no-continue
    if (!node) continue;
    const childNodes = componentNodes.filter((n) => n.groupId === nodeId);
    node.children.push(...childNodes);
    idStack.push(...childNodes.map((n) => n.id));
  }
  return roots;
}

export function useComponents() {
  const components = useComponentsData();

  const componentTree = buildComponentTree(components);

  return { componentTree };
}
