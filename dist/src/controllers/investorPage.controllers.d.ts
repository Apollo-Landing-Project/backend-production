import type { Request, Response } from "express";
import { type InvestorPageUpdateInput } from "../models/investorPage.models.js";
export declare class InvestorPageControllers {
    static getAll(req: Request, res: Response): Promise<void>;
    static getById(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request<{
        id: string;
    }, {}, InvestorPageUpdateInput>, res: Response): Promise<void>;
    static toggleActive(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static delete(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
}
//# sourceMappingURL=investorPage.controllers.d.ts.map