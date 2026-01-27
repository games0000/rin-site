import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getPosts(collection: string) {
  const fullPath = path.join(contentDirectory, collection);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(fullPath);
  const allPosts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(contentDirectory, collection, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id,
      ...data,
      content, // Include the markdown content
    } as unknown as Record<string, unknown>; // More specific type than any
  });

  // Sort posts by date
  return allPosts.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
