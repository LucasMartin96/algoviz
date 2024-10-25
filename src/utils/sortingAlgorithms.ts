//TODO: necesito testeos sobre estos algo y ver puntos de optimizacion
export interface SortingStep {
  array: number[];
  comparing: number[];
  sortedIndices: number[];
}

export const bubbleSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const sortedIndices: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        sortedIndices: [...sortedIndices],
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        steps.push({
          array: [...arr],
          comparing: [j, j + 1],
          sortedIndices: [...sortedIndices],
        });
      }
    }
    sortedIndices.unshift(n - i - 1);
  }

  sortedIndices.unshift(0);

  steps.push({
    array: arr,
    comparing: [],
    sortedIndices: sortedIndices,
  });

  return steps;
};

export const quickSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const sortedIndices: number[] = [];

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        comparing: [j, high],
        sortedIndices: [...sortedIndices],
      });

      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          comparing: [i, j],
          sortedIndices: [...sortedIndices],
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      comparing: [i + 1, high],
      sortedIndices: [...sortedIndices],
    });

    return i + 1;
  };

  const quickSortHelper = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      sortedIndices.push(pi);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, arr.length - 1);
  steps.push({
    array: arr,
    comparing: [],
    sortedIndices: Array.from({ length: arr.length }, (_, i) => i),
  });

  return steps;
};

export const mergeSort = (array: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const sortedIndices: number[] = [];

  const merge = (left: number, middle: number, right: number) => {
    const leftArray = arr.slice(left, middle + 1);
    const rightArray = arr.slice(middle + 1, right + 1);
    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArray.length && j < rightArray.length) {
      steps.push({
        array: [...arr],
        comparing: [left + i, middle + 1 + j],
        sortedIndices: [...sortedIndices],
      });

      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;

      steps.push({
        array: [...arr],
        comparing: [],
        sortedIndices: [...sortedIndices],
      });
    }

    while (i < leftArray.length) {
      arr[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < rightArray.length) {
      arr[k] = rightArray[j];
      j++;
      k++;
    }

    for (let idx = left; idx <= right; idx++) {
      if (!sortedIndices.includes(idx)) {
        sortedIndices.push(idx);
      }
    }
  };

  const mergeSortHelper = (left: number, right: number) => {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      mergeSortHelper(left, middle);
      mergeSortHelper(middle + 1, right);
      merge(left, middle, right);
    }
  };

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    array: arr,
    comparing: [],
    sortedIndices: Array.from({ length: arr.length }, (_, i) => i),
  });

  return steps;
};
