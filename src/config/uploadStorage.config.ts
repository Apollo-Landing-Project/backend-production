import fs from "node:fs";
import path from "node:path";
import multer, { type StorageEngine } from "multer";
import type { Request } from "express";
import type { WebDAVClient } from "webdav";
import { envConfig } from "./env.config.js";

export type StorageKind = "files" | "images";

const STORAGE_ROOT = path.resolve(process.cwd(), "storage");

function getTimestamp(): string {
	const now = new Date();
	const date = now.toISOString().slice(0, 10).replace(/-/g, "");
	const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
	const ms = now.getMilliseconds().toString().padStart(3, "0");
	const rand = Math.random().toString(36).slice(2, 6);
	return `${date}-${time}${ms}-${rand}`;
}

function sanitize(text: string | undefined, fallback: string): string {
	const normalized = (text || fallback)
		.toLowerCase()
		.replace(/[^a-z0-9-_]/g, "")
		.trim();
	return normalized || fallback;
}

function buildFilename(
	req: Request,
	file: Express.Multer.File,
	defaultPrefix: string,
) {
	const ext = path.extname(file.originalname).toLowerCase();
	const prefix = sanitize(req.body?.prefix as string | undefined, defaultPrefix);
	return `${prefix}-${getTimestamp()}${ext}`;
}

export function useLocalStorage() {
	return envConfig.storage_provider === "local";
}

export function getLocalStorageDir(kind: StorageKind) {
	const dir = path.join(STORAGE_ROOT, kind);
	fs.mkdirSync(dir, { recursive: true });
	return dir;
}

export function getStoredFileUrl(kind: StorageKind, filename: string) {
	return `${envConfig.host_url}/${kind}/${filename}`;
}

class WebDavStorage implements StorageEngine {
	constructor(
		private client: WebDAVClient,
		private kind: StorageKind,
		private defaultPrefix: string,
	) {}

	_handleFile(
		req: Request,
		file: Express.Multer.File,
		cb: (error?: any, info?: Partial<Express.Multer.File>) => void,
	): void {
		const filename = buildFilename(req, file, this.defaultPrefix);
		const remotePath = `/${this.kind}/${filename}`;
		const remoteStream = this.client.createWriteStream(remotePath);

		file.stream.pipe(remoteStream);

		remoteStream.on("error", (err) => cb(err));
		remoteStream.on("finish", () => {
			cb(null, {
				path: remotePath,
				filename,
				destination: `/${this.kind}`,
			});
		});
	}

	_removeFile(
		_req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null) => void,
	): void {
		this.client
			.deleteFile(file.path)
			.then(() => cb(null))
			.catch((err: any) => cb(err));
	}
}

export function createUploadStorage(
	client: WebDAVClient,
	kind: StorageKind,
	defaultPrefix: string,
): StorageEngine {
	if (useLocalStorage()) {
		return multer.diskStorage({
			destination: (_req, _file, cb) => cb(null, getLocalStorageDir(kind)),
			filename: (req, file, cb) =>
				cb(null, buildFilename(req, file, defaultPrefix)),
		});
	}

	return new WebDavStorage(client, kind, defaultPrefix);
}
