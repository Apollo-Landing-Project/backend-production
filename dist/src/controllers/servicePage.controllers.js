import { responseSuccess } from "../utils/response.js";
import { customCatch } from "../utils/customCatch.js";
import { ServicePageService } from "../services/servicePage.services.js";
import { servicePageSchema } from "../models/servicePage.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";
export class ServicePageController {
    static async getAll(req, res) {
        try {
            const data = await ServicePageService.getAll();
            responseSuccess(res, 200, "Get all pages success", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("ID is required");
            const data = await ServicePageService.getById(id);
            responseSuccess(res, 200, "Get page success", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            const body = servicePageSchema.parse(req.body);
            const data = await ServicePageService.create(body, req.file);
            await RevalidatedServices.revalidated("services");
            responseSuccess(res, 201, "Page created successfully", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async update(req, res) {
        try {
            const body = servicePageSchema.parse(req.body);
            const { id } = req.params;
            if (!id)
                throw new Error("ID is required");
            const data = await ServicePageService.update(id, body, req.file);
            await RevalidatedServices.revalidated("services");
            responseSuccess(res, 200, "Page updated successfully", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async toggleActive(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("ID is required");
            await ServicePageService.toggleActive(id);
            await RevalidatedServices.revalidated("services");
            responseSuccess(res, 200, "Page activated");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("ID is required");
            await ServicePageService.delete(id);
            await RevalidatedServices.revalidated("services");
            responseSuccess(res, 200, "Page deleted");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=servicePage.controllers.js.map