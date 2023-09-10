import path from "path";
import { promises as fs } from "fs";
import { Cotegory } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "json");
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory + "/blog.json", "utf8");

  if (fileContents) {
    const categories: Array<Cotegory> = JSON.parse(fileContents).categories;
    res.status(200).json(categories);
  }
  res.status(500).send({ message: "Files is not readed !!!" });
}
