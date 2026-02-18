import { responseSuccess } from "../utils/response.js";
import { customCatch } from "../utils/customCatch.js";
import { CarGalleryService } from "../services/carGallery.services.js";
import { carGallerySchema } from "../models/carGallery.models.js";
export class CarGalleryController {
    static async getAll(req, res) {
        try {
            const data = await CarGalleryService.getAll();
            responseSuccess(res, 200, "Get all cars success", data);
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
            const data = await CarGalleryService.getById(id);
            responseSuccess(res, 200, "Get car success", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            // Validasi Input Text
            const body = carGallerySchema.parse(req.body);
            // Panggil Service
            const data = await CarGalleryService.create(body, req.file);
            responseSuccess(res, 201, "Car added successfully", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async update(req, res) {
        try {
            const body = carGallerySchema.parse(req.body);
            const { id } = req.params;
            if (!id)
                throw new Error("Id is required");
            const data = await CarGalleryService.update(id, body, req.file);
            responseSuccess(res, 200, "Car updated successfully", data);
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
            await CarGalleryService.delete(id);
            responseSuccess(res, 200, "Car deleted successfully");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=carGallery.controllers.js.map