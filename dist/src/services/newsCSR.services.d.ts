import type { NewsCSRCreateInput, NewsCSRUpdateInput } from "../models/newsCSR.models.js";
export declare class NewsCSRServices {
    static create(data: NewsCSRCreateInput, imageFiles: Express.Multer.File[], authorImageFile?: Express.Multer.File): Promise<{
        newsCSRImage: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            newsCSRId: string;
            image: string;
            description_id: string | null;
            description_en: string | null;
        }[];
        newsCSRId: {
            id: string;
            title: string | null;
            description: string | null;
            newsCSRId: string;
            content: string | null;
        } | null;
        newsCSREn: {
            id: string;
            title: string | null;
            description: string | null;
            newsCSRId: string;
            content: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
    }>;
    static getAll(): Promise<({
        newsCSRImage: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            newsCSRId: string;
            image: string;
            description_id: string | null;
            description_en: string | null;
        }[];
        newsCSRId: {
            id: string;
            title: string | null;
            description: string | null;
            newsCSRId: string;
            content: string | null;
        } | null;
        newsCSREn: {
            id: string;
            title: string | null;
            description: string | null;
            newsCSRId: string;
            content: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
    })[]>;
    static getById(id: string): Promise<{
        newsCSRImage: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            newsCSRId: string;
            image: string;
            description_id: string | null;
            description_en: string | null;
        }[];
        newsCSRId: {
            id: string;
            title: string | null;
            description: string | null;
            newsCSRId: string;
            content: string | null;
        } | null;
        newsCSREn: {
            id: string;
            title: string | null;
            description: string | null;
            newsCSRId: string;
            content: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
    }>;
    static update(id: string, data: NewsCSRUpdateInput, newImageFiles: Express.Multer.File[], authorImageFile?: Express.Multer.File): Promise<{
        newsCSRImage: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            newsCSRId: string;
            image: string;
            description_id: string | null;
            description_en: string | null;
        }[];
        newsCSRId: {
            id: string;
            title: string | null;
            description: string | null;
            newsCSRId: string;
            content: string | null;
        } | null;
        newsCSREn: {
            id: string;
            title: string | null;
            description: string | null;
            newsCSRId: string;
            content: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
    }>;
    static delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
    }>;
    static togglePublish(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
    }>;
}
//# sourceMappingURL=newsCSR.services.d.ts.map