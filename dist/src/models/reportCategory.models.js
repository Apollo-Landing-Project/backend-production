import { z } from "zod";
export const reportCategoryCreateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
});
export const reportCategoryUpdateSchema = reportCategoryCreateSchema.partial();
//# sourceMappingURL=reportCategory.models.js.map