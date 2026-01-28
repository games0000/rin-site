import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  [key: string]: any;
}

export function getPosts(collection: string): Post[] {
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
    } as Post;
  });

  // Sort posts by date
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(collection: string, slug: string): Post | null {
  const fullPath = path.join(contentDirectory, collection, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id: slug,
    ...data,
    content,
  } as Post;
}
