import { db } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { deleteWebDavFile } from "../utils/webdavDeleteFile.js";
const getFileUrl = (file) => file ? `${process.env.HOST_URL}/images/${file.filename}` : null;
export class ServiceItemService {
    static async getAll() {
        return await db.service.findMany({
            orderBy: { order: "asc" },
            include: {
                serviceId: true,
                serviceEn: true,
            },
        });
    }
    static async getById(id) {
        const data = await db.service.findUnique({
            where: { id },
            include: { serviceId: true, serviceEn: true },
        });
        if (!data)
            throw new Error("Service not found");
        return data;
    }
    static async create(data, file) {
        const bg_image = getFileUrl(file);
        if (!bg_image)
            throw new Error("Service Image is required");
        const lastItem = await db.service.findFirst({ orderBy: { order: "desc" } });
        const newOrder = (lastItem?.order || 0) + 1;
        return await db.service.create({
            data: {
                bg_image,
                isActive: true,
                order: newOrder,
                serviceId: {
                    create: {
                        desc_sort: data.desc_sort,
                        title: data.title,
                        desc: data.desc,
                        badge: data.badge ?? null,
                        location: data.location,
                        quote: data.quote,
                        contact: data.contact,
                        email: data.email,
                    },
                },
                serviceEn: {
                    create: {
                        desc_sort: data.desc_sort_en,
                        title: data.title_en,
                        desc: data.desc_en,
                        badge: data.badge_en ?? null,
                        location: data.location_en,
                        quote: data.quote_en,
                        contact: data.contact,
                        email: data.email,
                    },
                },
            },
        });
    }
    static async update(id, data, file) {
        const existing = await this.getById(id);
        let bg_image = existing.bg_image;
        if (file) {
            deleteWebDavFile(existing.bg_image, "images");
            bg_image = getFileUrl(file);
        }
        return await db.service.update({
            where: { id },
            data: {
                bg_image,
                serviceId: {
                    update: {
                        desc_sort: data.desc_sort,
                        title: data.title,
                        desc: data.desc,
                        badge: data.badge ?? null,
                        location: data.location,
                        quote: data.quote,
                        contact: data.contact,
                        email: data.email,
                    },
                },
                serviceEn: {
                    update: {
                        desc_sort: data.desc_sort_en,
                        title: data.title_en,
                        desc: data.desc_en,
                        badge: data.badge_en ?? null,
                        location: data.location_en,
                        quote: data.quote_en,
                        contact: data.contact,
                        email: data.email,
                    },
                },
            },
            include: { serviceId: true, serviceEn: true },
        });
    }
    static async delete(id) {
        const existing = await this.getById(id);
        deleteWebDavFile(existing.bg_image, "images");
        return await db.service.delete({ where: { id } });
    }
    static async toggleActive(id) {
        const existing = await db.service.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Service not found");
        return await db.service.update({
            where: { id },
            data: { isActive: !existing.isActive },
        });
    }
    static async updateOrder(items) {
        return await db.$transaction(items.map((item) => db.service.update({
            where: { id: item.id },
            data: { order: item.order },
        })));
    }
}
//# sourceMappingURL=service.services.js.map