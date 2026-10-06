import { slides } from "@flexiformal/ftml-backend";
import { NextApiRequest, NextApiResponse } from "next";

const URI =
  "http://mathhub.info?a=courses/FAU/GDI/course&p=course/slides/Folien/00_Organisatorisches&d=content&l=de&e=section";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await slides({ uri: URI });
  res.status(200).json(result);
}
