export interface Node {
  id: string;
  x: number;
  y: number;
}

export interface Edge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

export interface StepData {
  currentNode: string;
  distances: { [key: string]: number };
  previous: { [key: string]: string | null };
  visited: Set<string>;
}

//TODO: Necesito hacer algunos test para esta implementacion
// TODO: Optimizar esot?
export function dijkstraWithSteps(
  graph: GraphData,
  start: string,
  end: string
): {
  path: string[];
  steps: StepData[];
  hasPath: boolean;
} {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const unvisited = new Set<string>();
  const steps: StepData[] = [];
  graph.nodes.forEach((node) => {
    distances[node.id] = node.id === start ? 0 : Infinity;
    previous[node.id] = null;
    unvisited.add(node.id);
  });

  while (unvisited.size > 0) {
    const current = Array.from(unvisited).reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode
    );

    if (distances[current] === Infinity) {
      return { path: [], steps, hasPath: false };
    }
    steps.push({
      currentNode: current,
      distances: { ...distances },
      previous: { ...previous },
      visited: new Set(
        graph.nodes.map((n) => n.id).filter((id) => !unvisited.has(id))
      ),
    });

    if (current === end) break;

    unvisited.delete(current);
    const edges = graph.edges.filter(
      (edge) => edge.source === current || edge.target === current
    );

    for (const edge of edges) {
      const neighbor = edge.source === current ? edge.target : edge.source;
      if (!unvisited.has(neighbor)) continue;

      const newDistance = distances[current] + edge.weight;
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = current;
      }
    }
  }

  const path: string[] = [];
  let current = end;
  while (current) {
    path.unshift(current);
    current = previous[current] || '';
  }
  const hasPath = path[0] === start && path[path.length - 1] === end;

  return {
    path: hasPath ? path : [],
    steps,
    hasPath,
  };
}

export function getShortestPathEdges(path: string[]): Edge[] {
  const pathEdges: Edge[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    pathEdges.push({
      source: path[i],
      target: path[i + 1],
      weight: 0,
    });
  }
  return pathEdges;
}

export function calculatePathWithViaNodes(
  graph: GraphData,
  start: string,
  end: string,
  viaNodes: string[]
): {
  path: string[];
  steps: StepData[];
  hasPath: boolean;
} {
  let currentPath: string[] = [];
  let allSteps: StepData[] = [];
  let currentStart = start;
  const nodesToVisit = [...viaNodes, end];
  let hasValidPath = true;

  for (const nextTarget of nodesToVisit) {
    const result = dijkstraWithSteps(graph, currentStart, nextTarget);

    if (result.path.length === 0) {
      hasValidPath = false;
      break;
    }

    if (currentPath.length > 0 && result.path.length > 0) {
      result.path.shift();
    }

    currentPath = [...currentPath, ...result.path];
    allSteps = [...allSteps, ...result.steps];
    currentStart = nextTarget;
  }

  return {
    path: hasValidPath ? currentPath : [],
    steps: allSteps,
    hasPath: hasValidPath,
  };
}
