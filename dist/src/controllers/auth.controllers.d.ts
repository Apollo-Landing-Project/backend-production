import type { Request, Response } from "express";
export declare class AuthControllers {
    private static getCookieOptions;
    static login(req: Request, res: Response): Promise<void>;
    static logout(req: Request, res: Response): Promise<void>;
    static register(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=auth.controllers.d.ts.map