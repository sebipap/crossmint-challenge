import { API_URL, CANDIDATE_ID } from "../constants";
import { GoalResponse } from "../types";

export default async function getGoal() {
  const response = await fetch(`${API_URL}/map/${CANDIDATE_ID}/goal`);
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error fetching goal map: ${response.status} ${
        response.statusText
      } ${JSON.stringify(responseBody)}`
    );
  }
  const { goal } = responseBody as GoalResponse;
  return goal;
}
