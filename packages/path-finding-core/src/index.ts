type NodeID = string;

interface GraphNode {
  id: NodeID;
  neighbors: Record<NodeID, GraphNode>;
}

interface State extends GraphNode {
  cost: number;
  estimatedCost: number;
  neighbors: Record<NodeID, State>;
}

const buildPath = (cameFrom: Map<State, State>, current: State): State[] => {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!;
    path.push(current);
  }
  return path;
};

const aStar = (start: State, end: State): State[] | null => {
  const openSet = new Set<State>([start]);
  const cameFrom = new Map<State, State>();

  // Cost from start to node
  const gScore = new Map<State, number>();
  gScore.set(start, 0);

  // Estimated cost from start to end through node
  const fScore = new Map<State, number>();
  fScore.set(start, start.estimatedCost);

  while (openSet.size > 0) {
    const current: State = [...Array.from(openSet)].reduce((a, c) => {
      if (fScore.get(a)! < (fScore.get(c)! || Infinity)) {
        return a;
      }
      return c;
    });

    if (current.id === end.id) {
      return buildPath(cameFrom, current);
    }

    openSet.delete(current);

    for (const [neighborID, neighbor] of Object.entries(current.neighbors)) {
      console.log('neighbor', neighbor.id);
      const tentativeGScore = gScore.get(current)! + neighbor.cost;
      if (tentativeGScore < (gScore.get(neighbor) || Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + neighbor.estimatedCost);
        openSet.add(neighbor);
      }
    }
  }

  return null;
};

const start: State = {
  id: '0',
  cost: 0,
  estimatedCost: 9,
  neighbors: {
    '3': {
      id: '3',
      cost: 2,
      estimatedCost: 5,
      neighbors: {
        '4': {
          id: '4',
          cost: 1,
          estimatedCost: 3,
          neighbors: {
            '6': {
              id: '6',
              cost: 4,
              estimatedCost: 0,
              neighbors: {},
            },
          },
        },
      },
    },
    '2': {
      id: '2',
      cost: 4,
      estimatedCost: 2,
      neighbors: {
        '4': {
          id: '4',
          cost: 2,
          estimatedCost: 3,
          neighbors: {
            '6': {
              id: '6',
              cost: 4,
              estimatedCost: 0,
              neighbors: {},
            },
          },
        },
      },
    },
    '1': {
      id: '1',
      cost: 3,
      estimatedCost: 2,
      neighbors: {
        '5': {
          id: '5',
          cost: 7,
          estimatedCost: 2,
          neighbors: {
            '6': {
              id: '6',
              cost: 4,
              estimatedCost: 0,
              neighbors: {},
            },
          },
        },
      },
    },
  },
};

console.log(aStar(start, { id: '6', cost: 0, estimatedCost: 0, neighbors: {} }));
