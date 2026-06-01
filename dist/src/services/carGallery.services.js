import { db } from "../lib/prisma.js";
import fs from "fs";
import path from "path";
import "dotenv/config";
import { deleteWebDavFile } from "../utils/webdavDeleteFile.js";
const getFileUrl = (file) => file ? `${process.env.HOST_URL}/images/${file.filename}` : null;
export class CarGalleryService {
    // --- GET ALL ---
    static async getAll() {
        return await db.carGallery.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                carGalleryId: true,
                carGalleryEn: true,
            },
        });
    }
    // --- GET BY ID ---
    static async getById(id) {
        const data = await db.carGallery.findUnique({
            where: { id },
            include: {
                carGalleryId: true,
                carGalleryEn: true,
            },
        });
        if (!data)
            throw new Error("Car not found");
        return data;
    }
    // --- CREATE ---
    static async create(data, file) {
        const car_image = getFileUrl(file);
        if (!car_image)
            throw new Error("Car Image is required");
        return await db.carGallery.create({
            data: {
                car_image,
                carGalleryId: {
                    create: {
                        title: data.title,
                        desc: data.desc,
                    },
                },
                carGalleryEn: {
                    create: {
                        title: data.title_en,
                        desc: data.desc_en,
                    },
                },
            },
        });
    }
    // --- UPDATE ---
    static async update(id, data, file) {
        const existing = await this.getById(id); // Cek existensi
        let car_image = existing.car_image;
        // Jika ada upload file baru
        if (file) {
            deleteWebDavFile(existing.car_image, "images"); // Hapus file lama
            car_image = getFileUrl(file); // Set file baru
        }
        return await db.carGallery.update({
            where: { id },
            data: {
                car_image,
                carGalleryId: {
                    update: {
                        title: data.title,
                        desc: data.desc,
                    },
                },
                carGalleryEn: {
                    update: {
                        title: data.title_en,
                        desc: data.desc_en,
                    },
                },
            },
            include: { carGalleryId: true, carGalleryEn: true },
        });
    }
    // --- DELETE ---
    static async delete(id) {
        const existing = await this.getById(id);
        // Hapus File Fisik
        deleteWebDavFile(existing.car_image, "images");
        // Hapus Database (Cascade delete anak-anaknya otomatis via Prisma relation)
        return await db.carGallery.delete({ where: { id } });
    }
}
//# sourceMappingURL=carGallery.services.js.map