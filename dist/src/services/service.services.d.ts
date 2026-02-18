import "dotenv/config";
import type { ServiceItemInput } from "../models/service.models.js";
export declare class ServiceItemService {
    static getAll(): Promise<({
        serviceId: {
            email: string[];
            id: string;
            title: string | null;
            desc: string | null;
            serviceId: string;
            badge: string | null;
            desc_sort: string | null;
            location: string | null;
            contact: string[];
            quote: string | null;
        } | null;
        serviceEn: {
            email: string[];
            id: string;
            title: string | null;
            desc: string | null;
            serviceId: string;
            badge: string | null;
            desc_sort: string | null;
            location: string | null;
            contact: string[];
            quote: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        bg_image: string | null;
    })[]>;
    static getById(id: string): Promise<{
        serviceId: {
            email: string[];
            id: string;
            title: string | null;
            desc: string | null;
            serviceId: string;
            badge: string | null;
            desc_sort: string | null;
            location: string | null;
            contact: string[];
            quote: string | null;
        } | null;
        serviceEn: {
            email: string[];
            id: string;
            title: string | null;
            desc: string | null;
            serviceId: string;
            badge: string | null;
            desc_sort: string | null;
            location: string | null;
            contact: string[];
            quote: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        bg_image: string | null;
    }>;
    static create(data: ServiceItemInput, file?: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        bg_image: string | null;
    }>;
    static update(id: string, data: ServiceItemInput, file?: Express.Multer.File): Promise<{
        serviceId: {
            email: string[];
            id: string;
            title: string | null;
            desc: string | null;
            serviceId: string;
            badge: string | null;
            desc_sort: string | null;
            location: string | null;
            contact: string[];
            quote: string | null;
        } | null;
        serviceEn: {
            email: string[];
            id: string;
            title: string | null;
            desc: string | null;
            serviceId: string;
            badge: string | null;
            desc_sort: string | null;
            location: string | null;
            contact: string[];
            quote: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        bg_image: string | null;
    }>;
    static delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        bg_image: string | null;
    }>;
    static toggleActive(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        bg_image: string | null;
    }>;
    static updateOrder(items: {
        id: string;
        order: number;
    }[]): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        order: number;
        bg_image: string | null;
    }[]>;
}
//# sourceMappingURL=service.services.d.ts.map