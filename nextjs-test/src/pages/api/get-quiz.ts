import { NextApiRequest, NextApiResponse } from "next";
import quizData from "./quiz02.json";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(quizData);
}