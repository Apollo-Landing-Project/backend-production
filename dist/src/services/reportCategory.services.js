import { db } from "../lib/prisma.js";
const DEFAULT_REPORT_CATEGORIES = [
    {
        name: "Annual Report",
        description: "Bootstrap category for local testing.",
    },
    {
        name: "Financial Statements",
        description: "Bootstrap category for local testing.",
    },
];
export class ReportCategoryServices {
    static async create(data) {
        return await db.reportCategory.create({
            data: {
                name: data.name,
                description: data.description ?? null,
            },
        });
    }
    static async getAll() {
        await db.reportCategory.createMany({
            data: DEFAULT_REPORT_CATEGORIES,
            skipDuplicates: true,
        });
        return await db.reportCategory.findMany({
            orderBy: {
                name: "asc",
            },
            include: {
                _count: {
                    select: { reports: true },
                },
            },
        });
    }
    static async getById(id) {
        const data = await db.reportCategory.findUnique({
            where: { id },
        });
        if (!data)
            throw new Error("Category not found");
        return data;
    }
    static async update(id, data) {
        const existing = await db.reportCategory.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Category not found");
        return await db.reportCategory.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description ?? null,
            },
        });
    }
    static async delete(id) {
        const existing = await db.reportCategory.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Category not found");
        return await db.reportCategory.delete({
            where: { id },
        });
    }
}
//# sourceMappingURL=reportCategory.services.js.map