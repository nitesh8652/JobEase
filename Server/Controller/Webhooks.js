import { Webhook } from "svix";
import User from '../Models/User.js'

/**
 * @desc Handle Clerk webhook events (user sync with MongoDB)
 * @route POST /api/webhooks/clerk
 * @access Public (secured via webhook signature)
 * 
 * @logic
 * - Verify webhook authenticity using Svix (security layer)
 * - Parse event type and data from Clerk
 * - Perform DB operations based on event:
 *    → user.created → create user in DB
 *    → user.updated → update user in DB
 *    → user.deleted → remove user from DB
 * 
 * @why webhooks?
 * - Enables real-time synchronization between Clerk and database
 * - Eliminates need for manual user management
 */

const clerkwebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        const payload = req.body.toString()
        
        await whook.verify(payload, {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature']
        })

        const { data, type } = JSON.parse(payload)

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,  
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }
                await User.create(userData)
                res.json({})
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Error in Clerk Webhooks" })
    }
}
export { clerkwebhooks }
