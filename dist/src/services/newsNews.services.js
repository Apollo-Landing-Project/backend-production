import { db } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import { envConfig } from "../config/env.config.js";
import { deleteWebDavFile } from "../utils/webdavDeleteFile.js";
const getFileUrl = (file, folder = "images") => file ? `${envConfig.host_url}/${folder}/${file.filename}` : null;
const normalizeTitle = (value) => {
    if (typeof value !== "string")
        return null;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
};
export class NewsNewsServices {
    static async create(data, imageFile, authorImageFile, reportFile) {
        const titleId = normalizeTitle(data.title);
        const titleEn = normalizeTitle(data.title_en);
        if (!titleId)
            throw new Error("Title (ID) is required");
        if (!titleEn)
            throw new Error("Title (EN) is required");
        const image = getFileUrl(imageFile, "images");
        const author_image = getFileUrl(authorImageFile, "images");
        const reportFileUrl = getFileUrl(reportFile, "images");
        // Check for duplicate titles
        const existingId = await db.newsNewsId.findFirst({
            where: { title: titleId },
        });
        if (existingId)
            throw new Error("Title (ID) already exists in news");
        const existingReportId = await db.report.findFirst({
            where: { title_id: titleId },
        });
        if (existingReportId)
            throw new Error("Title (ID) already exists in reports");
        const existingEn = await db.newsNewsEn.findFirst({
            where: { title: titleEn },
        });
        if (existingEn)
            throw new Error("Title (EN) already exists in news");
        const existingReportEn = await db.report.findFirst({
            where: { title_en: titleEn },
        });
        if (existingReportEn)
            throw new Error("Title (EN) already exists in reports");
        return await db.newsNews.create({
            data: {
                image,
                author: data.author ?? null,
                author_image,
                isPublished: data.isPublished ?? true,
                ...(reportFileUrl && data.reportCategoryId ? {
                    report: {
                        create: {
                            title_id: titleId,
                            title_en: titleEn,
                            description_id: data.description ?? null,
                            description_en: data.description_en ?? null,
                            publish_at: new Date(),
                            is_publish: data.isPublished ?? true,
                            file_url: reportFileUrl,
                            original_filename: reportFile?.originalname ?? null,
                            reportCategoryId: data.reportCategoryId,
                        }
                    }
                } : {}),
                newsNewsId: {
                    create: {
                        title: titleId,
                        description: data.description ?? null,
                        content: data.content,
                    },
                },
                newsNewsEn: {
                    create: {
                        title: titleEn,
                        description: data.description_en ?? null,
                        content: data.content_en,
                    },
                },
            },
            include: {
                newsNewsId: true,
                newsNewsEn: true,
                report: true,
            },
        });
    }
    static async getAll() {
        return await db.newsNews.findMany({
            orderBy: { publishedAt: "desc" },
            include: {
                newsNewsId: true,
                newsNewsEn: true,
                report: true,
            },
        });
    }
    static async getById(id) {
        const data = await db.newsNews.findUnique({
            where: { id },
            include: {
                newsNewsId: true,
                newsNewsEn: true,
                report: true,
            },
        });
        if (!data)
            throw new Error("News not found");
        return data;
    }
    static async update(id, data, imageFile, authorImageFile, reportFile) {
        const titleId = data.title === undefined ? undefined : normalizeTitle(data.title);
        const titleEn = data.title_en === undefined ? undefined : normalizeTitle(data.title_en);
        const existing = await db.newsNews.findUnique({ where: { id }, include: { report: true } });
        if (!existing)
            throw new Error("News not found");
        // Handle main image
        let newImage = existing.image;
        if (data.image_status === "change") {
            deleteWebDavFile(existing.image, "images");
            newImage = getFileUrl(imageFile, "images");
        }
        // Handle author image
        let newAuthorImage = existing.author_image;
        if (data.author_image_status === "change") {
            deleteWebDavFile(existing.author_image, "images");
            newAuthorImage = getFileUrl(authorImageFile, "images");
        }
        else if (data.author_image_status === "remove") {
            deleteWebDavFile(existing.author_image, "images");
            newAuthorImage = null;
        }
        // Handle report
        let reportUpdateData = undefined;
        let oldReportIdToDelete = null;
        let oldReportFileUrlToDelete = null;
        if (data.report_status === "change" && reportFile && data.reportCategoryId) {
            const reportFileUrl = getFileUrl(reportFile, "images");
            if (existing.report_id) {
                deleteWebDavFile(existing.report?.file_url ?? null, "files");
                reportUpdateData = {
                    update: {
                        title_id: titleId ?? existing.report?.title_id,
                        title_en: titleEn ?? existing.report?.title_en,
                        description_id: data.description !== undefined ? data.description : existing.report?.description_id,
                        description_en: data.description_en !== undefined ? data.description_en : existing.report?.description_en,
                        file_url: reportFileUrl,
                        original_filename: reportFile.originalname,
                        reportCategoryId: data.reportCategoryId,
                    }
                };
            }
            else {
                reportUpdateData = {
                    create: {
                        title_id: titleId ?? "",
                        title_en: titleEn ?? "",
                        description_id: data.description ?? null,
                        description_en: data.description_en ?? null,
                        publish_at: existing.publishedAt,
                        is_publish: data.isPublished ?? existing.isPublished,
                        file_url: reportFileUrl,
                        original_filename: reportFile.originalname,
                        reportCategoryId: data.reportCategoryId,
                    }
                };
            }
        }
        else if (data.report_status === "remove" && existing.report_id) {
            oldReportIdToDelete = existing.report_id;
            oldReportFileUrlToDelete = existing.report?.file_url ?? null;
            reportUpdateData = { disconnect: true };
        }
        else if (data.report_status === "keep" && existing.report_id) {
            // Just update report metadata if fields changed
            reportUpdateData = {
                update: {
                    title_id: titleId ?? undefined,
                    title_en: titleEn ?? undefined,
                    description_id: data.description !== undefined ? (data.description ?? null) : undefined,
                    description_en: data.description_en !== undefined ? (data.description_en ?? null) : undefined,
                    ...(data.reportCategoryId ? { reportCategoryId: data.reportCategoryId } : {}),
                }
            };
        }
        // Check for duplicate titles (excluding current news)
        if (titleId) {
            const duplicateId = await db.newsNewsId.findFirst({
                where: {
                    title: titleId,
                    newsNewsId: { not: id },
                },
            });
            if (duplicateId)
                throw new Error("Title (ID) already exists in news");
            const duplicateReportId = await db.report.findFirst({
                where: {
                    title_id: titleId,
                    NOT: { id: existing.report_id ?? "" },
                },
            });
            if (duplicateReportId)
                throw new Error("Title (ID) already exists in reports");
        }
        if (titleEn) {
            const duplicateEn = await db.newsNewsEn.findFirst({
                where: {
                    title: titleEn,
                    newsNewsId: { not: id },
                },
            });
            if (duplicateEn)
                throw new Error("Title (EN) already exists in news");
            const duplicateReportEn = await db.report.findFirst({
                where: {
                    title_en: titleEn,
                    NOT: { id: existing.report_id ?? "" },
                },
            });
            if (duplicateReportEn)
                throw new Error("Title (EN) already exists in reports");
        }
        const updatedNews = await db.newsNews.update({
            where: { id },
            data: {
                image: newImage,
                author: data.author ?? null,
                author_image: newAuthorImage,
                ...(data.isPublished !== undefined ?
                    { isPublished: data.isPublished }
                    : {}),
                ...(reportUpdateData ? { report: reportUpdateData } : {}),
                newsNewsId: {
                    update: {
                        ...(titleId ? { title: titleId } : {}),
                        ...(data.description !== undefined ? { description: data.description } : {}),
                        ...(data.content !== undefined ? { content: data.content } : {}),
                    },
                },
                newsNewsEn: {
                    update: {
                        ...(titleEn ? { title: titleEn } : {}),
                        ...(data.description_en !== undefined ? { description: data.description_en } : {}),
                        ...(data.content_en !== undefined ? { content: data.content_en } : {}),
                    },
                },
            },
            include: {
                newsNewsId: true,
                newsNewsEn: true,
                report: true,
            },
        });
        if (oldReportIdToDelete) {
            deleteWebDavFile(oldReportFileUrlToDelete, "files");
            await db.report.delete({ where: { id: oldReportIdToDelete } });
        }
        return updatedNews;
    }
    static async delete(id) {
        const existing = await db.newsNews.findUnique({ where: { id }, include: { report: true } });
        if (!existing)
            throw new Error("News not found");
        // Delete image files
        deleteWebDavFile(existing.image, "images");
        deleteWebDavFile(existing.author_image, "images");
        let reportIdToDelete = null;
        if (existing.report_id) {
            reportIdToDelete = existing.report_id;
            deleteWebDavFile(existing.report?.file_url ?? null, "files");
        }
        const result = await db.newsNews.delete({ where: { id } });
        if (reportIdToDelete) {
            try {
                await db.report.delete({ where: { id: reportIdToDelete } });
            }
            catch (err) {
                console.error("Failed to delete associated report:", err);
            }
        }
        return result;
    }
    static async togglePublish(id) {
        const existing = await db.newsNews.findUnique({ where: { id } });
        if (!existing)
            throw new Error("News not found");
        return await db.newsNews.update({
            where: { id },
            data: { isPublished: !existing.isPublished },
        });
    }
    static async uploadContentImage(file) {
        const url = getFileUrl(file, "images");
        if (!url)
            throw new Error("File upload failed");
        return { url };
    }
}
//# sourceMappingURL=newsNews.services.js.map