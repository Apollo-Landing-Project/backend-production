import { envConfig } from "../config/env.config.js";

export class RevalidatedServices {
	static async revalidated(tag: string) {
		const response = await fetch(
			`${envConfig.landing_url}/api/revalidate?tag=${tag}&secret=${envConfig.secret_revalidated}`,
			{
				method: "POST",
			},
		);

		const data = await response.json();
		console.log(data);
		if (!response.ok) throw new Error(data);
		return data;
	}
}
