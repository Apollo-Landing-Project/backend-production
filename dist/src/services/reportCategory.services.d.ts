import type { ReportCategoryCreateInput, ReportCategoryUpdateInput } from "../models/reportCategory.models.js";
export declare class ReportCategoryServices {
    static create(data: ReportCategoryCreateInput): Promise<{
        name: string;
        id: string;
        description: string | null;
    }>;
    static getAll(): Promise<({
        _count: {
            reports: number;
        };
    } & {
        name: string;
        id: string;
        description: string | null;
    })[]>;
    static getById(id: string): Promise<{
        name: string;
        id: string;
        description: string | null;
    }>;
    static update(id: string, data: ReportCategoryUpdateInput): Promise<{
        name: string;
        id: string;
        description: string | null;
    }>;
    static delete(id: string): Promise<{
        name: string;
        id: string;
        description: string | null;
    }>;
}
//# sourceMappingURL=reportCategory.services.d.ts.map