import multer, { type FileFilterCallback, type StorageEngine } from "multer";
import path from "path";
import { type WebDAVClient } from "webdav";
import type { Request } from "express";
import { client } from "./webdav.config.js";

const BASE_DIR = "/files";

// Helper: Format Timestamp
function getTimestamp(): string {
	const now = new Date();
	const date = now.toISOString().slice(0, 10).replace(/-/g, "");
	const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
	const ms = now.getMilliseconds().toString().padStart(3, "0");
	const rand = Math.random().toString(36).slice(2, 6);
	return `${date}-${time}${ms}-${rand}`;
}

function sanitize(text = "document"): string {
	return text.toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
class WebDavStorage implements StorageEngine {
	constructor(
		private client: WebDAVClient,
		private basePath: string,
	) {}

	_handleFile(
		req: Request,
		file: Express.Multer.File,
		cb: (error?: any, info?: Partial<Express.Multer.File>) => void,
	): void {
		const ext = path.extname(file.originalname).toLowerCase();
		const prefix = sanitize(req.body?.prefix as string);
		const filename = `${prefix}-${getTimestamp()}${ext}`;
		const remotePath = `${this.basePath}/${filename}`;

		// Stream langsung ke Web Disk cPanel
		const remoteStream = this.client.createWriteStream(remotePath);
		file.stream.pipe(remoteStream);

		remoteStream.on("error", (err) => cb(err));
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
			.catch((err: any) => cb(err));
	}
}

// 3. Inisialisasi Storage
const storage = new WebDavStorage(client, BASE_DIR);

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
