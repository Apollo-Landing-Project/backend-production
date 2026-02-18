import { customCatch } from "../utils/customCatch.js";
import { UserServices } from "../services/user.service.js";
import { responseSuccess } from "../utils/response.js";
import { AuthServices } from "../services/auth.services.js";
import { envConfig } from "../config/env.config.js";
export class AuthControllers {
    static getCookieOptions() {
        const isProd = process.env.NODE_ENV === "production";
        return {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax",
            path: "/",
            ...(isProd && {
                domain: envConfig.cookie_domain || ".evaluasipembelajaran.site",
            }),
        };
    }
    static async login(req, res) {
        try {
            const request = req.body;
            const isExisted = await UserServices.findUserByEmailAndPassword(request.email, request.password);
            const generateToken = AuthServices.generateToken(isExisted);
            res.cookie("token", generateToken, AuthControllers.getCookieOptions());
            responseSuccess(res, 200, "Login success", {
                ...isExisted,
                token: generateToken,
            });
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async logout(req, res) {
        try {
            res.clearCookie("token", AuthControllers.getCookieOptions());
            responseSuccess(res, 200, "Logout success");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async register(req, res) {
        try {
            const request = req.body;
            const isUserExisted = await UserServices.findUserByEmail(request.email);
            if (isUserExisted)
                throw new Error("Email sudah terdaftar");
            const newUser = await UserServices.createUser({
                email: request.email,
                password: request.password,
                name: request.name,
            });
            responseSuccess(res, 201, "Register is successfully", newUser);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=auth.controllers.js.map