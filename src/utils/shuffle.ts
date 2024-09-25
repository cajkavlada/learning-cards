export function shuffleArray<T>(array: T[]): T[] {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const iItem = array[i];
    if (iItem && array[j]) {
      [array[i], array[j]] = [array[j], iItem];
    }
  }
  return array;
}
