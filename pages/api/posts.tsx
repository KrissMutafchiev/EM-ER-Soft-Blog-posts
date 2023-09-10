import path from "path";
import { promises as fs } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), "json");
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      jsonDirectory + "/blog.json",
      "utf8"
    );

    const posts:Array<Post> = JSON.parse(fileContents).posts;

    const { page, limit, term, category } = req.query;

    let filteredPosts:Array<Post> = [...posts];

    if (category) {
      const searchCat = Number(category);
      filteredPosts = filteredPosts.filter((post: any) =>
        post.categories.some((categoryId: number) => categoryId === searchCat)
      );
    }

    if (term) {
      const searchTerm = (term as string).toLowerCase();
      filteredPosts = filteredPosts.filter((post: any) =>
        post.title.toLowerCase().includes(searchTerm)
      );
    }

    if (page && limit) {
      const pageNumber = Number(page);
      const itemsPerPageCount = Number(limit);
      const startIndex = (pageNumber - 1) * itemsPerPageCount;
      const endIndex = startIndex + itemsPerPageCount;
      filteredPosts = filteredPosts.slice(startIndex, endIndex);
    }
    res.status(200).json(filteredPosts);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
