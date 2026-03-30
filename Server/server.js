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
import PdfRoutes from './Routes/PdfRoutes.js'


const app = express();
await connectDB();
await connectCloudinary()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))


app.post('/webhooks', express.raw({ type: 'application/json' }), clerkwebhooks)

app.use(express.json({limit:'5mb'}))
app.use(express.json());
app.use(clerkMiddleware());  
app.get('/', (req, res) => res.send("API Running"))
app.use('/api/company', CompanyRoutes)
app.use("/api/jobs", JobRoutes)
app.use('/api/users', userRoutes)
app.use('/api/pdf', PdfRoutes)



const PORT = process.env.PORT || 5000;

app.post('/create-user-manual', async (req, res) => {
    try {
        const { userId, name, email, image } = req.body
        const user = await User.create({
            _id: userId,
            name: name,
            email: email,
            image: image || 'https://via.placeholder.com/150',
            resume: ''
        })
        res.json({ success: true, user })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
