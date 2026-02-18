import { responseSuccess } from "../utils/response.js";
import { customCatch } from "../utils/customCatch.js";
import { PartnerService } from "../services/partner.services.js";
import { partnerSchema } from "../models/partner.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";
export class PartnerController {
    static async getAll(req, res) {
        try {
            const data = await PartnerService.getAll();
            responseSuccess(res, 200, "Get all partners success", data);
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
            const data = await PartnerService.getById(id);
            responseSuccess(res, 200, "Get partner success", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            const body = partnerSchema.parse(req.body);
            const data = await PartnerService.create(body, req.file);
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 201, "Partner added successfully", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async update(req, res) {
        try {
            const body = partnerSchema.parse(req.body);
            const { id } = req.params;
            if (!id)
                throw new Error("Id is required");
            const data = await PartnerService.update(id, body, req.file);
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "Partner updated successfully", data);
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
            await PartnerService.delete(id);
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "Partner deleted successfully");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=partner.controllers.js.map