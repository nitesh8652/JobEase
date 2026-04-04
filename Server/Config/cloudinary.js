import {v2 as cloudinary} from 'cloudinary'

/**
 * @function connectCloudinary
 * @desc Configures Cloudinary with environment variables.
 *       This allows the application to upload, delete, and manage media files (e.g., resumes, profile images).
 * 
 * @important
 * - Uses CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY from .env
 * - Must be called before any Cloudinary operation
 * 
 */


const connectCloudinary = async () => {

    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
}

export default connectCloudinary