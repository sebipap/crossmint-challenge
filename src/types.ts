import { COLORS, DIRECTIONS, SEPARATOR } from "./constants";

type Separator = typeof SEPARATOR;
type Cometh = `${Uppercase<Direction>}${Separator}COMETH`;
type Soloon = `${Uppercase<Color>}${Separator}SOLOON`;
type Row = AstralObject[];

export type Direction = (typeof DIRECTIONS)[number];
export type Color = (typeof COLORS)[number];
export type AstralObject = "SPACE" | "POLYANET" | Cometh | Soloon;
export type GoalResponse = {
  goal: Row[];
};
export type Coordinates = {
  row: number;
  column: number;
};
export type AstralObjectProperties = {
  polyanets: {};
  comeths: { direction: Direction };
  soloons: { color: Color };
};

export function isCometh(astralObject: AstralObject): astralObject is Cometh {
  return astralObject.endsWith("COMETH");
}

export function isSoloon(astralObject: AstralObject): astralObject is Soloon {
  return astralObject.endsWith("SOLOON");
}
