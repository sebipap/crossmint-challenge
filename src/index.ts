import addAstralObject from "./services/addAstralObject";
import getGoal from "./services/getGoal";

const goal = await getGoal();
for (let row = 0; row < goal.length; row++) {
  for (let column = 0; column < goal[row].length; column++) {
    const astralObject = goal[row][column];
    if (astralObject === "SPACE") continue;
    await addAstralObject(astralObject, row, column);
  }
}
