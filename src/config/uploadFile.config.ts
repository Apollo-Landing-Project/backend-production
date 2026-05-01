import multer, { type FileFilterCallback } from "multer";
import type { Request } from "express";
import { client } from "./webdav.config.js";
import { createUploadStorage } from "./uploadStorage.config.js";

const storage = createUploadStorage(client, "files", "document");

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback,
) => {
	const allowed = [
		"application/pdf",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		"application/vnd.ms-excel",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	];

	if (allowed.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Only PDF, Word, and Excel files are allowed"));
	}
};

export const uploadFile = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 50 * 1024 * 1024, // 50MB
	},
});
