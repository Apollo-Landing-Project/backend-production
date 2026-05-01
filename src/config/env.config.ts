import "dotenv/config";

export const envConfig = {
	host_url: process.env.HOST_URL || "http://localhost:5000/api",
	node_env: process.env.NODE_ENV!,
	port: process.env.PORT || 5000,
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
