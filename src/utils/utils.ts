export function arrayEquals(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return (
    arr1.filter((item: string) => arr2.includes(item)).length === arr1.length
  );
}
