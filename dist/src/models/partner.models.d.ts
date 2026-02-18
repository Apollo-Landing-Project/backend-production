import { z } from "zod";
export declare const partnerSchema: z.ZodObject<{
    name: z.ZodString;
    category: z.ZodDefault<z.ZodEnum<{
        INSURANCE: "INSURANCE";
        FUNDING: "FUNDING";
    }>>;
}, z.core.$strip>;
export type PartnerInput = z.infer<typeof partnerSchema>;
//# sourceMappingURL=partner.models.d.ts.map