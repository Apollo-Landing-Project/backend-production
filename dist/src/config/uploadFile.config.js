import multer, {} from "multer";
import { client } from "./webdav.config.js";
import { createUploadStorage } from "./uploadStorage.config.js";
const storage = createUploadStorage(client, "files", "document");
const fileFilter = (req, file, cb) => {
    const allowed = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only PDF, Word, and Excel files are allowed"));
    }
};
export const uploadFile = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
});
//# sourceMappingURL=uploadFile.config.js.map