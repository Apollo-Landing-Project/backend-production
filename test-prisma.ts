import { db } from "./src/lib/prisma.js"

async function main() {
  const news = await db.newsNews.findFirst({
    where: { report_id: { not: null } },
  })
  console.log("News with report:", news ? news.id : "None")
  if (news) {
    console.log("Report ID:", news.report_id)
  }
}
main()
