import { envConfig } from "../config/env.config.js";
import { db } from "../lib/prisma.js";
import path from "path";
import type {
	ReportCreateInput,
	ReportUpdateInput,
} from "../models/report.models.js";
import { deleteWebDavFile } from "../utils/webdavDeleteFile.js";

const DEFAULT_DOWNLOAD_FILENAME = "report.pdf";
const normalizeTitle = (value?: string | null) => {
	if (typeof value !== "string") return null;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : null;
};

function getFilenameFromUrl(fileUrl?: string | null): string | null {
	if (!fileUrl) return null;

	try {
		const pathname = new URL(fileUrl).pathname;
		const filename = path.basename(pathname);
		return filename ? decodeURIComponent(filename) : null;
	} catch {
		const filename = fileUrl.split("/").pop();
		return filename ? decodeURIComponent(filename) : null;
	}
}

function sanitizeDownloadFilename(filename?: string | null): string | null {
	if (!filename) return null;

	const normalized = filename.replace(/[/\\]/g, "-").replace(/[\r\n]+/g, " ").trim();
	return normalized || null;
}

export class ReportServices {
	static async create(
		data: ReportCreateInput,
		file: Express.Multer.File,
		newsImage?: Express.Multer.File,
		newsAuthorImage?: Express.Multer.File,
	) {
		const titleId = normalizeTitle(data.title_id);
		const titleEn = normalizeTitle(data.title_en);
		let fileUrl = null;
		if (file) {
			fileUrl = `${envConfig.host_url}/files/${file.filename}`;
		}

		let newsImageUrl = null;
		if (newsImage) {
			newsImageUrl = `${envConfig.host_url}/files/${newsImage.filename}`;
		}

		let newsAuthorImageUrl = null;
		if (newsAuthorImage) {
			newsAuthorImageUrl = `${envConfig.host_url}/files/${newsAuthorImage.filename}`;
		}

		// Check for duplicate titles
		if (titleId) {
			const existingId = await db.report.findFirst({
				where: { title_id: titleId },
			});
			if (existingId) throw new Error("Title (ID) already exists in reports");

			const existingNewsId = await db.newsNewsId.findFirst({
				where: { title: titleId },
			});
			if (existingNewsId) throw new Error("Title (ID) already exists in news");
		}

		if (titleEn) {
			const existingEn = await db.report.findFirst({
				where: { title_en: titleEn },
			});
			if (existingEn) throw new Error("Title (EN) already exists in reports");

			const existingNewsEn = await db.newsNewsEn.findFirst({
				where: { title: titleEn },
			});
			if (existingNewsEn) throw new Error("Title (EN) already exists in news");
		}

		const report = await db.report.create({
			data: {
				title_id: titleId,
				title_en: titleEn,
				description_id: data.description_id ?? null,
				description_en: data.description_en ?? null,
				publish_at: data.publish_at,
				is_publish: data.is_publish ?? true,
				reportCategoryId: data.reportCategoryId,
				file_url: fileUrl,
				original_filename: file?.originalname ?? null,
				...((
					data.news_content_id ||
					data.news_content_en ||
					newsImageUrl ||
					newsAuthorImageUrl
				) ?
					{
						news: {
							create: {
								isPublished: data.is_publish ?? true,
								image: newsImageUrl,
								author: data.news_author ?? null,
								author_image: newsAuthorImageUrl,
								publishedAt: data.publish_at,
								newsNewsId: {
									create: {
										title: data.title_id ?? null,
										description: data.description_id ?? null,
										content: data.news_content_id ?? null,
									},
								},
								newsNewsEn: {
									create: {
										title: data.title_en ?? null,
										description: data.description_en ?? null,
										content: data.news_content_en ?? null,
									},
								},
							},
						},
					}
				:	{}),
			},
		});

		return report;
	}

	static async getAll(categoryId?: string) {
		const whereClause = categoryId ? { reportCategoryId: categoryId } : {};
		return await db.report.findMany({
			where: whereClause,
			include: {
				reportCategory: true,
				news: true,
			},
			orderBy: {
				publish_at: "desc",
			},
		});
	}

	static async getById(id: string) {
		const data = await db.report.findUnique({
			where: { id },
			include: {
				reportCategory: true,
				news: {
					include: {
						newsNewsEn: true,
						newsNewsId: true,
					},
				},
			},
		});
		if (!data) throw new Error("Report not found");
		return data;
	}

