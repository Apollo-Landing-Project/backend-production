import { z } from "zod";
export declare const investorPageCreateSchema: z.ZodObject<{
    image_status: z.ZodOptional<z.ZodEnum<{
        keep: "keep";
        change: "change";
    }>>;
    hero_title: z.ZodString;
    hero_desc: z.ZodString;
    hero_badge: z.ZodString;
    stakeholders_title: z.ZodString;
    stakeholders_desc: z.ZodString;
    stakeholders_badge: z.ZodString;
    report_title: z.ZodString;
    report_desc: z.ZodString;
    report_badge: z.ZodString;
    hero_title_en: z.ZodString;
    hero_desc_en: z.ZodString;
    hero_badge_en: z.ZodString;
    stakeholders_title_en: z.ZodString;
    stakeholders_desc_en: z.ZodString;
    stakeholders_badge_en: z.ZodString;
    report_title_en: z.ZodString;
    report_desc_en: z.ZodString;
    report_badge_en: z.ZodString;
}, z.core.$strip>;
export declare const investorPageUpdateSchema: z.ZodObject<{
    hero_title: z.ZodOptional<z.ZodString>;
    hero_desc: z.ZodOptional<z.ZodString>;
    hero_badge: z.ZodOptional<z.ZodString>;
    stakeholders_title: z.ZodOptional<z.ZodString>;
    stakeholders_desc: z.ZodOptional<z.ZodString>;
    stakeholders_badge: z.ZodOptional<z.ZodString>;
    report_title: z.ZodOptional<z.ZodString>;
    report_desc: z.ZodOptional<z.ZodString>;
    report_badge: z.ZodOptional<z.ZodString>;
    hero_title_en: z.ZodOptional<z.ZodString>;
    hero_desc_en: z.ZodOptional<z.ZodString>;
    hero_badge_en: z.ZodOptional<z.ZodString>;
    stakeholders_title_en: z.ZodOptional<z.ZodString>;
    stakeholders_desc_en: z.ZodOptional<z.ZodString>;
    stakeholders_badge_en: z.ZodOptional<z.ZodString>;
    report_title_en: z.ZodOptional<z.ZodString>;
    report_desc_en: z.ZodOptional<z.ZodString>;
    report_badge_en: z.ZodOptional<z.ZodString>;
    image_status: z.ZodEnum<{
        keep: "keep";
        change: "change";
    }>;
}, z.core.$strip>;
export type InvestorPageCreateInput = z.infer<typeof investorPageCreateSchema>;
export type InvestorPageUpdateInput = z.infer<typeof investorPageUpdateSchema>;
//# sourceMappingURL=investorPage.models.d.ts.map