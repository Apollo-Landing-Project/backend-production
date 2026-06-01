import { db } from "../lib/prisma.js";
import type {
    ReportCategoryCreateInput,
    ReportCategoryUpdateInput,
} from "../models/reportCategory.models.js";

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
    static async create(data: ReportCategoryCreateInput) {
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

    static async getById(id: string) {
        const data = await db.reportCategory.findUnique({
            where: { id },
        });
        if (!data) throw new Error("Category not found");
        return data;
    }

    static async update(id: string, data: ReportCategoryUpdateInput) {
        const existing = await db.reportCategory.findUnique({ where: { id } });
        if (!existing) throw new Error("Category not found");

        return await db.reportCategory.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description ?? null,
            } as any,
        });
    }

    static async delete(id: string) {
        const existing = await db.reportCategory.findUnique({ where: { id } });
        if (!existing) throw new Error("Category not found");

        return await db.reportCategory.delete({
            where: { id },
        });
    }
}
