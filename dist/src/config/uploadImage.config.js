import multer, {} from "multer";
import path from "path";
import fs from "fs";
const BASE_DIR = "/apollo/storage/images";
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
        const prefix = sanitize(req.body?.prefix || "image");
        const timestamp = getTimestamp();
        const filename = `${prefix}-${timestamp}${ext}`;
        cb(null, filename);
    },
});
// Filter file dengan typing
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only JPG, PNG, WEBP images allowed"));
    }
};
export const uploadImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
    },
});
//# sourceMappingURL=uploadImage.config.js.map