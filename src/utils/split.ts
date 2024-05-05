export default function split<Input extends string, Separator extends string>(
  value: Input,
  separator: Separator
) {
  return value.split(
    separator
  ) as Input extends `${infer A}${Separator}${infer B}` ? [A, B] : [Input];
}
