import { API_URL, CANDIDATE_ID, SEPARATOR } from "../constants";
import {
  AstralObject,
  AstralObjectProperties,
  Coordinates,
  isCometh,
  isSoloon,
} from "../types";
import lower from "../utils/lower";
import sleep from "../utils/sleep";
import split from "../utils/split";

export default async function addAstralObject(
  astralObject: AstralObject,
  row: number,
  column: number
) {
  if (astralObject === "POLYANET") {
    return addToMegaverse("polyanets", { row, column });
  }
  if (isCometh(astralObject)) {
    const [direction] = split(astralObject, SEPARATOR);
    return addToMegaverse("comeths", {
      row,
      column,
      direction: lower(direction),
    });
  }
  if (isSoloon(astralObject)) {
    const [color] = split(astralObject, SEPARATOR);
    return addToMegaverse("soloons", { row, column, color: lower(color) });
  }
  throw new Error(`Unknown astral object: ${astralObject}`);
}

async function addToMegaverse<
  AstralObject extends keyof AstralObjectProperties
>(
  astralObject: AstralObject,
  body: Coordinates & AstralObjectProperties[typeof astralObject]
) {
  const response = await fetch(`${API_URL}/${astralObject}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      candidateId: CANDIDATE_ID,
      ...body,
    }),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    console.error(
      `Error in ${astralObject}: ${response.status} ${
        response.statusText
      } ${JSON.stringify(responseBody)}`
    );
    await sleep(1000);
    await addToMegaverse(astralObject, body);
  }
  return responseBody;
}
