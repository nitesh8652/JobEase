    import jwt from 'jsonwebtoken'
    import Company from '../Models/Company.js'

    /**
 * @desc Middleware to protect company routes using JWT authentication
 * @access Private (Company only)
 * 
 * @logic
 * - Extract token from request headers
 * - Verify token using JWT_SECRET
 * - Decode company ID from token
 * - Fetch company from database (excluding password)
 * - Attach company data to req.company
 * - Call next() to proceed to protected route
 * 
 * @why middleware?
 * - Centralizes authentication logic
 * - Avoids repeating auth checks in every controller
 */

    export const protectCompany = async (req, res, next) => {

        const token = req.headers.token;
        if (!token) {
            return res.json({ success: false, message: 'Not Authorized' })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.company = await Company.findById(decoded.id).select('-password')
            next();

        } catch (error) {
            res.json({ success: false, message: error.message })
        }

    }


