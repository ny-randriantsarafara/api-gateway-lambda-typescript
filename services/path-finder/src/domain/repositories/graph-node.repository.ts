import { GraphNode } from '../entities/graph-node.entity';

export type GetGraphNodes = () => Promise<GraphNode[]>;
export type GetGraphNodeById = (id: string) => Promise<GraphNode | undefined>;
export type CreateGraphNode = (data: GraphNode) => Promise<GraphNode>;
export type UpdateGraphNode = (id: string, data: GraphNode) => Promise<GraphNode | undefined>;
export type DeleteGraphNode = (id: string) => Promise<void>;

export type GraphNodeRepository = {
  getGraphNodes: GetGraphNodes;
  createGraphNode: CreateGraphNode;
  getById: GetGraphNodeById;
  updateGraphNode: UpdateGraphNode;
  deleteGraphNode: DeleteGraphNode;
};
