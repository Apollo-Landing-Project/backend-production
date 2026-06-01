import { z } from "zod";
const isPublishedField = z
    .preprocess((val) => {
    if (val === "true")
        return true;
    if (val === "false")
        return false;
    return val;
}, z.boolean())
    .optional();
// --- CREATE SCHEMA ---
export const newsNewsCreateSchema = z.object({
    // Indonesia (ID)
    title: z.string().min(1, "Title (ID) is required"),
    description: z.string().optional(),
    content: z.string().min(1, "Content (ID) is required"),
    // English (EN)
    title_en: z.string().min(1, "Title (EN) is required"),
    description_en: z.string().optional(),
    content_en: z.string().min(1, "Content (EN) is required"),
    // Global
    author: z.string().optional(),
    isPublished: isPublishedField.default(true),
    // Optional Report Attachment
    reportCategoryId: z.string().optional(),
});
// --- UPDATE SCHEMA ---
export const newsNewsUpdateSchema = newsNewsCreateSchema.partial().extend({
    isPublished: isPublishedField,
    image_status: z.enum(["keep", "change"]),
    author_image_status: z
        .enum(["keep", "change", "remove"])
        .optional()
        .default("keep"),
    report_status: z
        .enum(["keep", "change", "remove"])
        .optional()
        .default("keep"),
});
//# sourceMappingURL=newsNews.models.js.map