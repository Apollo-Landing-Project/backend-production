import multer, {} from "multer";
import path from "path";
import fs from "fs";
const BASE_DIR = "/apollo/storage/files";
// Format tanggal & waktu
function getTimestamp() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, "");
    const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
    const ms = now.getMilliseconds().toString().padStart(3, "0");
    const rand = Math.random().toString(36).slice(2, 6);
    return `${date}-${time}${ms}-${rand}`;
}
// Sanitasi prefix
function sanitize(text = "file") {
    return text.toLowerCase().replace(/[^a-z0-9-_]/g, "");
}
// Pastikan folder ada
function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}
// Storage engine dengan type-safe callback
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureDir(BASE_DIR);
        cb(null, BASE_DIR);
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        const prefix = sanitize(req.body?.prefix || "report");
        const timestamp = getTimestamp();
        const filename = `${prefix}-${timestamp}${ext}`;
        cb(null, filename);
    },
});
// Filter file dengan typing
const fileFilter = (req, file, cb) => {
    // Document types for 'file_url'
    const allowedDocs = [
        "application/pdf",
        "application/msword", // .doc
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
        "application/vnd.ms-excel", // .xls
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    ];
    // Image types for 'news_image' and 'news_author_image'
    const allowedImages = ["image/jpeg", "image/png", "image/webp"];
    if (file.fieldname === "file_url") {
        if (allowedDocs.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Only PDF, Word, and Excel files are allowed for the report file"));
        }
    }
    else if (file.fieldname === "news_image" ||
        file.fieldname === "news_author_image") {
        if (allowedImages.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Only JPG, PNG, and WEBP images are allowed for news images"));
        }
    }
    else {
        cb(new Error("Unexpected field"));
    }
};
export const uploadReport = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
});
//# sourceMappingURL=uploadReport.config.js.map