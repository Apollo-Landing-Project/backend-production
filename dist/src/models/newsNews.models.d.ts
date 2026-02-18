import { z } from "zod";
export declare const newsNewsCreateSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    title_en: z.ZodString;
    description_en: z.ZodOptional<z.ZodString>;
    content_en: z.ZodString;
    author: z.ZodOptional<z.ZodString>;
    isPublished: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>>;
}, z.core.$strip>;
export declare const newsNewsUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodString>;
    title_en: z.ZodOptional<z.ZodString>;
    description_en: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content_en: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isPublished: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>>>;
    image_status: z.ZodEnum<{
        keep: "keep";
        change: "change";
    }>;
    author_image_status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        keep: "keep";
        change: "change";
        remove: "remove";
    }>>>;
}, z.core.$strip>;
export type NewsNewsCreateInput = z.infer<typeof newsNewsCreateSchema>;
export type NewsNewsUpdateInput = z.infer<typeof newsNewsUpdateSchema>;
//# sourceMappingURL=newsNews.models.d.ts.map