export type AlgorithmType = 'bubble' | 'quick' | 'merge';

export interface SortingStep {
  array: number[];
  comparing: number[];
  sortedIndices: number[];
}
