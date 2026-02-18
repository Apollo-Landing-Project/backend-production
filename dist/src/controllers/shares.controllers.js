import { responseSuccess } from "../utils/response.js";
import { customCatch } from "../utils/customCatch.js";
import { SharesService } from "../services/shares.services.js";
import { sharesSchema } from "../models/shares.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";
export class SharesController {
    static async getAll(req, res) {
        try {
            const data = await SharesService.getAll();
            responseSuccess(res, 200, "Get all shares success", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("Id is required");
            const data = await SharesService.getById(id);
            responseSuccess(res, 200, "Get shares success", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            const body = sharesSchema.parse(req.body);
            const data = await SharesService.create(body);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 201, "Shares added successfully", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async update(req, res) {
        try {
            const body = sharesSchema.parse(req.body);
            const { id } = req.params;
            if (!id)
                throw new Error("Id is required");
            const data = await SharesService.update(id, body);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 200, "Shares updated successfully", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("Id is required");
            await SharesService.delete(id);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 200, "Shares deleted successfully");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=shares.controllers.js.map