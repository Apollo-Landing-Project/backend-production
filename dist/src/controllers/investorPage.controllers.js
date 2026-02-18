import { customCatch } from "../utils/customCatch.js";
import { responseSuccess } from "../utils/response.js";
import { InvestorPageServices } from "../services/investorPage.services.js";
import { investorPageCreateSchema, investorPageUpdateSchema, } from "../models/investorPage.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";
export class InvestorPageControllers {
    static async getAll(req, res) {
        try {
            const response = await InvestorPageServices.getAll();
            responseSuccess(res, 200, "Get all investor pages success", response);
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
            const response = await InvestorPageServices.getById(id);
            responseSuccess(res, 200, "Get investor page by ID success", response);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            const { body, file } = req;
            const fileTypeDeclare = file;
            if (!fileTypeDeclare) {
                throw new Error("Image is required");
            }
            const validatedBody = investorPageCreateSchema.parse(body);
            const response = await InvestorPageServices.create(validatedBody, fileTypeDeclare);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 201, "Create investor page success", response);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { body, file } = req;
            if (!id)
                throw new Error("ID is required");
            const validatedBody = investorPageUpdateSchema.parse({ ...body });
            const fileTypeDeclare = file;
            if (validatedBody.image_status === "change" && !fileTypeDeclare) {
                throw new Error("Image is required when status is 'change'");
            }
            const response = await InvestorPageServices.update(id, validatedBody, fileTypeDeclare);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 200, "Update investor page success", response);
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
            const response = await InvestorPageServices.toggleActive(id);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 200, "Investor page activated successfully", response);
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
            const response = await InvestorPageServices.delete(id);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 200, "Investor page deleted successfully", response);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
}
//# sourceMappingURL=investorPage.controllers.js.map