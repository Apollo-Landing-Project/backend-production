import type { InvestorPageCreateInput } from "../models/investorPage.models.js";
export declare class InvestorPageServices {
    static create(data: InvestorPageCreateInput, file_image: Express.Multer.File): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    }>;
    static getAll(): Promise<({
        inverstorPageId: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            investorPageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string;
            stakeholders_badge: string | null;
            stakeholders_title: string | null;
            stakeholders_desc: string | null;
            report_badge: string | null;
            report_title: string | null;
            report_desc: string | null;
        } | null;
        inverstorPageEn: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            investorPageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string;
            stakeholders_badge: string | null;
            stakeholders_title: string | null;
            stakeholders_desc: string | null;
            report_badge: string | null;
            report_title: string | null;
            report_desc: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        hero_bg: string | null;
    })[]>;
    static getById(id: string): Promise<{
        inverstorPageId: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            investorPageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string;
            stakeholders_badge: string | null;
            stakeholders_title: string | null;
            stakeholders_desc: string | null;
            report_badge: string | null;
            report_title: string | null;
            report_desc: string | null;
        } | null;
        inverstorPageEn: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            investorPageId: string;
            hero_badge: string | null;
            hero_title: string | null;
            hero_desc: string;
            stakeholders_badge: string | null;
            stakeholders_title: string | null;
            stakeholders_desc: string | null;
            report_badge: string | null;
            report_title: string | null;
            report_desc: string | null;
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
//# sourceMappingURL=investorPage.services.d.ts.map