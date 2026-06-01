import { customCatch } from "../utils/customCatch.js";
import { responseError, responseSuccess } from "../utils/response.js";
import { ReportServices } from "../services/report.services.js";
import { reportCreateSchema, reportUpdateSchema, } from "../models/report.models.js";
import { RevalidatedServices } from "../services/revalidated.services.js";
import path from "path";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
function buildContentDisposition(filename) {
    const ext = path.extname(filename);
    const asciiFallbackBase = filename
        .normalize("NFKD")
        .replace(/[^\x20-\x7E]/g, "")
        .replace(/["\\]/g, "")
        .trim();
    const asciiFallback = asciiFallbackBase || (ext ? `download${ext}` : "download");
    const encoded = encodeURIComponent(filename);
    return `attachment; filename="${asciiFallback}"; filename*=UTF-8''${encoded}`;
}
export class ReportControllers {
    static async getAll(req, res) {
        try {
            const { categoryId } = req.query;
            const response = await ReportServices.getAll(categoryId);
            responseSuccess(res, 200, "Get all reports success", response);
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
            const response = await ReportServices.getById(id);
            responseSuccess(res, 200, "Get report by ID success", response);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async create(req, res) {
        try {
            const files = req.files;
            const file = files["file_url"]?.[0];
            const newsImage = files["news_image"]?.[0];
            const newsAuthorImage = files["news_author_image"]?.[0];
            if (!file)
                throw new Error("File is required");
            const body = reportCreateSchema.parse(req.body);
            const response = await ReportServices.create(body, file, newsImage, newsAuthorImage);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 201, "Create report success", response);
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
            const file = files["file_url"]?.[0];
            const newsImage = files["news_image"]?.[0];
            const newsAuthorImage = files["news_author_image"]?.[0];
            const body = reportUpdateSchema.parse(req.body);
            // Logic check: if change requested but no file
            if (body.file_status === "change" && !file) {
                throw new Error("File is required when status is 'change'");
            }
            const response = await ReportServices.update(id, body, file, newsImage, newsAuthorImage);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 200, "Update report success", response);
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
            const response = await ReportServices.delete(id);
            await RevalidatedServices.revalidated("investor_relation");
            responseSuccess(res, 200, "Delete report success", response);
        }
        catch (e) {
            customCatch(e, res);
        }
    }
    static async download(req, res) {
        try {
            const { reportId } = req.params;
            if (!reportId) {
                return responseError(res, 400, "Report ID is required");
            }
            const report = await ReportServices.getDownloadPayload(reportId);
            if (!report) {
                return responseError(res, 404, "Report not found");
            }
            if (!report.file_url) {
                return responseError(res, 404, "Report file is not available");
            }
            const upstream = await fetch(report.file_url);
            if (!upstream.ok) {
                return responseError(res, 502, `Failed to fetch report file from storage (${upstream.status} ${upstream.statusText})`);
            }
            if (!upstream.body) {
                return responseError(res, 502, "Storage returned an empty file response");
            }
            const filename = ReportServices.resolveDownloadFilename(report);
            const contentType = upstream.headers.get("content-type") || "application/octet-stream";
            const contentLength = upstream.headers.get("content-length");
            res.status(200);
            res.setHeader("Content-Type", contentType);
            res.setHeader("Content-Disposition", buildContentDisposition(filename));
            res.setHeader("Cache-Control", "no-store");
            if (contentLength) {
                res.setHeader("Content-Length", contentLength);
            }
            await pipeline(Readable.fromWeb(upstream.body), res);
        }
        catch (e) {
            if (!res.headersSent) {
                customCatch(e, res);
            }
            else {
                res.end();
            }
        }
    }
}
//# sourceMappingURL=report.controllers.js.map