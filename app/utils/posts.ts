import parseFrontMatter from "front-matter";
import fs from "fs/promises";
import path from "path";

export type Post = {
  slug: string;
  title: string;
};

export type PostMarkdownAttributes = {
  title: string;
};

export async function getPosts() {
  const postsPath = await fs.readdir(`${__dirname}/../../blog-posts`, {
    withFileTypes: true,
  });

  const posts = await Promise.all(
    postsPath.map(async (dirent) => {
      const file = await fs.readFile(
        path.join(`${__dirname}/../../blog-posts`, dirent.name)
      );
      const { attributes } = parseFrontMatter(file.toString());
      return {
        slug: dirent.name.replace(/\.mdx/, ""),
        //@ts-ignore
        title: attributes.title,
      };
    })
  );
  return posts;
}
