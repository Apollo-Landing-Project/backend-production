import { z } from "zod";
export declare const reportCreateSchema: z.ZodObject<{
    title_id: z.ZodOptional<z.ZodString>;
    title_en: z.ZodOptional<z.ZodString>;
    description_id: z.ZodOptional<z.ZodString>;
    description_en: z.ZodOptional<z.ZodString>;
    publish_at: z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>;
    is_publish: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<boolean, string>>>;
    reportCategoryId: z.ZodString;
    file_status: z.ZodOptional<z.ZodEnum<{
        keep: "keep";
        change: "change";
    }>>;
    news_author: z.ZodOptional<z.ZodString>;
    news_image: z.ZodOptional<z.ZodAny>;
    news_author_image: z.ZodOptional<z.ZodAny>;
    news_content_id: z.ZodOptional<z.ZodString>;
    news_content_en: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const reportUpdateSchema: z.ZodObject<{
    title_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    title_en: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description_en: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    publish_at: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>>;
    is_publish: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<boolean, string>>>>;
    reportCategoryId: z.ZodOptional<z.ZodString>;
    news_author: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    news_image: z.ZodOptional<z.ZodOptional<z.ZodAny>>;
    news_author_image: z.ZodOptional<z.ZodOptional<z.ZodAny>>;
    news_content_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    news_content_en: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    file_status: z.ZodOptional<z.ZodEnum<{
        keep: "keep";
        change: "change";
    }>>;
}, z.core.$strip>;
export type ReportCreateInput = z.infer<typeof reportCreateSchema>;
export type ReportUpdateInput = z.infer<typeof reportUpdateSchema>;
//# sourceMappingURL=report.models.d.ts.map