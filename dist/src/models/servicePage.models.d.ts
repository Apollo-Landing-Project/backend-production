import { z } from "zod";
export declare const servicePageSchema: z.ZodObject<{
    hero_title: z.ZodString;
    hero_desc: z.ZodString;
    hero_badge: z.ZodOptional<z.ZodString>;
    used_car_gallery_title: z.ZodString;
    used_car_gallery_desc: z.ZodString;
    used_car_gallery_badge: z.ZodOptional<z.ZodString>;
    hero_title_en: z.ZodString;
    hero_desc_en: z.ZodString;
    hero_badge_en: z.ZodOptional<z.ZodString>;
    used_car_gallery_title_en: z.ZodString;
    used_car_gallery_desc_en: z.ZodString;
    used_car_gallery_badge_en: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ServicePageInput = z.infer<typeof servicePageSchema>;
//# sourceMappingURL=servicePage.models.d.ts.map