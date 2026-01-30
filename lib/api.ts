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
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdoc"))
    .map((fileName) => {
    const id = fileName.replace(/\.(md|mdoc)$/, "");
    const fullPath = path.join(contentDirectory, collection, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Normalize date: use data.date, or data.dateString (for timeline), or fallback to current date
    const date = data.date || data.dateString || new Date().toISOString().split('T')[0];

    return {
      id,
      ...data,
      date,
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
  const mdPath = path.join(contentDirectory, collection, `${slug}.md`);
  const mdocPath = path.join(contentDirectory, collection, `${slug}.mdoc`);
  
  let fullPath = mdPath;
  if (fs.existsSync(mdocPath)) {
    fullPath = mdocPath;
  } else if (!fs.existsSync(mdPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Normalize date: use data.date, or data.dateString (for timeline), or fallback to current date
  const date = data.date || data.dateString || new Date().toISOString().split('T')[0];

  return {
    id: slug,
    ...data,
    date,
    content,
  } as Post;
}
