import { responseSuccess } from "../utils/response.js";
import { customCatch } from "../utils/customCatch.js";
import { AboutUsPageServices } from "../services/aboutUs.services.js";
import { aboutPageSchema, } from "../models/aboutUsPage.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";
export class AboutUsPageControllers {
    static async getAll(req, res) {
        try {
            const response = await AboutUsPageServices.getAll();
            responseSuccess(res, 200, "Get all about us pages success", response);
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
            const response = await AboutUsPageServices.getById(id);
            responseSuccess(res, 200, "Get success", response);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            const { body, files } = req;
            // 1. Zod Validation (Text)
            const validatedBody = aboutPageSchema.parse(body);
            // 2. Files
            const uploadedFiles = files;
            const response = await AboutUsPageServices.create(validatedBody, uploadedFiles);
            await RevalidatedServices.revalidated("about");
            responseSuccess(res, 201, "Create success", response);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { body, files } = req;
            if (!id)
                throw new Error("ID is required");
            const validatedBody = aboutPageSchema.parse({ ...body });
            const uploadedFiles = files;
            const response = await AboutUsPageServices.update(id, validatedBody, uploadedFiles);
            await RevalidatedServices.revalidated("about");
            responseSuccess(res, 200, "Update success", response);
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
            const response = await AboutUsPageServices.toggleActive(id);
            await RevalidatedServices.revalidated("about");
            responseSuccess(res, 200, "Activated successfully", response);
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
            const response = await AboutUsPageServices.delete(id);
            await RevalidatedServices.revalidated("about");
            responseSuccess(res, 200, "Deleted successfully", response);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=aboutUsPage.controllers.js.map