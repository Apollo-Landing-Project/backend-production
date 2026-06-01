import { db } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { deleteWebDavFile } from "../utils/webdavDeleteFile.js";
const getFileUrl = (file) => file ? `${process.env.HOST_URL}/images/${file.filename}` : null;
export class PartnerService {
    // --- GET ALL ---
    static async getAll() {
        return await db.partner.findMany({
            orderBy: { createdAt: "desc" },
        });
    }
    // --- GET BY ID ---
    static async getById(id) {
        const data = await db.partner.findUnique({ where: { id } });
        if (!data)
            throw new Error("Partner not found");
        return data;
    }
    // --- CREATE ---
    static async create(data, file) {
        const logo_image = getFileUrl(file);
        return await db.partner.create({
            data: {
                name: data.name,
                logo_image,
                category: data.category,
            },
        });
    }
    // --- UPDATE ---
    static async update(id, data, file) {
        const existing = await this.getById(id);
        let logo_image = existing.logo_image;
        if (file) {
            deleteWebDavFile(existing.logo_image, "images");
            logo_image = getFileUrl(file);
        }
        return await db.partner.update({
            where: { id },
            data: {
                name: data.name,
                logo_image,
                category: data.category,
            },
        });
    }
    // --- DELETE ---
    static async delete(id) {
        const existing = await this.getById(id);
        deleteWebDavFile(existing.logo_image, "images");
        return await db.partner.delete({ where: { id } });
    }
}
//# sourceMappingURL=partner.services.js.map