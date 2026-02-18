import type { Request, Response } from "express";
import { type HomePageUpdateInput } from "../models/homePage.models.js";
export declare class HomePageControllers {
    static getAll(req: Request, res: Response): Promise<void>;
    static getById(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request<{
        id: string;
    }, {}, HomePageUpdateInput>, res: Response): Promise<void>;
    static toggleActive(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static delete(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
}
//# sourceMappingURL=homePage.controllers.d.ts.map