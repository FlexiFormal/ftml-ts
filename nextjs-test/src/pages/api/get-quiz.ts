// simple api that reads ./quiz10-new.json and returns it

import { NextApiRequest, NextApiResponse } from "next";
import quizData from "./quiz10.json";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(quizData);
}