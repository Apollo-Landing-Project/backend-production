import { envConfig } from "../config/env.config.js";
export class RevalidatedServices {
    static async revalidated(tag) {
        const response = await fetch(`${envConfig.landing_url}/api/revalidated?tag=${tag}&secret=${envConfig.secret_revalidated}`);
        if (!response.ok)
            throw new Error("Failed to revalidated");
        return response.json();
    }
}
//# sourceMappingURL=revalidated.services.js.map