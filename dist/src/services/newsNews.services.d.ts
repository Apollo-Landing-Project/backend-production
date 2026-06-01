import type { NewsNewsCreateInput, NewsNewsUpdateInput } from "../models/newsNews.models.js";
export declare class NewsNewsServices {
    static create(data: NewsNewsCreateInput, imageFile?: Express.Multer.File, authorImageFile?: Express.Multer.File, reportFile?: Express.Multer.File): Promise<{
        newsNewsId: {
            id: string;
            title: string | null;
            description: string | null;
            newsNewsId: string;
            content: string | null;
        } | null;
        newsNewsEn: {
            id: string;
            title: string | null;
            description: string | null;
            newsNewsId: string;
            content: string | null;
        } | null;
        report: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title_id: string | null;
            title_en: string | null;
            description_id: string | null;
            description_en: string | null;
            file_url: string | null;
            original_filename: string | null;
            publish_at: Date;
            is_publish: boolean;
            reportCategoryId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
        report_id: string | null;
    }>;
    static getAll(): Promise<({
        newsNewsId: {
            id: string;
            title: string | null;
            description: string | null;
            newsNewsId: string;
            content: string | null;
        } | null;
        newsNewsEn: {
            id: string;
            title: string | null;
            description: string | null;
            newsNewsId: string;
            content: string | null;
        } | null;
        report: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title_id: string | null;
            title_en: string | null;
            description_id: string | null;
            description_en: string | null;
            file_url: string | null;
            original_filename: string | null;
            publish_at: Date;
            is_publish: boolean;
            reportCategoryId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
        report_id: string | null;
    })[]>;
    static getById(id: string): Promise<{
        newsNewsId: {
            id: string;
            title: string | null;
            description: string | null;
            newsNewsId: string;
            content: string | null;
        } | null;
        newsNewsEn: {
            id: string;
            title: string | null;
            description: string | null;
            newsNewsId: string;
            content: string | null;
        } | null;
        report: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title_id: string | null;
            title_en: string | null;
            description_id: string | null;
            description_en: string | null;
            file_url: string | null;
            original_filename: string | null;
            publish_at: Date;
            is_publish: boolean;
            reportCategoryId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
        report_id: string | null;
    }>;
    static update(id: string, data: NewsNewsUpdateInput, imageFile?: Express.Multer.File, authorImageFile?: Express.Multer.File, reportFile?: Express.Multer.File): Promise<{
        newsNewsId: {
            id: string;
            title: string | null;
            description: string | null;
            newsNewsId: string;
            content: string | null;
        } | null;
        newsNewsEn: {
            id: string;
            title: string | null;
            description: string | null;
            newsNewsId: string;
            content: string | null;
        } | null;
        report: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title_id: string | null;
            title_en: string | null;
            description_id: string | null;
            description_en: string | null;
            file_url: string | null;
            original_filename: string | null;
            publish_at: Date;
            is_publish: boolean;
            reportCategoryId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
        report_id: string | null;
    }>;
    static delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
        report_id: string | null;
    }>;
    static togglePublish(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        isPublished: boolean;
        author: string | null;
        author_image: string | null;
        publishedAt: Date;
        report_id: string | null;
    }>;
    static uploadContentImage(file: Express.Multer.File): Promise<{
        url: string;
    }>;
}
//# sourceMappingURL=newsNews.services.d.ts.map