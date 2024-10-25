export type Algorithm = {
  name: string;
  status: 'available' | 'coming-soon';
};

export const pathfindingAlgorithms: Algorithm[] = [
  { name: "Dijkstra's Algorithm", status: 'available' },
  { name: 'A* Algorithm', status: 'coming-soon' },
  { name: 'BFS & DFS', status: 'coming-soon' },
];

export const sortingAlgorithms: Algorithm[] = [
  { name: 'Bubble Sort', status: 'available' },
  { name: 'Quick Sort', status: 'available' },
  { name: 'Merge Sort', status: 'available' },
];

export const otherAlgorithms: Algorithm[] = [
  { name: 'Binary Search', status: 'coming-soon' },
  { name: 'Graph Traversal', status: 'coming-soon' },
];
