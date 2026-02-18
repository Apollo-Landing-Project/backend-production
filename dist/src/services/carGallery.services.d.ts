import "dotenv/config";
import type { CarGalleryInput } from "../models/service.models.js";
export declare class CarGalleryService {
    static getAll(): Promise<({
        carGalleryId: {
            id: string;
            title: string | null;
            desc: string | null;
            carGalleryId: string;
        } | null;
        carGalleryEn: {
            id: string;
            title: string | null;
            desc: string | null;
            carGalleryId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        car_image: string | null;
    })[]>;
    static getById(id: string): Promise<{
        carGalleryId: {
            id: string;
            title: string | null;
            desc: string | null;
            carGalleryId: string;
        } | null;
        carGalleryEn: {
            id: string;
            title: string | null;
            desc: string | null;
            carGalleryId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        car_image: string | null;
    }>;
    static create(data: CarGalleryInput, file?: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        car_image: string | null;
    }>;
    static update(id: string, data: CarGalleryInput, file?: Express.Multer.File): Promise<{
        carGalleryId: {
            id: string;
            title: string | null;
            desc: string | null;
            carGalleryId: string;
        } | null;
        carGalleryEn: {
            id: string;
            title: string | null;
            desc: string | null;
            carGalleryId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        car_image: string | null;
    }>;
    static delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        car_image: string | null;
    }>;
}
//# sourceMappingURL=carGallery.services.d.ts.map