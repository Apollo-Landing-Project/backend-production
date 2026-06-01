import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
    const news = await prisma.newsNews.findFirst({ orderBy: { publishedAt: 'desc' } });
    console.log(news);
}
main().catch(console.error).finally(() => prisma.$disconnect());
