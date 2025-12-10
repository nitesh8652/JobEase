// import './Config/instrument.js'
// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config'
// import { clerkwebhooks } from './Controller/Webhooks.js';
// import connectDB from './Config/db.js';
// import CompanyRoutes from './Routes/CompanyRoutes.js'
// import connectCloudinary from './Config/cloudinary.js';
// import JobRoutes from './Routes/JobRoutes.js';
// import userRoutes from './Routes/UserRoutes.js';
// import { clerkMiddleware } from '@clerk/express'
// import User from './Models/User.js'

// const app = express();
// await connectDB();
// await connectCloudinary()

// app.use(cors())

// // Webhook BEFORE clerkMiddleware
// // 1️⃣ RAW body ONLY for Clerk webhook
// app.post('/webhooks', 
//   express.raw({ type: 'application/json' }), 
//   clerkwebhooks
// );

// // 2️⃣ JSON Parser (must come AFTER webhook)
// app.use(express.json());

// // 3️⃣ Clerk Middleware (must come AFTER express.json)
// app.use(clerkMiddleware());

// app.get('/', (req, res) => {
//     res.send("API is running...");
// });

// // 4️⃣ Your API routes
// app.use('/api/company', CompanyRoutes)
// app.use('/api/jobs', JobRoutes)
// app.use('/api/users', userRoutes)

// const PORT = process.env.PORT || 5000;

// app.post('/create-user-manual', async (req, res) => {
//     try {
//         const { userId, name, email, image } = req.body
//         const user = await User.create({
//             _id: userId,
//             name: name,
//             email: email,
//             image: image || 'https://via.placeholder.com/150',
//             resume: ''
//         })
//         res.json({ success: true, user })
//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// })

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })


import './Config/instrument.js'
import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { clerkwebhooks } from './Controller/Webhooks.js';
import connectDB from './Config/db.js';
import CompanyRoutes from './Routes/CompanyRoutes.js'
import connectCloudinary from './Config/cloudinary.js';
import JobRoutes from './Routes/JobRoutes.js';
import userRoutes from './Routes/UserRoutes.js';
import { clerkMiddleware } from '@clerk/express'
import User from './Models/User.js'

const app = express();
await connectDB();
await connectCloudinary()

app.use(cors())

// 1. Webhook
app.post('/webhooks', express.raw({ type: 'application/json' }), clerkwebhooks);

// 2. JSON & Auth
app.use(express.json());
app.use(clerkMiddleware());

// 3. API Routes (Make sure these come BEFORE the root route)
app.use('/api/company', CompanyRoutes)
app.use('/api/jobs', JobRoutes)
app.use('/api/users', userRoutes)

// 4. Root Route (Use app.get, not app.use)
app.get('/', (req, res) => {
    res.send("API is running...");
});

// 5. Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})