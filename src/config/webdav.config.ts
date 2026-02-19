import { createClient } from "webdav";
import { envConfig } from "./env.config.js";

export const client = createClient(
	"https://storage.apolloglobalinteractive.com:2078",
	{
		username: envConfig.web_disk_username,
		password: envConfig.web_disk_password,
	},
);
