import multer, {} from "multer";
import { client } from "./webdav.config.js";
import { createUploadStorage } from "./uploadStorage.config.js";
const storage = createUploadStorage(client, "images", "image");
const fileFilter = (req, file, cb) => {
    const allowedImages = ["image/jpeg", "image/png", "image/webp"];
    const allowedDocs = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (file.fieldname === "report_file") {
        if (allowedDocs.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Only PDF, Word, and Excel files are allowed for report_file"));
        }
    }
    else {
        if (allowedImages.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Only JPG, PNG, WEBP images allowed"));
        }
    }
};
export const uploadImage = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
});
//# sourceMappingURL=uploadImage.config.js.map