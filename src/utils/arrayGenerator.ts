// TODO: Mejorar aca necesito pasarle de cuantos los quiero y de que rango, u n poco mas personalizable
export const generateRandomArray = (
  length: number,
  min: number,
  max: number
): number[] => {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
};

export const generateNearlySortedArray = (
  length: number,
  swaps: number
): number[] => {
  const arr = Array.from({ length }, (_, i) => i + 1);

  for (let i = 0; i < swaps; i++) {
    const idx1 = Math.floor(Math.random() * length);
    const idx2 = Math.floor(Math.random() * length);
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  return arr;
};

export const generateReversedArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => length - i);
};
