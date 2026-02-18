import type { ReportCreateInput, ReportUpdateInput } from "../models/report.models.js";
export declare class ReportServices {
    static create(data: ReportCreateInput, file: Express.Multer.File, newsImage?: Express.Multer.File, newsAuthorImage?: Express.Multer.File): Promise<void>;
    static getAll(categoryId?: string): Promise<({
        reportCategory: {
            name: string;
            id: string;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title_id: string | null;
        title_en: string | null;
        description_id: string | null;
        description_en: string | null;
        file_url: string | null;
        publish_at: Date;
        is_publish: boolean;
        reportCategoryId: string;
    })[]>;
    static getById(id: string): Promise<{
        reportCategory: {
            name: string;
            id: string;
            description: string | null;
        };
        news: ({
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title_id: string | null;
        title_en: string | null;
        description_id: string | null;
        description_en: string | null;
        file_url: string | null;
        publish_at: Date;
        is_publish: boolean;
        reportCategoryId: string;
    }>;
    static update(id: string, data: ReportUpdateInput, file?: Express.Multer.File, newsImage?: Express.Multer.File, newsAuthorImage?: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title_id: string | null;
        title_en: string | null;
        description_id: string | null;
        description_en: string | null;
        file_url: string | null;
        publish_at: Date;
        is_publish: boolean;
        reportCategoryId: string;
    }>;
    static delete(id: string): Promise<void>;
}
//# sourceMappingURL=report.services.d.ts.map