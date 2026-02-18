import type { NewsPageCreateInput } from "../models/newsPage.models.js";
export declare class NewsPageServices {
    static create(data: NewsPageCreateInput, file_image: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    }>;
    static getAll(): Promise<({
        newsPageEn: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            news_badge: string | null;
            news_title: string | null;
            news_desc: string | null;
            newsPageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            csr_badge: string | null;
            csr_title: string | null;
            csr_desc: string | null;
        } | null;
        newsPageId: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            news_badge: string | null;
            news_title: string | null;
            news_desc: string | null;
            newsPageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            csr_badge: string | null;
            csr_title: string | null;
            csr_desc: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    })[]>;
    static getById(id: string): Promise<{
        newsPageEn: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            news_badge: string | null;
            news_title: string | null;
            news_desc: string | null;
            newsPageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            csr_badge: string | null;
            csr_title: string | null;
            csr_desc: string | null;
        } | null;
        newsPageId: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            news_badge: string | null;
            news_title: string | null;
            news_desc: string | null;
            newsPageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string | null;
            csr_badge: string | null;
            csr_title: string | null;
            csr_desc: string | null;
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
    static delete(id: string): Promise<void>;
    static update(id: string, data: any, file: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    }>;
}
//# sourceMappingURL=newsPage.services.d.ts.map