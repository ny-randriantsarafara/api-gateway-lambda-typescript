import { GraphNode } from './domain/entities/graph-node.entity';
import { Graph } from './domain/entities/graph.entity';

const graph = new Graph();

const computeHeuristic = (a: GraphNode, b: GraphNode) => {
  return 1;
};

graph.addNode(new GraphNode('N0', []));
graph.addNode(new GraphNode('N1', []));
graph.addNode(new GraphNode('N2', []));
graph.addNode(new GraphNode('N3', []));
graph.addNode(new GraphNode('N4', []));
graph.addNode(new GraphNode('N5', []));
graph.addNode(new GraphNode('N6', []));

graph.addEdge('N0', 'N3', 2);
graph.addEdge('N0', 'N2', 4);
graph.addEdge('N0', 'N1', 3);
graph.addEdge('N3', 'N2', 1);
graph.addEdge('N3', 'N4', 1);
graph.addEdge('N2', 'N4', 2);
graph.addEdge('N4', 'N6', 4);
graph.addEdge('N1', 'N5', 7);
graph.addEdge('N5', 'N6', 4);

console.log(graph.findShortestPath('N6', 'N0', computeHeuristic));
console.log(graph.findShortestPath('N0', 'N6', computeHeuristic));
console.log(graph.findShortestPath('N3', 'N2', computeHeuristic));
console.log(graph.findShortestPath('N2', 'N3', computeHeuristic));
console.log(graph.findShortestPath('N3', 'N1', computeHeuristic));
console.log(graph.findShortestPath('N5', 'N3', computeHeuristic));
console.log(graph.findShortestPath('N2', 'N5', computeHeuristic));
