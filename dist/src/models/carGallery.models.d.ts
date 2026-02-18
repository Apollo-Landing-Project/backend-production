import { z } from "zod";
export declare const carGallerySchema: z.ZodObject<{
    title: z.ZodString;
    desc: z.ZodString;
    title_en: z.ZodString;
    desc_en: z.ZodString;
}, z.core.$strip>;
export type CarGalleryInput = z.infer<typeof carGallerySchema>;
//# sourceMappingURL=carGallery.models.d.ts.map