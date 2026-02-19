import { client } from "../config/webdav.config.js";

/**
 * Menghapus file dari Web Disk cPanel berdasarkan Full URL
 * @param url Contoh: "https://storage.apolloglobalinteractive.com"
 */
export const deleteWebDavFile = async (
	url: string | null,
	type: "files" | "images",
): Promise<boolean> => {
	if (!url) return false;

	try {
		// 1. Ambil nama file dari URL (bagian terakhir setelah '/')
		const filename = url.split("/").pop();
		if (!filename) return false;

		const remotePath = `/${type}/${filename}`;

		// 3. Cek keberadaan file di Web Disk
		const fileExists = await client.exists(remotePath);

		if (fileExists) {
			// 4. Hapus file dari server Web Disk
			await client.deleteFile(remotePath);
			console.log(`Berhasil menghapus: ${remotePath}`);
			return true;
		} else {
			console.warn(`File tidak ditemukan di Web Disk: ${remotePath}`);
			return false;
		}
	} catch (error: any) {
		console.error("Gagal menghapus file Web Disk:", error.message);
		return false;
	}
};
