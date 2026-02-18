import { responseSuccess } from "../utils/response.js";
import { customCatch } from "../utils/customCatch.js";
import { ServiceItemService } from "../services/service.services.js";
import { serviceItemSchema } from "../models/service.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";
export class ServiceItemController {
    static async getAll(req, res) {
        try {
            const data = await ServiceItemService.getAll();
            responseSuccess(res, 200, "Success", data);
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
            const data = await ServiceItemService.getById(id);
            responseSuccess(res, 200, "Success", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            const body = serviceItemSchema.parse(req.body);
            const data = await ServiceItemService.create(body, req.file);
            await RevalidatedServices.revalidated("services");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 201, "Service Created", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async update(req, res) {
        try {
            const body = serviceItemSchema.parse(req.body);
            const { id } = req.params;
            if (!id)
                throw new Error("ID is required");
            const data = await ServiceItemService.update(id, body, req.file);
            await RevalidatedServices.revalidated("services");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "Service Updated", data);
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
            await ServiceItemService.delete(id);
            await RevalidatedServices.revalidated("services");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "Service Deleted");
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
            await ServiceItemService.toggleActive(id);
            await RevalidatedServices.revalidated("services");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "Status Toggled");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async updateOrder(req, res) {
        try {
            const { items } = req.body;
            // items harus berupa array: [{id: string, order: number}]
            if (!Array.isArray(items))
                throw new Error("Invalid items format");
            await ServiceItemService.updateOrder(items);
            await RevalidatedServices.revalidated("services");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "Order Updated");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=service.controllers.js.map