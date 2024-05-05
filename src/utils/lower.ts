export default function lower<S extends string>(string: S) {
  return string.toLowerCase() as Lowercase<S>;
}
