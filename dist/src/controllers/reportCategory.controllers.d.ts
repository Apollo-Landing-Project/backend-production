import type { Request, Response } from "express";
export declare class ReportCategoryControllers {
    static getAll(req: Request, res: Response): Promise<void>;
    static getById(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
    static delete(req: Request<{
        id: string;
    }>, res: Response): Promise<void>;
}
//# sourceMappingURL=reportCategory.controllers.d.ts.map