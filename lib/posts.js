import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDir = path.join(process.cwd(), "posts")

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDir)
  const allPostsData = fileNames.map((fileName) => {
    const [id] = fileName.split(".")
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf-8")
    const matterResult = matter(fileContents)
    return {
      id,
      ...matterResult.data,
    }
  })
  return allPostsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDir)
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.split(".")[0],
    },
  }))
}

export async function getPostData(id) {
  const fullPath = path.join(postsDir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf-8")

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
