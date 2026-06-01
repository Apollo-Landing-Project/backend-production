import { db } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import { envConfig } from "../config/env.config.js";
import { deleteWebDavFile } from "../utils/webdavDeleteFile.js";
const getFileUrl = (file) => file ? `${envConfig.host_url}/images/${file.filename}` : null;
export class NewsCSRServices {
    static async create(data, imageFiles, authorImageFile) {
        const author_image = getFileUrl(authorImageFile);
        // Build CSR image data with descriptions
        const csrImages = imageFiles.map((file, index) => ({
            image: `${envConfig.host_url}/images/${file.filename}`,
            description_id: data.images_description_id?.[index] ?? null,
            description_en: data.images_description_en?.[index] ?? null,
        }));
        return await db.newsCSR.create({
            data: {
                author: data.author ?? null,
                author_image,
                isPublished: data.isPublished ?? false,
                newsCSRId: {
                    create: {
                        title: data.title,
                        description: data.description ?? null,
                        content: data.content,
                    },
                },
                newsCSREn: {
                    create: {
                        title: data.title_en,
                        description: data.description_en ?? null,
                        content: data.content_en,
                    },
                },
                newsCSRImage: {
                    create: csrImages,
                },
            },
            include: {
                newsCSRId: true,
                newsCSREn: true,
                newsCSRImage: true,
            },
        });
    }
    static async getAll() {
        return await db.newsCSR.findMany({
            orderBy: { publishedAt: "desc" },
            include: {
                newsCSRId: true,
                newsCSREn: true,
                newsCSRImage: true,
            },
        });
    }
    static async getById(id) {
        const data = await db.newsCSR.findUnique({
            where: { id },
            include: {
                newsCSRId: true,
                newsCSREn: true,
                newsCSRImage: true,
            },
        });
        if (!data)
            throw new Error("CSR News not found");
        return data;
    }
    static async update(id, data, newImageFiles, authorImageFile) {
        const existing = await db.newsCSR.findUnique({
            where: { id },
            include: { newsCSRImage: true },
        });
        if (!existing)
            throw new Error("CSR News not found");
        // Handle author image
        let newAuthorImage = existing.author_image;
        if (data.author_image_status === "change") {
            deleteWebDavFile(existing.author_image, "images");
            newAuthorImage = getFileUrl(authorImageFile);
        }
        else if (data.author_image_status === "remove") {
            deleteWebDavFile(existing.author_image, "images");
            newAuthorImage = null;
        }
        // Delete specified images
        const deletedImageIds = data.deleted_image_ids ?? [];
        if (deletedImageIds.length > 0) {
            const imagesToDelete = existing.newsCSRImage.filter((img) => deletedImageIds.includes(img.id));
            for (const img of imagesToDelete) {
                deleteWebDavFile(img.image, "images");
            }
            await db.newsCSRImage.deleteMany({
                where: { id: { in: deletedImageIds } },
            });
        }
        // Add new images
        const newImages = newImageFiles.map((file, index) => ({
            image: `${envConfig.host_url}/images/${file.filename}`,
            description_id: data.images_description_id?.[index] ?? null,
            description_en: data.images_description_en?.[index] ?? null,
            newsCSRId: id,
        }));
        if (newImages.length > 0) {
            await db.newsCSRImage.createMany({ data: newImages });
        }
        // Build update payloads, only including defined fields
        const idUpdate = {};
        if (data.title !== undefined)
            idUpdate.title = data.title;
        if (data.description !== undefined)
            idUpdate.description = data.description;
        if (data.content !== undefined)
            idUpdate.content = data.content;
        const enUpdate = {};
        if (data.title_en !== undefined)
            enUpdate.title = data.title_en;
        if (data.description_en !== undefined)
            enUpdate.description = data.description_en;
        if (data.content_en !== undefined)
            enUpdate.content = data.content_en;
        return await db.newsCSR.update({
            where: { id },
            data: {
                ...(data.author !== undefined ? { author: data.author } : {}),
                author_image: newAuthorImage,
                ...(data.isPublished !== undefined ?
                    { isPublished: data.isPublished }
                    : {}),
                ...(Object.keys(idUpdate).length > 0 ?
                    { newsCSRId: { update: idUpdate } }
                    : {}),
                ...(Object.keys(enUpdate).length > 0 ?
                    { newsCSREn: { update: enUpdate } }
                    : {}),
            },
            include: {
                newsCSRId: true,
                newsCSREn: true,
                newsCSRImage: true,
            },
        });
    }
    static async delete(id) {
        const existing = await db.newsCSR.findUnique({
            where: { id },
            include: { newsCSRImage: true },
        });
        if (!existing)
            throw new Error("CSR News not found");
        // Delete all image files
        deleteWebDavFile(existing.author_image, "images");
        for (const img of existing.newsCSRImage) {
            deleteWebDavFile(img.image, "images");
        }
        // Cascade delete handles relations
        return await db.newsCSR.delete({ where: { id } });
    }
    static async togglePublish(id) {
        const existing = await db.newsCSR.findUnique({ where: { id } });
        if (!existing)
            throw new Error("CSR News not found");
        return await db.newsCSR.update({
            where: { id },
            data: { isPublished: !existing.isPublished },
        });
    }
}
//# sourceMappingURL=newsCSR.services.js.map