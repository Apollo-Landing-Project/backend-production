import "dotenv/config";
import type { ServicePageInput } from "../models/servicePage.models.js";
export declare class ServicePageService {
    static getAll(): Promise<({
        servicePageId: {
            id: string;
            servicePageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            used_car_gallery_badge: string | null;
            used_car_gallery_title: string | null;
            used_car_gallery_desc: string | null;
        } | null;
        servicePageEn: {
            id: string;
            servicePageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            used_car_gallery_badge: string | null;
            used_car_gallery_title: string | null;
            used_car_gallery_desc: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    })[]>;
    static getById(id: string): Promise<{
        servicePageId: {
            id: string;
            servicePageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            used_car_gallery_badge: string | null;
            used_car_gallery_title: string | null;
            used_car_gallery_desc: string | null;
        } | null;
        servicePageEn: {
            id: string;
            servicePageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            used_car_gallery_badge: string | null;
            used_car_gallery_title: string | null;
            used_car_gallery_desc: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    }>;
    static create(data: ServicePageInput, file?: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    }>;
    static update(id: string, data: ServicePageInput, file?: Express.Multer.File): Promise<{
        servicePageId: {
            id: string;
            servicePageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            used_car_gallery_badge: string | null;
            used_car_gallery_title: string | null;
            used_car_gallery_desc: string | null;
        } | null;
        servicePageEn: {
            id: string;
            servicePageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            used_car_gallery_badge: string | null;
            used_car_gallery_title: string | null;
            used_car_gallery_desc: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    }>;
    static toggleActive(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    }>;
    static delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    }>;
}
//# sourceMappingURL=servicePage.services.d.ts.map