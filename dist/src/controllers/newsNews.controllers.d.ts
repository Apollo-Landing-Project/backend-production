import type { Request, Response } from "express";
export declare class NewsNewsControllers {
    static getAll(req: Request, res: Response): Promise<void>;
    static getById(req: Request, res: Response): Promise<void>;
    static create(req: Request, res: Response): Promise<void>;
    static update(req: Request, res: Response): Promise<void>;
    static delete(req: Request, res: Response): Promise<void>;
    static togglePublish(req: Request, res: Response): Promise<void>;
    static uploadContentImage(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=newsNews.controllers.d.ts.map