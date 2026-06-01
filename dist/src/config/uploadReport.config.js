import multer, {} from "multer";
import { envConfig } from "./env.config.js";
import { client } from "./webdav.config.js";
import { createUploadStorage } from "./uploadStorage.config.js";
const storage = createUploadStorage(client, "files", "report");
// 3. Filter File Berdasarkan Fieldname
const fileFilter = (req, file, cb) => {
    const allowedDocs = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const allowedImages = ["image/jpeg", "image/png", "image/webp"];
    if (file.fieldname === "file_url") {
        allowedDocs.includes(file.mimetype) ?
            cb(null, true)
            : cb(new Error("Only PDF, Word, and Excel files are allowed for the report file"));
    }
    else if (file.fieldname === "news_image" ||
        file.fieldname === "news_author_image") {
        allowedImages.includes(file.mimetype) ?
            cb(null, true)
            : cb(new Error("Only JPG, PNG, and WEBP images are allowed for news images"));
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