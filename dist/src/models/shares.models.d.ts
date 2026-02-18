import { z } from "zod";
export declare const sharesSchema: z.ZodObject<{
    category: z.ZodString;
    value: z.ZodString;
}, z.core.$strip>;
export type SharesInput = z.infer<typeof sharesSchema>;
//# sourceMappingURL=shares.models.d.ts.map