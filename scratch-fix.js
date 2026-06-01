import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
    const reports = await prisma.report.findMany();
    for (const report of reports) {
        if (report.file_url && report.file_url.includes('/api/files/') && report.file_url.includes('image-')) {
            const newUrl = report.file_url.replace('/api/files/', '/api/images/');
            await prisma.report.update({
                where: { id: report.id },
                data: { file_url: newUrl }
            });
            console.log(`Updated ${report.id} to ${newUrl}`);
        }
    }
}
main().catch(console.error).finally(() => prisma.$disconnect());
