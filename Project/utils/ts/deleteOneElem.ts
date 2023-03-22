export default function deleteOneElem<T>(arr: T[], index: number) {
  arr.splice(index, 1);
  return arr;
}
