import type { SharesInput } from "../models/shares.models.js";
export declare class SharesService {
    static getAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: string;
        category: string;
    }[]>;
    static getById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: string;
        category: string;
    }>;
    static create(data: SharesInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: string;
        category: string;
    }>;
    static update(id: string, data: SharesInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: string;
        category: string;
    }>;
    static delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        value: string;
        category: string;
    }>;
}
//# sourceMappingURL=shares.services.d.ts.map