import { GraphNode } from './types';
import { aStar } from './utils';

export * from './types';
export * from './utils';

const NODE_IDS = {
  N0: '0',
  N1: '1',
  N2: '2',
  N3: '3',
  N4: '4',
  N5: '5',
  N6: '6',
};

const n0: GraphNode = {
  id: NODE_IDS.N0,
  estimatedCostToGoal: 9,
  neighbors: [
    { node: NODE_IDS.N1, cost: { costFromParent: 3, estimatedCostToGoal: 2 } },
    { node: NODE_IDS.N2, cost: { costFromParent: 4, estimatedCostToGoal: 2 } },
    { node: NODE_IDS.N3, cost: { costFromParent: 4, estimatedCostToGoal: 2 } },
  ],
};
const n1: GraphNode = {
  id: '1',
  estimatedCostToGoal: 5,
  neighbors: [
    { node: NODE_IDS.N5, cost: { costFromParent: 7, estimatedCostToGoal: 5 } },
  ],
};
const n2: GraphNode = {
  id: '2',
  estimatedCostToGoal: 2,
  neighbors: [
    { node: NODE_IDS.N4, cost: { costFromParent: 3, estimatedCostToGoal: 2 } },
  ],
};
const n3: GraphNode = {
  id: '3',
  estimatedCostToGoal: 5,
  neighbors: [
    { node: NODE_IDS.N4, cost: { costFromParent: 3, estimatedCostToGoal: 2 } },
  ],
};
const n4: GraphNode = {
  id: '4',
  estimatedCostToGoal: 2,
  neighbors: [
    { node: NODE_IDS.N6, cost: { costFromParent: 3, estimatedCostToGoal: 2 } },
  ],
};
const n5: GraphNode = {
  id: '5',
  estimatedCostToGoal: 2,
  neighbors: [
    { node: NODE_IDS.N6, cost: { costFromParent: 4, estimatedCostToGoal: 2 } },
  ],
};
const n6: GraphNode = {
  id: '6',
  estimatedCostToGoal: 0,
  neighbors: [
  ],
};

console.log(aStar(Array.of(n0, n1, n2, n3, n4, n5, n6), n0, n6));
console.log(aStar(Array.of(n0, n1, n2, n3, n4, n5, n6), n3, n6));
console.log(aStar(Array.of(n0, n1, n2, n3, n4, n5, n6), n1, n6));
