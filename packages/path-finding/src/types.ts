export type NodeID = string;

export type Cost = {
  costFromParent: number;
  estimatedCostToGoal: number;
};

export type NeighBor = {
  node: NodeID;
  cost: Cost;
};

export type GraphNode = {
  id: NodeID;
  estimatedCostToGoal: number;
  neighbors: NeighBor[];
};
