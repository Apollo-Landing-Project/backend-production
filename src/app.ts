import express from "express";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import path from "node:path";
import { xss } from "express-xss-sanitizer";
import { router } from "./routes/index.js";
import cookieParser from "cookie-parser";
import { getLocalStorageDir, useLocalStorage } from "./config/uploadStorage.config.js";

const app = express();
const docsDir = path.resolve(process.cwd(), "docs");
const docsCsp = [
	"default-src 'self'",
	"base-uri 'self'",
	"font-src 'self' https: data:",
	"form-action 'self'",
	"frame-ancestors 'self'",
	"img-src 'self' https: data:",
	"object-src 'none'",
	"script-src 'self' https://unpkg.com",
	"script-src-attr 'none'",
	"style-src 'self' https://unpkg.com 'unsafe-inline'",
	"connect-src 'self' https://unpkg.com",
];

// logger
app.use(morgan("dev"));
// set security HTTP headers
app.use(helmet({
	crossOriginResourcePolicy: { policy: "cross-origin" },
}));
// parse json request body
app.use(express.json());
app.use(cookieParser());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());
// gzip compression
app.use(compression());
// enable cors
const allowedOrigins =
	process.env.ALLOWED_HOSTS?.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean) || [];
app.use(
	cors({
		origin(origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);

if (useLocalStorage()) {
	app.use("/api/files", express.static(getLocalStorageDir("files")));
	app.use("/api/images", express.static(getLocalStorageDir("images")));
}

app.use("/docs", (_req, res, next) => {
	res.setHeader("Content-Security-Policy", docsCsp.join("; "));
	next();
});
app.use("/docs", express.static(docsDir));
app.use("/api", router);

app.get("/health", (_req, res) => {
	res.json({ message: "API running" });
});

export default app;
