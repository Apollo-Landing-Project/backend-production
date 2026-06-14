import "dotenv/config";

const getApiUrl = () => {
	if (process.env.API_URL) return process.env.API_URL;
	const host = process.env.HOST_URL || "";
	const normalizedHost = host.replace(/\/$/, "");
	if (normalizedHost === "https://storage.apolloglobalinteractive.com") {
		return "https://api.apolloglobalinteractive.com/api";
	}
	return host || "http://localhost:5050/api";
};

export const envConfig = {
	host_url: process.env.HOST_URL || "http://localhost:5050/api",
	api_url: getApiUrl(),
	node_env: process.env.NODE_ENV!,
	port: process.env.PORT || 5050,
	db_url: process.env.DATABASE_URL!,
	cookie_domain: process.env.COOKIE_DOMAIN!,
	jwt_secret: process.env.JWT_SECRET!,
	landing_url: process.env.LANDING_URL!,
	secret_revalidated: process.env.SECRET_VALIDATED!,
	web_disk_username: process.env.USERNAME_WEB_DISK!,
	web_disk_password: process.env.PASSWORD_WEB_DISK!,
	storage_provider: process.env.STORAGE_PROVIDER || "webdav",
	ignore_revalidate_errors: process.env.IGNORE_REVALIDATE_ERRORS === "true",
};