	static async update(
		id: string,
		data: ReportUpdateInput,
		file?: Express.Multer.File,
		newsImage?: Express.Multer.File,
		newsAuthorImage?: Express.Multer.File,
	) {
		const titleId =
			data.title_id === undefined ? undefined : normalizeTitle(data.title_id);
		const titleEn =
			data.title_en === undefined ? undefined : normalizeTitle(data.title_en);
		const existing = await db.report.findUnique({
			where: { id },
			include: { news: true },
		});
		if (!existing) throw new Error("Report not found");

		let newFileUrl = existing.file_url;
		let originalFilename = existing.original_filename;
		// Handle Report file changes
		if (data.file_status === "change") {
			if (existing.file_url) {
				deleteWebDavFile(existing.file_url, "files");
			}
			if (file) {
				newFileUrl = `${envConfig.host_url}/files/${file.filename}`;
				originalFilename = file.originalname ?? null;
			} else {
				newFileUrl = null;
				originalFilename = null;
			}
		}

		// Handle News Files
		let newsImageUrl = existing.news[0]?.image ?? null;
		if (newsImage) {
			// Delete old news image if exists
			if (existing.news[0]?.image) {
				deleteWebDavFile(existing.news[0].image, "files");
			}
			newsImageUrl = `${envConfig.host_url}/files/${newsImage.filename}`;
		}

		let newsAuthorImageUrl = existing.news[0]?.author_image ?? null;
		if (newsAuthorImage) {
			// Delete old author image if exists
			if (existing.news[0]?.author_image) {
				deleteWebDavFile(existing.news[0].author_image, "files");
			}
			newsAuthorImageUrl = `${envConfig.host_url}/files/${newsAuthorImage.filename}`;
		}

		// Check for duplicate titles (excluding current report)
		if (titleId) {
			const duplicateId = await db.report.findFirst({
				where: {
					title_id: titleId,
					NOT: { id: id },
				},
			});
			if (duplicateId) throw new Error("Title (ID) already exists in reports");

			const duplicateNewsId = await db.newsNewsId.findFirst({
				where: {
					title: titleId,
					newsNewsId: { not: existing.news[0]?.id ?? "" },
				},
			});
			if (duplicateNewsId) throw new Error("Title (ID) already exists in news");
		}

		if (titleEn) {
			const duplicateEn = await db.report.findFirst({
				where: {
					title_en: titleEn,
					NOT: { id: id },
				},
			});
			if (duplicateEn) throw new Error("Title (EN) already exists in reports");

			const duplicateNewsEn = await db.newsNewsEn.findFirst({
				where: {
					title: titleEn,
					newsNewsId: { not: existing.news[0]?.id ?? "" },
				},
			});
			if (duplicateNewsEn) throw new Error("Title (EN) already exists in news");
		}

		const report = await db.report.update({
			where: { id },
			data: {
				title_id: titleId,
				title_en: titleEn,
				description_id: data.description_id ?? undefined,
				description_en: data.description_en ?? undefined,
				publish_at: data.publish_at ?? undefined,
				is_publish: data.is_publish ?? undefined,
				reportCategoryId: data.reportCategoryId ?? undefined,
				file_url: newFileUrl,
				original_filename: originalFilename,
			} as any,
		});

		// Upsert NewsNews ONLY if news content is provided or existing news needs update
		if (existing.news[0]) {
			// If news exists, update it
			await db.newsNews.update({
				where: { id: existing.news[0].id },
				data: {
					isPublished: data.is_publish ?? undefined,
					image: newsImageUrl,
					author: data.news_author ?? undefined,
					author_image: newsAuthorImageUrl,
					publishedAt: data.publish_at ?? undefined,
					newsNewsId: {
						update: {
							...(titleId !== undefined && { title: titleId }),
							...(data.description_id !== undefined && {
								description: data.description_id,
							}),
							...(data.news_content_id !== undefined && {
								content: data.news_content_id,
							}),
						},
					},
					newsNewsEn: {
						update: {
							...(titleEn !== undefined && { title: titleEn }),
							...(data.description_en !== undefined && {
								description: data.description_en,
							}),
							...(data.news_content_en !== undefined && {
								content: data.news_content_en,
							}),
						},
					},
				} as any,
			});
		} else if (
			data.news_content_id ||
			data.news_content_en ||
			newsImageUrl ||
			newsAuthorImageUrl
		) {
			// Create if not exists AND content is provided
			await db.newsNews.create({
				data: {
					isPublished: data.is_publish ?? true,
					image: newsImageUrl,
					author: data.news_author ?? null,
					author_image: newsAuthorImageUrl,
					publishedAt: data.publish_at ?? report.publish_at,
					report_id: report.id,
					newsNewsId: {
						create: {
							title: titleId ?? report.title_id,
							description: data.description_id ?? report.description_id,
							content: data.news_content_id ?? null,
						},
					},
					newsNewsEn: {
						create: {
							title: titleEn ?? report.title_en,
							description: data.description_en ?? report.description_en,
							content: data.news_content_en ?? null,
						},
					},
				},
			});
		}

		return report;
	}

	static async delete(id: string) {
		const data = await db.report.findUnique({ where: { id } });
		if (!data) throw new Error("Report not found");

		// Remove file
		if (data.file_url) {
			deleteWebDavFile(data.file_url, "files");
		}
		return await db.$transaction(async (tx) => {
			const news = await tx.newsNews.findFirst({
				where: { report_id: id },
			});
			if (news) {
				if (news.image) deleteWebDavFile(news.image, "images");
				if (news.author_image) deleteWebDavFile(news.author_image, "images");
				
				await tx.newsNewsEn.delete({ where: { newsNewsId: news.id } });
				await tx.newsNewsId.delete({ where: { newsNewsId: news.id } });
				await tx.newsNews.delete({
					where: { id: news.id },
				});
			}
			await tx.report.delete({
				where: { id },
			});
		});
	}

	static async getDownloadPayload(id: string) {
		return await db.report.findUnique({
			where: { id },
			select: {
				id: true,
				file_url: true,
				original_filename: true,
			},
		});
	}

	static resolveDownloadFilename(report: {
		original_filename?: string | null;
		file_url?: string | null;
	}) {
		return (
			sanitizeDownloadFilename(report.original_filename) ??
			sanitizeDownloadFilename(getFilenameFromUrl(report.file_url)) ??
			DEFAULT_DOWNLOAD_FILENAME
		);
	}
}
