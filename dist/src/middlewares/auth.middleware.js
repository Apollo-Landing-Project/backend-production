import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config.js";
import { customCatch } from "../utils/customCatch.js";
export function verifyToken(req, res, next) {
    try {
        const token = req.cookies["token"];
        if (!token) {
            throw new Error("No token provided");
        }
        const decoded = jwt.verify(token, envConfig.jwt_secret);
        req.user = decoded;
        next();
    }
    catch (e) {
        customCatch(e, res);
    }
}
//# sourceMappingURL=auth.middleware.js.map