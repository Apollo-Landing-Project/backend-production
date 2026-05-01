import multer, { type FileFilterCallback } from "multer";
import type { Request } from "express";
import { client } from "./webdav.config.js";
import { createUploadStorage } from "./uploadStorage.config.js";

const storage = createUploadStorage(client, "images", "image");

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	cb: FileFilterCallback,
) => {
	const allowed = ["image/jpeg", "image/png", "image/webp"];
	if (allowed.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new Error("Only JPG, PNG, WEBP images allowed"));
	}
};

export const uploadImage = multer({
	storage,
	fileFilter,
	limits: {
		fileSize: 20 * 1024 * 1024, // 20MB
	},
});
