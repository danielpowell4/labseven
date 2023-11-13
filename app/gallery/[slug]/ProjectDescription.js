import { remark } from "remark";
import html from "remark-html";

export default async function ProjectDescription({ project }) {
  if (!project.description) return null;

  const processedContent = await remark()
    .use(html)
    .process(project.description);
  const contentHtml = processedContent.toString();

  return <div dangerouslySetInnerHTML={{ __html: contentHtml }} />;
}
