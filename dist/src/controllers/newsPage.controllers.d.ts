import type { Request, Response } from "express";
import { type NewsPageUpdateInput } from "../models/newsPage.models.js";
export declare class NewsPageControllers {
    static getAll(req: Request, res: Response): Promise<void>;
    static getById(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request<{
        id: string;
    }, {}, NewsPageUpdateInput>, res: Response): Promise<void>;
    static toggleActive(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static delete(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
}
//# sourceMappingURL=newsPage.controllers.d.ts.map