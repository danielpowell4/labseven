import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import toPlainText from "remark-plain-text";

const locationsDirectory = path.join(process.cwd(), "app/locations/");

export async function getLocationData(slug) {
  const fullPath = path.join(locationsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const plainDescription = await remark()
    .use(toPlainText)
    .process(matterResult.content);
  let description = plainDescription.toString();
  if (description.length > 120) {
    description = `${description.slice(0, 117)}...`;
  }

  // Combine the data with the id and contentHtml
  return {
    slug,
    contentHtml,
    description,
    ...matterResult.data,
  };
}
