import { z } from "zod";
export declare const translateSchema: z.ZodObject<{
    texts: z.ZodArray<z.ZodString>;
    target_lang: z.ZodEnum<{
        id: "id";
        en: "en";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=translate.models.d.ts.map