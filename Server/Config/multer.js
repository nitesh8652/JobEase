 import multer from "multer";

/**
 * @constant upload
 * @desc Middleware for handling multipart/form-data (file uploads).
 * 
 * @usage
 * - Used in routes to upload files like resumes, images, etc.
 * - Example: upload.single("resume")
 * 
 * @note
 * - Files are temporarily stored locally before being sent to Cloudinary
 */

 const storage = multer.diskStorage({})

 const upload = multer({storage:storage})

 export default upload