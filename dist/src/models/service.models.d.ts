import { z } from "zod";
export declare const serviceItemSchema: z.ZodObject<{
    title: z.ZodString;
    desc: z.ZodString;
    desc_sort: z.ZodString;
    badge: z.ZodOptional<z.ZodString>;
    quote: z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>;
    location: z.ZodString;
    contact: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>;
    email: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>;
    title_en: z.ZodString;
    desc_en: z.ZodString;
    desc_sort_en: z.ZodString;
    badge_en: z.ZodOptional<z.ZodString>;
    quote_en: z.ZodUnion<[z.ZodString, z.ZodLiteral<"">]>;
    location_en: z.ZodString;
    order: z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodDefault<z.ZodOptional<z.ZodNumber>>>;
    image_index: z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodOptional<z.ZodNumber>>;
    id: z.ZodOptional<z.ZodString>;
    id_en: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ServiceItemInput = z.infer<typeof serviceItemSchema>;
export declare const carGallerySchema: z.ZodObject<{
    title: z.ZodString;
    desc: z.ZodString;
    title_en: z.ZodString;
    desc_en: z.ZodString;
}, z.core.$strip>;
export type CarGalleryInput = z.infer<typeof carGallerySchema>;
//# sourceMappingURL=service.models.d.ts.map