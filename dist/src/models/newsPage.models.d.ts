import { z } from "zod";
export declare const newsPageCreateSchema: z.ZodObject<{
    image_status: z.ZodOptional<z.ZodEnum<{
        keep: "keep";
        change: "change";
    }>>;
    hero_title: z.ZodString;
    hero_desc: z.ZodString;
    news_title: z.ZodString;
    news_desc: z.ZodString;
    csr_title: z.ZodString;
    csr_desc: z.ZodString;
    hero_title_en: z.ZodString;
    hero_desc_en: z.ZodString;
    news_title_en: z.ZodString;
    news_desc_en: z.ZodString;
    csr_title_en: z.ZodString;
    csr_desc_en: z.ZodString;
}, z.core.$strip>;
export declare const newsPageUpdateSchema: z.ZodObject<{
    hero_title: z.ZodOptional<z.ZodString>;
    hero_desc: z.ZodOptional<z.ZodString>;
    news_title: z.ZodOptional<z.ZodString>;
    news_desc: z.ZodOptional<z.ZodString>;
    csr_title: z.ZodOptional<z.ZodString>;
    csr_desc: z.ZodOptional<z.ZodString>;
    hero_title_en: z.ZodOptional<z.ZodString>;
    hero_desc_en: z.ZodOptional<z.ZodString>;
    news_title_en: z.ZodOptional<z.ZodString>;
    news_desc_en: z.ZodOptional<z.ZodString>;
    csr_title_en: z.ZodOptional<z.ZodString>;
    csr_desc_en: z.ZodOptional<z.ZodString>;
    image_status: z.ZodEnum<{
        keep: "keep";
        change: "change";
    }>;
}, z.core.$strip>;
export type NewsPageCreateInput = z.infer<typeof newsPageCreateSchema>;
export type NewsPageUpdateInput = z.infer<typeof newsPageUpdateSchema>;
//# sourceMappingURL=newsPage.models.d.ts.map