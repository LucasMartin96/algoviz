import { GraphData } from './dijkstra';

// TODO: Por ahora funciona, pero me gustaria poder generar grafos mas complejos y no solo eso si no que sea posible seleccionar la forma del grafo, o cuantos nodos etc.
export function generateRandomGraph(nodeCount: number = 6): GraphData {
  const getRandomPosition = () => ({
    x: Math.floor(Math.random() * 1000) + 100,
    y: Math.floor(Math.random() * 400) + 100,
  });

  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: String.fromCharCode(65 + i),
    ...getRandomPosition(),
  }));

  const edges = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      source: nodes[i].id,
      target: nodes[i + 1].id,
      weight: Math.floor(Math.random() * 9) + 1,
    });
  }

  const additionalEdgesCount = Math.floor(nodeCount * 0.5);
  for (let i = 0; i < additionalEdgesCount; i++) {
    const sourceIndex = Math.floor(Math.random() * nodes.length);
    let targetIndex: number = -1;

    do {
      targetIndex = Math.floor(Math.random() * nodes.length);
    } while (
      targetIndex === sourceIndex ||
      edges.some(
        (edge) =>
          (edge.source === nodes[sourceIndex].id &&
            edge.target === nodes[targetIndex].id) ||
          (edge.source === nodes[targetIndex].id &&
            edge.target === nodes[sourceIndex].id)
      )
    );

    edges.push({
      source: nodes[sourceIndex].id,
      target: nodes[targetIndex].id,
      weight: Math.floor(Math.random() * 9) + 1,
    });
  }

  return { nodes, edges };
}
