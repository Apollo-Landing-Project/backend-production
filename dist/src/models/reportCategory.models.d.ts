import { z } from "zod";
export declare const reportCategoryCreateSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const reportCategoryUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type ReportCategoryCreateInput = z.infer<typeof reportCategoryCreateSchema>;
export type ReportCategoryUpdateInput = z.infer<typeof reportCategoryUpdateSchema>;
//# sourceMappingURL=reportCategory.models.d.ts.map