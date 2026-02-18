import type { Request, Response } from "express";
import { type AboutPageInput } from "../models/aboutUsPage.models.js";
export declare class AboutUsPageControllers {
    static getAll(req: Request, res: Response): Promise<void>;
    static getById(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request<{
        id: string;
    }, {}, AboutPageInput>, res: Response): Promise<void>;
    static toggleActive(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static delete(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
}
//# sourceMappingURL=aboutUsPage.controllers.d.ts.map