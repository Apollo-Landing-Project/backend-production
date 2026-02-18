import "dotenv/config";
import type { PartnerInput } from "../models/partner.models.js";
export declare class PartnerService {
    static getAll(): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        logo_image: string | null;
        category: import("../../generated/prisma/enums.js").PartnerCategory;
    }[]>;
    static getById(id: string): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        logo_image: string | null;
        category: import("../../generated/prisma/enums.js").PartnerCategory;
    }>;
    static create(data: PartnerInput, file?: Express.Multer.File): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        logo_image: string | null;
        category: import("../../generated/prisma/enums.js").PartnerCategory;
    }>;
    static update(id: string, data: PartnerInput, file?: Express.Multer.File): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        logo_image: string | null;
        category: import("../../generated/prisma/enums.js").PartnerCategory;
    }>;
    static delete(id: string): Promise<{
        name: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        logo_image: string | null;
        category: import("../../generated/prisma/enums.js").PartnerCategory;
    }>;
}
//# sourceMappingURL=partner.services.d.ts.map