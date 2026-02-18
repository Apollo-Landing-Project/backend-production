import { z } from "zod";
export declare const newsCSRCreateSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
    title_en: z.ZodString;
    description_en: z.ZodOptional<z.ZodString>;
    content_en: z.ZodString;
    author: z.ZodOptional<z.ZodString>;
    isPublished: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>>;
    images_description_id: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    images_description_en: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
}, z.core.$strip>;
export declare const newsCSRUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodString>;
    title_en: z.ZodOptional<z.ZodString>;
    description_en: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content_en: z.ZodOptional<z.ZodString>;
    author: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isPublished: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodBoolean>>>>;
    images_description_id: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>>;
    images_description_en: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>>;
    author_image_status: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        keep: "keep";
        change: "change";
        remove: "remove";
    }>>>;
    deleted_image_ids: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>>;
}, z.core.$strip>;
export type NewsCSRCreateInput = z.infer<typeof newsCSRCreateSchema>;
export type NewsCSRUpdateInput = z.infer<typeof newsCSRUpdateSchema>;
//# sourceMappingURL=newsCSR.models.d.ts.map