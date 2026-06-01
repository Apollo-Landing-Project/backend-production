import { envConfig } from "../config/env.config.js";
export class RevalidatedServices {
    static async revalidated(tag) {
        try {
            const response = await fetch(`${envConfig.landing_url}/api/revalidate?tag=${tag}&secret=${envConfig.secret_revalidated}`, {
                method: "POST",
            });
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                if (envConfig.ignore_revalidate_errors) {
                    console.warn("Skipping revalidate error in local mode");
                    return {
                        revalidated: false,
                        skipped: true,
                        tag,
                        error: data,
                    };
                }
                throw new Error(typeof data?.message === "string" ? data.message : JSON.stringify(data));
            }
            return data;
        }
        catch (error) {
            if (envConfig.ignore_revalidate_errors) {
                console.warn("Skipping revalidate request failure in local mode");
                return {
                    revalidated: false,
                    skipped: true,
                    tag,
                    error: error instanceof Error ? error.message : String(error),
                };
            }
            throw error;
        }
    }
}
//# sourceMappingURL=revalidated.services.js.map