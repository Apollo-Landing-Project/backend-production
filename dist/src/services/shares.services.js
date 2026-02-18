import { db } from "../lib/prisma.js";
export class SharesService {
    // --- GET ALL ---
    static async getAll() {
        return await db.shares.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    // --- GET BY ID ---
    static async getById(id) {
        const data = await db.shares.findUnique({ where: { id } });
        if (!data)
            throw new Error("Shares not found");
        return data;
    }
    // --- CREATE ---
    static async create(data) {
        return await db.shares.create({
            data: {
                category: data.category,
                value: data.value,
            },
        });
    }
    // --- UPDATE ---
    static async update(id, data) {
        await this.getById(id); // Ensure exists
        return await db.shares.update({
            where: { id },
            data: {
                category: data.category,
                value: data.value,
            },
        });
    }
    // --- DELETE ---
    static async delete(id) {
        await this.getById(id); // Ensure exists
        return await db.shares.delete({ where: { id } });
    }
}
//# sourceMappingURL=shares.services.js.map