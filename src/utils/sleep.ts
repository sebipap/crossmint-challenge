export default function sleep(miliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}
