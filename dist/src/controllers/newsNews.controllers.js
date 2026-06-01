import { customCatch } from "../utils/customCatch.js";
import { responseSuccess } from "../utils/response.js";
import { NewsNewsServices } from "../services/newsNews.services.js";
import { newsNewsCreateSchema, newsNewsUpdateSchema, } from "../models/newsNews.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";
export class NewsNewsControllers {
    static async getAll(req, res) {
        try {
            const data = await NewsNewsServices.getAll();
            responseSuccess(res, 200, "Get all news success", data);
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
            const data = await NewsNewsServices.getById(id);
            responseSuccess(res, 200, "Get news by ID success", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            const files = req.files;
            const imageFile = files?.image?.[0];
            const authorImageFile = files?.author_image?.[0];
            const reportFile = files?.report_file?.[0];
            const validatedBody = newsNewsCreateSchema.parse(req.body);
            const data = await NewsNewsServices.create(validatedBody, imageFile, authorImageFile, reportFile);
            await RevalidatedServices.revalidated("news");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 201, "News created successfully", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("ID is required");
            const files = req.files;
            const imageFile = files?.image?.[0];
            const authorImageFile = files?.author_image?.[0];
            const reportFile = files?.report_file?.[0];
            const validatedBody = newsNewsUpdateSchema.parse(req.body);
            if (validatedBody.image_status === "change" && !imageFile) {
                throw new Error("Image is required when status is 'change'");
            }
            const data = await NewsNewsServices.update(id, validatedBody, imageFile, authorImageFile, reportFile);
            await RevalidatedServices.revalidated("news");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "News updated successfully", data);
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
            await NewsNewsServices.delete(id);
            await RevalidatedServices.revalidated("news");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "News deleted successfully");
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async togglePublish(req, res) {
        try {
            const { id } = req.params;
            if (!id)
                throw new Error("ID is required");
            const data = await NewsNewsServices.togglePublish(id);
            await RevalidatedServices.revalidated("news");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 200, "News publish status toggled", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async uploadContentImage(req, res) {
        try {
            const file = req.file;
            if (!file)
                throw new Error("Image file is required");
            const data = await NewsNewsServices.uploadContentImage(file);
            await RevalidatedServices.revalidated("news");
            await RevalidatedServices.revalidated("home");
            responseSuccess(res, 201, "Content image uploaded", data);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=newsNews.controllers.js.map