import fs from "node:fs/promises";
import { client } from "../config/webdav.config.js";
import {
	getLocalStorageDir,
	useLocalStorage,
} from "../config/uploadStorage.config.js";
import path from "node:path";

/**
 * Menghapus file dari Web Disk cPanel berdasarkan Full URL
 * @param url Contoh: "https://storage.apolloglobalinteractive.com"
 */
export const deleteWebDavFile = async (
	url: string | null,
	fallbackType: "files" | "images",
): Promise<boolean> => {
	if (!url) return false;

	const type = url.includes("/images/") ? "images" : (url.includes("/files/") ? "files" : fallbackType);

	try {
		const filename = url.split("/").pop();
		if (!filename) return false;

		if (useLocalStorage()) {
			const filePath = path.join(getLocalStorageDir(type), filename);
			await fs.unlink(filePath);
			console.log(`Berhasil menghapus file lokal: ${filePath}`);
			return true;
		}

		const remotePath = `/${type}/${filename}`;

		const fileExists = await client.exists(remotePath);

		if (fileExists) {
			await client.deleteFile(remotePath);
			console.log(`Berhasil menghapus: ${remotePath}`);
			return true;
		} else {
			console.warn(`File tidak ditemukan di Web Disk: ${remotePath}`);
			return false;
		}
	} catch (error: any) {
		if (error?.code === "ENOENT") {
			console.warn(`File lokal tidak ditemukan untuk dihapus: ${url}`);
			return false;
		}
		console.error("Gagal menghapus file Web Disk:", error.message);
		return false;
	}
};
