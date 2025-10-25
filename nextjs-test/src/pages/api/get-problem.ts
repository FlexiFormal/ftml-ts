import { NextApiRequest, NextApiResponse } from "next";
import quizData from "./quiz02.json";
import { FTML } from "@flexiformal/ftml";
import { QuizProblem } from "@flexiformal/ftml-backend";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const problemIdx = req.query.problemIdx as string;
  let idx = parseInt(problemIdx);
  if (isNaN(idx)) idx = 0;

  const problem = (quizData.elements?.[idx] as unknown as QuizProblem);

  res.status(200).json({ problem, solution: quizData.solutions?.[problem.uri as keyof typeof quizData.solutions] });
}
