import { z } from "zod";
export const sharesSchema = z.object({
    category: z.string().min(1, "Category is required"),
    value: z.string().min(1, "Value is required"),
});
//# sourceMappingURL=shares.models.js.map