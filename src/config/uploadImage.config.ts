import multer, { type FileFilterCallback, type StorageEngine } from "multer";
import path from "path";
import { type WebDAVClient } from "webdav";
import type { Request } from "express";
import { client } from "./webdav.config.js";

const BASE_DIR = "/images";

// Helper: Format Timestamp
function getTimestamp(): string {
	const now = new Date();
	const date = now.toISOString().slice(0, 10).replace(/-/g, "");
	const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
	const rand = Math.random().toString(36).slice(2, 6);
	return `${date}-${time}-${rand}`;
}

function sanitize(text = "image"): string {
	return text.toLowerCase().replace(/[^a-z0-9-_]/g, "");
}

// 2. Custom WebDAV Storage Engine
class WebDavStorage implements StorageEngine {
	private client: WebDAVClient;
	private basePath: string;

	constructor(client: WebDAVClient, basePath: string) {
		this.client = client;
		this.basePath = basePath;
	}

	_handleFile(
		req: Request,
		file: Express.Multer.File,
		cb: (error?: any, info?: Partial<Express.Multer.File>) => void,
	): void {
		const ext = path.extname(file.originalname).toLowerCase();
		const prefix = sanitize(req.body?.prefix as string);
		const filename = `${prefix}-${getTimestamp()}${ext}`;
		const remotePath = `${this.basePath}/${filename}`;

		const remoteStream = this.client.createWriteStream(remotePath);
		// Di dalam _handleFile sebelum pipe
		// const remotePath = `${this.basePath}/${filename}`;
		console.log("Mengunggah ke path:", remotePath);

		file.stream.pipe(remoteStream);

		remoteStream.on("error", (err) => {
			cb(err);
		});

		remoteStream.on("finish", () => {
			cb(null, {
				path: remotePath,
				filename: filename,
				destination: this.basePath,
			});
		});
	}

	_removeFile(
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null) => void,
	): void {
		this.client
			.deleteFile(file.path)
			.then(() => cb(null))
			.catch((err: any) => cb(err)); // Type casting error ke any atau Error
	}
}

const storage = new WebDavStorage(client, BASE_DIR);

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
